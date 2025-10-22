
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

async function getPayPalAccessToken() {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString('base64')

  const response = await fetch(`${process.env.PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  })

  if (!response.ok) {
    throw new Error('Failed to get PayPal access token')
  }

  const data = await response.json()
  return data.access_token
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      )
    }

    const { orderId, projectId, amount, message, isAnonymous } = await req.json()

    if (!orderId || !projectId || !amount) {
      return NextResponse.json(
        { error: 'Dados obrigatórios não fornecidos' },
        { status: 400 }
      )
    }

    // Obter token do PayPal
    const accessToken = await getPayPalAccessToken()

    // Primeiro, buscar detalhes da ordem para diagnóstico
    console.log('🔍 Buscando detalhes da ordem PayPal:', orderId)
    const orderDetailsResponse = await fetch(
      `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      }
    )
    
    if (orderDetailsResponse.ok) {
      const orderDetails = await orderDetailsResponse.json()
      console.log('📋 Detalhes da ordem antes da captura:', JSON.stringify({
        status: orderDetails.status,
        intent: orderDetails.intent,
        currency: orderDetails.purchase_units?.[0]?.amount?.currency_code,
        amount: orderDetails.purchase_units?.[0]?.amount?.value,
        payment_source: orderDetails.payment_source
      }, null, 2))
    }
    
    // Capturar ordem no PayPal
    console.log('🔄 Capturando ordem PayPal:', orderId)
    
    const captureResponse = await fetch(
      `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      }
    )

    if (!captureResponse.ok) {
      const errorText = await captureResponse.text()
      console.error('❌ PayPal capture failed:', {
        status: captureResponse.status,
        statusText: captureResponse.statusText,
        error: errorText
      })
      
      let errorMessage = 'Erro ao processar pagamento'
      let errorDetails = null
      let errorJson: any = null
      
      try {
        errorJson = JSON.parse(errorText)
        console.error('📋 Erro PayPal completo:', JSON.stringify(errorJson, null, 2))
        
        if (errorJson.message) {
          errorMessage = errorJson.message
        }
        
        if (errorJson.details && Array.isArray(errorJson.details)) {
          errorDetails = errorJson.details
          console.error('📝 Detalhes do erro:', JSON.stringify(errorJson.details, null, 2))
          
          // Log cada detalhe individualmente
          errorJson.details.forEach((detail: any, index: number) => {
            console.error(`🔍 Detalhe ${index + 1}:`, {
              issue: detail.issue,
              description: detail.description,
              field: detail.field,
              location: detail.location,
              value: detail.value
            })
          })
          
          // Adicionar descrições ao erro
          const descriptions = errorJson.details.map((d: any) => d.description || d.issue).filter(Boolean)
          if (descriptions.length > 0) {
            errorMessage += ': ' + descriptions.join(', ')
          }
          
          // Verificar se é erro de moeda não suportada
          const currencyError = errorJson.details.find((d: any) => 
            d.issue?.includes('CURRENCY') || 
            d.description?.includes('currency') ||
            d.description?.includes('CURRENCY')
          )
          
          if (currencyError) {
            errorMessage = '⚠️ ERRO DE MOEDA: Sua conta PayPal sandbox não aceita BRL (Real Brasileiro). ' +
                          'Configure uma conta Business no PayPal Developer Dashboard com moeda BRL. ' +
                          'Detalhes: ' + currencyError.description
          }
          
          // Verificar se é erro de instrumento de pagamento
          const instrumentError = errorJson.details.find((d: any) => 
            d.issue?.includes('INSTRUMENT') || 
            d.issue?.includes('PAYMENT_SOURCE') ||
            d.description?.toLowerCase().includes('declined') ||
            d.description?.toLowerCase().includes('instrument')
          )
          
          if (instrumentError) {
            console.error('⚠️ ERRO DE INSTRUMENTO DE PAGAMENTO DETECTADO:', instrumentError)
            errorMessage = '⚠️ PROBLEMA COM A FORMA DE PAGAMENTO:\n\n' +
                          'O PayPal recusou o instrumento de pagamento usado.\n\n' +
                          '✅ SOLUÇÕES:\n' +
                          '1. Verifique se sua conta Personal sandbox tem saldo em BRL\n' +
                          '2. Ou tente pagar com cartão de teste:\n' +
                          '   - Visa: 4032034559814856\n' +
                          '   - Mastercard: 5425233430109903\n' +
                          '   - CVV: 123, Validade: 12/2027\n\n' +
                          'Detalhes técnicos: ' + instrumentError.description
          }
        }
      } catch (e) {
        console.error('Erro ao parsear resposta do PayPal:', e)
      }
      
      return NextResponse.json(
        { 
          error: errorMessage, 
          details: errorDetails,
          rawError: errorText,
          fullError: errorJson // Retornar erro completo para debugging
        },
        { status: 500 }
      )
    }

    const captureData = await captureResponse.json()
    console.log('✅ Captura PayPal bem-sucedida:', {
      status: captureData.status,
      orderId: captureData.id
    })
    
    if (captureData.status === 'COMPLETED') {
      // Salvar doação no banco de dados
      const donation = await prisma.donation.create({
        data: {
          amount: parseFloat(amount),
          isAnonymous: isAnonymous || false,
          paypalOrderId: orderId,
          paypalStatus: captureData.status,
          message: message || null,
          donorId: parseInt(session.user.id),
          projectId: parseInt(projectId)
        }
      })

      // Atualizar valor atual do projeto
      await prisma.project.update({
        where: { id: parseInt(projectId) },
        data: {
          currentAmount: {
            increment: parseFloat(amount)
          }
        }
      })

      return NextResponse.json({
        success: true,
        donation,
        paypalData: captureData
      })
    } else {
      return NextResponse.json(
        { error: 'Pagamento não foi aprovado' },
        { status: 400 }
      )
    }

  } catch (error) {
    console.error('Erro ao capturar ordem PayPal:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

