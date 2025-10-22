

'use client'

import { useState, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Upload, X, Image as ImageIcon, Video, FileImage, FileVideo } from 'lucide-react'
import { toast } from 'sonner'
import Image from 'next/image'

interface MediaFile {
  id: string
  file: File
  preview: string
  type: 'IMAGEM' | 'VIDEO'
  order: number
}

interface MediaUploadProps {
  onMediaChange: (media: MediaFile[]) => void
  maxFiles?: number
  maxVideoFiles?: number
  acceptedTypes?: string[]
  disabled?: boolean
  initialMedia?: MediaFile[]
}

export default function MediaUpload({
  onMediaChange,
  maxFiles = 6,
  maxVideoFiles = 1,
  acceptedTypes = [
    'image/jpeg',
    'image/png', 
    'image/webp',
    'image/gif',
    'video/mp4',
    'video/webm',
    'video/ogg'
  ],
  disabled = false,
  initialMedia = []
}: MediaUploadProps) {
  const [media, setMedia] = useState<MediaFile[]>(initialMedia)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): boolean => {
    // Verificar tipo
    if (!acceptedTypes.includes(file.type)) {
      toast.error(`Tipo de arquivo não suportado: ${file.type}`)
      return false
    }

    // Verificar tamanho (5MB para imagens, 50MB para vídeos)
    const maxSize = file.type.startsWith('video/') ? 50 * 1024 * 1024 : 5 * 1024 * 1024
    if (file.size > maxSize) {
      const maxSizeMB = file.type.startsWith('video/') ? 50 : 5
      const fileType = file.type.startsWith('video/') ? 'vídeos' : 'imagens'
      toast.error(
        `🚫 ARQUIVO REJEITADO!\n\n` +
        `O arquivo "${file.name}" tem ${(file.size / 1024 / 1024).toFixed(1)}MB.\n` +
        `Tamanho máximo: ${maxSizeMB}MB para ${fileType}.\n\n` +
        `⚠️ Arquivos acima do limite impedem a criação do projeto!`,
        { duration: 6000 }
      )
      return false
    }

    return true
  }

  const getFileType = (file: File): 'IMAGEM' | 'VIDEO' => {
    return file.type.startsWith('video/') ? 'VIDEO' : 'IMAGEM'
  }

  const createPreview = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      if (file.type.startsWith('video/')) {
        // Para vídeos, criar um thumbnail
        const video = document.createElement('video')
        video.preload = 'metadata'
        video.onloadedmetadata = () => {
          video.currentTime = 1 // Buscar frame no segundo 1
        }
        video.onseeked = () => {
          const canvas = document.createElement('canvas')
          canvas.width = video.videoWidth
          canvas.height = video.videoHeight
          const ctx = canvas.getContext('2d')
          ctx?.drawImage(video, 0, 0)
          resolve(canvas.toDataURL('image/jpeg', 0.8))
        }
        video.src = URL.createObjectURL(file)
      } else {
        // Para imagens
        const reader = new FileReader()
        reader.onload = (e) => resolve(e.target?.result as string)
        reader.readAsDataURL(file)
      }
    })
  }

  const processFiles = useCallback(async (fileList: FileList) => {
    const files = Array.from(fileList)
    const newMedia: MediaFile[] = []

    for (const file of files) {
      if (!validateFile(file)) continue

      const fileType = getFileType(file)
      
      // Verificar limite de vídeos
      const currentVideoCount = media.filter(m => m.type === 'VIDEO').length
      const newVideoCount = newMedia.filter(m => m.type === 'VIDEO').length
      if (fileType === 'VIDEO' && (currentVideoCount + newVideoCount) >= maxVideoFiles) {
        toast.error(`Máximo ${maxVideoFiles} vídeo(s) permitido(s)`)
        continue
      }

      // Verificar limite total
      if (media.length + newMedia.length >= maxFiles) {
        toast.error(`⚠️ Limite excedido! Máximo ${maxFiles} arquivos permitidos. Você já tem ${media.length} arquivo(s).`)
        break
      }

      try {
        const preview = await createPreview(file)
        const mediaFile: MediaFile = {
          id: `${Date.now()}-${media.length + newMedia.length}-${file.name.replace(/\W/g, '')}`,
          file,
          preview,
          type: fileType,
          order: media.length + newMedia.length
        }
        newMedia.push(mediaFile)
      } catch (error) {
        console.error('Erro ao processar arquivo:', error)
        toast.error('Erro ao processar arquivo')
      }
    }

    if (newMedia.length > 0) {
      const updatedMedia = [...media, ...newMedia]
      setMedia(updatedMedia)
      onMediaChange(updatedMedia)
      toast.success(`${newMedia.length} arquivo(s) adicionado(s)`)
    }
  }, [media, maxFiles, maxVideoFiles, onMediaChange])

  const removeMedia = (id: string) => {
    const updatedMedia = media.filter(m => m.id !== id).map((m, index) => ({
      ...m,
      order: index
    }))
    setMedia(updatedMedia)
    onMediaChange(updatedMedia)
  }

  const reorderMedia = (fromIndex: number, toIndex: number) => {
    const newMedia = [...media]
    const [removed] = newMedia.splice(fromIndex, 1)
    newMedia.splice(toIndex, 0, removed)
    
    // Atualizar ordem
    const reorderedMedia = newMedia.map((m, index) => ({
      ...m,
      order: index
    }))
    
    setMedia(reorderedMedia)
    onMediaChange(reorderedMedia)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    
    if (disabled) return
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      processFiles(files)
    }
  }

  const handleFileSelect = () => {
    if (disabled) return
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      processFiles(files)
    }
    // Reset input
    e.target.value = ''
  }

  // Verificar limites
  const canAddMore = media.length < maxFiles
  const videoCount = media.filter(m => m.type === 'VIDEO').length
  const canAddVideo = videoCount < maxVideoFiles

  return (
    <div className="space-y-4">
      {/* Área de upload */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragOver 
            ? 'border-primary bg-primary/5' 
            : 'border-gray-300 hover:border-gray-400'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleFileSelect}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleFileChange}
          className="hidden"
          disabled={disabled}
        />
        
        <div className="space-y-2">
          <Upload className="mx-auto h-8 w-8 text-gray-400" />
          <div className="space-y-1">
            <p className="text-sm font-medium">
              {canAddMore 
                ? 'Arraste arquivos aqui ou clique para selecionar'
                : 'Limite de arquivos atingido'
              }
            </p>
            <p className="text-xs text-gray-500">
              Máximo {maxFiles} arquivos ({maxVideoFiles} vídeo{maxVideoFiles > 1 ? 's' : ''})
              <br />
              Imagens: JPG, PNG, WebP, GIF (até 5MB)
              <br />
              Vídeos: MP4, WebM, OGG (até 50MB)
            </p>
          </div>
        </div>
      </div>

      {/* Informações sobre requisitos */}
      <div className="text-sm bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 p-4 rounded-lg">
        <p className="font-bold text-red-800 mb-2 flex items-center gap-2">
          <span className="text-lg">⚠️</span>
          ATENÇÃO: Limite de Tamanho
        </p>
        <ul className="text-xs space-y-1.5 text-gray-700">
          <li className="font-semibold text-red-700">• <strong>Imagens:</strong> Máximo 5MB cada</li>
          <li className="font-semibold text-red-700">• <strong>Vídeos:</strong> Máximo 50MB cada</li>
          <li>• Mínimo 2 imagens obrigatórias</li>
          <li>• Máximo {maxFiles} arquivos no total</li>
          <li>• Máximo {maxVideoFiles} vídeo{maxVideoFiles > 1 ? 's' : ''}</li>
          <li>• A primeira imagem será usada como capa</li>
        </ul>
        <p className="mt-2 text-xs font-medium text-red-800 bg-red-100 p-2 rounded">
          🚫 Arquivos acima do limite impedem a criação do projeto!
        </p>
      </div>

      {/* Preview dos arquivos */}
      {media.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Arquivos selecionados ({media.length}/{maxFiles})</h4>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {media.map((item, index) => (
              <div 
                key={item.id} 
                className="relative group border rounded-lg overflow-hidden"
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData('text/plain', index.toString())
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault()
                  const fromIndex = parseInt(e.dataTransfer.getData('text/plain'))
                  reorderMedia(fromIndex, index)
                }}
              >
                {/* Preview */}
                <div className="aspect-video relative bg-gray-100">
                  <Image
                    src={item.preview}
                    alt={item.file.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  
                  {/* Tipo de arquivo */}
                  <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                    {item.type === 'VIDEO' ? (
                      <><Video className="h-3 w-3" /> VIDEO</>
                    ) : (
                      <><ImageIcon className="h-3 w-3" /> IMG</>
                    )}
                  </div>

                  {/* Indicador de posição */}
                  <div className="absolute top-2 right-2 bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </div>

                  {/* Botão remover */}
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute bottom-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeMedia(item.id)
                    }}
                    disabled={disabled}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>

                {/* Nome do arquivo */}
                <div className="p-2 border-t">
                  <p className="text-xs truncate" title={item.file.name}>
                    {item.file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(item.file.size / 1024 / 1024).toFixed(1)} MB
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Validação mínima */}
      {media.length < 2 && (
        <div className="text-sm text-orange-600 bg-orange-50 p-3 rounded-lg border border-orange-200">
          <p className="font-medium">Atenção:</p>
          <p>Adicione pelo menos 2 imagens para o projeto.</p>
        </div>
      )}
    </div>
  )
}

