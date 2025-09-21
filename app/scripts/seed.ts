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
        isVerified: true
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
        isVerified: true
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
        isVerified: true
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
        isVerified: true
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
        isVerified: true
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
        isVerified: true
      }
    })
  ])

  // Criar projetos de exemplo
  console.log('🎯 Criando projetos...')
  const projects = await Promise.all([
    prisma.project.create({
      data: {
        title: 'Biblioteca Comunitária do Futuro',
        shortDescription: 'Transformando vidas através da leitura e educação em comunidades carentes.',
        description: `Nossa missão é criar um espaço educacional completo que sirva como centro de aprendizado para crianças e adolescentes em situação de vulnerabilidade social.

O projeto visa construir e equipar uma biblioteca comunitária moderna com:
- Acervo de 5.000 livros infanto-juvenis
- Computadores para pesquisa e ensino de informática
- Espaço para aulas de reforço escolar
- Oficinas de leitura e escrita criativa
- Programas de alfabetização de adultos

Os recursos arrecadados serão destinados à compra de livros, equipamentos de informática, móveis e material didático. Também iremos custear a capacitação de educadores voluntários.

Com sua ajuda, poderemos atender mais de 300 crianças e suas famílias, oferecendo ferramentas essenciais para um futuro melhor através da educação.`,
        image: 'https://cdn.abacus.ai/images/a07f5de4-a45b-43f6-9e93-14ee3be5b088.png',
        goalAmount: 25000,
        currentAmount: 8750,
        endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 dias
        location: 'São Paulo, SP',
        isFeatured: true,
        creatorId: users[0].id,
        categoryId: categories[0].id
      }
    }),
    prisma.project.create({
      data: {
        title: 'Verde Urbano - Reflorestamento Comunitário',
        shortDescription: 'Plantio de 1.000 árvores nativas para revitalizar espaços urbanos degradados.',
        description: `O projeto Verde Urbano tem como objetivo plantar 1.000 árvores nativas em áreas urbanas degradadas da cidade, criando espaços verdes que beneficiem toda a comunidade.

Objetivos específicos:
- Plantar árvores frutíferas e nativas da região
- Criar hortas comunitárias sustentáveis
- Capacitar moradores em técnicas de jardinagem
- Desenvolver programa de educação ambiental
- Instalar sistema de compostagem comunitária

Os benefícios incluem:
- Melhoria da qualidade do ar
- Redução da temperatura local
- Criação de espaços de convivência
- Geração de alimentos orgânicos
- Consciência ambiental

Cada R$ 25 doados plantam uma árvore. Sua contribuição fará a diferença para as próximas gerações!`,
        image: 'https://cdn.abacus.ai/images/bdc7b7a5-363b-4b2d-b275-bb89eac0b3d5.png',
        goalAmount: 15000,
        currentAmount: 12300,
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias
        location: 'Rio de Janeiro, RJ',
        isFeatured: true,
        creatorId: users[1].id,
        categoryId: categories[1].id
      }
    }),
    prisma.project.create({
      data: {
        title: 'Saúde Mobile - Atendimento em Comunidades',
        shortDescription: 'Levando atendimento médico gratuito às comunidades mais necessitadas.',
        description: `O projeto Saúde Mobile tem a missão de levar atendimento médico de qualidade às comunidades que mais precisam, através de uma unidade móvel equipada.

Nossa proposta inclui:
- Consultas médicas e odontológicas gratuitas
- Exames preventivos (pressão, diabetes, colesterol)
- Distribuição de medicamentos básicos
- Campanhas de vacinação
- Orientações sobre saúde preventiva
- Encaminhamento para tratamentos especializados

A unidade móvel será equipada com:
- Consultório médico completo
- Equipamentos para exames básicos
- Farmácia com medicamentos essenciais
- Sistema de prontuário eletrônico
- Equipamentos de emergência

Meta: atender 500 famílias por mês em 5 comunidades diferentes. Cada doação nos ajuda a manter este serviço essencial funcionando!`,
        image: 'https://cdn.abacus.ai/images/6975de97-148a-42be-a511-cd46ccd4f767.png',
        goalAmount: 35000,
        currentAmount: 18900,
        endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 dias
        location: 'Fortaleza, CE',
        isFeatured: true,
        creatorId: users[2].id,
        categoryId: categories[2].id
      }
    }),
    prisma.project.create({
      data: {
        title: 'Mesa Solidária - Combate à Fome',
        shortDescription: 'Distribuição de refeições nutritivas para famílias em situação de insegurança alimentar.',
        description: `O projeto Mesa Solidária combate a fome distribuindo refeições nutritivas e cestas básicas para famílias em situação de vulnerabilidade social.

Nossas ações incluem:
- Distribuição de 500 refeições semanais
- Entrega de cestas básicas mensais
- Oficinas de educação nutricional
- Horta comunitária para produção própria
- Capacitação em preparo de alimentos

Recursos necessários:
- Compra de alimentos não perecíveis
- Ingredientes para refeições quentes
- Equipamentos de cozinha industrial
- Transporte para distribuição
- Capacitação de voluntários

Impacto esperado:
- 200 famílias atendidas mensalmente
- 2.000 refeições distribuídas por mês
- Redução da desnutrição infantil na região
- Fortalecimento dos laços comunitários

Cada R$ 10 doados garantem uma refeição completa para uma família!`,
        image: 'https://cdn.abacus.ai/images/2439fac3-246b-4294-9834-dff25a76fbae.png',
        goalAmount: 20000,
        currentAmount: 5430,
        endDate: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000), // 40 dias
        location: 'Belo Horizonte, MG',
        isFeatured: false,
        creatorId: users[3].id,
        categoryId: categories[3].id
      }
    }),
    prisma.project.create({
      data: {
        title: 'Esporte Transformador - Futebol Social',
        shortDescription: 'Usando o futebol como ferramenta de inclusão social e desenvolvimento de jovens.',
        description: `O projeto Esporte Transformador utiliza o futebol como ferramenta de transformação social, oferecendo atividades esportivas para crianças e adolescentes em situação de risco.

Nossos programas incluem:
- Treinos de futebol 3x por semana
- Acompanhamento psicopedagógico
- Reforço escolar obrigatório
- Oficinas de cidadania e valores
- Torneios e intercâmbios esportivos
- Apoio nutricional (lanches pós-treino)

Estrutura necessária:
- Reforma da quadra poliesportiva
- Compra de equipamentos esportivos
- Uniformes para 100 atletas
- Material didático para aulas
- Bolsas de estudo para jovens talentos

Resultados esperados:
- 100 jovens participando regularmente
- Melhoria do rendimento escolar
- Redução da criminalidade juvenil
- Formação de futuros atletas
- Fortalecimento dos valores comunitários

Sua doação vai além do esporte - transforma vidas!`,
        image: 'https://cdn.abacus.ai/images/5c18191c-7062-4a0e-889c-bc09eed607ac.png',
        goalAmount: 18000,
        currentAmount: 14200,
        endDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000), // 25 dias
        location: 'Curitiba, PR',
        isFeatured: false,
        creatorId: users[4].id,
        categoryId: categories[4].id
      }
    }),
    prisma.project.create({
      data: {
        title: 'Código do Futuro - Programação para Todos',
        shortDescription: 'Democratizando o acesso ao ensino de programação para jovens de baixa renda.',
        description: `O projeto Código do Futuro tem como missão democratizar o acesso ao ensino de programação, oferecendo cursos gratuitos de desenvolvimento de software para jovens de 14 a 24 anos em situação de vulnerabilidade social.

Nosso programa oferece:
- Curso completo de desenvolvimento web (6 meses)
- Aulas de lógica de programação
- Projetos práticos com empresas parceiras
- Mentoria individualizada
- Certificação reconhecida pelo mercado
- Apoio na colocação profissional

Estrutura do curso:
- HTML, CSS e JavaScript
- React e Node.js
- Banco de dados e APIs
- Metodologias ágeis
- Soft skills para o mercado de trabalho

Investimentos necessários:
- 20 computadores novos
- Licenças de software
- Internet de alta velocidade
- Salário de 3 instrutores
- Material didático digital
- Certificações

Meta: formar 60 desenvolvedores por ano, com taxa de empregabilidade de 80%. Transforme o futuro de um jovem com sua doação!`,
        image: 'https://cdn.abacus.ai/images/c78e2f63-c553-43e4-b534-71d9a793e230.png',
        goalAmount: 45000,
        currentAmount: 22150,
        endDate: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000), // 50 dias
        location: 'Porto Alegre, RS',
        isFeatured: true,
        creatorId: users[5].id,
        categoryId: categories[5].id
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

  // Criar múltiplas imagens para projetos (ProjectMedia)
  console.log('🖼️ Adicionando imagens aos projetos...')
  const projectImages = [
    // Biblioteca Comunitária (projeto 0)
    {
      projectId: projects[0].id,
      images: [
        'https://img.globalcitizen.org/HvJCHRtP_sA-bl0yVpRLccSn0dDJj3RXALYbqj3-/1600x900%2Ffilters%3Aquality%2885%29%2Fhttps%3A%2F%2Fmedia.globalcitizen.org%2Ffd%2F34%2Ffd34778a-1795-4009-b876-0bb56c44fd44%2Fimprove-literacy-local-hero.jpg',
        'https://cdn.abacus.ai/images/2452dd8b-5c6a-467f-aae5-adb70f9c6adf.png',
        'https://cdn.abacus.ai/images/a51a53cf-e5a8-4405-afc0-74a2341b503e.png',
        'https://images.adsttc.com/media/images/6699/30cb/c8b7/c844/75ed/22ba/large_jpg/reading-as-a-social-act_18.jpg?1721315540'
      ]
    },
    // Verde Urbano (projeto 1)
    {
      projectId: projects[1].id,
      images: [
        'https://ychef.files.bbci.co.uk/1280x720/p0lyc7b9.jpg',
        'https://cdn.abacus.ai/images/aae0db6f-bfcb-4e2d-934e-d52b6aee81e0.png',
        'https://cdn.abacus.ai/images/1c81644d-cb30-4146-8339-25a336a607c3.png',
        'https://www.reuters.com/investigates/special-report/assets/brazil-environment-reforestation/741A0653.jpg?v=073501180823'
      ]
    },
    // Saúde Mobile (projeto 2)
    {
      projectId: projects[2].id,
      images: [
        'https://rmhc.org/-/media/Feature/RMHC-Production-Images/RMCM/Image-Gallery/Exterior/rmcm-imagegallery-exterior-4.png?h=540&iar=0&w=1025&hash=807DFE39708BAE979D6DBB9D423FE99F',
        'https://cdn.abacus.ai/images/221f5445-12b4-47f6-b5c6-87852601bd26.png',
        'https://cdn.abacus.ai/images/b25fcabb-2074-47e8-8ef7-42469eb5ce5a.png',
        'https://www.optum.com/content/dam/optum-dam/images/consumers/care/mobile-clinic-van-1080x720.jpg'
      ]
    },
    // Mesa Solidária (projeto 3)
    {
      projectId: projects[3].id,
      images: [
        'https://i.ytimg.com/vi/INZpwy_g8F4/maxresdefault.jpg',
        'https://cdn.abacus.ai/images/07e49322-fe32-4a49-9a3d-b9ce9ffaa428.png',
        'https://mluebagwtknq.i.optimole.com/cb:NsXo.5646/w:1651/h:997/q:mauto/f:best/https://tprf.org/wp-content/uploads/2023/05/Smiling-Head-of-Kitchen-Bibli-ASPA-Enjoys-TPRF-Grant-e1684833715240.png',
        'https://i0.wp.com/www.yesmagazine.org/wp-content/uploads/2020/11/belo-horizonte-food-security-2.jpg?resize=1024%2C658&quality=45&ssl=1'
      ]
    },
    // Esporte Transformador (projeto 4)
    {
      projectId: projects[4].id,
      images: [
        'https://i.ytimg.com/vi/FxYszbN0byQ/maxresdefault.jpg',
        'https://cdn.abacus.ai/images/5b118125-c3fd-4ba1-b17a-38b764498e8e.png',
        'https://ik.imagekit.io/rezeve/cms/images/blog-posts/50400d6d-fdfc-4d8f-b040-014f9c9ba4c1~Rezeve%20Gambar%20Fix%20(50).jpg',
        'https://supercampbrazil.com/wp-content/uploads/2023/02/youth-soccer-9.webp?w=750'
      ]
    },
    // Código do Futuro (projeto 5)
    {
      projectId: projects[5].id,
      images: [
        'https://storage.googleapis.com/nucamp-production.appspot.com/aiseo-blogs/coding-bootcamp-brazil-bra/coding-bootcamp-brazil-bra-top-5-best-coding-bootcamps-in-brazil-in-2025/thumbnail01.webp',
        'https://cdn.abacus.ai/images/ebe3274c-8d43-427f-aad1-031c71a10f4f.png',
        'https://news.mit.edu/sites/default/files/images/202310/brazil-2-octostudio_0.jpg',
        'https://www.apple.com/newsroom/images/product/services/standard/Apple-Computer-Science-Education-Week-hero_big.jpg.slideshow-large_2x.jpg'
      ]
    }
  ]

  const mediaEntries = []
  for (const project of projectImages) {
    for (let i = 0; i < project.images.length; i++) {
      mediaEntries.push(
        prisma.projectMedia.create({
          data: {
            projectId: project.projectId,
            url: project.images[i],
            type: 'IMAGEM',
            order: i,
            filename: `projeto-${project.projectId}-imagem-${i + 1}.jpg`
          }
        })
      )
    }
  }
  await Promise.all(mediaEntries)

  console.log('✅ Seed concluído com sucesso!')
  console.log(`
📊 Dados criados:
- ${categories.length} categorias
- ${users.length} usuários
- ${projects.length} projetos
- ${donations.length} doações
- ${comments.length} comentários
- ${mediaEntries.length} imagens de projetos

🔑 Usuários de teste (senha: 123456):
- maria.silva@email.com
- joao.santos@email.com
- ana.costa@email.com
- carlos.lima@email.com
- lucia.mendes@email.com
- rafael.tech@email.com
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