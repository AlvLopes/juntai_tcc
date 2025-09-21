

'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { MapPin, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface AddressData {
  cep: string
  address: string
  addressNumber: string
  complement: string
  neighborhood: string
  city: string
  state: string
  country: string
}

interface AddressFormProps {
  data: AddressData
  onChange: (data: Partial<AddressData>) => void
  disabled?: boolean
  showTitle?: boolean
}

export default function AddressForm({ 
  data, 
  onChange, 
  disabled = false,
  showTitle = true 
}: AddressFormProps) {
  const [loadingCep, setLoadingCep] = useState(false)

  const handleCepChange = (value: string) => {
    // Formatar CEP
    const formattedCep = value
      .replace(/\D/g, '') // Remove tudo que não é dígito
      .replace(/^(\d{5})(\d{3})$/, '$1-$2') // Adiciona o hífen

    onChange({ cep: formattedCep })

    // Se o CEP tem 8 dígitos, busca o endereço
    const cleanCep = value.replace(/\D/g, '')
    if (cleanCep.length === 8) {
      searchCep(cleanCep)
    }
  }

  const searchCep = async (cep: string) => {
    if (cep.length !== 8) return

    setLoadingCep(true)
    
    try {
      const response = await fetch(`/api/address/cep?cep=${cep}`)
      const result = await response.json()

      if (response.ok) {
        const { address } = result
        onChange({
          cep: address.cep,
          address: address.address,
          neighborhood: address.neighborhood,
          city: address.city,
          state: address.state,
          country: address.country
        })
        toast.success('Endereço encontrado!')
      } else {
        toast.error(result.error || 'CEP não encontrado')
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error)
      toast.error('Erro ao buscar CEP')
    } finally {
      setLoadingCep(false)
    }
  }

  return (
    <div className="space-y-4">
      {showTitle && (
        <div className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Endereço</h3>
        </div>
      )}

      {/* CEP */}
      <div className="space-y-2">
        <Label htmlFor="cep">CEP</Label>
        <div className="relative">
          <Input
            id="cep"
            name="cep"
            placeholder="00000-000"
            value={data.cep}
            onChange={(e) => handleCepChange(e.target.value)}
            disabled={disabled || loadingCep}
            maxLength={9}
          />
          {loadingCep && (
            <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-gray-400" />
          )}
        </div>
      </div>

      {/* Logradouro e Número */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="address">Logradouro</Label>
          <Input
            id="address"
            name="address"
            placeholder="Rua, Avenida..."
            value={data.address}
            onChange={(e) => onChange({ address: e.target.value })}
            disabled={disabled}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="addressNumber">Número</Label>
          <Input
            id="addressNumber"
            name="addressNumber"
            placeholder="123"
            value={data.addressNumber}
            onChange={(e) => onChange({ addressNumber: e.target.value })}
            disabled={disabled}
          />
        </div>
      </div>

      {/* Complemento */}
      <div className="space-y-2">
        <Label htmlFor="complement">Complemento</Label>
        <Input
          id="complement"
          name="complement"
          placeholder="Apartamento, bloco, etc."
          value={data.complement}
          onChange={(e) => onChange({ complement: e.target.value })}
          disabled={disabled}
        />
      </div>

      {/* Bairro */}
      <div className="space-y-2">
        <Label htmlFor="neighborhood">Bairro</Label>
        <Input
          id="neighborhood"
          name="neighborhood"
          placeholder="Centro, Vila..."
          value={data.neighborhood}
          onChange={(e) => onChange({ neighborhood: e.target.value })}
          disabled={disabled}
        />
      </div>

      {/* Cidade e Estado */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">Cidade</Label>
          <Input
            id="city"
            name="city"
            placeholder="São Paulo"
            value={data.city}
            onChange={(e) => onChange({ city: e.target.value })}
            disabled={disabled}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="state">Estado</Label>
          <Input
            id="state"
            name="state"
            placeholder="SP"
            value={data.state}
            onChange={(e) => onChange({ state: e.target.value })}
            disabled={disabled}
            maxLength={2}
          />
        </div>
      </div>
    </div>
  )
}

