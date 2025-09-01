# juntai_tcc

# Juntai - Plataforma de Crowdfunding para Projetos Sociais

[![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.6-blue?style=for-the-badge&logo=prisma)](https://prisma.io/)
[![NextAuth](https://img.shields.io/badge/NextAuth.js-4.24-green?style=for-the-badge)](https://next-auth.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## 📋 Sobre o Projeto

O **Juntai** é uma plataforma inovadora de financiamento coletivo dedicada exclusivamente a projetos sociais. Nosso objetivo é conectar idealizadores de projetos de impacto social com pessoas que desejam contribuir para um mundo melhor, facilitando o processo de arrecadação de fundos e promovendo transformação social.

### ✨ Funcionalidades Principais

- 🚀 **Criação de Projetos**: Interface intuitiva para cadastro de iniciativas sociais
- 💰 **Sistema de Doações**: Integração com gateways de pagamento para contribuições seguras
- 👥 **Autenticação**: Sistema completo de cadastro e login com NextAuth.js
- 📊 **Dashboard Interativo**: Acompanhamento em tempo real do progresso das arrecadações
- 🎨 **Design Responsivo**: Experiência perfeita em desktop e dispositivos móveis
- 🔒 **Moderação**: Sistema de validação para garantir a idoneidade dos projetos

## 🛠️ Stack Tecnológica

- **Framework**: Next.js 14 com App Router
- **Banco de Dados**: PostgreSQL com Prisma ORM
- **Autenticação**: NextAuth.js com múltiplos providers
- **Estilização**: Tailwind CSS para design responsivo
- **Type Safety**: TypeScript em todo o projeto
- **Deploy**: Vercel (Frontend) + Railway (Backend e Banco)

## 🚀 Como Executar

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/juntai-platform.git

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Execute o Prisma
npx prisma generate
npx prisma db push

# Inicie o servidor de desenvolvimento
npm run dev

juntai-platform/
├── app/                 # Next.js App Router
├── components/          # Componentes React reutilizáveis
├── lib/                 # Configurações (Prisma, Auth, etc.)
├── prisma/              # Schema e migrations do banco
├── public/              # Arquivos estáticos
└── types/               # Definições TypeScript

👥 Equipe de Desenvolvimento
Desenvolvedores
Pedro Henrique Alves - @pedroalves

- Backend Development
- Arquitetura de Sistemas
- Integração com APIs de Pagamento

Rafael Domingos Alves - @rafaelalves

- UI/UX Design
- Frontend Development
- Experiência do Usuário

Orientação
Prof. Me. Emílio Carlos Rodrigues - Orientador

- Coordenação Pedagógica
- Metodologia Científica
- Revisão Técnica
