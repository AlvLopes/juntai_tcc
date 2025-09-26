
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const { 
      email, 
      password, 
      firstName, 
      lastName, 
      phone,
      cpf,
      cep,
      address,
      addressNumber,
      complement,
      neighborhood,
      city,
      state,
      country
    } = await req.json()

    if (!email || !password || !firstName || !lastName || !cpf) {
      return NextResponse.json(
        { error: 'Campos obrigatórios não preenchidos' },
        { status: 400 }
      )
    }

    // Verificar se CPF já está em uso
    const existingCpfUser = await prisma.user.findFirst({
      where: { cpf: cpf.replace(/[^\d]/g, '') }
    })

    if (existingCpfUser) {
      return NextResponse.json(
        { error: 'CPF já cadastrado na plataforma' },
        { status: 400 }
      )
    }

    // Verificar se usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Usuário já existe com este email' },
        { status: 400 }
      )
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 12)

    // Criar usuário
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone: phone || null,
        cpf: cpf.replace(/[^\d]/g, ''), // Salvar apenas números
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
        city: true,
        state: true,
        createdAt: true
      }
    })

    return NextResponse.json(
      { 
        message: 'Usuário criado com sucesso',
        user 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Erro na criação do usuário:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
