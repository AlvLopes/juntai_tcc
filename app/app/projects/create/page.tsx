
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon, ImageIcon, Target } from 'lucide-react'
import { toast } from 'sonner'
import MediaUpload from '@/components/ui/media-upload'

const projectSchema = z.object({
  title: z.string()
    .min(10, 'Título deve ter pelo menos 10 caracteres')
    .max(100, 'Título deve ter no máximo 100 caracteres'),
  shortDescription: z.string()
    .min(20, 'Descrição breve deve ter pelo menos 20 caracteres')
    .max(200, 'Descrição breve deve ter no máximo 200 caracteres'),
  description: z.string()
    .min(100, 'Descrição deve ter pelo menos 100 caracteres')
    .max(5000, 'Descrição deve ter no máximo 5000 caracteres'),
  goalAmount: z.number()
    .min(50, 'Meta mínima é R$ 50,00')
    .max(1000000, 'Meta máxima é R$ 1.000.000,00'),
  categoryId: z.string()
    .min(1, 'Selecione uma categoria'),
  location: z.string()
    .optional(),
  endDate: z.date()
    .refine((date) => {
      const now = new Date()
      const minDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
      return date >= minDate
    }, 'Data de encerramento deve ser pelo menos 7 dias no futuro')
    .refine((date) => {
      const now = new Date()
      const maxDate = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000)
      return date <= maxDate
    }, 'Data de encerramento deve ser no máximo 1 ano no futuro')
})

type ProjectFormData = z.infer<typeof projectSchema>

interface Category {
  id: number
  name: string
}

export default function CreateProjectPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [categories, setCategories] = useState<Category[]>([])
  const [mediaFiles, setMediaFiles] = useState<any[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema)
  })

  const watchedEndDate = watch('endDate')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login')
      return
    }
    
    fetchCategories()
  }, [status, router])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data.categories || [])
      }
    } catch (error) {
      console.error('Erro ao buscar categorias:', error)
    }
  }

  const handleMediaChange = (media: any[]) => {
    setMediaFiles(media)
  }

  const onSubmit = async (data: ProjectFormData) => {
    try {
      setIsSubmitting(true)

      // Validar se há pelo menos 2 mídias
      if (mediaFiles.length < 2) {
        toast.error('⚠️ Adicione pelo menos 2 imagens para o projeto')
        return
      }

      // Validar tamanho de todos os arquivos antes de enviar
      const invalidFiles = mediaFiles.filter(mediaFile => {
        const isVideo = mediaFile.file.type.startsWith('video/')
        const maxSize = isVideo ? 50 * 1024 * 1024 : 5 * 1024 * 1024 // 5MB para imagens, 50MB para vídeos
        return mediaFile.file.size > maxSize
      })

      if (invalidFiles.length > 0) {
        const fileDetails = invalidFiles.map(f => 
          `• ${f.file.name} (${(f.file.size / 1024 / 1024).toFixed(1)}MB)`
        ).join('\n')
        toast.error(
          `🚫 PROJETO NÃO PODE SER CRIADO!\n\n` +
          `Arquivos acima do limite de tamanho:\n${fileDetails}\n\n` +
          `Tamanho máximo permitido:\n` +
          `• Imagens: 5MB\n` +
          `• Vídeos: 50MB\n\n` +
          `Por favor, remova ou substitua os arquivos grandes.`,
          { duration: 8000 }
        )
        return
      }

      // Primeiro, criar o projeto
      const projectData = {
        ...data,
        goalAmount: data.goalAmount.toString(),
        endDate: data.endDate.toISOString()
      }

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectData)
      })

      if (!response.ok) {
        const error = await response.json()
        toast.error(error.error || 'Erro ao criar projeto')
        return
      }

      const project = await response.json()

      // Depois, fazer upload das mídias
      if (mediaFiles.length > 0) {
        const formData = new FormData()
        formData.append('projectId', project.id.toString())
        
        mediaFiles.forEach((mediaFile, index) => {
          formData.append(`media-${index}`, mediaFile.file)
        })

        const uploadResponse = await fetch('/api/projects/media/upload', {
          method: 'POST',
          body: formData
        })

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json()
          console.error('Erro no upload das mídias:', errorData)
          toast.error('Projeto criado, mas houve erro no upload das imagens. Por favor, edite o projeto e adicione as imagens novamente.')
          router.push(`/projects/${project.id}/edit`)
          return
        }
        
        const uploadResult = await uploadResponse.json()
        console.log('Upload resultado:', uploadResult)
        
        if (uploadResult.rejectedFiles && uploadResult.rejectedFiles.length > 0) {
          toast.warning(`Projeto criado! ${uploadResult.media.length} imagens enviadas, mas ${uploadResult.rejectedFiles.length} foram rejeitadas.`)
        } else {
          toast.success(`🎉 Projeto criado com sucesso! ${uploadResult.media.length} imagens adicionadas.`)
        }
      } else {
        toast.success('Projeto criado com sucesso!')
      }

      // Aguardar um pouco antes de redirecionar para garantir que o upload foi processado
      await new Promise(resolve => setTimeout(resolve, 500))
      router.push(`/projects/${project.id}`)
      
    } catch (error) {
      console.error('Erro ao criar projeto:', error)
      toast.error('Erro ao criar projeto')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-8">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="bg-white rounded-lg p-6 space-y-4">
              <div className="h-6 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!session) {
    return null // O useEffect vai redirecionar
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-8">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Criar <span className="text-primary">Projeto Social</span>
            </h1>
            <p className="text-lg text-gray-600">
              Compartilhe sua ideia e mobilize pessoas para apoiar sua causa
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Informações do Projeto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Título */}
                <div className="space-y-2">
                  <Label htmlFor="title">Título do Projeto *</Label>
                  <Input
                    id="title"
                    placeholder="Ex: Alimentação para crianças em situação de vulnerabilidade"
                    {...register('title')}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-600">{errors.title.message}</p>
                  )}
                </div>

                {/* Descrição Breve */}
                <div className="space-y-2">
                  <Label htmlFor="shortDescription">Descrição Breve *</Label>
                  <Textarea
                    id="shortDescription"
                    placeholder="Uma descrição concisa que aparecerá no card do projeto"
                    rows={2}
                    {...register('shortDescription')}
                  />
                  {errors.shortDescription && (
                    <p className="text-sm text-red-600">{errors.shortDescription.message}</p>
                  )}
                </div>

                {/* Descrição Completa */}
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição Completa *</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva detalhadamente seu projeto, objetivos, como os recursos serão utilizados..."
                    rows={8}
                    {...register('description')}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-600">{errors.description.message}</p>
                  )}
                </div>

                {/* Categoria e Meta */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Categoria *</Label>
                    <Select onValueChange={(value) => setValue('categoryId', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category.id} value={category.id.toString()}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.categoryId && (
                      <p className="text-sm text-red-600">{errors.categoryId.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="goalAmount">Meta de Arrecadação (R$) *</Label>
                    <Input
                      id="goalAmount"
                      type="number"
                      step="0.01"
                      min="50"
                      max="1000000"
                      placeholder="5000.00"
                      {...register('goalAmount', { valueAsNumber: true })}
                    />
                    {errors.goalAmount && (
                      <p className="text-sm text-red-600">{errors.goalAmount.message}</p>
                    )}
                  </div>
                </div>

                {/* Local e Data */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Localização</Label>
                    <Input
                      id="location"
                      placeholder="Ex: São Paulo, SP"
                      {...register('location')}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Data de Encerramento *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !watchedEndDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {watchedEndDate ? (
                            format(watchedEndDate, "PPP", { locale: ptBR })
                          ) : (
                            <span>Selecione uma data</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={watchedEndDate}
                          onSelect={(date) => date && setValue('endDate', date)}
                          disabled={(date) => {
                            const now = new Date()
                            const minDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
                            const maxDate = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000)
                            return date < minDate || date > maxDate
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.endDate && (
                      <p className="text-sm text-red-600">{errors.endDate.message}</p>
                    )}
                  </div>
                </div>

                {/* Upload de Imagem */}
                <div className="space-y-2">
                  <Label>Imagens e Vídeos do Projeto</Label>
                  <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-2 text-blue-800">
                      <ImageIcon className="h-5 w-5" />
                      <h4 className="font-medium">Requisitos de Imagem</h4>
                    </div>
                    <ul className="mt-2 text-sm text-blue-700 space-y-1">
                      <li>• <strong>Tamanho máximo:</strong> 5MB por imagem</li>
                      <li>• <strong>Formatos aceitos:</strong> JPG, PNG, WebP, GIF</li>
                      <li>• <strong>Vídeos:</strong> MP4, WebM, OGG (até 50MB)</li>
                      <li>• <strong>Mínimo:</strong> 2 imagens obrigatórias</li>
                      <li>• <strong>Máximo:</strong> 6 arquivos no total (1 vídeo)</li>
                    </ul>
                  </div>
                  <MediaUpload
                    onMediaChange={handleMediaChange}
                    maxFiles={6}
                    maxVideoFiles={1}
                    disabled={isSubmitting}
                  />
                </div>

                {/* Botões */}
                <div className="flex gap-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? 'Criando...' : 'Criar Projeto'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

