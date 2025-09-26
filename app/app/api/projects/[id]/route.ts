
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = parseInt(params.id)
    
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            bio: true,
            createdAt: true
          }
        },
        category: true,
        media: {
          orderBy: { order: 'asc' }
        },
        donations: {
          include: {
            donor: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        },
        _count: {
          select: {
            donations: true,
            comments: true
          }
        }
      }
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Projeto não encontrado' },
        { status: 404 }
      )
    }

    const projectWithStats = {
      ...project,
      donationCount: project._count.donations,
      commentCount: project._count.comments,
      progressPercentage: Math.min(
        (Number(project.currentAmount) / Number(project.goalAmount)) * 100,
        100
      ),
      daysRemaining: Math.max(
        0,
        Math.ceil((new Date(project.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
      )
    }

    return NextResponse.json(projectWithStats)

  } catch (error) {
    console.error('Erro ao buscar projeto:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      )
    }

    const projectId = parseInt(params.id)
    
    // Verificar se o usuário é o criador do projeto
    const existingProject = await prisma.project.findUnique({
      where: { id: projectId },
      select: { creatorId: true }
    })

    if (!existingProject) {
      return NextResponse.json(
        { error: 'Projeto não encontrado' },
        { status: 404 }
      )
    }

    if (existingProject.creatorId !== parseInt(session.user.id)) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 403 }
      )
    }

    const {
      title,
      description,
      shortDescription,
      image,
      goalAmount,
      endDate,
      categoryId,
      location,
      isActive
    } = await req.json()

    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: {
        title: title || undefined,
        description: description || undefined,
        shortDescription: shortDescription || undefined,
        image: image || undefined,
        goalAmount: goalAmount ? parseFloat(goalAmount) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        categoryId: categoryId ? parseInt(categoryId) : undefined,
        location: location || undefined,
        isActive: isActive !== undefined ? isActive : undefined
      },
      include: {
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true
          }
        },
        category: true
      }
    })

    return NextResponse.json(updatedProject)

  } catch (error) {
    console.error('Erro ao atualizar projeto:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      )
    }

    const { password } = await req.json()
    
    if (!password) {
      return NextResponse.json(
        { error: 'Senha é obrigatória para exclusão' },
        { status: 400 }
      )
    }

    // Verificar a senha do usuário
    const user = await prisma.user.findUnique({
      where: { id: parseInt(session.user.id) },
      select: { password: true }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      )
    }

    const bcrypt = require('bcryptjs')
    const isValidPassword = await bcrypt.compare(password, user.password)
    
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Senha incorreta' },
        { status: 401 }
      )
    }

    const projectId = parseInt(params.id)
    
    // Verificar se o usuário é o criador do projeto e se o projeto está inativo
    const existingProject = await prisma.project.findUnique({
      where: { id: projectId },
      select: { 
        creatorId: true,
        isActive: true,
        createdAt: true
      }
    })

    if (!existingProject) {
      return NextResponse.json(
        { error: 'Projeto não encontrado' },
        { status: 404 }
      )
    }

    if (existingProject.creatorId !== parseInt(session.user.id)) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 403 }
      )
    }

    // Só permite exclusão se o projeto estiver inativo
    if (existingProject.isActive) {
      return NextResponse.json(
        { error: 'Despublique o projeto antes de excluí-lo permanentemente' },
        { status: 400 }
      )
    }

    // Verificar se passaram 48 horas desde a desativação
    const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000)
    if (existingProject.createdAt > twoDaysAgo) {
      return NextResponse.json(
        { error: 'Aguarde 48 horas após despublicar para excluir permanentemente' },
        { status: 400 }
      )
    }

    await prisma.project.delete({
      where: { id: projectId }
    })

    return NextResponse.json({ message: 'Projeto excluído com sucesso' })

  } catch (error) {
    console.error('Erro ao excluir projeto:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
