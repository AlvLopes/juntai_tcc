
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { createPayPalOrder, capturePayPalOrder } from '@/lib/paypal'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      )
    }

    const { projectId, amount, isAnonymous, message } = await req.json()

    if (!projectId || !amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Dados inválidos' },
        { status: 400 }
      )
    }

    // Verificar se o projeto existe e está ativo
    const project = await prisma.project.findUnique({
      where: { id: parseInt(projectId) }
    })

    if (!project || !project.isActive) {
      return NextResponse.json(
        { error: 'Projeto não encontrado ou inativo' },
        { status: 404 }
      )
    }

    // Criar ordem no PayPal
    const paypalOrder = await createPayPalOrder({
      amount: amount.toString(),
      currency: 'USD',
      description: `Doação para ${project.title}`
    })

    // Criar registro da doação (pendente)
    const donation = await prisma.donation.create({
      data: {
        amount: parseFloat(amount),
        isAnonymous: !!isAnonymous,
        message: message || null,
        paypalOrderId: paypalOrder.id,
        paypalStatus: 'CREATED',
        donorId: parseInt(session.user.id),
        projectId: parseInt(projectId)
      },
      include: {
        donor: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true
          }
        },
        project: {
          select: {
            id: true,
            title: true,
            image: true
          }
        }
      }
    })

    return NextResponse.json({
      donation,
      paypalOrder: {
        id: paypalOrder.id,
        links: paypalOrder.links
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Erro ao criar doação:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
