
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { User, Mail, Phone, MapPin, Edit, Save } from 'lucide-react'
import { toast } from 'sonner'

const profileSchema = z.object({
  firstName: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(50, 'Nome deve ter no máximo 50 caracteres'),
  lastName: z.string()
    .min(2, 'Sobrenome deve ter pelo menos 2 caracteres')
    .max(50, 'Sobrenome deve ter no máximo 50 caracteres'),
  phone: z.string()
    .optional()
    .refine((phone) => !phone || phone.length >= 10, 'Telefone deve ter pelo menos 10 dígitos'),
  bio: z.string()
    .max(500, 'Bio deve ter no máximo 500 caracteres')
    .optional(),
  cep: z.string()
    .optional()
    .refine((cep) => !cep || /^\d{5}-?\d{3}$/.test(cep), 'CEP deve ter o formato 12345-678'),
  address: z.string()
    .max(100, 'Endereço deve ter no máximo 100 caracteres')
    .optional(),
  addressNumber: z.string()
    .max(10, 'Número deve ter no máximo 10 caracteres')
    .optional(),
  complement: z.string()
    .max(50, 'Complemento deve ter no máximo 50 caracteres')
    .optional(),
  neighborhood: z.string()
    .max(50, 'Bairro deve ter no máximo 50 caracteres')
    .optional(),
  city: z.string()
    .max(50, 'Cidade deve ter no máximo 50 caracteres')
    .optional(),
  state: z.string()
    .max(2, 'Estado deve ter no máximo 2 caracteres')
    .optional(),
  country: z.string()
    .max(50, 'País deve ter no máximo 50 caracteres')
    .optional()
})

type ProfileFormData = z.infer<typeof profileSchema>

interface UserProfile {
  id: number
  email: string
  firstName: string
  lastName: string
  phone?: string
  bio?: string
  avatar?: string
  createdAt: string
  cep?: string
  address?: string
  addressNumber?: string
  complement?: string
  neighborhood?: string
  city?: string
  state?: string
  country?: string
}

export default function ProfilePage() {
  const { data: session, status, update } = useSession() || {}
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema)
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login')
      return
    }
    
    if (status === 'authenticated') {
      fetchProfile()
    }
  }, [status, router])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/users/profile')
      if (response.ok) {
        const data = await response.json()
        setProfile(data)
        
        // Preencher formulário
        setValue('firstName', data.firstName)
        setValue('lastName', data.lastName)
        setValue('phone', data.phone || '')
        setValue('bio', data.bio || '')
        setValue('cep', data.cep || '')
        setValue('address', data.address || '')
        setValue('addressNumber', data.addressNumber || '')
        setValue('complement', data.complement || '')
        setValue('neighborhood', data.neighborhood || '')
        setValue('city', data.city || '')
        setValue('state', data.state || '')
        setValue('country', data.country || '')
      }
    } catch (error) {
      console.error('Erro ao buscar perfil:', error)
      toast.error('Erro ao carregar perfil')
    } finally {
      setLoading(false)
    }
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB
        toast.error('Avatar deve ter no máximo 2MB')
        return
      }
      
      if (!file.type.startsWith('image/')) {
        toast.error('Arquivo deve ser uma imagem')
        return
      }

      setAvatarFile(file)
      const reader = new FileReader()
      reader.onload = (e) => setAvatarPreview(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data: ProfileFormData) => {
    try {
      setIsSubmitting(true)

      let avatarUrl = profile?.avatar
      
      // Upload do avatar se fornecido
      if (avatarFile) {
        const formData = new FormData()
        formData.append('file', avatarFile)
        
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        })
        
        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json()
          avatarUrl = uploadData.url
        }
      }

      // Atualizar perfil
      const response = await fetch('/api/users/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...data,
          avatar: avatarUrl
        })
      })

      if (response.ok) {
        const updatedProfile = await response.json()
        setProfile(updatedProfile)
        setIsEditing(false)
        setAvatarFile(null)
        setAvatarPreview(null)
        
        // Atualizar sessão
        await update({
          ...session,
          user: {
            ...session?.user,
            firstName: updatedProfile.firstName,
            lastName: updatedProfile.lastName,
            avatar: updatedProfile.avatar
          }
        })
        
        toast.success('Perfil atualizado com sucesso!')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Erro ao atualizar perfil')
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error)
      toast.error('Erro ao atualizar perfil')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-8">
        <div className="container mx-auto max-w-2xl px-4">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="bg-white rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!session || !profile) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-8">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Meu <span className="text-primary">Perfil</span>
            </h1>
            <p className="text-lg text-gray-600">
              Gerencie suas informações pessoais
            </p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informações Pessoais
                </CardTitle>
                
                {!isEditing && (
                  <Button 
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    size="sm"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                )}
              </div>
            </CardHeader>
            
            <CardContent>
              {isEditing ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Avatar */}
                  <div className="space-y-4">
                    <Label>Avatar</Label>
                    <div className="flex items-center gap-6">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={avatarPreview || profile.avatar} />
                        <AvatarFallback className="text-xl">
                          {profile.firstName[0]}{profile.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="space-y-2">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          className="cursor-pointer"
                        />
                        <p className="text-sm text-gray-500">
                          JPG, PNG ou GIF. Máximo 2MB.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Nome */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nome *</Label>
                      <Input
                        id="firstName"
                        {...register('firstName')}
                      />
                      {errors.firstName && (
                        <p className="text-sm text-red-600">{errors.firstName.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">Sobrenome *</Label>
                      <Input
                        id="lastName"
                        {...register('lastName')}
                      />
                      {errors.lastName && (
                        <p className="text-sm text-red-600">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Email (readonly) */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={profile.email}
                      disabled
                      className="bg-gray-50"
                    />
                    <p className="text-sm text-gray-500">
                      Para alterar o email, entre em contato conosco.
                    </p>
                  </div>

                  {/* Telefone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      placeholder="(11) 99999-9999"
                      {...register('phone')}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-600">{errors.phone.message}</p>
                    )}
                  </div>

                  {/* Bio */}
                  <div className="space-y-2">
                    <Label htmlFor="bio">Biografia</Label>
                    <Textarea
                      id="bio"
                      placeholder="Conte um pouco sobre você..."
                      rows={4}
                      {...register('bio')}
                    />
                    {errors.bio && (
                      <p className="text-sm text-red-600">{errors.bio.message}</p>
                    )}
                  </div>

                  <Separator />

                  {/* Endereço */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Endereço
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cep">CEP</Label>
                        <Input
                          id="cep"
                          placeholder="12345-678"
                          {...register('cep')}
                        />
                        {errors.cep && (
                          <p className="text-sm text-red-600">{errors.cep.message}</p>
                        )}
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address">Logradouro</Label>
                        <Input
                          id="address"
                          placeholder="Rua, Avenida, etc."
                          {...register('address')}
                        />
                        {errors.address && (
                          <p className="text-sm text-red-600">{errors.address.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="addressNumber">Número</Label>
                        <Input
                          id="addressNumber"
                          placeholder="123"
                          {...register('addressNumber')}
                        />
                        {errors.addressNumber && (
                          <p className="text-sm text-red-600">{errors.addressNumber.message}</p>
                        )}
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="complement">Complemento</Label>
                        <Input
                          id="complement"
                          placeholder="Apto 101, Bloco A, etc."
                          {...register('complement')}
                        />
                        {errors.complement && (
                          <p className="text-sm text-red-600">{errors.complement.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="neighborhood">Bairro</Label>
                        <Input
                          id="neighborhood"
                          placeholder="Centro"
                          {...register('neighborhood')}
                        />
                        {errors.neighborhood && (
                          <p className="text-sm text-red-600">{errors.neighborhood.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="city">Cidade</Label>
                        <Input
                          id="city"
                          placeholder="São Paulo"
                          {...register('city')}
                        />
                        {errors.city && (
                          <p className="text-sm text-red-600">{errors.city.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="state">Estado</Label>
                        <Input
                          id="state"
                          placeholder="SP"
                          maxLength={2}
                          {...register('state')}
                        />
                        {errors.state && (
                          <p className="text-sm text-red-600">{errors.state.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">País</Label>
                      <Input
                        id="country"
                        placeholder="Brasil"
                        {...register('country')}
                      />
                      {errors.country && (
                        <p className="text-sm text-red-600">{errors.country.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Botões */}
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false)
                        setAvatarFile(null)
                        setAvatarPreview(null)
                      }}
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {isSubmitting ? 'Salvando...' : 'Salvar'}
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  {/* Avatar e Nome */}
                  <div className="flex items-center gap-6">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={profile.avatar} />
                      <AvatarFallback className="text-xl">
                        {profile.firstName[0]}{profile.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="space-y-1">
                      <h2 className="text-2xl font-bold text-gray-900">
                        {profile.firstName} {profile.lastName}
                      </h2>
                      <p className="text-gray-600">
                        Membro desde {new Date(profile.createdAt).toLocaleDateString('pt-BR', {
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  {/* Informações */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <div>
                        <Label className="text-sm text-gray-600">Email</Label>
                        <p className="font-medium">{profile.email}</p>
                      </div>
                    </div>

                    {profile.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-gray-400" />
                        <div>
                          <Label className="text-sm text-gray-600">Telefone</Label>
                          <p className="font-medium">{profile.phone}</p>
                        </div>
                      </div>
                    )}

                    {profile.bio && (
                      <div className="space-y-2">
                        <Label className="text-sm text-gray-600">Biografia</Label>
                        <p className="text-gray-700 whitespace-pre-wrap">{profile.bio}</p>
                      </div>
                    )}

                    {/* Endereço */}
                    {(profile.cep || profile.address || profile.city) && (
                      <>
                        <Separator />
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <MapPin className="h-5 w-5" />
                            Endereço
                          </h3>
                          
                          <div className="space-y-3">
                            {profile.cep && (
                              <div>
                                <Label className="text-sm text-gray-600">CEP</Label>
                                <p className="font-medium">{profile.cep}</p>
                              </div>
                            )}

                            {(profile.address || profile.addressNumber) && (
                              <div>
                                <Label className="text-sm text-gray-600">Logradouro</Label>
                                <p className="font-medium">
                                  {profile.address}
                                  {profile.addressNumber && `, ${profile.addressNumber}`}
                                  {profile.complement && `, ${profile.complement}`}
                                </p>
                              </div>
                            )}

                            {profile.neighborhood && (
                              <div>
                                <Label className="text-sm text-gray-600">Bairro</Label>
                                <p className="font-medium">{profile.neighborhood}</p>
                              </div>
                            )}

                            {(profile.city || profile.state) && (
                              <div>
                                <Label className="text-sm text-gray-600">Cidade/Estado</Label>
                                <p className="font-medium">
                                  {profile.city}
                                  {profile.state && `, ${profile.state}`}
                                </p>
                              </div>
                            )}

                            {profile.country && (
                              <div>
                                <Label className="text-sm text-gray-600">País</Label>
                                <p className="font-medium">{profile.country}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

