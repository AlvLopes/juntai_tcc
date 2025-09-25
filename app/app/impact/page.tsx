

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Globe,
  BookOpen,
  Heart,
  Leaf,
  Building,
  ArrowRight,
  CheckCircle,
  Target,
  BarChart3
} from 'lucide-react'
import Link from 'next/link'

export default function ImpactPage() {
  const impactStats = [
    {
      icon: Users,
      value: "2.3M+",
      label: "Pessoas Impactadas",
      description: "Vidas transformadas através dos projetos financiados"
    },
    {
      icon: DollarSign,
      value: "R$ 87M+",
      label: "Recursos Mobilizados",
      description: "Investimento social direto em comunidades"
    },
    {
      icon: Target,
      value: "4.2K+",
      label: "Projetos Realizados",
      description: "Iniciativas sociais bem-sucedidas"
    },
    {
      icon: Globe,
      value: "1.8K+",
      label: "Comunidades Atendidas",
      description: "Territórios beneficiados em todo o Brasil"
    }
  ]

  const crowdfundingBenefits = [
    {
      icon: Users,
      title: "Democratização do Acesso",
      description: "O crowdfunding remove barreiras financeiras tradicionais, permitindo que projetos inovadores e necessários recebam apoio direto da comunidade, independentemente de aprovação bancária ou investimento institucional."
    },
    {
      icon: Heart,
      title: "Engajamento Comunitário",
      description: "Cria vínculos emocionais entre doadores e projetos, gerando uma rede de apoiadores engajados que se tornam embaixadores da causa, multiplicando o impacto além do financiamento inicial."
    },
    {
      icon: TrendingUp,
      title: "Escalabilidade Social",
      description: "Pequenas contribuições de muitas pessoas se transformam em grandes realizações. Um projeto pode começar local e, através do crowdfunding, ganhar escala nacional ou até internacional."
    },
    {
      icon: CheckCircle,
      title: "Transparência e Prestação de Contas",
      description: "A natureza pública do crowdfunding exige transparência total sobre o uso dos recursos, criando um ambiente de confiança e responsabilidade que beneficia toda a sociedade."
    }
  ]

  const socialAreas = [
    {
      icon: BookOpen,
      title: "Educação",
      impact: "847 projetos educacionais",
      description: "Escolas construídas, bibliotecas equipadas, bolsas de estudo oferecidas e programas de alfabetização implementados em comunidades carentes."
    },
    {
      icon: Heart,
      title: "Saúde",
      impact: "623 iniciativas de saúde",
      description: "Postos de saúde equipados, campanhas de prevenção, tratamentos custeados e programas de saúde mental em periferias e zonas rurais."
    },
    {
      icon: Leaf,
      title: "Meio Ambiente",
      impact: "451 projetos ambientais",
      description: "Áreas reflorestadas, sistemas de reciclagem implantados, educação ambiental e projetos de energia renovável em comunidades sustentáveis."
    },
    {
      icon: Building,
      title: "Habitação",
      impact: "389 soluções habitacionais",
      description: "Casas construídas, reformas realizadas, infraestrutura básica implementada e programas de habitação social para famílias vulneráveis."
    }
  ]

  const transformationStories = [
    {
      title: "Multiplicador de Oportunidades",
      description: "Cada R$ 1,00 investido através da plataforma gera em média R$ 4,50 em benefícios econômicos diretos para as comunidades, criando um ciclo virtuoso de desenvolvimento."
    },
    {
      title: "Empoderamento Local",
      description: "73% dos projetos financiados são liderados por pessoas das próprias comunidades beneficiadas, garantindo que as soluções sejam culturalmente apropriadas e sustentáveis."
    },
    {
      title: "Rede de Solidariedade",
      description: "Nossa plataforma conectou mais de 890 mil pessoas em uma rede ativa de solidariedade, onde doadores se tornam voluntários e embaixadores de causas sociais."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="text-sm px-4 py-2 mb-6 bg-green-100 text-green-800">
              <BarChart3 className="w-4 h-4 mr-2" />
              Impacto Social
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              O poder transformador do{' '}
              <span className="text-primary">financiamento coletivo</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8">
              Descubra como o crowdfunding revoluciona o investimento social, democratiza 
              o acesso a recursos e cria impacto real nas comunidades brasileiras. 
              Cada contribuição é uma semente de transformação social.
            </p>

            <Button size="lg" asChild>
              <Link href="/explore">
                <Target className="w-5 h-5 mr-2" />
                Apoie um Projeto Agora
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Nosso impacto em números
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Resultados concretos de uma comunidade unida por causas sociais transformadoras
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-lg font-semibold text-gray-700 mb-2">
                      {stat.label}
                    </div>
                    <p className="text-sm text-gray-600">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Crowdfunding Benefits */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <Badge className="text-sm px-4 py-2 mb-4 bg-blue-100 text-blue-800">
              <TrendingUp className="w-4 h-4 mr-2" />
              Como o Crowdfunding Transforma
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              O impacto do financiamento coletivo na sociedade
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              O crowdfunding vai muito além do simples financiamento. É uma ferramenta 
              poderosa de transformação social que democratiza oportunidades, fortalece 
              comunidades e cria redes de solidariedade duradouras.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {crowdfundingBenefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          {benefit.title}
                        </h3>
                        <p className="text-gray-600">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Social Areas Impact */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Impacto por área social
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Como nossos projetos estão transformando diferentes setores da sociedade brasileira
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {socialAreas.map((area, index) => {
              const Icon = area.icon
              return (
                <Card key={index} className="p-6 border-l-4 border-l-primary hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {area.title}
                        </h3>
                        <div className="text-primary font-semibold mb-2">
                          {area.impact}
                        </div>
                        <p className="text-gray-600">
                          {area.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Transformation Stories */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="text-sm px-4 py-2 mb-4 bg-orange-100 text-orange-800">
              <Heart className="w-4 h-4 mr-2" />
              Histórias de Transformação
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              O efeito multiplicador da solidariedade
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {transformationStories.map((story, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {story.title}
                  </h3>
                  <p className="text-gray-600">
                    {story.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-primary text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Seja parte desta transformação
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Cada apoio, por menor que seja, tem o poder de gerar impacto real. 
            Junte-se a milhares de pessoas que acreditam no poder da solidariedade coletiva.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/explore">
                <Heart className="w-5 h-5 mr-2" />
                Apoiar Projetos
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary" asChild>
              <Link href="/projects/create">
                <ArrowRight className="w-5 h-5 mr-2" />
                Criar Projeto
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

