
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { capturePayPalOrder } from '@/lib/paypal'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const { orderId } = await req.json()

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID é obrigatório' },
        { status: 400 }
      )
    }

    // Buscar a doação pelo PayPal Order ID
    const donation = await prisma.donation.findUnique({
      where: { paypalOrderId: orderId },
      include: { project: true }
    })

    if (!donation) {
      return NextResponse.json(
        { error: 'Doação não encontrada' },
        { status: 404 }
      )
    }

    // Capturar o pagamento no PayPal
    const captureResult = await capturePayPalOrder(orderId)

    if (captureResult.status === 'COMPLETED') {
      // Atualizar a doação como concluída
      const updatedDonation = await prisma.donation.update({
        where: { id: donation.id },
        data: {
          paypalStatus: 'COMPLETED'
        }
      })

      // Atualizar o valor atual do projeto
      await prisma.project.update({
        where: { id: donation.projectId },
        data: {
          currentAmount: {
            increment: donation.amount
          }
        }
      })

      return NextResponse.json({
        donation: updatedDonation,
        captureResult
      })
    } else {
      // Atualizar status como falhou
      await prisma.donation.update({
        where: { id: donation.id },
        data: {
          paypalStatus: captureResult.status
        }
      })

      return NextResponse.json(
        { error: 'Falha na captura do pagamento' },
        { status: 400 }
      )
    }

  } catch (error) {
    console.error('Erro ao capturar doação:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
