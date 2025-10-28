import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Limpar dados existentes (cuidado em produção!)
  console.log('🧹 Limpando dados existentes...')
  await prisma.comment.deleteMany()
  await prisma.donation.deleteMany()
  await prisma.project.deleteMany()
  await prisma.category.deleteMany()
  await prisma.account.deleteMany()
  await prisma.session.deleteMany()
  await prisma.user.deleteMany()

  // Criar categorias
  console.log('📂 Criando categorias...')
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Educação',
        description: 'Projetos focados em educação e capacitação',
        icon: '📚'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Meio Ambiente',
        description: 'Projetos de sustentabilidade e conservação ambiental',
        icon: '🌱'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Saúde',
        description: 'Projetos relacionados à saúde e bem-estar',
        icon: '🏥'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Alimentação',
        description: 'Combate à fome e segurança alimentar',
        icon: '🍞'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Esporte e Lazer',
        description: 'Projetos esportivos e de recreação comunitária',
        icon: '⚽'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Tecnologia',
        description: 'Inclusão digital e ensino de tecnologia',
        icon: '💻'
      }
    })
  ])

  // Criar usuários de exemplo
  console.log('👥 Criando usuários...')
  const hashedPassword = await bcrypt.hash('123456', 10)
  
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'maria.silva@email.com',
        password: hashedPassword,
        firstName: 'Maria',
        lastName: 'Silva',
        phone: '(11) 99999-1111',
        bio: 'Educadora social há 10 anos, apaixonada por transformar vidas através da educação.',
        avatar: 'https://i.pinimg.com/736x/24/fa/6d/24fa6dedeed2a74816b6e3c7fad654b3.jpg',
        isVerified: true,
        // Endereço em São Paulo
        cep: '01310-100',
        address: 'Avenida Paulista',
        addressNumber: '1578',
        complement: 'Apto 1205',
        neighborhood: 'Bela Vista',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brasil'
      }
    }),
    prisma.user.create({
      data: {
        email: 'joao.santos@email.com',
        password: hashedPassword,
        firstName: 'João',
        lastName: 'Santos',
        phone: '(21) 98888-2222',
        bio: 'Ambientalista e fundador de projetos de reflorestamento urbano.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        isVerified: true,
        // Endereço no Rio de Janeiro
        cep: '22071-900',
        address: 'Avenida Atlântica',
        addressNumber: '2964',
        complement: 'Cobertura',
        neighborhood: 'Copacabana',
        city: 'Rio de Janeiro',
        state: 'RJ',
        country: 'Brasil'
      }
    }),
    prisma.user.create({
      data: {
        email: 'ana.costa@email.com',
        password: hashedPassword,
        firstName: 'Ana',
        lastName: 'Costa',
        phone: '(85) 97777-3333',
        bio: 'Médica voluntária em projetos de saúde comunitária.',
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
        isVerified: true,
        // Endereço em Fortaleza
        cep: '60165-081',
        address: 'Avenida Beira Mar',
        addressNumber: '3980',
        complement: 'Bloco B Apto 804',
        neighborhood: 'Mucuripe',
        city: 'Fortaleza',
        state: 'CE',
        country: 'Brasil'
      }
    }),
    prisma.user.create({
      data: {
        email: 'carlos.lima@email.com',
        password: hashedPassword,
        firstName: 'Carlos',
        lastName: 'Lima',
        phone: '(31) 96666-4444',
        bio: 'Chef de cozinha que coordena projetos de combate à fome.',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        isVerified: true,
        // Endereço em Belo Horizonte
        cep: '30112-000',
        address: 'Avenida Afonso Pena',
        addressNumber: '1537',
        complement: 'Loja 12',
        neighborhood: 'Centro',
        city: 'Belo Horizonte',
        state: 'MG',
        country: 'Brasil'
      }
    }),
    prisma.user.create({
      data: {
        email: 'lucia.mendes@email.com',
        password: hashedPassword,
        firstName: 'Lúcia',
        lastName: 'Mendes',
        phone: '(41) 95555-5555',
        bio: 'Ex-atleta dedicada a projetos esportivos para jovens em situação de risco.',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
        isVerified: true,
        // Endereço em Curitiba
        cep: '80250-030',
        address: 'Rua XV de Novembro',
        addressNumber: '999',
        complement: 'Sala 501',
        neighborhood: 'Centro',
        city: 'Curitiba',
        state: 'PR',
        country: 'Brasil'
      }
    }),
    prisma.user.create({
      data: {
        email: 'rafael.tech@email.com',
        password: hashedPassword,
        firstName: 'Rafael',
        lastName: 'Oliveira',
        phone: '(51) 94444-6666',
        bio: 'Desenvolvedor e instrutor de programação para jovens de baixa renda.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        isVerified: true,
        // Endereço em Porto Alegre
        cep: '90035-001',
        address: 'Rua dos Andradas',
        addressNumber: '1234',
        complement: 'Apto 302',
        neighborhood: 'Centro Histórico',
        city: 'Porto Alegre',
        state: 'RS',
        country: 'Brasil'
      }
    })
  ])

  // Criar projetos de exemplo
  console.log('🎯 Criando projetos...')
  const projects = await Promise.all([
    // ALIMENTAÇÃO - Projeto 1
    prisma.project.create({
      data: {
        title: 'Cozinha Comunitária Solidária',
        shortDescription: 'Fornecendo refeições nutritivas e dignas para famílias em situação de vulnerabilidade alimentar.',
        description: `A Cozinha Comunitária Solidária nasceu da necessidade urgente de combater a fome e a desnutrição em nossa comunidade. Diariamente, preparamos e distribuímos refeições completas, nutritivas e saborosas para famílias que enfrentam insegurança alimentar.

🍲 O QUE FAZEMOS:
- Preparação de 800 refeições diárias (almoço e jantar)
- Distribuição de cestas básicas para 150 famílias/mês
- Oficinas de educação nutricional e reaproveitamento de alimentos
- Capacitação profissional em gastronomia para moradores
- Programa "Marmita Solidária" para pessoas em situação de rua

👨‍🍳 ESTRUTURA NECESSÁRIA:
- Reforma e ampliação da cozinha comunitária
- Equipamentos industriais (fogões, geladeiras, freezers)
- Utensílios e panelas de grande porte
- Ingredientes e alimentos não perecíveis
- Uniformes e EPIs para voluntários
- Embalagens ecológicas para distribuição

🎯 IMPACTO ESPERADO:
- 800 pessoas alimentadas diariamente
- 150 famílias recebendo cestas básicas mensais
- 50 pessoas capacitadas em gastronomia/ano
- Redução de 40% da desnutrição infantil na região
- Geração de 15 empregos diretos

💰 INVESTIMENTO:
R$ 30.000 para reforma e equipamentos + R$ 8.000/mês para manutenção e alimentos

Cada R$ 10 doados garantem uma refeição completa e nutritiva. Juntos, podemos transformar a fome em esperança!`,
        image: '/uploads/projects/cozinha-comunitaria.jpg',
        goalAmount: 30000,
        currentAmount: 12500,
        endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
        location: 'São Paulo, SP - Zona Leste',
        isFeatured: true,
        creatorId: users[3].id,
        categoryId: categories.find(c => c.name === 'Alimentação')!.id
      }
    }),
    
    // ALIMENTAÇÃO - Projeto 2
    prisma.project.create({
      data: {
        title: 'Horta Urbana em Favelas',
        shortDescription: 'Cultivando alimentos orgânicos e gerando renda para moradores de comunidades carentes.',
        description: `O projeto Horta Urbana em Favelas transforma espaços ociosos e degradados em áreas produtivas, cultivando alimentos orgânicos frescos e promovendo segurança alimentar e geração de renda para famílias de baixa renda.

🌱 NOSSOS OBJETIVOS:
- Criar 5 hortas comunitárias em diferentes favelas
- Cultivar verduras, legumes e hortaliças orgânicas
- Gerar renda através da venda da produção
- Capacitar 100 moradores em agricultura urbana
- Promover alimentação saudável e sustentabilidade
- Recuperar áreas degradadas e criar espaços verdes

🥬 O QUE PLANTAMOS:
- Alface, rúcula, couve, espinafre
- Tomate, cenoura, beterraba, rabanete
- Ervas medicinais e aromáticas
- Frutas de pequeno porte (morango, limão)

📊 ESTRUTURA NECESSÁRIA:
- Preparação do solo e canteiros elevados
- Sistema de irrigação por gotejamento
- Sementes orgânicas e mudas
- Ferramentas e equipamentos de jardinagem
- Composteira comunitária
- Estufa para produção de mudas
- Capacitação técnica em agroecologia

💚 BENEFÍCIOS SOCIOAMBIENTAIS:
- 500 famílias com acesso a alimentos orgânicos
- Geração de renda para 50 famílias
- Redução de 30% no gasto com alimentação
- Recuperação de 2.000m² de áreas degradadas
- Redução da temperatura local
- Educação ambiental para 200 crianças

🌿 MODELO SUSTENTÁVEL:
Após 6 meses, as hortas se tornam autossustentáveis através da venda da produção em feiras locais e cestas orgânicas por assinatura.

Com sua doação, plantamos não apenas alimentos, mas dignidade, sustentabilidade e futuro!`,
        image: '/uploads/projects/horta-urbana.jpg',
        goalAmount: 22000,
        currentAmount: 8300,
        endDate: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000),
        location: 'Rio de Janeiro, RJ - Complexo da Maré',
        isFeatured: false,
        creatorId: users[3].id,
        categoryId: categories.find(c => c.name === 'Alimentação')!.id
      }
    }),

    // EDUCAÇÃO - Projeto 1
    prisma.project.create({
      data: {
        title: 'Robótica na Escola Pública',
        shortDescription: 'Levando conhecimento de robótica e programação para estudantes da rede pública de ensino.',
        description: `O projeto Robótica na Escola Pública democratiza o acesso à educação tecnológica, oferecendo aulas de robótica, programação e pensamento computacional para estudantes de escolas públicas que raramente têm contato com essas tecnologias.

🤖 MISSÃO DO PROJETO:
Capacitar estudantes de escolas públicas nas áreas de robótica, programação e STEM (Ciência, Tecnologia, Engenharia e Matemática), preparando-os para os desafios do século XXI e reduzindo a desigualdade no acesso à educação tecnológica.

📚 ESTRUTURA PEDAGÓGICA:
- Curso anual com 4 módulos progressivos
- Aulas práticas 2x por semana (4h semanais)
- Turmas de até 20 alunos (8 a 15 anos)
- Metodologia maker e aprendizagem baseada em projetos
- Competições de robótica regionais e nacionais
- Mentoria com profissionais da área de tecnologia

🔧 EQUIPAMENTOS NECESSÁRIOS:
- 15 kits de robótica educacional (LEGO/Arduino)
- 20 notebooks para programação
- Componentes eletrônicos (sensores, motores, LEDs)
- Impressora 3D para prototipagem
- Ferramentas de bancada e multímetros
- Software de simulação e programação

👨‍🏫 CONTEÚDO PROGRAMÁTICO:
MÓDULO 1: Introdução à Robótica e Lógica
MÓDULO 2: Programação em Blocos (Scratch)
MÓDULO 3: Arduino e Sensores
MÓDULO 4: Projetos Autônomos e Competições

🎯 IMPACTO ESPERADO:
- 120 estudantes capacitados por ano
- Melhoria de 35% no desempenho em matemática
- 80% dos alunos seguindo carreiras em tecnologia
- Participação em 4 competições de robótica/ano
- Formação de 3 novas turmas em escolas vizinhas

🏆 RESULTADOS JÁ ALCANÇADOS (PILOTO):
- 40 alunos formados na turma piloto
- 3º lugar na Olimpíada Brasileira de Robótica 2024
- 85% de frequência e engajamento dos estudantes
- 12 projetos inovadores desenvolvidos

💡 DIFERENCIAIS:
- Inclusão de meninas (mínimo 40% das vagas)
- Bolsas integrais para estudantes de baixa renda
- Material didático gratuito
- Certificação reconhecida

Investindo neste projeto, você está investindo no futuro de centenas de crianças e adolescentes que podem se tornar os próximos cientistas, engenheiros e inovadores brasileiros!`,
        image: '/uploads/projects/robotica-escolar.jpg',
        goalAmount: 38000,
        currentAmount: 19500,
        endDate: new Date(Date.now() + 55 * 24 * 60 * 60 * 1000),
        location: 'Brasília, DF - Ceilândia',
        isFeatured: true,
        creatorId: users[0].id,
        categoryId: categories.find(c => c.name === 'Educação')!.id
      }
    }),

    // EDUCAÇÃO - Projeto 2
    prisma.project.create({
      data: {
        title: 'Cursinho Popular Pré-Vestibular',
        shortDescription: 'Preparação gratuita e de qualidade para o ENEM e vestibulares para jovens de baixa renda.',
        description: `O Cursinho Popular Pré-Vestibular oferece preparação completa e gratuita para o ENEM e principais vestibulares do país, democratizando o acesso ao ensino superior para jovens de famílias de baixa renda que sonham com uma vaga na universidade.

🎓 NOSSA PROPOSTA:
Oferecer educação de excelência, totalmente gratuita, para estudantes que não têm condições de pagar cursinhos particulares caros. Nosso foco é a aprovação em universidades públicas e bolsas em instituições privadas.

📖 ESTRUTURA DO CURSINHO:
- Curso extensivo anual (fevereiro a novembro)
- Aulas presenciais de segunda a sábado
- 30 horas semanais de aula
- Material didático completo gratuito
- Simulados mensais (modelo ENEM)
- Aulas de redação com correção individualizada
- Orientação vocacional e psicológica
- Biblioteca com acervo atualizado

👨‍🏫 EQUIPE PEDAGÓGICA:
- 18 professores especialistas (todas as disciplinas)
- 5 coordenadores pedagógicos
- 2 psicólogos para apoio emocional
- 10 monitores (ex-alunos aprovados)
- 1 orientador vocacional

📚 DISCIPLINAS OFERECIDAS:
Língua Portuguesa | Literatura | Redação | Matemática | Física | Química | Biologia | História | Geografia | Inglês | Espanhol | Filosofia | Sociologia | Atualidades

🎯 DIFERENCIAIS:
- Aulas focadas no ENEM e principais vestibulares
- Plantão de dúvidas diário
- Grupos de estudo organizados
- Técnicas de estudo e gestão do tempo
- Preparação emocional para provas
- Auxílio no preenchimento do SISU/PROUNI
- Acompanhamento pós-aprovação

💰 INVESTIMENTOS NECESSÁRIOS:
- Aluguel e manutenção da sede (12 meses)
- Salários dos professores e coordenadores
- Material didático para 200 alunos
- Equipamentos (projetor, computadores, lousa digital)
- Limpeza, segurança e infraestrutura
- Lanche para os alunos (café da manhã e tarde)

📊 IMPACTO E RESULTADOS:
- 200 vagas anuais (100% gratuitas)
- Taxa de aprovação de 65% (acima da média nacional)
- 180 alunos aprovados nos últimos 3 anos
- 40% de aprovação em universidades federais
- 30% de bolsas integrais pelo PROUNI
- Média de 680 pontos no ENEM

🏆 HISTÓRICO DE APROVAÇÕES:
- USP, Unicamp, UFRJ, UnB, UFMG
- Medicina, Engenharia, Direito, Pedagogia
- Bolsas integrais em universidades particulares

👥 PERFIL DOS ALUNOS:
- 80% são a primeira geração da família no ensino superior
- 65% são negros ou pardos
- 55% são mulheres
- 100% têm renda familiar de até 2 salários mínimos

Sua doação pode ser o diferencial entre um jovem conseguir ou não realizar o sonho de entrar na universidade. Transforme vidas através da educação!`,
        image: '/uploads/projects/cursinho-popular.jpg',
        goalAmount: 42000,
        currentAmount: 28700,
        endDate: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
        location: 'Salvador, BA - Subúrbio Ferroviário',
        isFeatured: true,
        creatorId: users[0].id,
        categoryId: categories.find(c => c.name === 'Educação')!.id
      }
    }),

    // ESPORTE E LAZER - Projeto 1
    prisma.project.create({
      data: {
        title: 'Natação para Crianças Carentes',
        shortDescription: 'Oferecendo aulas gratuitas de natação para crianças de comunidades vulneráveis.',
        description: `O projeto Natação para Crianças Carentes leva o esporte aquático para crianças de 6 a 14 anos de famílias de baixa renda, promovendo saúde, disciplina, segurança aquática e inclusão social através da natação.

🏊‍♀️ MISSÃO:
Democratizar o acesso à natação, um esporte completo que desenvolve o corpo e a mente, mas que historicamente é restrito às classes mais favorecidas. Queremos que toda criança, independente de sua condição social, tenha a oportunidade de aprender a nadar.

🌊 ESTRUTURA DO PROGRAMA:
- Aulas 3x por semana (turno alternativo ao escolar)
- Turmas divididas por idade e nível
- Cada turma com até 15 alunos
- Duração: 1 hora por aula
- Frequência obrigatória mínima de 75%
- Acompanhamento escolar e nutricional
- Participação em competições regionais

👨‍🏫 EQUIPE TÉCNICA:
- 4 professores de natação (CREF)
- 3 salva-vidas certificados
- 1 fisioterapeuta esportivo
- 1 nutricionista
- 2 assistentes administrativos

📋 METODOLOGIA:
NÍVEL 1: Adaptação aquática e flutuação
NÍVEL 2: Respiração e propulsão básica
NÍVEL 3: Nado crawl e costas
NÍVEL 4: Nado peito e borboleta
NÍVEL 5: Aperfeiçoamento e competição

🏊 BENEFÍCIOS DA NATAÇÃO:
- Desenvolvimento físico completo
- Melhoria da capacidade respiratória
- Correção postural
- Aumento da autoestima e disciplina
- Prevenção de afogamentos
- Socialização e trabalho em equipe

💰 INVESTIMENTOS NECESSÁRIOS:
- Reforma e manutenção da piscina (25m)
- Sistema de tratamento de água (cloro/pH)
- Aquecimento da piscina (inverno)
- Equipamentos (pranchas, flutuadores, bóias)
- Uniformes de natação (maiôs, sungas, toucas)
- Materiais de segurança (boias salva-vidas)
- Salários da equipe técnica
- Transporte para competições

🎯 METAS E IMPACTO:
- 120 crianças atendidas simultaneamente
- 300 crianças capacitadas por ano
- 100% aprendem a nadar com segurança
- 20 atletas na equipe de competição
- Melhoria de 40% na saúde respiratória
- Redução de 80% no risco de afogamento
- 15 medalhas em competições regionais/ano

🏅 RESULTADOS JÁ ALCANÇADOS:
- 450 crianças formadas desde 2020
- 35 medalhas em competições estaduais
- 5 alunos em seleções regionais
- 90% de frequência e permanência
- Zero casos de afogamento entre ex-alunos

👦 REQUISITOS PARA PARTICIPAÇÃO:
- Idade entre 6 e 14 anos
- Renda familiar de até 2 salários mínimos
- Atestado médico
- Frequência escolar mínima de 75%
- Compromisso com os horários

🌟 HISTÓRIAS DE SUCESSO:
"Meu filho tinha medo de água e hoje é medalhista!" - Maria, mãe de aluno
"A natação mudou minha vida, hoje sou salva-vidas profissional!" - João, ex-aluno

Cada doação representa a oportunidade de uma criança aprender a nadar, ter mais saúde, disciplina e possivelmente descobrir um talento esportivo que pode mudar seu futuro!`,
        image: '/uploads/projects/natacao-criancas.jpg',
        goalAmount: 35000,
        currentAmount: 16800,
        endDate: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000),
        location: 'Recife, PE - Zona Norte',
        isFeatured: false,
        creatorId: users[4].id,
        categoryId: categories.find(c => c.name === 'Esporte e Lazer')!.id
      }
    }),

    // ESPORTE E LAZER - Projeto 2
    prisma.project.create({
      data: {
        title: 'Skate Social - Pista Comunitária',
        shortDescription: 'Construindo uma pista de skate e promovendo cultura urbana como ferramenta de inclusão social.',
        description: `O Skate Social vai construir a primeira pista de skate comunitária da região, oferecendo um espaço seguro e estruturado para jovens praticarem o esporte, desenvolverem suas habilidades e se afastarem das situações de risco social através da cultura urbana.

🛹 VISÃO DO PROJETO:
Transformar um terreno abandonado em um hub de cultura urbana, onde jovens possam praticar skate, conhecer pessoas, desenvolver talentos e construir um futuro melhor através do esporte e da arte.

🏗️ ESTRUTURA DA PISTA:
- Pista de street skate (400m²)
- Bowl/piscina de concreto (100m²)
- Área de mini-ramp
- Obstáculos variados (rails, boxes, gaps)
- Iluminação para uso noturno
- Arquibancadas e área de convivência
- Vestiários e banheiros
- Graffiti wall para arte urbana
- Quiosque com oficina de manutenção

👨‍🏫 PROGRAMAÇÃO SOCIAL:
- Aulas gratuitas de skate (3x/semana)
- Oficinas de arte urbana e graffiti
- Campeonatos e eventos mensais
- Programa de patrocínio para jovens talentos
- Curso de mecânica de skate
- Orientação profissional
- Música e cultura hip hop

🎯 PÚBLICO-ALVO:
- Jovens de 10 a 25 anos
- Foco em moradores de comunidades
- 40% das vagas reservadas para meninas
- Abertura para toda a comunidade nos finais de semana

💪 IMPACTO SOCIAL:
- Redução da criminalidade juvenil
- Afastamento de drogas e violência
- Desenvolvimento de disciplina e respeito
- Geração de atletas profissionais
- Fortalecimento da cultura local
- Convivência saudável e inclusiva
- Autoestima e pertencimento

📅 CRONOGRAMA:
FASE 1 (meses 1-2): Preparação do terreno
FASE 2 (meses 3-4): Construção da pista
FASE 3 (mês 5): Instalação de obstáculos e acabamento
FASE 4 (mês 6): Inauguração e início das atividades

💰 ORÇAMENTO DETALHADO:
- Terraplanagem e preparação: R$ 8.000
- Concreto e construção: R$ 22.000
- Obstáculos de metal: R$ 6.000
- Iluminação: R$ 4.000
- Arquibancadas e mobiliário: R$ 3.000
- Vestiários: R$ 5.000
- Muro e graffiti: R$ 2.000

Total: R$ 50.000

🏆 BENEFÍCIOS DA PRÁTICA DO SKATE:
- Exercício físico completo
- Coordenação motora e equilíbrio
- Superação de limites e medos
- Criatividade e expressão
- Trabalho em equipe
- Respeito às diferenças
- Responsabilidade e cuidado

🎬 ATIVIDADES COMPLEMENTARES:
- Sessões de cinema ao ar livre
- Shows de rap e hip hop
- Feiras de economia criativa
- Oficinas de audiovisual
- Encontros de breaking e dança urbana
- Palestras motivacionais

🌟 SUSTENTABILIDADE:
Após a construção, a pista será mantida através de:
- Parceria com prefeitura
- Eventos pagos (campeonatos, shows)
- Loja de produtos de skate (margem solidária)
- Patrocínios de marcas
- Doações recorrentes

👥 PARCERIAS:
- Associação de Moradores
- Secretaria Municipal de Esportes
- Marcas de skate locais e nacionais
- Coletivos de arte urbana
- ONGs de atendimento a jovens

🔥 DEPOIMENTOS:
"Quero muito uma pista perto de casa. Hoje tenho que andar 2 horas pra andar de skate." - Pedro, 14 anos
"O skate salvou a vida do meu irmão. Precisamos desse espaço na comunidade." - Juliana, moradora

Este projeto é mais que uma pista de skate - é um investimento no futuro de centenas de jovens que merecem oportunidades, respeito e um lugar para chamar de seu!`,
        image: '/uploads/projects/skate-social.jpg',
        goalAmount: 50000,
        currentAmount: 23400,
        endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        location: 'São Paulo, SP - Zona Sul',
        isFeatured: true,
        creatorId: users[4].id,
        categoryId: categories.find(c => c.name === 'Esporte e Lazer')!.id
      }
    }),

    // MEIO AMBIENTE - Projeto 1
    prisma.project.create({
      data: {
        title: 'Reciclagem e Renda - Cooperativa',
        shortDescription: 'Gerando renda através da reciclagem e promovendo sustentabilidade ambiental.',
        description: `A Cooperativa de Reciclagem e Renda transforma o lixo em oportunidade, oferecendo trabalho digno e renda para catadores de materiais recicláveis, ao mesmo tempo que promove a preservação ambiental através da coleta seletiva e reciclagem adequada.

♻️ MISSÃO:
Organizar catadores autônomos em uma cooperativa estruturada, oferecendo melhores condições de trabalho, maior rentabilidade na venda dos materiais e dignidade profissional, enquanto contribuímos para a sustentabilidade ambiental da cidade.

🏭 ESTRUTURA DA COOPERATIVA:
- Galpão de 500m² para triagem e armazenamento
- Esteiras de separação automatizadas
- Prensas hidráulicas para compactação
- Balança industrial
- Empilhadeira para movimentação
- Escritório administrativo
- Vestiários e refeitório
- EPIs completos para todos os cooperados

👷 ORGANIZAÇÃO:
- 40 cooperados (catadores organizados)
- Gestão democrática e participativa
- Divisão igualitária dos lucros
- Capacitação profissional contínua
- Segurança do trabalho
- Apoio jurídico e contábil

📊 MATERIAIS COLETADOS:
- Papel e papelão (40% do volume)
- Plásticos diversos (PET, PEAD, PP)
- Metais (latas de alumínio, ferro, cobre)
- Vidros (garrafas, potes, cacos)
- Eletrônicos (com destinação adequada)

🌍 IMPACTO AMBIENTAL:
- 80 toneladas de resíduos reciclados/mês
- 960 toneladas/ano desviadas dos aterros
- Economia de 1.200 árvores/ano
- Redução de 400 toneladas de CO2/ano
- Conscientização de 5.000 famílias
- 15 escolas no programa de educação ambiental

💵 IMPACTO SOCIAL:
- 40 famílias com renda digna (R$ 1.800/mês)
- Direitos trabalhistas garantidos
- Cartão alimentação para cooperados
- Plano de saúde coletivo
- Cesta de Natal e bonificações
- Valorização profissional
- Autoestima e cidadania

📚 CAPACITAÇÃO:
- Curso de gestão de cooperativas
- Treinamento em triagem e classificação
- Segurança do trabalho
- Educação ambiental
- Alfabetização digital
- Empreendedorismo social

🚛 OPERAÇÃO:
- Coleta porta-a-porta em 10 bairros
- Parceria com condomínios e empresas
- Pontos de entrega voluntária (PEVs)
- Caminhão próprio para coleta
- Roteiros otimizados
- Horários fixos de coleta

💰 INVESTIMENTOS NECESSÁRIOS:
- Aluguel e reforma do galpão: R$ 15.000
- Equipamentos (esteiras, prensas): R$ 25.000
- Caminhão de coleta (usado): R$ 35.000
- EPIs e uniformes: R$ 3.000
- Mobiliário e escritório: R$ 5.000
- Capital de giro inicial: R$ 7.000
- Licenças e regularizações: R$ 5.000

Total: R$ 95.000 (solicitando R$ 60.000 nesta campanha)

🎯 METAS:
ANO 1:
- 40 cooperados trabalhando
- 60 toneladas recicladas/mês
- Renda média de R$ 1.500/cooperado

ANO 2:
- 60 cooperados
- 100 toneladas/mês
- Renda média de R$ 1.800/cooperado
- Abertura de segunda unidade

ANO 3:
- 100 cooperados (2 unidades)
- 180 toneladas/mês
- Autossustentabilidade completa

🏆 PARCERIAS:
- Prefeitura Municipal (coleta seletiva)
- Empresas de reciclagem (compradores)
- Supermercados e condomínios
- Incubadora de cooperativas
- Universidades (pesquisa e extensão)

🌟 HISTÓRIAS DE TRANSFORMAÇÃO:
"Antes eu catava papelão na rua por R$ 30/dia. Hoje sou cooperado, tenho renda fixa e trabalho com dignidade." - José, cooperado

"A cooperativa me deu esperança. Consegui colocar meus filhos na escola e alugar uma casa melhor." - Maria, cooperada

Este projeto é sobre dignidade humana, justiça social e preservação ambiental. Cada doação apoia famílias que trabalham para limpar nossa cidade e merecem reconhecimento e condições dignas de trabalho!`,
        image: '/uploads/projects/reciclagem-cooperativa.jpg',
        goalAmount: 60000,
        currentAmount: 34200,
        endDate: new Date(Date.now() + 70 * 24 * 60 * 60 * 1000),
        location: 'Curitiba, PR - CIC',
        isFeatured: true,
        creatorId: users[1].id,
        categoryId: categories.find(c => c.name === 'Meio Ambiente')!.id
      }
    }),

    // MEIO AMBIENTE - Projeto 2
    prisma.project.create({
      data: {
        title: 'Preservação de Nascentes Urbanas',
        shortDescription: 'Recuperando e protegendo nascentes de água em áreas urbanas degradadas.',
        description: `O projeto Preservação de Nascentes Urbanas recupera, protege e revitaliza nascentes de água em áreas urbanas que foram degradadas pela ocupação desordenada, poluição e falta de cuidado, garantindo água limpa e qualidade de vida para as comunidades do entorno.

💧 PROBLEMÁTICA:
Nossa cidade possui 47 nascentes catalogadas, mas 32 delas estão poluídas, soterradas ou em risco de desaparecer. Essas nascentes são fundamentais para o abastecimento de água, regulação climática e biodiversidade urbana.

🎯 OBJETIVOS:
- Recuperar 8 nascentes urbanas prioritárias
- Remover poluição e resíduos acumulados
- Reflorestar áreas de proteção permanente (APP)
- Instalar cercas de proteção
- Criar parques lineares ao redor das nascentes
- Educar a comunidade sobre preservação
- Monitorar a qualidade da água

🌳 AÇÕES DE RECUPERAÇÃO:

FASE 1 - DIAGNÓSTICO (mês 1)
- Mapeamento e georreferenciamento
- Análise da qualidade da água
- Estudo do solo e vegetação
- Identificação de fontes poluidoras

FASE 2 - LIMPEZA (meses 2-3)
- Remoção de lixo e entulho
- Despoluição das águas
- Limpeza de canais e desobstrução
- Contenção de erosão

FASE 3 - REFLORESTAMENTO (meses 4-6)
- Plantio de 2.000 mudas nativas
- Espécies para mata ciliar
- Sistema de irrigação inicial
- Cobertura morta e proteção

FASE 4 - INFRAESTRUTURA (meses 7-8)
- Cercamento e sinalização
- Trilhas ecológicas
- Placas educativas
- Pontos de observação

FASE 5 - MONITORAMENTO (contínuo)
- Análises mensais da água
- Acompanhamento das mudas
- Vigilância comunitária
- Manutenção permanente

🌱 ESPÉCIES A SEREM PLANTADAS:
- Ipê amarelo/roxo
- Pau-brasil
- Jatobá
- Cedro
- Embaúba
- Ingá
- Aroeira
- Palmito juçara
(Total: 2.000 mudas de 30 espécies nativas)

👥 MOBILIZAÇÃO COMUNITÁRIA:
- 200 voluntários em mutirões
- Oficinas de educação ambiental
- Capacitação de guardiões das nascentes
- Visitas escolares
- Campanhas de conscientização
- Patrulha ambiental voluntária

📊 IMPACTO ESPERADO:
- 8 nascentes recuperadas
- 12.000m² de área reflorestada
- 2.000 árvores plantadas
- 500L/hora de água limpa preservada
- 5.000 pessoas beneficiadas
- Temperatura local reduzida em 3°C
- Aumento de 200% na biodiversidade
- 15 espécies de aves retornando

💰 ORÇAMENTO:
- Análises laboratoriais e estudos: R$ 4.000
- Limpeza e remoção de resíduos: R$ 6.000
- Mudas nativas (2.000 unidades): R$ 8.000
- Insumos (adubo, terra, cobertura): R$ 3.000
- Cercamento e proteção: R$ 5.000
- Placas e sinalização: R$ 2.000
- Ferramentas e equipamentos: R$ 3.000
- Coordenação e técnicos: R$ 8.000
- Materiais educativos: R$ 2.000
- Transporte e logística: R$ 3.000

Total: R$ 44.000

🔬 MONITORAMENTO CIENTÍFICO:
Parceria com universidades para análises:
- pH e temperatura da água
- Oxigênio dissolvido
- Coliformes fecais
- Metais pesados
- Biodiversidade aquática

🏆 RESULTADOS DE PROJETOS ANTERIORES:
- 3 nascentes já recuperadas (2021-2023)
- 100% de sobrevivência das mudas
- Retorno de fauna nativa (capivaras, pássaros)
- Qualidade da água: de "péssima" para "boa"
- Reconhecimento da ONU Meio Ambiente

📚 EDUCAÇÃO AMBIENTAL:
- 20 palestras em escolas
- 5 oficinas práticas de plantio
- Material didático para 1.000 estudantes
- Formação de 30 agentes ambientais
- Criação de grupo "Guardiões das Nascentes"

🌍 BENEFÍCIOS AMBIENTAIS:
- Preservação de recursos hídricos
- Combate às mudanças climáticas
- Aumento da biodiversidade
- Regulação do microclima
- Contenção de erosão
- Beleza cênica e lazer

💚 BENEFÍCIOS SOCIAIS:
- Água limpa para comunidade
- Espaço de lazer e contemplação
- Educação ambiental
- Geração de emprego (10 postos)
- Valorização imobiliária
- Saúde e qualidade de vida

🤝 PARCERIAS:
- Secretaria de Meio Ambiente
- Universidade Federal (pesquisa)
- Viveiros municipais (mudas)
- Associações de moradores
- Escolas do entorno
- ONGs ambientalistas

Cada doação representa gotas de esperança para que estas nascentes voltem a fluir com abundância, levando vida para toda a comunidade!`,
        image: '/uploads/projects/nascentes-urbanas.jpg',
        goalAmount: 44000,
        currentAmount: 18900,
        endDate: new Date(Date.now() + 55 * 24 * 60 * 60 * 1000),
        location: 'Belo Horizonte, MG - Regional Pampulha',
        isFeatured: false,
        creatorId: users[1].id,
        categoryId: categories.find(c => c.name === 'Meio Ambiente')!.id
      }
    }),

    // SAÚDE - Projeto 1
    prisma.project.create({
      data: {
        title: 'Fisioterapia para Idosos',
        shortDescription: 'Centro comunitário oferecendo fisioterapia e reabilitação gratuita para a terceira idade.',
        description: `O projeto Fisioterapia para Idosos oferece atendimento fisioterapêutico especializado e gratuito para pessoas da terceira idade de baixa renda, promovendo qualidade de vida, autonomia, saúde e bem-estar para quem mais precisa.

👴👵 NOSSA MISSÃO:
Garantir que idosos em situação de vulnerabilidade social tenham acesso a tratamento fisioterapêutico de qualidade, recuperando movimentos, aliviando dores e promovendo independência para as atividades diárias.

🏥 SERVIÇOS OFERECIDOS:

FISIOTERAPIA ORTOPÉDICA:
- Tratamento de artrose e artrite
- Recuperação de fraturas
- Dores na coluna, joelhos e ombros
- Reabilitação pós-cirúrgica
- Fortalecimento muscular

FISIOTERAPIA NEUROLÓGICA:
- Sequelas de AVC (derrame)
- Parkinson e Alzheimer
- Recuperação de movimentos
- Treino de marcha
- Equilíbrio e coordenação

FISIOTERAPIA RESPIRATÓRIA:
- Doenças pulmonares crônicas
- Asma e bronquite
- Expansão pulmonar
- Exercícios respiratórios
- Prevenção de pneumonia

PREVENÇÃO E BEM-ESTAR:
- Exercícios de alongamento
- Fortalecimento preventivo
- Postura e ergonomia
- Prevenção de quedas
- Ginástica para terceira idade

👨‍⚕️ EQUIPE MULTIDISCIPLINAR:
- 4 fisioterapeutas especialistas
- 1 geriatra (consultas mensais)
- 1 educador físico
- 2 técnicos de enfermagem
- 1 assistente social
- 2 auxiliares administrativos

🏢 ESTRUTURA DO CENTRO:
- 6 boxes individuais de atendimento
- Sala de fisioterapia em grupo (capacidade 20)
- Academia terapêutica equipada
- Sala de avaliação e consultas
- Recepção e espera
- Banheiros adaptados
- Cozinha (lanches)

🔧 EQUIPAMENTOS:
- Macas elétricas
- Aparelhos de ultrassom e TENS
- Bolas terapêuticas
- Faixas elásticas e pesos
- Barras paralelas
- Esteiras e bicicletas ergométricas
- Escada de treino de marcha
- Espelhos posturais

📅 FUNCIONAMENTO:
- Segunda a sexta: 7h às 19h
- Sábados: 8h às 12h (grupos)
- Atendimentos de 45 minutos
- Grupos semanais de exercícios
- Capacidade: 150 atendimentos/semana

📋 PROTOCOLO DE ATENDIMENTO:
1. Triagem e avaliação inicial
2. Exame físico e funcional
3. Definição de objetivos
4. Plano de tratamento personalizado
5. Sessões regulares (2-3x/semana)
6. Reavaliações mensais
7. Alta com orientações

🎯 CRITÉRIOS DE ATENDIMENTO:
- Idade acima de 60 anos
- Renda familiar de até 3 salários mínimos
- Residência na região
- Necessidade de reabilitação
- Encaminhamento médico (quando possível)
- Prioridade para casos graves

📊 IMPACTO ESPERADO:
- 120 idosos em atendimento regular
- 600 atendimentos/mês
- 80% de melhora na mobilidade
- 70% de redução das dores
- 60% menos dependência de terceiros
- 50% redução no uso de medicamentos
- Zero internações evitáveis

💚 BENEFÍCIOS COMPROVADOS:
- Alívio de dores crônicas
- Recuperação de movimentos
- Independência funcional
- Prevenção de quedas
- Melhora da circulação
- Fortalecimento muscular
- Bem-estar emocional
- Socialização e alegria

💰 INVESTIMENTOS NECESSÁRIOS:

ESTRUTURA INICIAL (R$ 35.000):
- Reforma e adaptações: R$ 10.000
- Equipamentos fisioterápicos: R$ 18.000
- Mobiliário: R$ 4.000
- Materiais de consumo: R$ 3.000

CUSTO MENSAL (R$ 12.000):
- Salários da equipe: R$ 8.000
- Aluguel e condomínio: R$ 2.000
- Água, luz, internet: R$ 800
- Materiais e manutenção: R$ 1.200

Meta da campanha: R$ 71.000
(R$ 35.000 estrutura + R$ 36.000 para 3 meses)

👥 ATIVIDADES COMPLEMENTARES:
- Grupos de convivência
- Oficinas de artesanato
- Palestras sobre envelhecimento saudável
- Dança sênior
- Yoga e meditação
- Passeios recreativos
- Festas temáticas

🏆 RESULTADOS DE PROJETO PILOTO:
- 40 idosos atendidos em 6 meses
- 95% de satisfação
- 85% apresentaram melhoras significativas
- Redução de 60% nas dores relatadas
- 100% recomendariam o serviço

🌟 DEPOIMENTOS:
"Não conseguia nem pegar minha neta no colo. Hoje brinco com ela o dia todo!" - Dona Maria, 72 anos

"As dores na coluna me impediam de dormir. Depois do tratamento, voltei a viver!" - Seu José, 68 anos

"Aqui me tratam com carinho e respeito. Me sinto útil e feliz novamente." - Dona Ana, 75 anos

🤝 PARCERIAS:
- Secretaria Municipal de Saúde
- UBS do bairro (encaminhamentos)
- Faculdade de Fisioterapia (estágio)
- Farmácia Popular
- Associação de Aposentados
- Centro de Convivência do Idoso

📞 SUSTENTABILIDADE:
Após o período inicial, buscaremos:
- Convênio com SUS
- Parcerias com empresas
- Eventos beneficentes
- Doações recorrentes
- Planos acessíveis para quem pode contribuir

Este projeto é sobre respeito, dignidade e qualidade de vida para quem construiu este país. Cada doação representa menos dor e mais sorrisos para nossos idosos!`,
        image: '/uploads/projects/fisioterapia-idosos.jpg',
        goalAmount: 71000,
        currentAmount: 42300,
        endDate: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000),
        location: 'Porto Alegre, RS - Zona Norte',
        isFeatured: true,
        creatorId: users[2].id,
        categoryId: categories.find(c => c.name === 'Saúde')!.id
      }
    }),

    // SAÚDE - Projeto 2
    prisma.project.create({
      data: {
        title: 'Saúde Mental na Periferia',
        shortDescription: 'Atendimento psicológico gratuito e grupos de apoio para comunidades vulneráveis.',
        description: `O projeto Saúde Mental na Periferia oferece atendimento psicológico gratuito, grupos terapêuticos e ações de promoção de saúde mental para moradores de comunidades periféricas que não têm acesso a esses serviços essenciais.

🧠 A URGÊNCIA DA SAÚDE MENTAL:
A saúde mental é tão importante quanto a saúde física, mas continua sendo negligenciada, especialmente nas periferias. Depressão, ansiedade, traumas e violência afetam milhares de pessoas que não têm acesso a tratamento adequado.

💭 REALIDADE QUE QUEREMOS MUDAR:
- 1 em cada 4 moradores apresenta sintomas de depressão/ansiedade
- Acesso à psicoterapia é limitado ao SUS (filas de 6+ meses)
- Atendimento particular custa R$ 150-300/sessão (inacessível)
- Estigma e preconceito impedem busca por ajuda
- Falta de informação sobre saúde mental
- Violência e trauma são realidades constantes

🎯 OBJETIVOS DO PROJETO:
- Oferecer psicoterapia gratuita individual
- Criar grupos terapêuticos temáticos
- Promover campanhas de conscientização
- Formar agentes de saúde mental comunitários
- Atendimento em crises e emergências
- Articular rede de apoio psicossocial
- Combater o estigma e preconceito

🏥 SERVIÇOS OFERECIDOS:

ATENDIMENTO INDIVIDUAL:
- Psicoterapia (abordagens: TCC, psicanálise, humanista)
- Avaliação psicológica
- Acompanhamento de casos
- Encaminhamento quando necessário
- Sessões semanais de 50 minutos
- Gratuito e sigiloso

GRUPOS TERAPÊUTICOS:
- Grupo de Mulheres (violência doméstica)
- Grupo de Mães (maternidade e estresse)
- Grupo de Adolescentes (identidade e ansiedade)
- Grupo de Luto
- Grupo de Dependência Química
- Grupo de Ansiedade e Depressão
- Encontros semanais com 8-12 participantes

AÇÕES COMUNITÁRIAS:
- Rodas de conversa em escolas
- Palestras sobre saúde mental
- Campanhas: Setembro Amarelo, Janeiro Branco
- Oficinas de autocuidado
- Atividades de arte-terapia
- Meditação e mindfulness
- Eventos de conscientização

CAPACITAÇÃO:
- Formação de agentes comunitários
- Primeiros socorros psicológicos
- Identificação de sinais de risco
- Rede de apoio e encaminhamento

👨‍⚕️ EQUIPE:
- 5 psicólogos clínicos (CRP ativo)
- 1 psiquiatra (consultas mensais)
- 1 assistente social
- 1 coordenador geral
- 2 facilitadores de grupos
- 1 recepcionista

📅 FUNCIONAMENTO:
- Segunda a sexta: 8h às 20h
- Sábados: 9h às 13h (grupos)
- Atendimentos agendados e emergenciais
- Plantão psicológico (sem agendamento)
- Grupos semanais fixos

🏢 ESTRUTURA:
- 5 consultórios individuais
- Sala de grupos (capacidade 15)
- Recepção e espera
- Sala administrativa
- Copa/cozinha
- Banheiros
- Brinquedoteca (crianças)

📋 PROTOCOLO DE ATENDIMENTO:
1. Acolhimento inicial (triagem)
2. Avaliação do caso
3. Definição do plano terapêutico
4. Início dos atendimentos
5. Reavaliações periódicas
6. Articulação com rede (se necessário)
7. Alta terapêutica

🎯 PÚBLICO PRIORITÁRIO:
- Vítimas de violência (doméstica, urbana)
- Mulheres em vulnerabilidade
- Adolescentes em risco
- Dependentes químicos e familiares
- Pessoas com depressão/ansiedade
- Tentativa de suicídio
- Traumas e luto

📊 IMPACTO ESPERADO:
- 100 pessoas em atendimento individual
- 80 participantes em grupos terapêuticos
- 500 pessoas em ações comunitárias
- 30 agentes comunitários capacitados
- 10 escolas com programas de prevenção
- Redução de 40% nos sintomas (escalas clínicas)
- 90% de adesão ao tratamento

💰 INVESTIMENTOS:

ESTRUTURA INICIAL (R$ 25.000):
- Aluguel e reforma: R$ 12.000
- Mobiliário e decoração: R$ 7.000
- Equipamentos (computador, impressora): R$ 3.000
- Material de consumo e testes: R$ 3.000

CUSTO MENSAL (R$ 15.000):
- Salários da equipe: R$ 11.000
- Aluguel e condomínio: R$ 2.500
- Água, luz, internet: R$ 600
- Materiais e manutenção: R$ 900

Meta da campanha: R$ 70.000
(R$ 25.000 estrutura + R$ 45.000 para 3 meses)

🧘 ATIVIDADES TERAPÊUTICAS COMPLEMENTARES:
- Yoga e meditação guiada
- Arteterapia (pintura, música)
- Oficinas de escrita terapêutica
- Caminhadas terapêuticas
- Círculos de partilha
- Cineterapia (cinema e debate)
- Biblioterapia

🏆 DADOS DO PROJETO PILOTO (6 MESES):
- 50 pessoas atendidas
- 400 sessões realizadas
- 85% relataram melhora significativa
- 70% redução em sintomas de ansiedade
- 60% redução em sintomas de depressão
- 95% recomendariam o serviço
- Zero tentativas de suicídio entre atendidos

🌟 DEPOIMENTOS:
"Estava há 2 anos sem conseguir sair de casa. A terapia me devolveu a vida." - Carla, 34 anos

"Pensava em desistir de tudo. Hoje vejo sentido e esperança no futuro." - Roberto, 28 anos

"O grupo de mulheres me fez ver que não estou sozinha. Encontrei força para recomeçar." - Fernanda, 41 anos

📱 INOVAÇÃO:
- Prontuário eletrônico seguro (LGPD)
- Sistema de agendamento online
- Lembretes automáticos por WhatsApp
- Material psicoeducativo digital
- Grupos de apoio online
- Canal de emergência 24h

🤝 PARCERIAS:
- CAPS (Centro de Atenção Psicossocial)
- UBS do território
- Conselho Tutelar
- Centro de Referência da Mulher
- Faculdades de Psicologia (supervisão)
- ONGs de direitos humanos

🔒 ÉTICA E SIGILO:
- Código de Ética do Psicólogo
- Sigilo absoluto (LGPD)
- Consentimento informado
- Respeito à diversidade
- Abordagem humanizada
- Não julgamento

Este projeto é sobre cuidar da mente e da alma de quem mais sofre e menos tem acesso. Saúde mental não é luxo, é direito! Cada doação representa esperança e acolhimento para quem precisa.`,
        image: '/uploads/projects/saude-mental.jpg',
        goalAmount: 70000,
        currentAmount: 31800,
        endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        location: 'Fortaleza, CE - Grande Bom Jardim',
        isFeatured: false,
        creatorId: users[2].id,
        categoryId: categories.find(c => c.name === 'Saúde')!.id
      }
    }),

    // TECNOLOGIA - Projeto 1
    prisma.project.create({
      data: {
        title: 'Inclusão Digital para Idosos',
        shortDescription: 'Ensinando idosos a usar computadores, smartphones e internet com segurança.',
        description: `O projeto Inclusão Digital para Idosos capacita pessoas da terceira idade no uso de tecnologias digitais, promovendo autonomia, conexão social, acesso a serviços e combate ao isolamento em um mundo cada vez mais digital.

👴💻 POR QUE ESTE PROJETO É IMPORTANTE?

A exclusão digital é uma realidade para milhões de idosos brasileiros que:
- Não sabem usar celular, computador ou internet
- Dependem de terceiros para tarefas básicas
- Perdem oportunidades e benefícios por falta de conhecimento
- Sentem-se isolados socialmente
- São vítimas de golpes digitais
- Não conseguem acessar serviços bancários e de saúde online
- Ficam excluídos da comunicação com familiares distantes

🎯 OBJETIVO:
Ensinar idosos a usar tecnologias digitais de forma prática, segura e autônoma, melhorando sua qualidade de vida, independência e inclusão social.

📱 O QUE OS ALUNOS VÃO APRENDER:

MÓDULO 1: PRIMEIROS PASSOS (4 semanas)
- Ligar e desligar computador/celular
- Uso do mouse e teclado
- Área de trabalho e ícones
- Como abrir e fechar programas
- Criar e organizar pastas
- Tirar e salvar fotos

MÓDULO 2: INTERNET BÁSICA (4 semanas)
- O que é internet e como funciona
- Navegadores (Chrome, Firefox)
- Fazer buscas no Google
- Assistir vídeos no YouTube
- Ler notícias online
- Segurança: senhas e cuidados

MÓDULO 3: COMUNICAÇÃO (4 semanas)
- Criar e usar e-mail (Gmail)
- WhatsApp: mensagens, fotos, vídeos
- Videochamadas (Zoom, Google Meet)
- Facebook: criar perfil, postar, comentar
- Instagram básico
- Contatos e agenda

MÓDULO 4: SERVIÇOS ÚTEIS (4 semanas)
- Internet banking e PIX
- Aplicativo do banco
- Gov.br e Meu INSS
- Telemedicina e agendamentos
- Uber e transporte por app
- Compras online seguras

MÓDULO 5: SEGURANÇA DIGITAL (2 semanas)
- Identificar golpes e fake news
- Proteção de dados pessoais
- Não cair em vírus
- Privacidade em redes sociais
- O que compartilhar (ou não)

MÓDULO 6: ENTRETENIMENTO (2 semanas)
- Netflix, Globoplay, YouTube
- Spotify e música online
- Jogos educativos
- Aplicativos de saúde e exercícios
- Fotografia com celular
- Edição básica de fotos

👨‍🏫 METODOLOGIA:
- Turmas pequenas (máximo 12 alunos)
- Aulas 2x por semana (2 horas cada)
- 1 professor + 2 monitores jovens
- Ritmo adaptado à terceira idade
- Muita paciência e repetição
- Material impresso de apoio
- Exercícios práticos
- Atendimento individualizado
- Clima acolhedor e descontraído

🏫 ESTRUTURA:
- Sala de aula equipada (60m²)
- 15 computadores (um por aluno)
- Projetor e tela grande
- Quadro branco
- Roteador wifi potente
- 15 smartphones (para treino)
- Mesas e cadeiras confortáveis
- Ar condicionado
- Café e água

👥 EQUIPE:
- 2 instrutores especializados
- 4 monitores jovens (voluntários)
- 1 coordenador pedagógico
- 1 suporte técnico (TI)
- 1 recepcionista

📅 FUNCIONAMENTO:
- Turmas manhã e tarde
- 3 turmas simultâneas/semestre
- 36 alunos por semestre
- Curso de 4 meses (18 semanas)
- Certificado de conclusão
- Turmas iniciantes e avançadas

💰 INVESTIMENTOS:

ESTRUTURA (R$ 42.000):
- 15 computadores (R$ 800 cada): R$ 12.000
- 15 smartphones treino (R$ 400 cada): R$ 6.000
- Mobiliário (mesas, cadeiras): R$ 8.000
- Projetor e equipamentos: R$ 5.000
- Instalação de rede e cabeamento: R$ 3.000
- Reforma e adaptação da sala: R$ 5.000
- Material didático impresso: R$ 3.000

CUSTO SEMESTRAL (R$ 18.000):
- Salários (instrutores e suporte): R$ 12.000
- Aluguel e condomínio: R$ 3.000
- Internet, luz, água: R$ 1.200
- Manutenção e materiais: R$ 1.800

Meta: R$ 60.000 (estrutura + 1º semestre)

🎯 IMPACTO:
- 72 idosos capacitados/ano
- 3.000 horas de aula/ano
- 90% de aproveitamento
- 95% concluem o curso
- 100% relatam melhora na qualidade de vida
- Criação de rede de amizades
- Redução do isolamento social

📊 BENEFÍCIOS COMPROVADOS:
- Autonomia e independência
- Comunicação com família
- Acesso a serviços
- Entretenimento e lazer
- Prevenção de golpes
- Autoestima elevada
- Novos amigos
- Mente ativa (prevenção de demências)
- Empoderamento digital

🏆 RESULTADOS DO PILOTO:
- 24 idosos formados
- Idade média: 68 anos
- Aluna mais velha: 87 anos
- 100% aprenderam WhatsApp
- 92% usam internet banking
- 88% fazem videochamadas
- 100% recomendam o curso

🌟 DEPOIMENTOS:
"Aos 72 anos, aprendi a usar WhatsApp e hoje falo com meus netos todos os dias!" - Dona Rosa

"Não precisomais pedir ajuda para fazer PIX. Me sinto independente!" - Seu Antônio, 70 anos

"Fiz amigos no curso e agora temos um grupo no WhatsApp. Não me sinto mais sozinha." - Dona Glória, 75 anos

👶👴 INTERGERACIONALIDADE:
- Monitores jovens de 16 a 25 anos
- Troca de experiências entre gerações
- Jovens aprendem paciência e respeito
- Idosos se sentem valorizados
- Fortalecimento de vínculos sociais

📚 MATERIAL DIDÁTICO:
- Apostila ilustrada e com letras grandes
- Vídeo-aulas gravadas
- Lista de comandos principais
- Guia de segurança digital
- Cartilha de primeiros socorros digitais
- Certificado ao final

🤝 PARCERIAS:
- Secretaria Municipal do Idoso
- Centros de Convivência
- Universidade Aberta à Terceira Idade
- Lojas de tecnologia (descontos)
- Bancos (palestras sobre segurança)
- Empresas de telecom (internet)

🔄 SUSTENTABILIDADE:
Após 1 ano, o projeto será mantido por:
- Contribuição simbólica (R$ 50/mês quem pode)
- Parcerias com empresas
- Convênios com prefeitura
- Ex-alunos que viram monitores

Este projeto é sobre dignidade, autonomia e inclusão. Em um mundo digital, nenhum idoso deve ficar para trás! Cada doação conecta uma pessoa à sua família, ao mundo e ao futuro!`,
        image: '/uploads/projects/inclusao-digital-idosos.jpg',
        goalAmount: 60000,
        currentAmount: 27400,
        endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
        location: 'Campinas, SP - Região Sudoeste',
        isFeatured: false,
        creatorId: users[5].id,
        categoryId: categories.find(c => c.name === 'Tecnologia')!.id
      }
    }),

    // TECNOLOGIA - Projeto 2
    prisma.project.create({
      data: {
        title: 'Aplicativos Sociais - Hackathon',
        shortDescription: 'Maratona de programação para desenvolver aplicativos que resolvam problemas sociais reais.',
        description: `O Hackathon de Aplicativos Sociais é uma maratona de programação que reúne desenvolvedores, designers e empreendedores sociais para criar soluções tecnológicas inovadoras que resolvam problemas reais das comunidades vulneráveis.

💡 O QUE É UM HACKATHON SOCIAL?

É um evento intensivo de 48 horas onde equipes multidisciplinares desenvolvem protótipos de aplicativos e soluções digitais focadas em impacto social. Diferente de hackathons comerciais, aqui o lucro não é o objetivo - o foco é transformar vidas!

🎯 OBJETIVOS:
- Desenvolver aplicativos com impacto social
- Conectar tecnologia com causas sociais
- Formar equipes colaborativas
- Identificar talentos de comunidades
- Incubar startups sociais
- Criar soluções reais e viáveis
- Democratizar o acesso à inovação

🚀 DESAFIOS PROPOSTOS:

SAÚDE:
- App para agendamento em UBS
- Telemedicina para comunidades
- Mapeamento de farmácias populares
- Lembretes de medicação para idosos
- Rede de apoio à saúde mental

EDUCAÇÃO:
- Plataforma de reforço escolar
- Rede de bibliotecas comunitárias
- Gamificação da alfabetização
- Marketplace de doação de livros

SEGURANÇA ALIMENTAR:
- Mapa de distribuição de alimentos
- Conectar doadores e beneficiários
- App para reduzir desperdício
- Hortas comunitárias conectadas

MOBILIDADE:
- Carona solidária
- Mapa de transporte alternativo
- Segurança em deslocamentos
- Acessibilidade urbana

MEIO AMBIENTE:
- Coleta seletiva gamificada
- Mapa de pontos de reciclagem
- Denúncia de poluição
- Marketplace de produtos sustentáveis

SEGURANÇA:
- App de segurança comunitária
- Botão do pânico conectado
- Mapa colaborativo de áreas seguras
- Rede de vigilância cidadã

👥 PÚBLICO E PARTICIPANTES:
- 100 participantes (desenvolvedores, designers, UX, empreendedores)
- 20 equipes de 5 pessoas
- 30% de vagas para moradores de comunidades
- 40% de vagas para mulheres
- Bolsas integrais para pessoas de baixa renda
- Diversidade obrigatória nas equipes

📅 ESTRUTURA DO EVENTO:

SEXTA-FEIRA (18h-23h):
- 18h: Credenciamento e welcome coffee
- 19h: Abertura oficial
- 19h30: Palestras inspiracionais
- 20h30: Apresentação dos desafios
- 21h: Formação das equipes
- 22h: Início do desenvolvimento

SÁBADO (9h-23h):
- 9h: Café da manhã
- 10h: Mentorias técnicas
- 12h: Almoço
- 14h: Workshops (UI/UX, Pitch, Modelagem)
- 18h: Jantar
- 20h: Checkpoint de progresso
- 23h: Virada da madrugada

DOMINGO (9h-18h):
- 9h: Café da manhã
- 12h: Almoço
- 14h: DEADLINE - envio dos projetos
- 15h: Pitches (5min por equipe)
- 17h: Deliberação do júri
- 17h30: Premiação e encerramento

🏆 PREMIAÇÃO:

1º LUGAR (R$ 10.000):
- Prêmio em dinheiro
- 3 meses de incubação
- Mentoria especializada
- Investimento inicial para MVP

2º LUGAR (R$ 5.000):
- Prêmio em dinheiro
- 2 meses de incubação
- Mentoria especializada

3º LUGAR (R$ 3.000):
- Prêmio em dinheiro
- 1 mês de incubação

PRÊMIOS ESPECIAIS:
- Melhor design
- Maior impacto social
- Melhor pitch
- Equipe mais diversa

PÓS-HACKATHON:
- Todos os projetos serão open-source
- Equipes podem seguir desenvolvendo
- Conexão com ONGs e investidores
- Apoio na implementação real

👨‍🏫 MENTORIAS E JURADOS:
- 15 mentores técnicos (devs, designers, empreendedores)
- 5 mentores de impacto social (ONGs, assistentes sociais)
- Júri de 7 pessoas (tech + social)
- Especialistas em áreas específicas
- Investidores de impacto

🏢 INFRAESTRUTURA:

LOCAL:
- Espaço de 600m²
- 5 salas de trabalho
- Auditório para 120 pessoas
- Áreas de descanso
- Wifi ultra-rápido
- Ar condicionado

EQUIPAMENTOS:
- 50 tomadas e extensões
- 20 monitores extras
- 10 quadros brancos
- Material de prototipagem
- Servidor local
- Sistema de som e projeção

ALIMENTAÇÃO:
- 6 refeições completas
- Coffee breaks (3 por dia)
- Snacks 24h
- Bebidas variadas
- Opções vegetarianas/veganas

HOSPEDAGEM:
- Colchões e travesseiros (quem quiser dormir)
- Chuveiros disponíveis

💰 ORÇAMENTO:

INFRAESTRUTURA (R$ 15.000):
- Aluguel do espaço (3 dias): R$ 8.000
- Equipamentos e materiais: R$ 4.000
- Decoração e sinalização: R$ 2.000
- Segurança: R$ 1.000

ALIMENTAÇÃO (R$ 12.000):
- Refeições principais (600 refeições): R$ 8.000
- Coffee breaks e snacks: R$ 3.000
- Bebidas: R$ 1.000

PREMIAÇÃO (R$ 18.000):
- Prêmios em dinheiro: R$ 18.000

LOGÍSTICA (R$ 10.000):
- Transporte de participantes: R$ 4.000
- Materiais gráficos e camisetas: R$ 3.000
- Divulgação: R$ 2.000
- Imprevistos: R$ 1.000

INCUBAÇÃO PÓS-EVENTO (R$ 15.000):
- 6 meses de suporte para 3 equipes

Total: R$ 70.000

🌟 DIFERENCIAIS:

INCLUSÃO:
- Bolsas para participantes de baixa renda
- Transporte para quem precisa
- Acessibilidade (intérpretes de Libras)
- Creche no local (para mães/pais)
- Material em português claro

IMPACTO REAL:
- Conexão com ONGs desde o início
- Desafios baseados em problemas reais
- Implementação após o evento
- Acompanhamento dos projetos

FORMAÇÃO:
- Workshops durante o evento
- Mentorias individualizadas
- Material educativo
- Networking qualificado

📊 IMPACTO ESPERADO:
- 100 participantes capacitados
- 20 protótipos desenvolvidos
- 3 apps implementados
- 200 pessoas beneficiadas indiretamente
- 5 startups sociais nascentes
- 50 conexões profissionais
- Cobertura de mídia local

🏆 EDIÇÕES ANTERIORES:
- 2023: App "Marmita Solidária" - conecta 500 famílias/mês
- 2022: App "Remédio Fácil" - 2.000 usuários ativos
- 2021: "Carona Segura Mulher" - 800 usuárias

🤝 PARCERIAS:
- Universidades (apoio técnico)
- Empresas de tecnologia (patrocínio)
- Aceleradoras e incubadoras
- ONGs e movimentos sociais
- Prefeitura e órgãos públicos
- Mídia local

Este projeto é sobre usar a tecnologia para o bem, unir pessoas talentosas em torno de causas nobres e provar que inovação pode (e deve) servir à justiça social!`,
        image: '/uploads/projects/hackathon-social.jpg',
        goalAmount: 70000,
        currentAmount: 38600,
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        location: 'São Paulo, SP - Centro',
        isFeatured: true,
        creatorId: users[5].id,
        categoryId: categories.find(c => c.name === 'Tecnologia')!.id
      }
    })
  ])

  // Criar doações de exemplo
  console.log('💰 Criando doações...')
  const donations = []
  for (let i = 0; i < 50; i++) {
    const randomProject = projects[Math.floor(Math.random() * projects.length)]
    const randomDonor = users[Math.floor(Math.random() * users.length)]
    const amounts = [10, 25, 50, 100, 200, 500]
    const randomAmount = amounts[Math.floor(Math.random() * amounts.length)]
    
    if (randomDonor.id !== randomProject.creatorId) { // Evitar auto-doação
      donations.push(
        prisma.donation.create({
          data: {
            amount: randomAmount,
            isAnonymous: Math.random() > 0.7,
            message: Math.random() > 0.6 ? 'Parabéns pela iniciativa! Conte comigo nessa jornada.' : undefined,
            paypalStatus: 'COMPLETED',
            donorId: randomDonor.id,
            projectId: randomProject.id
          }
        })
      )
    }
  }
  await Promise.all(donations)

  // Criar comentários de exemplo
  console.log('💬 Criando comentários...')
  const comments = []
  const commentTexts = [
    'Projeto incrível! Muito importante para nossa comunidade.',
    'Parabéns pela iniciativa! Como posso ajudar como voluntário?',
    'Adorei a proposta. Já fiz minha doação e compartilhei com amigos.',
    'Que trabalho lindo! Estou acompanhando o progresso.',
    'Excelente ideia! Vamos juntos transformar nossa realidade.',
    'Projeto necessário e muito bem estruturado. Sucesso!',
    'Admiro muito o trabalho de vocês. Continue assim!',
    'Que iniciativa maravilhosa! Toda força do mundo para vocês.'
  ]

  for (let i = 0; i < 30; i++) {
    const randomProject = projects[Math.floor(Math.random() * projects.length)]
    const randomAuthor = users[Math.floor(Math.random() * users.length)]
    const randomComment = commentTexts[Math.floor(Math.random() * commentTexts.length)]
    
    comments.push(
      prisma.comment.create({
        data: {
          content: randomComment,
          authorId: randomAuthor.id,
          projectId: randomProject.id
        }
      })
    )
  }
  await Promise.all(comments)

  console.log('✅ Seed concluído com sucesso!')
  console.log(`
📊 Dados criados:
- ${categories.length} categorias
- ${users.length} usuários
- ${projects.length} projetos (2 por categoria)
- ${donations.length} doações
- ${comments.length} comentários

📂 Categorias e Projetos:
🍞 ALIMENTAÇÃO:
  1. Cozinha Comunitária Solidária
  2. Horta Urbana em Favelas

📚 EDUCAÇÃO:
  3. Robótica na Escola Pública
  4. Cursinho Popular Pré-Vestibular

⚽ ESPORTE E LAZER:
  5. Natação para Crianças Carentes
  6. Skate Social - Pista Comunitária

🌱 MEIO AMBIENTE:
  7. Reciclagem e Renda - Cooperativa
  8. Preservação de Nascentes Urbanas

🏥 SAÚDE:
  9. Fisioterapia para Idosos
  10. Saúde Mental na Periferia

💻 TECNOLOGIA:
  11. Inclusão Digital para Idosos
  12. Aplicativos Sociais - Hackathon

🔑 Usuários de teste (senha: 123456):
- maria.silva@email.com (Educação)
- joao.santos@email.com (Meio Ambiente)
- ana.costa@email.com (Saúde)
- carlos.lima@email.com (Alimentação)
- lucia.mendes@email.com (Esporte e Lazer)
- rafael.tech@email.com (Tecnologia)
  `)
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })