
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Mail, 
  MessageCircle, 
  Phone, 
  MapPin,
  Send,
  Heart,
  HelpCircle
} from 'lucide-react'
import { toast } from 'sonner'

const contactSchema = z.object({
  name: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  email: z.string()
    .email('Email inválido'),
  subject: z.string()
    .min(1, 'Selecione um assunto'),
  message: z.string()
    .min(10, 'Mensagem deve ter pelo menos 10 caracteres')
    .max(1000, 'Mensagem deve ter no máximo 1000 caracteres')
})

type ContactFormData = z.infer<typeof contactSchema>

const contactSubjects = [
  { value: 'support', label: 'Suporte Técnico' },
  { value: 'project-help', label: 'Ajuda com Projeto' },
  { value: 'partnership', label: 'Parcerias' },
  { value: 'feedback', label: 'Feedback da Plataforma' },
  { value: 'billing', label: 'Questões Financeiras' },
  { value: 'other', label: 'Outros Assuntos' }
]

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit = async (data: ContactFormData) => {
    try {
      setIsSubmitting(true)

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        toast.success('Mensagem enviada com sucesso! Entraremos em contato em breve.')
        reset()
        
        // Abrir Gmail Compose
        const subject = encodeURIComponent(`[Juntaí] ${contactSubjects.find(s => s.value === data.subject)?.label}: ${data.name}`)
        const body = encodeURIComponent(`
Nome: ${data.name}
Email: ${data.email}
Assunto: ${contactSubjects.find(s => s.value === data.subject)?.label}

Mensagem:
${data.message}

---
Enviado através do formulário de contato da plataforma Juntaí
        `)
        
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent('pedrohenrique.alveslp@gmail.com')}&su=${subject}&body=${body}`
        window.open(gmailUrl, '_blank')
        
      } else {
        const error = await response.json()
        toast.error(error.error || 'Erro ao enviar mensagem')
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      toast.error('Erro ao enviar mensagem')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-8">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Entre em <span className="text-primary">Contato</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tem dúvidas, sugestões ou precisa de ajuda? Estamos aqui para te apoiar 
              na sua jornada de transformação social.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulário */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Envie sua Mensagem
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Nome e Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome Completo *</Label>
                        <Input
                          id="name"
                          placeholder="Seu nome completo"
                          {...register('name')}
                        />
                        {errors.name && (
                          <p className="text-sm text-red-600">{errors.name.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="seu@email.com"
                          {...register('email')}
                        />
                        {errors.email && (
                          <p className="text-sm text-red-600">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Assunto */}
                    <div className="space-y-2">
                      <Label>Assunto *</Label>
                      <Select onValueChange={(value) => setValue('subject', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o assunto" />
                        </SelectTrigger>
                        <SelectContent>
                          {contactSubjects.map(subject => (
                            <SelectItem key={subject.value} value={subject.value}>
                              {subject.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.subject && (
                        <p className="text-sm text-red-600">{errors.subject.message}</p>
                      )}
                    </div>

                    {/* Mensagem */}
                    <div className="space-y-2">
                      <Label htmlFor="message">Mensagem *</Label>
                      <Textarea
                        id="message"
                        placeholder="Descreva detalhadamente sua dúvida, sugestão ou solicitação..."
                        rows={6}
                        {...register('message')}
                      />
                      {errors.message && (
                        <p className="text-sm text-red-600">{errors.message.message}</p>
                      )}
                    </div>

                    {/* Botão */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full"
                      size="lg"
                    >
                      <Send className="h-5 w-5 mr-2" />
                      {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Informações de Contato */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Outras Formas de Contato</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-gray-600">pedrohenrique.alveslp@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Tempo de Resposta</p>
                      <p className="text-sm text-gray-600">Até 24 horas úteis</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5" />
                    Central de Ajuda
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-medium text-gray-900">Como criar um projeto?</p>
                      <p className="text-gray-600">
                        Acesse seu dashboard e clique em "Novo Projeto" para começar.
                      </p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-gray-900">Como fazer uma doação?</p>
                      <p className="text-gray-600">
                        Entre na página do projeto e clique em "Apoiar Projeto".
                      </p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-gray-900">Dúvidas sobre pagamentos?</p>
                      <p className="text-gray-600">
                        Todas as transações são processadas pelo PayPal com segurança.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <Heart className="h-12 w-12 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Fazemos Parte da Mudança
                  </h3>
                  <p className="text-sm text-gray-600">
                    Juntos, estamos transformando vidas através de projetos sociais que fazem a diferença.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

