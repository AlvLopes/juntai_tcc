
import { Logo } from '@/components/ui/logo'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Heart, 
  Users, 
  Target, 
  Globe,
  Award,
  TrendingUp,
  Handshake,
  Star
} from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Impacto Social",
      description: "Acreditamos que pequenas ações podem gerar grandes transformações na sociedade."
    },
    {
      icon: Handshake,
      title: "Transparência",
      description: "Mantemos total clareza sobre como os recursos são utilizados em cada projeto."
    },
    {
      icon: Users,
      title: "Comunidade",
      description: "Construímos uma rede de pessoas comprometidas com causas sociais importantes."
    },
    {
      icon: Award,
      title: "Qualidade",
      description: "Garantimos que todos os projetos passem por criteriosa análise antes da publicação."
    }
  ]

  const stats = [
    { icon: Users, value: "1.2M+", label: "Doadores Ativos" },
    { icon: Target, value: "R$ 50M+", label: "Arrecadados" },
    { icon: Globe, value: "3.5K+", label: "Projetos Financiados" },
    { icon: Star, value: "98%", label: "Projetos Concluídos" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl text-center">
          <div className="flex justify-center mb-8">
            <Logo variant="horizontal-2" size="xl" />
          </div>
          
          <Badge className="text-sm px-4 py-2 mb-6 bg-primary/10 text-primary hover:bg-primary/20">
            <Heart className="w-4 h-4 mr-2" />
            Nossa História
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Conectando pessoas a{' '}
            <span className="text-primary">causas transformadoras</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            O Juntaí nasceu da crença de que todos podem fazer a diferença. 
            Somos uma plataforma brasileira de crowdfunding focada em projetos 
            sociais que transformam vidas e fortalecem comunidades.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/explore">
                <Globe className="w-5 h-5 mr-2" />
                Ver Projetos
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/projects/create">
                <Target className="w-5 h-5 mr-2" />
                Criar Projeto
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="text-sm px-4 py-2 mb-4 bg-green-100 text-green-800">
                <Target className="w-4 h-4 mr-2" />
                Nossa Missão
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Democratizar o acesso ao financiamento de projetos sociais
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Acreditamos que boas ideias não devem ficar apenas no papel por falta de recursos. 
                Nossa missão é conectar pessoas que querem fazer a diferença com projetos 
                que precisam de apoio para se tornarem realidade.
              </p>
              <p className="text-lg text-gray-600">
                Através da tecnologia e de uma comunidade engajada, tornamos possível 
                que qualquer pessoa possa apoiar ou criar projetos que geram impacto 
                social positivo em suas comunidades.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <Card key={index} className="text-center p-6 border-0 shadow-lg">
                    <CardContent className="p-0">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="text-sm px-4 py-2 mb-4 bg-blue-100 text-blue-800">
              <Award className="w-4 h-4 mr-2" />
              Nossos Valores
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              O que nos move todos os dias
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Nossos valores fundamentam cada decisão que tomamos e guiam 
              nossa forma de atuar na sociedade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card key={index} className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Faça parte desta transformação
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Junte-se à nossa comunidade e ajude a criar um mundo melhor, 
            um projeto de cada vez.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/auth/register">
                <Users className="w-5 h-5 mr-2" />
                Criar Conta Gratuita
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary" asChild>
              <Link href="/contact">
                <Heart className="w-5 h-5 mr-2" />
                Entre em Contato
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
