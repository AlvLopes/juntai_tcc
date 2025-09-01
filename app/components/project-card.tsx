
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, MapPin, Users, Heart } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Project } from '@/lib/types'
import { motion } from 'framer-motion'

interface ProjectCardProps {
  project: Project
  className?: string
}

export function ProjectCard({ project, className = '' }: ProjectCardProps) {
  const progressPercentage = Math.min(
    (project.currentAmount / project.goalAmount) * 100,
    100
  )
  
  const daysRemaining = Math.max(
    0,
    Math.ceil(
      (new Date(project.endDate).getTime() - new Date().getTime()) / 
      (1000 * 60 * 60 * 24)
    )
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Card className="group h-full overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative aspect-[4/3] overflow-hidden">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <Heart className="h-16 w-16 text-primary/40" />
            </div>
          )}
          
          {project.isFeatured && (
            <Badge className="absolute top-3 left-3 bg-amber-500 hover:bg-amber-600">
              Em Destaque
            </Badge>
          )}
          
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium">
            {daysRemaining > 0 ? `${daysRemaining} dias` : 'Encerrado'}
          </div>
        </div>

        <CardContent className="p-4 space-y-4">
          <div className="space-y-2">
            <Badge variant="secondary" className="text-xs">
              {project.category.name}
            </Badge>
            
            <Link href={`/projects/${project.id}`}>
              <h3 className="font-bold text-lg leading-tight hover:text-primary transition-colors line-clamp-2">
                {project.title}
              </h3>
            </Link>
            
            {project.shortDescription && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {project.shortDescription}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">
                  R$ {project.currentAmount?.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2
                  }) ?? '0,00'}
                </span>
                <span className="text-muted-foreground">
                  R$ {project.goalAmount.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2
                  })}
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {progressPercentage.toFixed(1)}% do objetivo alcançado
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{project.donationCount ?? 0} apoiadores</span>
              </div>
              
              {project.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate max-w-24">{project.location}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={project.creator.avatar} />
                <AvatarFallback>
                  {project.creator.firstName[0]}{project.creator.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium">
                  {project.creator.firstName} {project.creator.lastName}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <CalendarDays className="h-3 w-3" />
              <span>
                {new Date(project.createdAt).toLocaleDateString('pt-BR')}
              </span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
