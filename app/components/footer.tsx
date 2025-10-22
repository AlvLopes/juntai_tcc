
'use client'

import Link from 'next/link'
import { Logo } from '@/components/ui/logo'
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  Heart
} from 'lucide-react'

export function Footer() {
  const currentYear = 2025

  const footerLinks = {
    platform: [
      { name: 'Como Funciona', href: '/how-it-works' },
      { name: 'Explorar Projetos', href: '/explore' },
      { name: 'Criar Projeto', href: '/projects/create' },
      { name: 'Categorias', href: '/categories' },
      { name: '🧪 Modo de Teste', href: '/test-mode' }
    ],
    company: [
      { name: 'Sobre Nós', href: '/about' },
      { name: 'Nossa Missão', href: '/mission' },
      { name: 'Impacto Social', href: '/impact' },
      { name: 'Contato', href: '/contact' }
    ]
  }

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <Logo 
              variant="horizontal-2" 
              size="lg" 
              className="mb-4 filter brightness-0 invert" 
              href="/"
            />
            <p className="text-gray-300 mb-6 leading-relaxed">
              Juntaí é a plataforma brasileira de crowdfunding social que conecta 
              pessoas com causas que fazem a diferença. Juntos, transformamos ideias 
              em realidade e criamos um impacto positivo na sociedade.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:contato@juntai.com.br" className="hover:text-white transition-colors">
                  contato@juntai.com.br
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Phone className="h-4 w-4 text-primary" />
                <span>(11) 99999-9999</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <MapPin className="h-4 w-4 text-primary" />
                <span>São Paulo, SP - Brasil</span>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Plataforma</h3>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Empresa</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-semibold mb-2 text-white">
                Fique por dentro das novidades
              </h3>
              <p className="text-gray-300 text-sm">
                Receba atualizações sobre novos projetos e campanhas de impacto social.
              </p>
            </div>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
              />
              <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap">
                Inscrever-se
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto max-w-7xl px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center justify-center gap-2 text-gray-300 text-sm">
              <span>© {currentYear} Juntaí. Todos os direitos reservados.</span>
              <Heart className="h-4 w-4 text-red-500" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
