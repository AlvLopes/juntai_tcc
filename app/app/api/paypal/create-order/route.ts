
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

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

    const { projectId, amount, message } = await req.json()

    if (!projectId || !amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Dados inválidos' },
        { status: 400 }
      )
    }

    // Buscar dados do projeto
    const projectResponse = await fetch(`${process.env.NEXTAUTH_URL}/api/projects/${projectId}`)
    if (!projectResponse.ok) {
      return NextResponse.json(
        { error: 'Projeto não encontrado' },
        { status: 404 }
      )
    }
    const project = await projectResponse.json()

    // Obter token do PayPal
    const accessToken = await getPayPalAccessToken()

    // Criar ordem no PayPal
    const orderData = {
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'USD', // PayPal Sandbox funciona melhor com USD
          value: amount.toString()
        },
        description: `Doação para: ${project.title}`,
        custom_id: `${projectId}_${session.user.id}_${Date.now()}`
      }],
      application_context: {
        return_url: `${process.env.NEXTAUTH_URL}/projects/${projectId}?success=true`,
        cancel_url: `${process.env.NEXTAUTH_URL}/projects/${projectId}?cancelled=true`,
        brand_name: 'Juntaí',
        user_action: 'PAY_NOW'
      }
    }

    const orderResponse = await fetch(`${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(orderData)
    })

    if (!orderResponse.ok) {
      const error = await orderResponse.text()
      console.error('PayPal order creation failed:', error)
      return NextResponse.json(
        { error: 'Erro ao criar ordem de pagamento' },
        { status: 500 }
      )
    }

    const order = await orderResponse.json()

    return NextResponse.json({
      orderId: order.id,
      approvalUrl: order.links.find((link: any) => link.rel === 'approve')?.href
    })

  } catch (error) {
    console.error('Erro ao criar ordem PayPal:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

