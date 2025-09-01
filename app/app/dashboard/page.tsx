
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProjectCard } from '@/components/project-card'
import { 
  Plus, 
  Target, 
  Heart, 
  DollarSign, 
  Users,
  Calendar,
  TrendingUp,
  Edit,
  Eye
} from 'lucide-react'
import { toast } from 'sonner'
import { Project, DashboardStats } from '@/lib/types'

interface Donation {
  id: number
  amount: number
  message?: string
  createdAt: string
  project: {
    id: number
    title: string
  }
}

export default function DashboardPage() {
  const { data: session, status } = useSession() || {}
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [donations, setDonations] = useState<Donation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login')
      return
    }
    
    if (status === 'authenticated') {
      fetchDashboardData()
    }
  }, [status, router])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      const [statsRes, projectsRes, donationsRes] = await Promise.all([
        fetch('/api/users/stats'),
        fetch('/api/users/projects'),
        fetch('/api/users/donations')
      ])

      if (statsRes.ok) {
        const statsData = await statsRes.json()
        setStats(statsData)
      }

      if (projectsRes.ok) {
        const projectsData = await projectsRes.json()
        setProjects(projectsData.projects || [])
      }

      if (donationsRes.ok) {
        const donationsData = await donationsRes.json()
        setDonations(donationsData.donations || [])
      }

    } catch (error) {
      console.error('Erro ao buscar dados do dashboard:', error)
      toast.error('Erro ao carregar dados do dashboard')
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-8">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
            <div className="h-96 bg-gray-200 rounded-lg"></div>
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
      <div className="container mx-auto max-w-7xl px-4">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Dashboard
              </h1>
              <p className="text-lg text-gray-600">
                Olá, {session.user?.firstName}! Gerencie seus projetos e acompanhe seu impacto.
              </p>
            </div>
            
            <Button asChild size="lg">
              <Link href="/projects/create">
                <Plus className="h-5 w-5 mr-2" />
                Novo Projeto
              </Link>
            </Button>
          </div>

          {/* Estatísticas */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total de Projetos</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalProjects}</p>
                    </div>
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Projetos Ativos</p>
                      <p className="text-2xl font-bold text-green-600">{stats.activeProjects}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Arrecadado</p>
                      <p className="text-2xl font-bold text-blue-600">
                        R$ {stats.totalRaised.toLocaleString('pt-BR', {
                          minimumFractionDigits: 2
                        })}
                      </p>
                    </div>
                    <DollarSign className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Apoiadores</p>
                      <p className="text-2xl font-bold text-purple-600">{stats.totalDonors}</p>
                    </div>
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Tabs */}
          <Tabs defaultValue="projects" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
              <TabsTrigger value="projects">Meus Projetos</TabsTrigger>
              <TabsTrigger value="donations">Minhas Doações</TabsTrigger>
            </TabsList>

            <TabsContent value="projects" className="space-y-6">
              {projects.length > 0 ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Meus Projetos ({projects.length})
                    </h2>
                    <Button asChild variant="outline">
                      <Link href="/projects/create">
                        <Plus className="h-4 w-4 mr-2" />
                        Criar Projeto
                      </Link>
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                      <div key={project.id} className="relative group">
                        <ProjectCard project={project} />
                        
                        {/* Overlay de ações */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                          <Button size="sm" asChild variant="secondary">
                            <Link href={`/projects/${project.id}`}>
                              <Eye className="h-4 w-4 mr-1" />
                              Ver
                            </Link>
                          </Button>
                          <Button size="sm" asChild variant="secondary">
                            <Link href={`/projects/${project.id}/edit`}>
                              <Edit className="h-4 w-4 mr-1" />
                              Editar
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 space-y-4">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                    <Target className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700">
                    Você ainda não criou nenhum projeto
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Comece criando seu primeiro projeto social e faça a diferença na vida das pessoas.
                  </p>
                  <Button asChild>
                    <Link href="/projects/create">
                      <Plus className="h-5 w-5 mr-2" />
                      Criar Primeiro Projeto
                    </Link>
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="donations" className="space-y-6">
              {donations.length > 0 ? (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Minhas Doações ({donations.length})
                  </h2>

                  <div className="grid gap-4">
                    {donations.map((donation) => (
                      <Card key={donation.id}>
                        <CardContent className="p-6">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="space-y-2">
                              <Link 
                                href={`/projects/${donation.project.id}`}
                                className="font-semibold text-lg hover:text-primary transition-colors"
                              >
                                {donation.project.title}
                              </Link>
                              {donation.message && (
                                <p className="text-sm text-gray-600 italic">
                                  "{donation.message}"
                                </p>
                              )}
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {new Date(donation.createdAt).toLocaleDateString('pt-BR')}
                                </span>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <Badge className="text-lg px-3 py-1">
                                R$ {donation.amount.toLocaleString('pt-BR', {
                                  minimumFractionDigits: 2
                                })}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 space-y-4">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                    <Heart className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700">
                    Você ainda não fez nenhuma doação
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Explore projetos sociais incríveis e apoie causas que fazem a diferença.
                  </p>
                  <Button asChild>
                    <Link href="/explore">
                      <Heart className="h-5 w-5 mr-2" />
                      Explorar Projetos
                    </Link>
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

