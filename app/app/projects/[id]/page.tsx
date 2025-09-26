
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DonationModal } from '@/components/donation-modal'
import { 
  Heart, 
  MapPin, 
  Calendar, 
  Users, 
  Target,
  Share2,
  MessageCircle,
  Edit,
  Trash2,
  AlertTriangle
} from 'lucide-react'
import { toast } from 'sonner'
import { Project } from '@/lib/types'
import MediaCarousel from '@/components/ui/media-carousel'

interface Comment {
  id: number
  content: string
  createdAt: string
  author: {
    id: number
    firstName: string
    lastName: string
    avatar?: string
  }
}

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { data: session } = useSession() || {}
  const [project, setProject] = useState<Project | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [commentText, setCommentText] = useState('')
  const [submittingComment, setSubmittingComment] = useState(false)
  const [showDonationModal, setShowDonationModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deletePassword, setDeletePassword] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchProjectDetails()
      fetchComments()
    }
  }, [params.id])

  const fetchProjectDetails = async () => {
    try {
      const response = await fetch(`/api/projects/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setProject(data)
      } else if (response.status === 404) {
        router.push('/explore')
        toast.error('Projeto não encontrado')
      }
    } catch (error) {
      console.error('Erro ao buscar projeto:', error)
      toast.error('Erro ao carregar projeto')
    } finally {
      setLoading(false)
    }
  }

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments?projectId=${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setComments(data.comments || [])
      }
    } catch (error) {
      console.error('Erro ao buscar comentários:', error)
    }
  }

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!session) {
      toast.error('Você precisa estar logado para comentar')
      return
    }

    if (!commentText.trim()) {
      toast.error('Digite um comentário')
      return
    }

    try {
      setSubmittingComment(true)
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: commentText,
          projectId: parseInt(params.id as string)
        })
      })

      if (response.ok) {
        setCommentText('')
        fetchComments()
        toast.success('Comentário adicionado!')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Erro ao adicionar comentário')
      }
    } catch (error) {
      console.error('Erro ao enviar comentário:', error)
      toast.error('Erro ao enviar comentário')
    } finally {
      setSubmittingComment(false)
    }
  }

  const handleDeleteProject = async () => {
    if (!deletePassword) {
      toast.error('Digite sua senha para confirmar a exclusão')
      return
    }

    try {
      setIsDeleting(true)
      
      const response = await fetch(`/api/projects/${params.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password: deletePassword
        })
      })

      if (response.ok) {
        toast.success('Projeto excluído com sucesso')
        setShowDeleteModal(false)
        router.push('/dashboard')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Erro ao excluir projeto')
      }
    } catch (error) {
      console.error('Erro ao excluir projeto:', error)
      toast.error('Erro ao excluir projeto')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleDeactivateProject = async () => {
    if (!confirm('Deseja despublicar este projeto? Ele ficará inativo mas não será excluído.')) {
      return
    }

    try {
      const response = await fetch(`/api/projects/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          isActive: false
        })
      })

      if (response.ok) {
        toast.success('Projeto despublicado com sucesso')
        fetchProjectDetails() // Recarregar dados
      } else {
        const error = await response.json()
        toast.error(error.error || 'Erro ao despublicar projeto')
      }
    } catch (error) {
      console.error('Erro ao despublicar projeto:', error)
      toast.error('Erro ao despublicar projeto')
    }
  }

  const shareProject = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project?.title,
          text: project?.shortDescription || project?.description,
          url: window.location.href
        })
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback para copiar URL
      navigator.clipboard.writeText(window.location.href)
      toast.success('Link copiado para a área de transferência!')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-8">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="aspect-video bg-gray-200 rounded-lg"></div>
                <div className="space-y-3">
                  <div className="h-6 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 space-y-4">
                  <div className="h-6 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-8">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center py-16">
            <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-700 mb-2">Projeto não encontrado</h1>
            <p className="text-gray-500 mb-6">O projeto que você está procurando não existe ou foi removido.</p>
            <Button asChild>
              <Link href="/explore">Voltar para Explorar</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const [daysRemaining, setDaysRemaining] = useState(0)
  const [isExpired, setIsExpired] = useState(false)
  const [projectCreatedDate, setProjectCreatedDate] = useState('')
  
  const isOwner = session?.user?.id === project.creator.id.toString()

  useEffect(() => {
    const remaining = Math.max(0, Math.ceil((new Date(project.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))
    setDaysRemaining(remaining)
    setIsExpired(remaining === 0)
    setProjectCreatedDate(new Date(project.createdAt).toLocaleDateString('pt-BR'))
  }, [project.endDate, project.createdAt])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-8">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Carrossel de Mídias */}
            <div className="space-y-4">
              {project.media && project.media.length > 0 ? (
                <MediaCarousel 
                  media={project.media}
                  className="w-full"
                  aspectRatio="video"
                />
              ) : project.image ? (
                <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <Heart className="h-24 w-24 text-primary/40" />
                  </div>
                </div>
              )}
            </div>

            {/* Título e Informações Básicas */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-2">
                  <Badge className="w-fit">{project.category.name}</Badge>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                    {project.title}
                  </h1>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={shareProject}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Compartilhar
                  </Button>
                  
                  {isOwner && (
                    <>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/projects/${project.id}/edit`}>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </Link>
                      </Button>
                      
                      {project.isActive ? (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={handleDeactivateProject}
                        >
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Despublicar
                        </Button>
                      ) : (
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => setShowDeleteModal(true)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Excluir Definitivamente
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                {project.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{project.location}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {isExpired ? 'Campanha encerrada' : `${daysRemaining} dias restantes`}
                  </span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{project.donationCount} apoiadores</span>
                </div>
              </div>
            </div>

            {/* Descrição */}
            <Card>
              <CardHeader>
                <CardTitle>Sobre o Projeto</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray max-w-none">
                  <p className="whitespace-pre-wrap">{project.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Seção de Comentários */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Comentários ({comments.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {session ? (
                  <form onSubmit={handleCommentSubmit} className="space-y-4">
                    <Textarea
                      placeholder="Deixe um comentário de apoio..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      rows={3}
                    />
                    <Button 
                      type="submit" 
                      disabled={submittingComment}
                      className="w-full sm:w-auto"
                    >
                      {submittingComment ? 'Enviando...' : 'Comentar'}
                    </Button>
                  </form>
                ) : (
                  <div className="text-center py-6 border border-dashed rounded-lg">
                    <p className="text-gray-500 mb-4">Faça login para deixar um comentário</p>
                    <Button asChild variant="outline">
                      <Link href="/auth/login">Fazer Login</Link>
                    </Button>
                  </div>
                )}

                <Separator />

                {comments.length > 0 ? (
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="space-y-3">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={comment.author.avatar} />
                            <AvatarFallback>
                              {comment.author.firstName[0]}{comment.author.lastName[0]}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-900">
                                {comment.author.firstName} {comment.author.lastName}
                              </span>
                              <span className="text-sm text-gray-500">
                                {new Date(comment.createdAt).toLocaleDateString('pt-BR', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                            </div>
                            <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Seja o primeiro a comentar!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Card de Doação */}
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-900">
                      R$ {project.currentAmount.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2
                      })}
                    </span>
                    <Badge variant={isExpired ? "secondary" : "default"}>
                      {isExpired ? 'Encerrado' : `${daysRemaining} dias`}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <Progress value={project.progressPercentage || 0} className="h-3" />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{(project.progressPercentage || 0).toFixed(1)}% alcançado</span>
                      <span>Meta: R$ {project.goalAmount.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2
                      })}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{project.donationCount || 0}</div>
                      <div className="text-sm text-gray-600">Apoiadores</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{daysRemaining}</div>
                      <div className="text-sm text-gray-600">Dias restantes</div>
                    </div>
                  </div>
                </div>

                {!isExpired && (
                  <Button 
                    onClick={() => setShowDonationModal(true)}
                    className="w-full"
                    size="lg"
                    disabled={!session}
                  >
                    <Heart className="h-5 w-5 mr-2" />
                    {session ? 'Apoiar Projeto' : 'Faça login para apoiar'}
                  </Button>
                )}

                {!session && (
                  <p className="text-sm text-center text-gray-500">
                    <Link href="/auth/login" className="text-primary hover:underline">
                      Faça login
                    </Link> para apoiar este projeto
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Card do Criador */}
            <Card>
              <CardHeader>
                <CardTitle>Criador do Projeto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={project.creator.avatar} />
                    <AvatarFallback className="text-lg">
                      {project.creator.firstName[0]}{project.creator.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h3 className="font-semibold text-lg">
                      {project.creator.firstName} {project.creator.lastName}
                    </h3>
                    <p className="text-sm text-gray-600">Criador</p>
                  </div>
                </div>

                {project.creator.bio && (
                  <p className="text-sm text-gray-700">{project.creator.bio}</p>
                )}

                <div className="text-sm text-gray-600">
                  <span>Projeto criado em {projectCreatedDate}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Modal de Doação */}
        {showDonationModal && project && (
          <DonationModal
            project={project}
            isOpen={showDonationModal}
            onClose={() => setShowDonationModal(false)}
            onSuccess={() => {
              setShowDonationModal(false)
              fetchProjectDetails() // Atualizar dados do projeto
            }}
          />
        )}

        {/* Modal de Confirmação de Exclusão */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Excluir Projeto</h3>
                  <p className="text-sm text-gray-600">
                    Esta ação não pode ser desfeita
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <p className="text-gray-700">
                  Para confirmar a exclusão permanente do projeto <strong>"{project?.title}"</strong>, 
                  digite sua senha:
                </p>
                
                <div className="space-y-2">
                  <Label htmlFor="deletePassword">Senha da conta</Label>
                  <Input
                    id="deletePassword"
                    type="password"
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                    placeholder="Digite sua senha"
                    className="w-full"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowDeleteModal(false)
                    setDeletePassword('')
                  }}
                  disabled={isDeleting}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDeleteProject}
                  disabled={isDeleting || !deletePassword}
                  className="flex-1"
                >
                  {isDeleting ? 'Excluindo...' : 'Excluir Permanentemente'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

