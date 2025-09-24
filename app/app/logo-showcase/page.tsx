
'use client'

import { Logo } from '@/components/ui/logo'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function LogoShowcasePage() {
  const horizontalVariants = [
    { variant: 'horizontal-1' as const, name: 'Horizontal 1 - Laranja/Azul' },
    { variant: 'horizontal-2' as const, name: 'Horizontal 2 - Azul/Laranja' },
    { variant: 'horizontal-3' as const, name: 'Horizontal 3 - Verde/Azul' },
    { variant: 'horizontal-4' as const, name: 'Horizontal 4 - Azul/Verde' },
    { variant: 'horizontal-5' as const, name: 'Horizontal 5 - Branco/Claro' }
  ]

  const verticalVariants = [
    { variant: 'vertical-1' as const, name: 'Vertical 1 - Laranja' },
    { variant: 'vertical-2' as const, name: 'Vertical 2 - Azul' },
    { variant: 'vertical-3' as const, name: 'Vertical 3 - Verde' },
    { variant: 'vertical-4' as const, name: 'Vertical 4 - Azul' },
    { variant: 'vertical-5' as const, name: 'Vertical 5 - Branco/Claro' }
  ]

  const sizes = [
    { size: 'sm' as const, name: 'Pequeno' },
    { size: 'md' as const, name: 'Médio' },
    { size: 'lg' as const, name: 'Grande' },
    { size: 'xl' as const, name: 'Extra Grande' }
  ]

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Showcase de Logos Juntaí</h1>
          <p className="text-gray-600">
            Todas as variações de logo disponíveis para a plataforma Juntaí
          </p>
        </div>

        {/* Logos Horizontais */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Logos Horizontais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {horizontalVariants.map((variant) => (
              <Card key={variant.variant} className="p-6">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">{variant.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {sizes.map((size) => (
                    <div key={size.size} className="text-center">
                      <p className="text-sm text-gray-600 mb-2">{size.name}</p>
                      <div className="bg-gray-50 p-4 rounded-lg flex justify-center">
                        <Logo 
                          variant={variant.variant}
                          size={size.size}
                          href="#"
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Logos Verticais */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Logos Verticais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {verticalVariants.map((variant) => (
              <Card key={variant.variant} className="p-6">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">{variant.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {sizes.map((size) => (
                    <div key={size.size} className="text-center">
                      <p className="text-sm text-gray-600 mb-2">{size.name}</p>
                      <div className="bg-gray-50 p-4 rounded-lg flex justify-center">
                        <Logo 
                          variant={variant.variant}
                          size={size.size}
                          href="#"
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Demonstração em fundos diferentes */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Teste em Diferentes Fundos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fundo branco */}
            <Card>
              <CardHeader>
                <CardTitle>Fundo Branco</CardTitle>
              </CardHeader>
              <CardContent className="bg-white p-8 rounded-lg">
                <div className="space-y-4 text-center">
                  <Logo variant="horizontal-2" size="lg" href="#" />
                  <Logo variant="vertical-2" size="md" href="#" />
                </div>
              </CardContent>
            </Card>

            {/* Fundo escuro */}
            <Card>
              <CardHeader>
                <CardTitle>Fundo Escuro</CardTitle>
              </CardHeader>
              <CardContent className="bg-gray-900 p-8 rounded-lg">
                <div className="space-y-4 text-center">
                  <Logo variant="horizontal-2" size="lg" href="#" className="filter brightness-0 invert" />
                  <Logo variant="vertical-2" size="md" href="#" className="filter brightness-0 invert" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Instruções de uso */}
        <section className="bg-blue-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Como Usar</h2>
          <div className="prose max-w-none">
            <p className="mb-4">
              Para usar as logos em seus componentes, importe o componente Logo e use as propriedades disponíveis:
            </p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto">
{`import { Logo } from '@/components/ui/logo'

// Exemplo básico
<Logo variant="horizontal-2" size="md" />

// Com link
<Logo variant="vertical-2" size="lg" href="/" />

// Com classes personalizadas
<Logo 
  variant="horizontal-1" 
  size="sm" 
  className="hover:opacity-80" 
/>`}
            </pre>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Variantes disponíveis:</h3>
              <ul className="list-disc list-inside space-y-1">
                <li><code>horizontal-1</code> a <code>horizontal-5</code> - Logos na orientação horizontal</li>
                <li><code>vertical-1</code> a <code>vertical-5</code> - Logos na orientação vertical</li>
              </ul>
              <h3 className="text-lg font-semibold mb-2 mt-4">Tamanhos disponíveis:</h3>
              <ul className="list-disc list-inside space-y-1">
                <li><code>sm</code> - Pequeno</li>
                <li><code>md</code> - Médio (padrão)</li>
                <li><code>lg</code> - Grande</li>
                <li><code>xl</code> - Extra Grande</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
