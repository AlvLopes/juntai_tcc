
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      )
    }

    const userId = parseInt(session.user.id)

    const projects = await prisma.project.findMany({
      where: { creatorId: userId },
      include: {
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true
          }
        },
        category: true,
        _count: {
          select: { donations: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    const projectsWithStats = projects.map(project => ({
      ...project,
      donationCount: project._count.donations,
      progressPercentage: Math.min(
        (Number(project.currentAmount) / Number(project.goalAmount)) * 100,
        100
      )
    }))

    return NextResponse.json({
      projects: projectsWithStats
    })

  } catch (error) {
    console.error('Erro ao buscar projetos do usuário:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

