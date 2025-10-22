
import { NextRequest, NextResponse } from 'next/server'

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
    const error = await response.text()
    throw new Error(`Failed to get PayPal access token: ${error}`)
  }

  const data = await response.json()
  return data.access_token
}

export async function GET(req: NextRequest) {
  try {
    console.log('🧪 Testando configuração PayPal...')
    
    // 1. Testar autenticação
    console.log('1️⃣ Testando autenticação...')
    const accessToken = await getPayPalAccessToken()
    console.log('✅ Autenticação bem-sucedida')
    
    // 2. Criar uma ordem de teste com BRL
    console.log('2️⃣ Criando ordem de teste com BRL...')
    const testOrderData = {
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'BRL',
          value: '10.00'
        },
        description: 'Teste de configuração BRL'
      }]
    }
    
    const orderResponse = await fetch(`${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(testOrderData)
    })
    
    const orderResult = await orderResponse.json()
    
    if (!orderResponse.ok) {
      console.error('❌ Erro ao criar ordem de teste:', orderResult)
      return NextResponse.json({
        success: false,
        step: 'create_order',
        error: orderResult,
        message: 'Falha ao criar ordem de teste com BRL',
        recommendation: orderResult.details?.[0]?.issue?.includes('CURRENCY') 
          ? '⚠️ Sua conta PayPal sandbox não suporta BRL. Você precisa criar uma conta Business configurada para o Brasil no PayPal Developer Dashboard.'
          : 'Verifique as credenciais e configurações da conta.'
      })
    }
    
    console.log('✅ Ordem de teste criada:', orderResult.id)
    
    // 3. Buscar detalhes da ordem
    console.log('3️⃣ Buscando detalhes da ordem...')
    const detailsResponse = await fetch(
      `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${orderResult.id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      }
    )
    
    const orderDetails = await detailsResponse.json()
    console.log('✅ Detalhes obtidos')
    
    return NextResponse.json({
      success: true,
      message: '✅ Configuração PayPal está correta para BRL!',
      details: {
        authentication: 'OK',
        order_creation: 'OK',
        currency: orderDetails.purchase_units?.[0]?.amount?.currency_code,
        test_order_id: orderResult.id,
        order_status: orderDetails.status,
        environment: process.env.PAYPAL_BASE_URL?.includes('sandbox') ? 'SANDBOX' : 'PRODUCTION'
      },
      next_steps: [
        '1. Para testar pagamento completo, você precisa:',
        '   - Fazer login com uma conta PESSOAL (buyer) do sandbox',
        '   - NÃO com a conta BUSINESS (merchant)',
        '2. Ou use cartões de teste do PayPal:',
        '   - Visa: 4032034559814856',
        '   - Mastercard: 5425233430109903',
        '   - Amex: 374245455400126',
        '3. IMPORTANTE: A conta BUSINESS deve aceitar BRL',
        '4. Para pagamentos com cartão em BRL, verifique se sua conta Business tem processamento internacional ativado'
      ]
    })
    
  } catch (error: any) {
    console.error('❌ Erro no teste de configuração:', error)
    return NextResponse.json({
      success: false,
      error: error.message,
      message: 'Erro ao testar configuração PayPal',
      recommendation: 'Verifique se PAYPAL_CLIENT_ID e PAYPAL_CLIENT_SECRET estão corretos no arquivo .env'
    }, { status: 500 })
  }
}
