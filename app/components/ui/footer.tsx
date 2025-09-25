
'use client'

import Link from 'next/link'
import { Logo } from './logo'
import { Facebook, Instagram, Twitter, Linkedin, Mail, MapPin, Phone, Heart } from 'lucide-react'

export function Footer() {
  const currentYear = 2025

  const navigation = {
    plataforma: [
      { name: 'Explorar Projetos', href: '/explore' },
      { name: 'Como Funciona', href: '/how-it-works' },
      { name: 'Criar Projeto', href: '/projects/create' },
    ],
    empresa: [
      { name: 'Sobre Nós', href: '/about' },
      { name: 'Nossa Missão', href: '/mission' },
      { name: 'Impacto Social', href: '/impact' },
    ],
    legal: [
      { name: 'Termos de Uso', href: '/terms' },
      { name: 'Política de Privacidade', href: '/privacy' },
    ],
  }

  const socialLinks = [
    { name: 'Facebook', href: 'https://facebook.com/juntai', icon: Facebook },
    { name: 'Instagram', href: 'https://instagram.com/juntai', icon: Instagram },
    { name: 'Twitter', href: 'https://twitter.com/juntai', icon: Twitter },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/juntai', icon: Linkedin },
  ]

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Logo variant="horizontal-2" size="lg" className="mb-4 brightness-0 invert" />
            <p className="text-slate-400 mb-6 max-w-sm">
              Conectando pessoas a causas que transformam o mundo. 
              Juntos, construímos um futuro mais solidário e sustentável.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-blue-500 flex-shrink-0" />
                <span>São Paulo, SP - Brasil</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-blue-500 flex-shrink-0" />
                <span>pedrohenrique.alveslp@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Navigation Sections */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Plataforma</h3>
            <ul className="space-y-3">
              {navigation.plataforma.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Empresa</h3>
            <ul className="space-y-3">
              {navigation.empresa.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Legal</h3>
            <ul className="space-y-3">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto max-w-7xl px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Heart className="h-4 w-4 text-red-500" />
              <span>© {currentYear} Juntaí. Feito com amor para transformar vidas.</span>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-400">Nos siga:</span>
              {socialLinks.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-slate-400 hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
