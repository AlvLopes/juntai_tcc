import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/providers'
import { Header } from '@/components/header'
import { Toaster } from 'sonner'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Juntaí - Plataforma de Crowdfunding Social',
  description: 'Uma plataforma para financiamento coletivo de projetos sociais. Apoie causas que fazem a diferença na sociedade.',
  keywords: 'crowdfunding, social, doações, projetos sociais, financiamento coletivo',
  authors: [{ name: 'Juntaí Team' }],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script src="https://www.paypal.com/sdk/js?client-id=AQr71zZRG40OYOUuvyg9SFBpMpOgoWsuzO3As0gQ65nwshqVNgaHuW-dIiv86yP6wT6KZIeqhvByAw60&currency=USD" async></script>
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
            <Header />
            <main className="pb-12">
              {children}
            </main>
            <Toaster 
              position="top-center"
              toastOptions={{
                duration: 4000,
              }}
            />
          </div>
        </Providers>
      </body>
    </html>
  )
}