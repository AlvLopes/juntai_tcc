

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Heart, 
  Users, 
  Target, 
  Globe,
  ArrowRight,
  Lightbulb,
  HandHeart,
  TreePine,
  School
} from 'lucide-react'
import Link from 'next/link'

export default function MissionPage() {
  const values = [
    {
      icon: Heart,
      title: "Transformação Social",
      description: "Apoiamos projetos que geram mudanças reais e duradouras nas comunidades, priorizando causas sociais genuínas."
    },
    {
      icon: Users,
      title: "Inclusão e Diversidade",
      description: "Promovemos a participação de todos na construção de um mundo mais justo, independente de classe social ou origem."
    },
    {
      icon: Globe,
      title: "Sustentabilidade",
      description: "Incentivamos projetos que respeitam o meio ambiente e contribuem para um futuro sustentável para todos."
    },
    {
      icon: Lightbulb,
      title: "Inovação Social",
      description: "Valorizamos soluções criativas e inovadoras que abordam problemas sociais de forma eficaz e escalável."
    }
  ]

  const focusAreas = [
    {
      icon: School,
      title: "Educação",
      description: "Projetos que democratizam o acesso à educação de qualidade e promovem o desenvolvimento intelectual."
    },
    {
      icon: HandHeart,
      title: "Saúde e Bem-estar",
      description: "Iniciativas que melhoram a saúde pública e o bem-estar das comunidades mais vulneráveis."
    },
    {
      icon: TreePine,
      title: "Meio Ambiente",
      description: "Ações que protegem nosso planeta e promovem práticas sustentáveis para as futuras gerações."
    },
    {
      icon: Users,
      title: "Direitos Humanos",
      description: "Projetos que defendem a dignidade humana e promovem a justiça social para todos."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="text-sm px-4 py-2 mb-6 bg-primary/10 text-primary hover:bg-primary/20">
              <Target className="w-4 h-4 mr-2" />
              Nossa Missão
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Conectar pessoas com uma{' '}
              <span className="text-primary">visão progressista</span>
              {' '}de desenvolvimento social
            </h1>

            <p className="text-xl text-gray-600 mb-8">
              Acreditamos que cada pessoa tem o poder de transformar o mundo. Nossa missão 
              é criar pontes entre corações generosos e causas que realmente fazem a diferença, 
              construindo juntos uma sociedade mais justa, inclusiva e sustentável.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/explore">
                  <Globe className="w-5 h-5 mr-2" />
                  Explore Projetos
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/projects/create">
                  <Target className="w-5 h-5 mr-2" />
                  Crie seu Projeto
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Democratizando o impacto social através da tecnologia
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Vivemos em um mundo onde as desigualdades persistem e os desafios sociais 
                parecem cada vez maiores. Mas também sabemos que existe uma força 
                transformadora na união de pessoas que compartilham valores progressistas 
                e querem ser parte da solução.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                O Juntaí nasceu para ser essa ponte. Conectamos indivíduos e organizações 
                que acreditam na possibilidade de um desenvolvimento social inclusivo, 
                sustentável e que respeita a diversidade humana em todas as suas formas.
              </p>
              <p className="text-lg text-gray-600">
                Através do financiamento coletivo, transformamos recursos individuais em 
                força coletiva, permitindo que pequenas contribuições se tornem grandes 
                realizações que beneficiam comunidades inteiras.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <Card key={index} className="border-l-4 border-l-primary">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {value.title}
                          </h3>
                          <p className="text-gray-600">
                            {value.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="text-sm px-4 py-2 mb-4 bg-green-100 text-green-800">
              <Heart className="w-4 h-4 mr-2" />
              Áreas de Foco
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Onde concentramos nossos esforços
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Priorizamos projetos que abordam questões fundamentais para o 
              desenvolvimento humano e social, sempre com uma perspectiva progressista 
              e inclusiva.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {focusAreas.map((area, index) => {
              const Icon = area.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {area.title}
                    </h3>
                    <p className="text-gray-600">
                      {area.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Vision for the Future */}
      <section className="py-16 px-4 bg-primary text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Nossa visão para o futuro
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-4xl mx-auto">
            Imaginamos um Brasil onde a solidariedade não conhece fronteiras, onde 
            cada comunidade tem acesso às oportunidades que merece, e onde o 
            desenvolvimento social acontece de forma sustentável e inclusiva. 
            Juntos, estamos construindo esse futuro, um projeto de cada vez.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/impact">
                <ArrowRight className="w-5 h-5 mr-2" />
                Veja Nosso Impacto
              </Link>
            </Button>
            <Button size="lg" className="bg-white text-primary border-white hover:bg-gray-100 hover:text-primary" asChild>
              <Link href="/about">
                <Users className="w-5 h-5 mr-2" />
                Conheça Nossa História
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

