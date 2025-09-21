
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
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        bio: true,
        avatar: true,
        createdAt: true,
        cep: true,
        address: true,
        addressNumber: true,
        complement: true,
        neighborhood: true,
        city: true,
        state: true,
        country: true
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(user)

  } catch (error) {
    console.error('Erro ao buscar perfil:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      )
    }

    const userId = parseInt(session.user.id)
    const { 
      firstName, 
      lastName, 
      phone, 
      bio, 
      avatar, 
      cep,
      address,
      addressNumber,
      complement,
      neighborhood,
      city,
      state,
      country
    } = await req.json()

    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: 'Nome e sobrenome são obrigatórios' },
        { status: 400 }
      )
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
        phone: phone || null,
        bio: bio || null,
        avatar: avatar || null,
        cep: cep || null,
        address: address || null,
        addressNumber: addressNumber || null,
        complement: complement || null,
        neighborhood: neighborhood || null,
        city: city || null,
        state: state || null,
        country: country || null
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        bio: true,
        avatar: true,
        createdAt: true,
        cep: true,
        address: true,
        addressNumber: true,
        complement: true,
        neighborhood: true,
        city: true,
        state: true,
        country: true
      }
    })

    return NextResponse.json(updatedUser)

  } catch (error) {
    console.error('Erro ao atualizar perfil:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

