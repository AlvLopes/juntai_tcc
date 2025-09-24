
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { ArrowLeft, Home, AlertCircle } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
            <AlertCircle className="w-12 h-12 text-primary" />
          </div>
        </div>
        
        {/* Error Code */}
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900">
            Página não encontrada
          </h2>
        </div>
        
        {/* Message */}
        <div className="space-y-4">
          <p className="text-gray-600 text-lg">
            Oops! A página que você está procurando não existe ou foi movida.
          </p>
          <p className="text-gray-500">
            Verifique se o endereço está correto ou navegue de volta para a página inicial.
          </p>
        </div>
        
        {/* Actions */}
        <div className="space-y-4">
          <Link href="/">
            <Button 
              size="lg" 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3"
            >
              <Home className="w-5 h-5 mr-2" />
              Clique aqui para voltar para a página inicial
            </Button>
          </Link>
          
          <Link href="/explore">
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full border-primary text-primary hover:bg-primary/5 font-medium py-3"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Explorar Projetos
            </Button>
          </Link>
        </div>
        
        {/* Brand */}
        <div className="pt-8">
          <Logo 
            variant="horizontal-2" 
            size="md" 
            href="/"
            className="inline-block hover:opacity-80 transition-opacity"
          />
        </div>
        
        {/* Additional Help */}
        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Precisa de ajuda? Entre em{' '}
            <Link href="/contact" className="text-primary hover:text-primary/80 font-medium">
              contato conosco
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
