
import { Logo } from '@/components/ui/logo'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  HelpCircle, 
  BookOpen, 
  MessageCircle, 
  Video,
  FileText,
  Users,
  ArrowRight,
  Mail,
  Phone,
  Clock
} from 'lucide-react'
import Link from 'next/link'

export default function HelpPage() {
  const helpCategories = [
    {
      icon: Users,
      title: "Primeiros Passos",
      description: "Aprenda como criar sua conta e navegar pela plataforma",
      links: [
        { title: "Como criar uma conta", href: "#" },
        { title: "Configurar seu perfil", href: "#" },
        { title: "Navegando pela plataforma", href: "#" }
      ]
    },
    {
      icon: BookOpen,
      title: "Para Doadores",
      description: "Tudo sobre como apoiar projetos e fazer doações seguras",
      links: [
        { title: "Como fazer uma doação", href: "#" },
        { title: "Métodos de pagamento", href: "#" },
        { title: "Acompanhar projetos apoiados", href: "#" }
      ]
    },
    {
      icon: FileText,
      title: "Para Criadores",
      description: "Guias completos sobre como criar e gerenciar projetos",
      links: [
        { title: "Criando seu primeiro projeto", href: "#" },
        { title: "Dicas para uma campanha de sucesso", href: "#" },
        { title: "Gerenciando doações recebidas", href: "#" }
      ]
    },
    {
      icon: MessageCircle,
      title: "Suporte Técnico",
      description: "Solução para problemas técnicos e dúvidas sobre a plataforma",
      links: [
        { title: "Problemas de login", href: "#" },
        { title: "Problemas com pagamentos", href: "#" },
        { title: "Reportar um bug", href: "#" }
      ]
    }
  ]

  const contactMethods = [
    {
      icon: Mail,
      title: "E-mail",
      description: "pedrohenrique.alveslp@gmail.com",
      detail: "Resposta em até 24 horas"
    },
    {
      icon: Phone,
      title: "Telefone",
      description: "+55 (11) 99999-9999",
      detail: "Seg à Sex, 9h às 18h"
    },
    {
      icon: MessageCircle,
      title: "Chat Online",
      description: "Suporte em tempo real",
      detail: "Disponível durante horário comercial"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-12">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Logo variant="horizontal-2" size="lg" />
          </div>
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-gray-900">
              Central de Ajuda
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Encontre respostas, guias e suporte para usar o Juntaí da melhor forma
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <BookOpen className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <CardTitle>Dúvidas Frequentes</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">
                Respostas rápidas para as perguntas mais comuns
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/faq">
                  Ver FAQ
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <Video className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <CardTitle>Tutoriais em Vídeo</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">
                Aprenda visualmente com nossos tutoriais
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link href="#">
                  Assistir Vídeos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <MessageCircle className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <CardTitle>Fale Conosco</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">
                Entre em contato direto com nossa equipe
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/contact">
                  Contato
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Help Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Categorias de Ajuda
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {helpCategories.map((category, index) => {
              const Icon = category.icon
              return (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle>{category.title}</CardTitle>
                    </div>
                    <p className="text-gray-600">{category.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.links.map((link, linkIndex) => (
                        <Link
                          key={linkIndex}
                          href={link.href}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                        >
                          <span className="text-gray-700 group-hover:text-primary">
                            {link.title}
                          </span>
                          <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-primary" />
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Contact Methods */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center justify-center gap-3">
              <MessageCircle className="h-6 w-6 text-primary" />
              Precisa de Mais Ajuda?
            </CardTitle>
            <p className="text-gray-600">
              Nossa equipe está sempre pronta para ajudar você
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactMethods.map((method, index) => {
                const Icon = method.icon
                return (
                  <div key={index} className="text-center p-6 rounded-lg bg-gray-50">
                    <Icon className="h-8 w-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {method.title}
                    </h3>
                    <p className="text-gray-700 font-medium mb-1">
                      {method.description}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
                      <Clock className="h-3 w-3" />
                      {method.detail}
                    </p>
                  </div>
                )
              })}
            </div>
            <div className="text-center mt-8">
              <Button asChild size="lg">
                <Link href="/contact">
                  <Mail className="h-5 w-5 mr-2" />
                  Entre em Contato Agora
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
