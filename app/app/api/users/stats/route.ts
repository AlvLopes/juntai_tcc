
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

    const [
      totalProjects,
      activeProjects,
      donationsData,
      totalDonors
    ] = await Promise.all([
      // Total de projetos do usuário
      prisma.project.count({
        where: { creatorId: userId }
      }),
      
      // Projetos ativos
      prisma.project.count({
        where: { 
          creatorId: userId,
          isActive: true,
          endDate: { gt: new Date() }
        }
      }),
      
      // Total arrecadado dos projetos do usuário
      prisma.project.aggregate({
        where: { creatorId: userId },
        _sum: { currentAmount: true }
      }),
      
      // Total de doadores únicos para os projetos do usuário
      prisma.donation.findMany({
        where: {
          project: { creatorId: userId }
        },
        select: { donorId: true },
        distinct: ['donorId']
      })
    ])

    const totalRaised = Number(donationsData._sum.currentAmount || 0)
    const totalDonations = await prisma.donation.count({
      where: {
        project: { creatorId: userId }
      }
    })

    return NextResponse.json({
      totalProjects,
      activeProjects,
      totalRaised,
      totalDonations,
      totalDonors: totalDonors.length
    })

  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

