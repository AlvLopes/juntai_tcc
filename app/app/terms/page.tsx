
import { Logo } from '@/components/ui/logo'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollText, Shield, AlertTriangle } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-12">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Logo variant="horizontal-2" size="lg" />
          </div>
          <div className="flex items-center justify-center gap-3 mb-4">
            <ScrollText className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-gray-900">
              Termos de Uso
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Última atualização: 24 de setembro de 2025
          </p>
        </div>

        {/* Terms Content */}
        <div className="space-y-8">
          {/* Introduction */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-green-500" />
                1. Introdução
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                Bem-vindo ao Juntaí! Estes Termos de Uso regulam o uso de nossa plataforma 
                de crowdfunding social. Ao acessar e usar nosso site, você concorda em cumprir 
                estes termos. Se você não concordar com alguma parte destes termos, não deve 
                usar nossa plataforma.
              </p>
              <p>
                O Juntaí é uma plataforma brasileira que conecta pessoas a projetos sociais, 
                permitindo financiamento coletivo para causas que geram impacto positivo na sociedade.
              </p>
            </CardContent>
          </Card>

          {/* Platform Use */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>2. Uso da Plataforma</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4>2.1 Elegibilidade</h4>
              <p>
                Para usar o Juntaí, você deve ter pelo menos 18 anos de idade e capacidade 
                legal para firmar contratos. Ao se registrar, você declara que todas as 
                informações fornecidas são verdadeiras e precisas.
              </p>
              
              <h4>2.2 Conta de Usuário</h4>
              <p>
                Você é responsável por manter a confidencialidade de sua conta e senha, 
                e por todas as atividades que ocorram sob sua conta. Você deve notificar 
                imediatamente sobre qualquer uso não autorizado.
              </p>

              <h4>2.3 Conduta Apropriada</h4>
              <ul>
                <li>Use a plataforma apenas para fins legais e apropriados</li>
                <li>Não publique conteúdo ofensivo, discriminatório ou ilegal</li>
                <li>Respeite os direitos de propriedade intelectual de terceiros</li>
                <li>Não tente comprometer a segurança da plataforma</li>
              </ul>
            </CardContent>
          </Card>

          {/* Projects */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>3. Projetos e Campanhas</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4>3.1 Criação de Projetos</h4>
              <p>
                Os criadores de projetos devem fornecer informações precisas e completas 
                sobre seus projetos. Todos os projetos passam por análise antes da publicação 
                para garantir conformidade com nossas diretrizes.
              </p>

              <h4>3.2 Aprovação de Projetos</h4>
              <p>
                Reservamos o direito de aprovar ou rejeitar projetos com base em nossos 
                critérios de impacto social, viabilidade e conformidade com a legislação vigente.
              </p>

              <h4>3.3 Responsabilidade dos Criadores</h4>
              <ul>
                <li>Usar os fundos arrecadados conforme descrito no projeto</li>
                <li>Manter os apoiadores informados sobre o progresso</li>
                <li>Cumprir as promessas feitas na campanha</li>
                <li>Prestar contas sobre o uso dos recursos</li>
              </ul>
            </CardContent>
          </Card>

          {/* Donations */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>4. Doações e Pagamentos</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4>4.1 Processamento de Pagamentos</h4>
              <p>
                Todas as transações são processadas através do PayPal. As doações são 
                transferidas diretamente para o criador do projeto após a confirmação do pagamento.
              </p>

              <h4>4.2 Taxas</h4>
              <p>
                O Juntaí cobra uma pequena taxa de serviço sobre as doações recebidas com 
                sucesso para manter a plataforma operacional. As taxas são claramente 
                informadas antes da finalização da doação.
              </p>

              <h4>4.3 Reembolsos</h4>
              <p>
                Doações são geralmente finais. Reembolsos podem ser considerados em casos 
                excepcionais, sujeitos à análise individual e às políticas do PayPal.
              </p>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>5. Propriedade Intelectual</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                O conteúdo da plataforma Juntaí, incluindo design, logos, textos e funcionalidades, 
                é protegido por direitos autorais. Os usuários concedem ao Juntaí uma licença 
                não exclusiva para usar o conteúdo que publicam na plataforma.
              </p>
              <p>
                Os criadores de projetos mantêm os direitos sobre seu conteúdo original, mas 
                são responsáveis por garantir que possuem todos os direitos necessários sobre 
                o material que publicam.
              </p>
            </CardContent>
          </Card>

          {/* Privacy */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>6. Privacidade e Dados</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                O tratamento de dados pessoais está regulamentado por nossa Política de Privacidade, 
                que segue as diretrizes da Lei Geral de Proteção de Dados (LGPD). Coletamos e 
                utilizamos dados apenas para os fins necessários ao funcionamento da plataforma.
              </p>
            </CardContent>
          </Card>

          {/* Limitations */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-amber-500" />
                7. Limitações de Responsabilidade
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                O Juntaí atua como intermediário entre criadores de projetos e doadores. 
                Não nos responsabilizamos pelo sucesso ou fracasso dos projetos publicados. 
                Nossa responsabilidade limita-se ao funcionamento adequado da plataforma.
              </p>
              <p>
                Em nenhuma circunstância seremos responsáveis por danos indiretos, incidentais 
                ou consequenciais decorrentes do uso da plataforma.
              </p>
            </CardContent>
          </Card>

          {/* Changes */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>8. Alterações nos Termos</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                Reservamos o direito de modificar estes Termos de Uso a qualquer momento. 
                As alterações entrarão em vigor imediatamente após a publicação na plataforma. 
                É responsabilidade do usuário revisar periodicamente os termos atualizados.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>9. Contato</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                Para dúvidas sobre estes Termos de Uso, entre em contato conosco:
              </p>
              <ul>
                <li><strong>E-mail:</strong> pedrohenrique.alveslp@gmail.com</li>
                <li><strong>Telefone:</strong> +55 (11) 99999-9999</li>
                <li><strong>Endereço:</strong> São Paulo, SP - Brasil</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
