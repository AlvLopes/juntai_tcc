

'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface MediaItem {
  id: number
  url: string
  type: 'IMAGEM' | 'VIDEO'
  filename?: string
  order: number
}

interface MediaCarouselProps {
  media: MediaItem[]
  className?: string
  aspectRatio?: 'video' | 'square' | '[4/3]' | '[3/2]'
}

export default function MediaCarousel({ 
  media, 
  className = '',
  aspectRatio = 'video'
}: MediaCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [playingVideo, setPlayingVideo] = useState<number | null>(null)
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({})

  const options: EmblaOptionsType = { 
    loop: true,
    align: 'start'
  }

  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    // Pausar todos os vídeos ao mudar de slide
    Object.values(videoRefs.current).forEach(video => {
      if (video) {
        video.pause()
      }
    })
    setPlayingVideo(null)
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    
    onSelect()
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
    
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) {
      emblaApi.scrollTo(index)
    }
  }, [emblaApi])

  const toggleVideo = (mediaId: number) => {
    const video = videoRefs.current[mediaId]
    if (video) {
      if (playingVideo === mediaId) {
        video.pause()
        setPlayingVideo(null)
      } else {
        video.play()
        setPlayingVideo(mediaId)
      }
    }
  }

  // Se não há mídia, não renderiza nada
  if (!media || media.length === 0) {
    return null
  }

  const aspectRatioClass = {
    'video': 'aspect-video',
    'square': 'aspect-square', 
    '[4/3]': 'aspect-[4/3]',
    '[3/2]': 'aspect-[3/2]'
  }[aspectRatio]

  return (
    <div className={`relative ${className}`}>
      {/* Carrossel principal */}
      <div className="relative">
        <div className={`embla overflow-hidden rounded-lg ${aspectRatioClass} bg-gray-100`} ref={emblaRef}>
          <div className="embla__container flex">
            {media.map((item, index) => (
              <div key={item.id} className={`embla__slide flex-[0_0_100%] relative ${aspectRatioClass}`}>
                {item.type === 'IMAGEM' ? (
                  <Image
                    src={item.url}
                    alt={item.filename || `Imagem ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    priority={index === 0}
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <video
                      ref={el => videoRefs.current[item.id] = el}
                      src={item.url}
                      className="w-full h-full object-cover"
                      controls={false}
                      poster="/placeholder-video.jpg"
                      onPlay={() => setPlayingVideo(item.id)}
                      onPause={() => setPlayingVideo(null)}
                    />
                    {/* Overlay de play/pause para vídeo */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button
                        variant="outline"
                        size="lg"
                        className="bg-black/50 text-white border-white/50 hover:bg-black/70"
                        onClick={() => toggleVideo(item.id)}
                      >
                        {playingVideo === item.id ? (
                          <Pause className="h-6 w-6" />
                        ) : (
                          <Play className="h-6 w-6" />
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Botões de navegação */}
        {media.length > 1 && (
          <>
            <Button
              variant="outline"
              size="sm"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90"
              onClick={scrollPrev}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90"
              onClick={scrollNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}

        {/* Indicador de posição */}
        {media.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
            {media.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === selectedIndex 
                    ? 'bg-white' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                onClick={() => scrollTo(index)}
              />
            ))}
          </div>
        )}

        {/* Contador */}
        {media.length > 1 && (
          <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
            {selectedIndex + 1} / {media.length}
          </div>
        )}
      </div>

      {/* Thumbnails (opcional para muitas imagens) */}
      {media.length > 1 && (
        <div className="mt-4 grid grid-cols-6 gap-2">
          {media.slice(0, 6).map((item, index) => (
            <button
              key={item.id}
              className={`relative aspect-video rounded overflow-hidden border-2 transition-colors ${
                index === selectedIndex 
                  ? 'border-primary' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => scrollTo(index)}
            >
              {item.type === 'IMAGEM' ? (
                <Image
                  src={item.url}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="150px"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <Play className="h-4 w-4 text-gray-500" />
                </div>
              )}
              {/* Indicador de vídeo */}
              {item.type === 'VIDEO' && (
                <div className="absolute top-1 right-1 bg-black/70 text-white rounded px-1 text-xs">
                  VIDEO
                </div>
              )}
            </button>
          ))}
          {media.length > 6 && (
            <div className="aspect-video rounded border-2 border-dashed border-gray-300 flex items-center justify-center text-xs text-gray-500">
              +{media.length - 6}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

