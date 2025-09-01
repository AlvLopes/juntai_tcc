
import { Suspense } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ProjectCard } from '@/components/project-card'
import { Badge } from '@/components/ui/badge'
import { 
  Heart, 
  Users, 
  Target, 
  Globe,
  ArrowRight,
  Star,
  TrendingUp
} from 'lucide-react'
import { motion } from 'framer-motion'

async function getFeaturedProjects() {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/projects?featured=true&limit=6`, {
      next: { revalidate: 300 } // Cache por 5 minutos
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch featured projects')
    }
    
    const data = await response.json()
    return data.projects || []
  } catch (error) {
    console.error('Error fetching featured projects:', error)
    return []
  }
}

function HeroSection() {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICA8L2RlZnM+CiAgPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEiIGZpbGw9IiNmMWY1ZjkiIG9wYWNpdHk9IjAuNSIvPgogIDwvZz4KICA8L3N2Zz4=')] opacity-30" />
      
      <div className="container mx-auto max-w-7xl relative">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <Badge className="text-sm px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20">
              <Star className="w-4 h-4 mr-2" />
              Plataforma de Crowdfunding Social
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Faça a diferença,{' '}
              <span className="text-primary relative">
                apoie causas
                <div className="absolute -bottom-2 left-0 right-0 h-3 bg-primary/20 -skew-x-12" />
              </span>
              <br />
              que transformam o mundo
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto">
              Conectamos pessoas que querem fazer a diferença com projetos sociais 
              que precisam de apoio financeiro para se tornarem realidade.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" asChild className="text-lg px-8 py-6 h-auto">
              <Link href="/explore">
                <Heart className="w-5 h-5 mr-2" />
                Explorar Projetos
              </Link>
            </Button>
            
            <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 h-auto">
              <Link href="/projects/create">
                <Target className="w-5 h-5 mr-2" />
                Criar Projeto
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 max-w-4xl mx-auto">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">1000+</h3>
              <p className="text-gray-600">Pessoas conectadas</p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">R$ 250k</h3>
              <p className="text-gray-600">Arrecadados</p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">50+</h3>
              <p className="text-gray-600">Projetos apoiados</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturedProjectsSection({ projects }: { projects: any[] }) {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-12">
          <Badge className="text-sm px-4 py-2 bg-amber-100 text-amber-800 hover:bg-amber-200">
            <TrendingUp className="w-4 h-4 mr-2" />
            Em Destaque
          </Badge>
          
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            Projetos que estão{' '}
            <span className="text-primary">transformando</span> vidas
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Descubra projetos sociais incríveis que estão fazendo a diferença 
            na vida das pessoas e das comunidades ao redor do mundo.
          </p>
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                className={`animate-fade-in-up delay-${index * 100}`}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 space-y-4">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700">
              Novos projetos chegando em breve!
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Estamos trabalhando para trazer os melhores projetos sociais para você apoiar.
            </p>
          </div>
        )}

        <div className="text-center mt-12">
          <Button size="lg" asChild variant="outline">
            <Link href="/explore">
              Ver Todos os Projetos
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

function HowItWorksSection() {
  const steps = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Descubra Projetos',
      description: 'Explore projetos sociais que fazem a diferença em diversas causas.'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Faça sua Doação',
      description: 'Apoie financeiramente os projetos que mais te tocam o coração.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Acompanhe o Impacto',
      description: 'Veja como suas contribuições estão transformando vidas reais.'
    }
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            Como <span className="text-primary">funciona</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conectar pessoas que querem ajudar com projetos que precisam de apoio 
            nunca foi tão simples e transparente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects()

  return (
    <div className="min-h-screen">
      <HeroSection />
      
      <Suspense fallback={
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
                <div className="h-12 bg-gray-200 rounded w-96 mx-auto"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 rounded-lg h-64"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      }>
        <FeaturedProjectsSection projects={featuredProjects} />
      </Suspense>
      
      <HowItWorksSection />
    </div>
  )
}
