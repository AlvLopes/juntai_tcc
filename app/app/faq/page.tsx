
import { Logo } from '@/components/ui/logo'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { HelpCircle, MessageCircle, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function FAQPage() {
  const faqs = [
    {
      id: "1",
      question: "Como funciona o Juntaí?",
      answer: "O Juntaí é uma plataforma de crowdfunding social onde pessoas podem criar projetos para causas sociais e receber doações de apoiadores. Você pode explorar projetos existentes ou criar o seu próprio projeto para arrecadar fundos para uma causa importante."
    },
    {
      id: "2", 
      question: "É gratuito usar o Juntaí?",
      answer: "Sim, é totalmente gratuito criar uma conta e navegar pelos projetos. Para criadores de projetos, cobramos uma pequena taxa apenas sobre as doações recebidas com sucesso para manter a plataforma funcionando."
    },
    {
      id: "3",
      question: "Como posso fazer uma doação?",
      answer: "Para fazer uma doação, encontre um projeto que deseja apoiar, clique nele e use o botão 'Apoiar este Projeto'. Você pode escolher o valor da doação e será redirecionado para o PayPal para finalizar o pagamento de forma segura."
    },
    {
      id: "4",
      question: "Minha doação é segura?",
      answer: "Sim, todas as transações são processadas através do PayPal, que oferece proteção tanto para doadores quanto para criadores de projetos. Não armazenamos informações de cartão de crédito em nossos servidores."
    },
    {
      id: "5",
      question: "Como criar um projeto?",
      answer: "Primeiro, crie uma conta no Juntaí. Depois, vá para a seção 'Criar Projeto', preencha todas as informações necessárias (título, descrição, meta de arrecadação, imagens), e publique seu projeto. Nossa equipe revisará antes da publicação."
    },
    {
      id: "6",
      question: "Que tipos de projetos posso criar?",
      answer: "Aceitamos projetos com foco em impacto social positivo, como educação, saúde, meio ambiente, assistência social, cultura, tecnologia social, e outras causas que beneficiem a comunidade."
    },
    {
      id: "7",
      question: "Quanto tempo leva para meu projeto ser aprovado?",
      answer: "Normalmente, projetos são revisados e aprovados em até 48 horas úteis. Nossa equipe verifica se o projeto atende aos critérios de impacto social e está em conformidade com nossas diretrizes."
    },
    {
      id: "8",
      question: "Quando recebo o dinheiro arrecadado?",
      answer: "Os fundos são transferidos automaticamente para sua conta PayPal assim que uma doação é confirmada. Não há período de espera - você recebe imediatamente."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-12">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Logo variant="horizontal-2" size="lg" />
          </div>
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-gray-900">
              Dúvidas Frequentes
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Encontre respostas para as perguntas mais comuns sobre como usar o Juntaí
          </p>
        </div>

        {/* FAQ Accordion */}
        <Card className="shadow-lg border-0 mb-8">
          <CardContent className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 text-base leading-relaxed pt-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="shadow-lg border-0">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-3 text-2xl">
              <MessageCircle className="h-6 w-6 text-primary" />
              Não encontrou sua resposta?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              Nossa equipe de suporte está sempre pronta para ajudar você
            </p>
            <Button asChild size="lg">
              <Link href="/contact">
                <Mail className="h-5 w-5 mr-2" />
                Entre em Contato
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
