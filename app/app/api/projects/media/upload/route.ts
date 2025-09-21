

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { writeFile } from 'fs/promises'
import path from 'path'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const formData = await req.formData()
    const projectId = formData.get('projectId') as string
    
    if (!projectId) {
      return NextResponse.json(
        { error: 'ID do projeto é obrigatório' },
        { status: 400 }
      )
    }

    // Verificar se o projeto existe e pertence ao usuário
    const project = await prisma.project.findFirst({
      where: {
        id: parseInt(projectId),
        creatorId: parseInt(session.user.id)
      }
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Projeto não encontrado ou sem permissão' },
        { status: 404 }
      )
    }

    const uploadedMedia = []
    const entries = Array.from(formData.entries())
    let order = 0

    for (const [key, value] of entries) {
      if (key.startsWith('media-') && value instanceof File) {
        const file = value
        
        // Validação do arquivo
        if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
          continue // Pular arquivos que não são imagem nem vídeo
        }

        // Verificar tamanho do arquivo (10MB para imagens, 50MB para vídeos)
        const maxSize = file.type.startsWith('video/') ? 50 * 1024 * 1024 : 10 * 1024 * 1024
        if (file.size > maxSize) {
          continue // Pular arquivos muito grandes
        }

        // Gerar nome único para o arquivo
        const timestamp = Date.now()
        const extension = file.name.split('.').pop() || ''
        const filename = `project-${projectId}-${timestamp}-${Math.random().toString(36).substring(2)}.${extension}`
        
        // Definir caminho de salvamento
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'projects')
        const filepath = path.join(uploadDir, filename)
        
        try {
          // Criar diretório se não existir
          await writeFile(filepath, Buffer.from(await file.arrayBuffer()))
          
          // URL pública do arquivo
          const publicUrl = `/uploads/projects/${filename}`
          
          // Determinar tipo de mídia
          const mediaType = file.type.startsWith('video/') ? 'VIDEO' : 'IMAGEM'
          
          // Salvar no banco de dados
          const mediaRecord = await prisma.projectMedia.create({
            data: {
              projectId: parseInt(projectId),
              url: publicUrl,
              type: mediaType,
              filename: file.name,
              order: order++
            }
          })
          
          uploadedMedia.push({
            id: mediaRecord.id,
            url: publicUrl,
            type: mediaType,
            filename: file.name,
            order: mediaRecord.order
          })
          
          // Atualizar imagem principal do projeto se for a primeira imagem
          if (order === 1 && mediaType === 'IMAGEM') {
            await prisma.project.update({
              where: { id: parseInt(projectId) },
              data: { image: publicUrl }
            })
          }
          
        } catch (uploadError) {
          console.error('Erro no upload:', uploadError)
          continue // Continuar com próximo arquivo
        }
      }
    }

    return NextResponse.json({
      message: `${uploadedMedia.length} arquivo(s) enviado(s) com sucesso`,
      media: uploadedMedia
    })

  } catch (error) {
    console.error('Erro no upload de mídia:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const mediaId = searchParams.get('mediaId')
    
    if (!mediaId) {
      return NextResponse.json(
        { error: 'ID da mídia é obrigatório' },
        { status: 400 }
      )
    }

    // Verificar se a mídia existe e o usuário tem permissão
    const media = await prisma.projectMedia.findFirst({
      where: {
        id: parseInt(mediaId),
        project: {
          creatorId: parseInt(session.user.id)
        }
      },
      include: {
        project: true
      }
    })

    if (!media) {
      return NextResponse.json(
        { error: 'Mídia não encontrada ou sem permissão' },
        { status: 404 }
      )
    }

    // Remover arquivo do sistema de arquivos
    try {
      const fs = require('fs').promises
      const filepath = path.join(process.cwd(), 'public', media.url)
      await fs.unlink(filepath)
    } catch (fsError) {
      console.error('Erro ao remover arquivo:', fsError)
      // Continuar mesmo se não conseguir remover o arquivo
    }

    // Remover do banco de dados
    await prisma.projectMedia.delete({
      where: { id: parseInt(mediaId) }
    })

    return NextResponse.json({
      message: 'Mídia removida com sucesso'
    })

  } catch (error) {
    console.error('Erro ao remover mídia:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

