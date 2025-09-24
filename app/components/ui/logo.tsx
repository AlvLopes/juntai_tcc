
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LogoProps {
  variant?: 'horizontal-1' | 'horizontal-2' | 'horizontal-3' | 'horizontal-4' | 'horizontal-5' | 
           'vertical-1' | 'vertical-2' | 'vertical-3' | 'vertical-4' | 'vertical-5'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  href?: string
  priority?: boolean
}

const sizeConfig = {
  sm: {
    horizontal: { width: 120, height: 40 },
    vertical: { width: 60, height: 80 }
  },
  md: {
    horizontal: { width: 150, height: 50 },
    vertical: { width: 80, height: 100 }
  },
  lg: {
    horizontal: { width: 200, height: 67 },
    vertical: { width: 120, height: 150 }
  },
  xl: {
    horizontal: { width: 300, height: 100 },
    vertical: { width: 180, height: 225 }
  }
}

export function Logo({ 
  variant = 'horizontal-2', 
  size = 'md', 
  className = '',
  href = '/',
  priority = false
}: LogoProps) {
  const isVertical = variant.startsWith('vertical')
  const dimensions = isVertical ? sizeConfig[size].vertical : sizeConfig[size].horizontal
  const logoSrc = `/logo-${variant}.png`
  
  const logoImage = (
    <div className={cn('relative flex items-center', className)}>
      <Image
        src={logoSrc}
        alt="Juntaí"
        width={dimensions.width}
        height={dimensions.height}
        className="object-contain"
        priority={priority}
        onError={(e) => {
          console.warn(`Failed to load logo: ${logoSrc}`)
        }}
      />
    </div>
  )

  if (href) {
    return (
      <Link 
        href={href} 
        className="flex items-center hover:opacity-80 transition-opacity"
      >
        {logoImage}
      </Link>
    )
  }

  return logoImage
}

// Componente auxiliar para o favicon
export function LogoIcon({ className = '' }: { className?: string }) {
  return (
    <div className={cn('relative', className)}>
      <Image
        src="/logo-vertical-2.png"
        alt="Juntaí"
        width={32}
        height={32}
        className="object-contain"
      />
    </div>
  )
}
