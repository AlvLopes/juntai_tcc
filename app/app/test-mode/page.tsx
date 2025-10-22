
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy, CheckCircle2, CreditCard, Info, TestTube } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function TestModePage() {
  const [copiedCard, setCopiedCard] = useState<string | null>(null)

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCard(label)
    toast.success(`${label} copiado!`)
    setTimeout(() => setCopiedCard(null), 2000)
  }

  const testCards = [
    {
      type: 'Visa',
      number: '4032034887886760',
      formatted: '4032 0348 8788 6760',
      icon: '💳'
    },
    {
      type: 'Mastercard',
      number: '5425233430109903',
      formatted: '5425 2334 3010 9903',
      icon: '💳'
    },
    {
      type: 'American Express',
      number: '378282246310005',
      formatted: '3782 822463 10005',
      icon: '💳'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-4">
              <TestTube className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              Modo de Teste PayPal
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A plataforma está configurada em <strong>PayPal Sandbox</strong> para testes seguros.
              Use os cartões abaixo para simular doações.
            </p>
          </div>

          {/* Aviso importante */}
          <Card className="border-2 border-amber-300 bg-amber-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-800">
                <Info className="h-5 w-5" />
                ⚠️ Importante: Não Use Cartões Reais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-amber-800">
              <p className="font-medium">
                Este é um ambiente de TESTE. Cartões de crédito reais serão automaticamente rejeitados pelo PayPal Sandbox.
              </p>
              <p className="text-sm">
                Use apenas os cartões de teste fornecidos abaixo para simular transações.
              </p>
            </CardContent>
          </Card>

          {/* Cartões de teste */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Cartões de Teste Disponíveis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {testCards.map((card) => (
                <div 
                  key={card.type}
                  className="p-4 bg-gradient-to-r from-slate-700 to-slate-900 text-white rounded-lg space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{card.icon}</span>
                      <span className="font-semibold text-lg">{card.type}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => copyToClipboard(card.number, card.type)}
                      className="gap-2"
                    >
                      {copiedCard === card.type ? (
                        <>
                          <CheckCircle2 className="h-4 w-4" />
                          Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copiar
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="font-mono text-xl tracking-wider">
                    {card.formatted}
                  </div>
                </div>
              ))}

              <div className="mt-6 p-4 bg-blue-50 rounded-lg space-y-2">
                <h4 className="font-semibold text-blue-900">Dados Adicionais para Teste:</h4>
                <div className="text-sm text-blue-800 space-y-1">
                  <p><strong>CVV:</strong> Qualquer 3 dígitos (ex: 123)</p>
                  <p><strong>Data de Validade:</strong> Qualquer data futura (ex: 12/2025)</p>
                  <p><strong>Nome:</strong> Qualquer nome</p>
                  <p><strong>CEP:</strong> Qualquer CEP válido</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Como testar */}
          <Card>
            <CardHeader>
              <CardTitle>🎯 Como Testar Doações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ol className="space-y-3 list-decimal list-inside text-gray-700">
                <li className="pl-2">
                  <strong>Escolha um projeto</strong> para apoiar na página de exploração
                </li>
                <li className="pl-2">
                  <strong>Clique em "Apoiar Projeto"</strong> e insira o valor da doação
                </li>
                <li className="pl-2">
                  <strong>Na tela de pagamento</strong>, selecione a opção "Cartão de Débito ou Crédito"
                </li>
                <li className="pl-2">
                  <strong>Use um dos cartões de teste</strong> listados acima
                </li>
                <li className="pl-2">
                  <strong>Preencha os dados</strong> com CVV e validade fictícios
                </li>
                <li className="pl-2">
                  <strong>Confirme o pagamento</strong> - a transação será processada instantaneamente
                </li>
              </ol>
            </CardContent>
          </Card>

          {/* Informações técnicas */}
          <Card className="bg-slate-50">
            <CardHeader>
              <CardTitle>🔧 Informações Técnicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-700">
              <div>
                <strong>Ambiente:</strong> PayPal Sandbox (Teste)
              </div>
              <div>
                <strong>URL Base:</strong> <code className="bg-white px-2 py-1 rounded">https://api.sandbox.paypal.com</code>
              </div>
              <div>
                <strong>Moeda:</strong> USD (dólares americanos)
              </div>
              <div className="pt-2 border-t">
                <p className="text-amber-700 font-medium">
                  ⚠️ Para usar em produção, as credenciais devem ser alteradas para as credenciais reais do PayPal.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Link para explorar */}
          <div className="text-center">
            <Button 
              size="lg" 
              onClick={() => window.location.href = '/explore'}
              className="gap-2"
            >
              <TestTube className="h-5 w-5" />
              Começar a Testar Doações
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
