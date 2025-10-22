'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Heart, CreditCard, Shield, AlertCircle } from 'lucide-react'
import { Project } from '@/lib/types'
import { toast } from 'sonner'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'

interface DonationModalProps {
  project: Project
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export function DonationModal({ project, isOpen, onClose, onSuccess }: DonationModalProps) {
  const { data: session } = useSession() || {}
  const router = useRouter()
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPayPal, setShowPayPal] = useState(false)
  const [paypalOrderId, setPaypalOrderId] = useState<string | null>(null)

  const handleDonationSubmit = async () => {
    if (!session?.user) {
      toast.error('Faça login para fazer uma doação')
      router.push('/auth/login')
      return
    }

    const donationAmount = parseFloat(amount)
    if (!donationAmount || donationAmount <= 0) {
      toast.error('Digite um valor válido para a doação')
      return
    }

    if (donationAmount < 1) {
      toast.error('O valor mínimo de doação é R$ 1,00')
      return
    }

    setShowPayPal(true)
  }

  const createPayPalOrder = async () => {
    try {
      const brlAmount = parseFloat(amount)
      
      console.log('🔄 Criando ordem PayPal:', {
        brlAmount,
        projectId: project.id
      })
      
      const response = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId: project.id,
          amount: brlAmount,
          message: message.trim() || undefined
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        console.error('❌ Erro na resposta da API:', data)
        throw new Error(data.error || 'Erro ao criar ordem de pagamento')
      }

      console.log('✅ Ordem PayPal criada:', data.orderId)
      return data.orderId
    } catch (error: any) {
      console.error('❌ Erro ao criar ordem PayPal:', error)
      toast.error(error.message || 'Erro ao criar ordem de pagamento')
      throw error
    }
  }

  const handlePayPalApprove = async (data: any) => {
    try {
      setLoading(true)
      
      console.log('🔄 Capturando pagamento PayPal:', {
        orderId: data.orderID,
        projectId: project.id,
        amount: amount
      })
      
      const response = await fetch('/api/paypal/capture-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: data.orderID,
          projectId: project.id,
          amount: amount,
          message: message.trim() || undefined,
          isAnonymous
        }),
      })

      console.log('📊 Resposta do servidor:', {
        status: response.status,
        statusText: response.statusText,
        contentType: response.headers.get('content-type'),
        ok: response.ok
      })

      // Capturar o texto da resposta primeiro para debug
      const responseText = await response.text()
      console.log('📄 Resposta bruta (primeiros 500 chars):', responseText.substring(0, 500))

      let result: any
      try {
        result = JSON.parse(responseText)
        console.log('✅ Resposta JSON parseada:', result)
      } catch (parseError) {
        console.error('❌ Erro ao parsear JSON:', parseError)
        console.error('📄 Resposta não-JSON completa:', responseText)
        throw new Error(`Erro do servidor (${response.status} ${response.statusText}): A resposta não é JSON válida. Resposta: ${responseText.substring(0, 200)}`)
      }

      if (response.ok) {
        console.log('✅ Pagamento capturado com sucesso:', result)
        toast.success('Doação realizada com sucesso! Obrigado pelo seu apoio! 💚')
        onSuccess?.()
        onClose()
      } else {
        console.error('❌ Erro ao capturar pagamento:', result)
        console.error('📋 Erro completo do PayPal:', result.fullError)
        console.error('📝 Detalhes do erro:', result.details)
        throw new Error(result.error || 'Erro na confirmação do pagamento')
      }
    } catch (error: any) {
      console.error('❌ Erro ao capturar pagamento:', error)
      toast.error(error.message || 'Erro na confirmação do pagamento')
    } finally {
      setLoading(false)
    }
  }

  const handlePayPalError = (err: any) => {
    console.error('PayPal error:', err)
    
    let errorMessage = 'Erro no pagamento PayPal'
    
    // Mensagens de erro mais específicas
    if (err?.message?.includes('card')) {
      errorMessage = '❌ Cartão rejeitado!\n\n🧪 Use os cartões de TESTE do PayPal:\n\nVisa: 4032 0348 8788 6760\nMastercard: 5425 2334 3010 9903\n\n⚠️ Cartões reais não funcionam no modo teste!'
    } else if (err?.message?.includes('insufficient')) {
      errorMessage = 'Saldo insuficiente no cartão de teste'
    } else if (err?.message?.includes('declined')) {
      errorMessage = '❌ Pagamento recusado!\n\n💡 Dica: Use um dos cartões de TESTE fornecidos acima.'
    }
    
    toast.error(errorMessage, { duration: 8000 })
    setShowPayPal(false)
  }

  const handlePayPalCancel = () => {
    toast.info('Pagamento cancelado')
    setShowPayPal(false)
  }

  if (!session?.user) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              Login Necessário
            </DialogTitle>
            <DialogDescription>
              Você precisa estar logado para fazer uma doação.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex gap-2">
            <Button 
              onClick={() => router.push('/auth/login')} 
              className="flex-1"
            >
              Fazer Login
            </Button>
            <Button 
              variant="outline" 
              onClick={() => router.push('/auth/register')} 
              className="flex-1"
            >
              Criar Conta
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Apoiar Projeto
          </DialogTitle>
          <DialogDescription>
            Faça uma doação para apoiar <strong>{project.title}</strong>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {!showPayPal ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="amount">Valor da Doação (R$)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Ex: 10.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                  step="0.01"
                  className="text-lg"
                />
                
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {[10, 25, 50, 100].map((value) => (
                    <Button
                      key={value}
                      variant="outline"
                      size="sm"
                      onClick={() => setAmount(value.toString())}
                      className="text-xs"
                    >
                      R$ {value}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mensagem (opcional)</Label>
                <Textarea
                  id="message"
                  placeholder="Deixe uma mensagem de apoio..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={500}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  {message.length}/500 caracteres
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="anonymous"
                  checked={isAnonymous}
                  onCheckedChange={(checked) => setIsAnonymous(checked === true)}
                />
                <Label htmlFor="anonymous" className="text-sm">
                  Fazer doação anonimamente
                </Label>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Shield className="h-4 w-4 text-green-500" />
                  Pagamento Seguro
                </div>
                <p className="text-xs text-muted-foreground">
                  Seu pagamento será processado de forma segura através do PayPal.
                  Nenhuma informação de cartão é armazenada em nossos servidores.
                </p>
              </div>

              {/* Aviso de modo teste */}
              <div className="bg-blue-50 border-2 border-blue-200 p-4 rounded-lg space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-blue-800">
                  🧪 MODO DE TESTE ATIVO
                </div>
                <p className="text-xs text-blue-700">
                  Este é um ambiente de testes. Use os cartões de teste do PayPal:
                </p>
                <div className="text-xs text-blue-700 space-y-1 bg-white p-2 rounded">
                  <p><strong>Visa:</strong> 4032 0348 8788 6760</p>
                  <p><strong>Mastercard:</strong> 5425 2334 3010 9903</p>
                  <p><strong>CVV:</strong> Qualquer 3 dígitos</p>
                  <p><strong>Validade:</strong> Qualquer data futura</p>
                </div>
                <p className="text-xs text-blue-600 font-medium">
                  ⚠️ Não use cartões reais! Eles serão rejeitados.
                </p>
              </div>

              <Button
                onClick={handleDonationSubmit}
                disabled={loading || !amount || parseFloat(amount) < 1}
                className="w-full"
                size="lg"
              >
                {loading ? 'Processando...' : (
                  <>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Continuar para Pagamento
                  </>
                )}
              </Button>
            </>
          ) : (
            <div className="space-y-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="font-medium text-green-800">
                  Valor da doação: R$ {parseFloat(amount).toFixed(2)}
                </p>
                <p className="text-sm text-green-600">
                  Complete o pagamento usando PayPal abaixo:
                </p>
              </div>

              {/* Aviso de modo teste na tela de pagamento */}
              <div className="bg-blue-50 border-2 border-blue-300 p-3 rounded-lg">
                <p className="text-xs font-bold text-blue-800 mb-2">🧪 MODO TESTE - Use cartões de teste:</p>
                <div className="text-xs text-blue-700 space-y-1 bg-white p-2 rounded">
                  <p><strong>Visa:</strong> 4032 0348 8788 6760</p>
                  <p><strong>Mastercard:</strong> 5425 2334 3010 9903</p>
                  <p><strong>CVV:</strong> Qualquer 3 dígitos | <strong>Validade:</strong> Data futura</p>
                </div>
              </div>

              <PayPalScriptProvider
                options={{
                  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
                  currency: 'BRL'
                }}
              >
                <PayPalButtons
                  createOrder={createPayPalOrder}
                  onApprove={handlePayPalApprove}
                  onError={handlePayPalError}
                  onCancel={handlePayPalCancel}
                  disabled={loading}
                  style={{
                    layout: 'vertical',
                    color: 'blue',
                    shape: 'rect',
                    label: 'pay'
                  }}
                />
              </PayPalScriptProvider>

              <Button
                variant="outline"
                onClick={() => setShowPayPal(false)}
                className="w-full"
              >
                Voltar
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
