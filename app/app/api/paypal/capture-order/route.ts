
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

    // Capturar ordem no PayPal
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
      const error = await captureResponse.text()
      console.error('PayPal capture failed:', error)
      return NextResponse.json(
        { error: 'Erro ao processar pagamento' },
        { status: 500 }
      )
    }

    const captureData = await captureResponse.json()
    
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

