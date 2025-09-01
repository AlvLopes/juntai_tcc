
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon, Edit, Save, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'

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
    .min(new Date(), 'Data de encerramento não pode ser no passado'),
  isActive: z.boolean(),
  isFeatured: z.boolean()
})

type ProjectFormData = z.infer<typeof projectSchema>

interface Category {
  id: number
  name: string
}

interface Project {
  id: number
  title: string
  description: string
  shortDescription?: string
  image?: string
  goalAmount: number
  currentAmount: number
  endDate: string
  isActive: boolean
  isFeatured: boolean
  location?: string
  categoryId: number
  creatorId: number
}

export default function EditProjectPage() {
  const params = useParams()
  const router = useRouter()
  const { data: session, status } = useSession() || {}
  const [project, setProject] = useState<Project | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

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
  const watchedIsActive = watch('isActive')
  const watchedIsFeatured = watch('isFeatured')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login')
      return
    }
    
    if (params.id) {
      fetchProject()
      fetchCategories()
    }
  }, [params.id, status, router])

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/projects/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        
        // Verificar se o usuário é o criador
        if (session?.user?.id !== data.creator.id.toString()) {
          toast.error('Você não tem permissão para editar este projeto')
          router.push(`/projects/${params.id}`)
          return
        }
        
        setProject(data)
        
        // Preencher formulário
        setValue('title', data.title)
        setValue('shortDescription', data.shortDescription || '')
        setValue('description', data.description)
        setValue('goalAmount', Number(data.goalAmount))
        setValue('categoryId', data.categoryId.toString())
        setValue('location', data.location || '')
        setValue('endDate', new Date(data.endDate))
        setValue('isActive', data.isActive)
        setValue('isFeatured', data.isFeatured)
        
      } else if (response.status === 404) {
        toast.error('Projeto não encontrado')
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Erro ao buscar projeto:', error)
      toast.error('Erro ao carregar projeto')
    } finally {
      setLoading(false)
    }
  }

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB
        toast.error('Imagem deve ter no máximo 5MB')
        return
      }
      
      if (!file.type.startsWith('image/')) {
        toast.error('Arquivo deve ser uma imagem')
        return
      }

      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => setImagePreview(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data: ProjectFormData) => {
    try {
      setIsSubmitting(true)

      let imageUrl = project?.image
      
      // Upload da nova imagem se fornecida
      if (imageFile) {
        const formData = new FormData()
        formData.append('file', imageFile)
        
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        })
        
        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json()
          imageUrl = uploadData.url
        }
      }

      // Atualizar projeto
      const projectData = {
        ...data,
        image: imageUrl,
        goalAmount: data.goalAmount.toString(),
        endDate: data.endDate.toISOString()
      }

      const response = await fetch(`/api/projects/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectData)
      })

      if (response.ok) {
        toast.success('Projeto atualizado com sucesso!')
        router.push(`/projects/${params.id}`)
      } else {
        const error = await response.json()
        toast.error(error.error || 'Erro ao atualizar projeto')
      }
    } catch (error) {
      console.error('Erro ao atualizar projeto:', error)
      toast.error('Erro ao atualizar projeto')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (status === 'loading' || loading) {
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

  if (!session || !project) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-8">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Editar <span className="text-primary">Projeto</span>
              </h1>
              <p className="text-lg text-gray-600">
                Atualize as informações do seu projeto social
              </p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit className="h-5 w-5" />
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
                    <Select 
                      value={watch('categoryId')}
                      onValueChange={(value) => setValue('categoryId', value)}
                    >
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
                          disabled={(date) => date < new Date()}
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
                  <Label htmlFor="image">Imagem do Projeto</Label>
                  <div className="space-y-4">
                    {(imagePreview || project.image) && (
                      <div className="relative w-full aspect-video rounded-lg overflow-hidden border">
                        <Image
                          src={imagePreview || project.image!}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="cursor-pointer"
                    />
                    
                    <p className="text-sm text-gray-500">
                      Formatos aceitos: JPG, PNG, GIF. Tamanho máximo: 5MB
                    </p>
                  </div>
                </div>

                {/* Configurações Avançadas */}
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <Label className="text-base font-semibold">Configurações Avançadas</Label>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="isActive">Projeto Ativo</Label>
                      <p className="text-sm text-gray-600">
                        Desative para pausar temporariamente as doações
                      </p>
                    </div>
                    <Switch
                      id="isActive"
                      checked={watchedIsActive}
                      onCheckedChange={(checked) => setValue('isActive', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="isFeatured">Projeto em Destaque</Label>
                      <p className="text-sm text-gray-600">
                        Aparecerá na homepage (sujeito à aprovação)
                      </p>
                    </div>
                    <Switch
                      id="isFeatured"
                      checked={watchedIsFeatured}
                      onCheckedChange={(checked) => setValue('isFeatured', checked)}
                    />
                  </div>
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
                    <Save className="h-4 w-4 mr-2" />
                    {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
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

