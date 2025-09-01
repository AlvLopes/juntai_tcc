
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { 
  Search, 
  Heart, 
  Users, 
  Target, 
  CreditCard, 
  Shield, 
  CheckCircle,
  ArrowRight,
  Sparkles,
  Globe,
  TrendingUp
} from 'lucide-react'

const steps = [
  {
    number: 1,
    icon: <Search className="w-8 h-8" />,
    title: 'Descubra Projetos',
    description: 'Explore nossa curadoria de projetos sociais verificados que fazem a diferença real nas comunidades.',
    details: [
      'Navegue por categorias como educação, saúde, meio ambiente',
      'Use filtros para encontrar projetos na sua região',
      'Leia histórias inspiradoras de transformação social'
    ]
  },
  {
    number: 2,
    icon: <Heart className="w-8 h-8" />,
    title: 'Faça sua Doação',
    description: 'Apoie financeiramente os projetos que tocam seu coração de forma segura e transparente.',
    details: [
      'Escolha o valor que cabe no seu orçamento',
      'Deixe uma mensagem de apoio para os criadores',
      'Pagamentos seguros processados pelo PayPal'
    ]
  },
  {
    number: 3,
    icon: <Users className="w-8 h-8" />,
    title: 'Acompanhe o Impacto',
    description: 'Veja como suas contribuições estão transformando vidas e comunidades inteiras.',
    details: [
      'Receba atualizações sobre o progresso dos projetos',
      'Interaja com outros apoiadores nos comentários',
      'Veja o impacto real das suas contribuições'
    ]
  }
]

const features = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Segurança Garantida',
    description: 'Todos os pagamentos são processados pelo PayPal com criptografia de ponta.'
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: 'Projetos Verificados',
    description: 'Nossa equipe analisa cada projeto para garantir transparência e legitimidade.'
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'Impacto Global',
    description: 'Conectamos apoiadores do mundo todo com projetos locais que geram mudança real.'
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Transparência Total',
    description: 'Acompanhe em tempo real como os recursos estão sendo utilizados nos projetos.'
  }
]

const faqs = [
  {
    question: 'Como posso ter certeza de que minha doação chegará ao projeto?',
    answer: 'Todos os projetos passam por um processo de verificação rigoroso. Além disso, os pagamentos são processados pelo PayPal e transferidos diretamente para os criadores dos projetos verificados.'
  },
  {
    question: 'Posso cancelar uma doação depois de feita?',
    answer: 'As doações são processadas imediatamente para apoiar os projetos. Em casos excepcionais, entre em contato conosco através da página de contato.'
  },
  {
    question: 'Como criar um projeto na plataforma?',
    answer: 'Basta fazer seu cadastro, acessar o dashboard e clicar em "Criar Projeto". Preencha todas as informações e aguarde nossa análise para aprovação.'
  },
  {
    question: 'Existe alguma taxa sobre as doações?',
    answer: 'A Juntaí não cobra taxas dos projetos. As únicas taxas aplicadas são as do processador de pagamento (PayPal), que são transparentes e deduzidas automaticamente.'
  }
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <Badge className="text-sm px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20">
            <Sparkles className="w-4 h-4 mr-2" />
            Como Funciona
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
            Transforme Vidas em{' '}
            <span className="text-primary">3 Passos Simples</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nossa plataforma conecta corações generosos com projetos sociais que fazem a diferença. 
            Descubra como você pode ser parte dessa transformação.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={step.number} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {step.number}
                    </div>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      {step.icon}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold text-gray-900">{step.title}</h2>
                    <p className="text-lg text-gray-600">{step.description}</p>
                    
                    <ul className="space-y-2">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <Card className="p-8 bg-white shadow-lg border-0">
                    <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
                      <div className="text-6xl text-primary/40">
                        {step.icon}
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Por que escolher a <span className="text-primary">Juntaí</span>?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Oferecemos uma plataforma confiável, transparente e segura para conectar 
              pessoas que querem ajudar com projetos que precisam de apoio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="space-y-4 p-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-lg text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Perguntas <span className="text-primary">Frequentes</span>
            </h2>
            <p className="text-lg text-gray-600">
              Tire suas dúvidas sobre como a plataforma funciona
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Pronto para fazer a diferença?
          </h2>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Junte-se à nossa comunidade e seja parte da transformação social que o mundo precisa.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/explore">
                <Heart className="w-5 h-5 mr-2" />
                Explorar Projetos
              </Link>
            </Button>
            
            <Button size="lg" variant="outline" asChild className="bg-white text-primary hover:bg-gray-50">
              <Link href="/projects/create">
                <Target className="w-5 h-5 mr-2" />
                Criar Projeto
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

