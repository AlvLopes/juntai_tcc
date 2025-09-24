
import { Logo } from '@/components/ui/logo'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Eye, Database, Lock } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-12">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Logo variant="horizontal-2" size="lg" />
          </div>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-gray-900">
              Política de Privacidade
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Última atualização: 24 de setembro de 2025
          </p>
        </div>

        {/* Privacy Content */}
        <div className="space-y-8">
          {/* Introduction */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Eye className="h-6 w-6 text-blue-500" />
                1. Introdução
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                A privacidade e proteção de dados pessoais são fundamentais para o Juntaí. 
                Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e 
                protegemos suas informações pessoais, em conformidade com a Lei Geral de 
                Proteção de Dados (LGPD - Lei 13.709/2018).
              </p>
              <p>
                Ao usar nossa plataforma, você concorda com as práticas descritas nesta política.
              </p>
            </CardContent>
          </Card>

          {/* Data Collection */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Database className="h-6 w-6 text-green-500" />
                2. Dados Coletados
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4>2.1 Dados Fornecidos Diretamente</h4>
              <p>Coletamos informações que você nos fornece diretamente:</p>
              <ul>
                <li><strong>Cadastro:</strong> Nome, sobrenome, e-mail, telefone, endereço</li>
                <li><strong>Perfil:</strong> Foto, biografia, interesses</li>
                <li><strong>Projetos:</strong> Descrições, imagens, metas financeiras</li>
                <li><strong>Comunicação:</strong> Mensagens de contato e comentários</li>
              </ul>

              <h4>2.2 Dados Coletados Automaticamente</h4>
              <p>Coletamos automaticamente algumas informações quando você usa nossa plataforma:</p>
              <ul>
                <li><strong>Navegação:</strong> Páginas visitadas, tempo de permanência, cliques</li>
                <li><strong>Dispositivo:</strong> Tipo de dispositivo, sistema operacional, navegador</li>
                <li><strong>Localização:</strong> Endereço IP e localização aproximada</li>
                <li><strong>Cookies:</strong> Dados armazenados em seu navegador</li>
              </ul>

              <h4>2.3 Dados de Terceiros</h4>
              <p>
                Recebemos informações do PayPal relacionadas às transações financeiras, 
                incluindo status de pagamentos e dados de faturamento necessários.
              </p>
            </CardContent>
          </Card>

          {/* Use of Data */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>3. Como Usamos Seus Dados</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>Utilizamos seus dados pessoais para:</p>
              <ul>
                <li><strong>Funcionamento da plataforma:</strong> Criar e manter sua conta</li>
                <li><strong>Processar transações:</strong> Facilitar doações e pagamentos</li>
                <li><strong>Comunicação:</strong> Enviar notificações importantes e atualizações</li>
                <li><strong>Melhorias:</strong> Analisar uso para melhorar nossos serviços</li>
                <li><strong>Segurança:</strong> Prevenir fraudes e proteger a plataforma</li>
                <li><strong>Conformidade legal:</strong> Cumprir obrigações legais e regulamentares</li>
                <li><strong>Marketing:</strong> Enviar newsletters (apenas com seu consentimento)</li>
              </ul>
            </CardContent>
          </Card>

          {/* Legal Basis */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>4. Base Legal para Tratamento</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>Tratamos seus dados pessoais com base em:</p>
              <ul>
                <li><strong>Consentimento:</strong> Para newsletters e comunicações promocionais</li>
                <li><strong>Execução de contrato:</strong> Para fornecer nossos serviços</li>
                <li><strong>Interesse legítimo:</strong> Para melhorar a plataforma e prevenir fraudes</li>
                <li><strong>Obrigação legal:</strong> Para cumprir requisitos legais e fiscais</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Sharing */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>5. Compartilhamento de Dados</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>Podemos compartilhar seus dados nas seguintes situações:</p>
              <ul>
                <li><strong>PayPal:</strong> Para processar pagamentos e doações</li>
                <li><strong>Prestadores de serviços:</strong> Empresas que nos ajudam a operar a plataforma</li>
                <li><strong>Obrigações legais:</strong> Quando exigido por lei ou autoridades</li>
                <li><strong>Proteção de direitos:</strong> Para proteger nossos direitos legais</li>
                <li><strong>Consentimento:</strong> Quando você autoriza explicitamente</li>
              </ul>
              <p>
                <strong>Não vendemos</strong> seus dados pessoais para terceiros para fins comerciais.
              </p>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Lock className="h-6 w-6 text-red-500" />
                6. Segurança dos Dados
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>Implementamos medidas técnicas e organizacionais para proteger seus dados:</p>
              <ul>
                <li><strong>Criptografia:</strong> Dados em trânsito e em repouso são criptografados</li>
                <li><strong>Acesso restrito:</strong> Apenas funcionários autorizados acessam dados pessoais</li>
                <li><strong>Monitoramento:</strong> Sistemas de detecção de tentativas de acesso não autorizadas</li>
                <li><strong>Backups seguros:</strong> Backups regulares com proteção adequada</li>
                <li><strong>Treinamento:</strong> Equipe treinada em práticas de segurança de dados</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Retention */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>7. Retenção de Dados</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as 
                finalidades descritas nesta política ou conforme exigido por lei:
              </p>
              <ul>
                <li><strong>Dados de conta:</strong> Enquanto sua conta estiver ativa</li>
                <li><strong>Dados financeiros:</strong> Conforme exigências fiscais (até 5 anos)</li>
                <li><strong>Dados de comunicação:</strong> Por até 3 anos para fins de suporte</li>
                <li><strong>Logs de acesso:</strong> Por até 6 meses para segurança</li>
              </ul>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>8. Seus Direitos (LGPD)</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>De acordo com a LGPD, você tem direito a:</p>
              <ul>
                <li><strong>Acesso:</strong> Saber quais dados pessoais temos sobre você</li>
                <li><strong>Correção:</strong> Corrigir dados incompletos ou incorretos</li>
                <li><strong>Exclusão:</strong> Solicitar a remoção de seus dados</li>
                <li><strong>Portabilidade:</strong> Receber seus dados em formato estruturado</li>
                <li><strong>Oposição:</strong> Opor-se ao tratamento de seus dados</li>
                <li><strong>Revogação:</strong> Retirar consentimento a qualquer momento</li>
                <li><strong>Informação:</strong> Saber sobre compartilhamento de dados</li>
              </ul>
              <p>
                Para exercer esses direitos, entre em contato conosco através dos canais disponibilizados.
              </p>
            </CardContent>
          </Card>

          {/* Cookies */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>9. Cookies</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                Utilizamos cookies e tecnologias similares para melhorar sua experiência:
              </p>
              <ul>
                <li><strong>Essenciais:</strong> Necessários para o funcionamento da plataforma</li>
                <li><strong>Funcionais:</strong> Lembram suas preferências e configurações</li>
                <li><strong>Analíticos:</strong> Ajudam-nos a entender como você usa o site</li>
                <li><strong>Marketing:</strong> Utilizados para personalizar anúncios (com consentimento)</li>
              </ul>
              <p>
                Você pode gerenciar cookies através das configurações do seu navegador.
              </p>
            </CardContent>
          </Card>

          {/* Changes */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>10. Alterações na Política</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                Esta política pode ser atualizada periodicamente. Notificaremos sobre 
                mudanças significativas através da plataforma ou por e-mail. A data da 
                última atualização está indicada no topo desta página.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>11. Contato e DPO</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                Para questões sobre privacidade e proteção de dados, ou para exercer seus direitos:
              </p>
              <ul>
                <li><strong>E-mail:</strong> pedrohenrique.alveslp@gmail.com</li>
                <li><strong>Telefone:</strong> +55 (11) 99999-9999</li>
                <li><strong>Endereço:</strong> São Paulo, SP - Brasil</li>
              </ul>
              <p>
                Você também pode registrar reclamações junto à Autoridade Nacional de 
                Proteção de Dados (ANPD) em caso de violação de seus direitos.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
