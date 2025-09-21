

import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const cep = searchParams.get('cep')

    if (!cep) {
      return NextResponse.json(
        { error: 'CEP é obrigatório' },
        { status: 400 }
      )
    }

    // Remove caracteres especiais do CEP
    const cleanCep = cep.replace(/\D/g, '')

    if (cleanCep.length !== 8) {
      return NextResponse.json(
        { error: 'CEP deve ter 8 dígitos' },
        { status: 400 }
      )
    }

    // Busca o endereço na API do ViaCEP
    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
    
    if (!response.ok) {
      throw new Error('Erro ao consultar ViaCEP')
    }

    const data = await response.json()

    if (data.erro) {
      return NextResponse.json(
        { error: 'CEP não encontrado' },
        { status: 404 }
      )
    }

    // Mapear os campos do ViaCEP para o formato esperado
    const address = {
      cep: data.cep,
      address: data.logradouro,
      neighborhood: data.bairro,
      city: data.localidade,
      state: data.uf,
      complement: data.complemento || '',
      country: 'Brasil'
    }

    return NextResponse.json({ address })

  } catch (error) {
    console.error('Erro ao buscar CEP:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

