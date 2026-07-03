import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { HeroSlide, HeroSlideRow } from '@/types/heroSlide'

function mapRow(row: HeroSlideRow): HeroSlide {
  return {
    id: row.id,
    imageUrl: row.image_url,
    title: row.title,
    subtitle: row.subtitle ?? '',
    description: row.description ?? '',
    buttonText: row.button_text,
    buttonLink: row.button_link,
    sortOrder: row.sort_order,
  }
}

export function useHeroSlides() {
  const [slides, setSlides] = useState<HeroSlide[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchSlides() {
      setIsLoading(true)
      setError(null)

      try {
        const { data, error: fetchError } = await supabase
          .from('hero_slides')
          .select(
            'id, title, subtitle, description, image_url, button_text, button_link, sort_order, is_active',
          )
          .eq('is_active', true)
          .order('sort_order', { ascending: true })

        if (cancelled) return

        if (fetchError) {
          console.error('Failed to load hero slides:', fetchError.message)
          setError(fetchError.message)
          setSlides([])
          return
        }

        if (data?.length) {
          setSlides(data.map((row) => mapRow(row as HeroSlideRow)))
          return
        }

        setError('등록된 캐러셀 슬라이드가 없습니다. Supabase RLS 정책을 확인해 주세요.')
        setSlides([])
      } catch (err) {
        if (cancelled) return
        const message = err instanceof Error ? err.message : '캐러셀을 불러오지 못했습니다.'
        console.error('Failed to load hero slides:', message)
        setError(message)
        setSlides([])
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    void fetchSlides()

    return () => {
      cancelled = true
    }
  }, [])

  return { slides, isLoading, error }
}

export function resolveHeroButtonLink(link: string | null): string {
  if (!link) return '#'
  if (link.startsWith('http') || link.startsWith('#')) return link
  if (link.startsWith('/')) return `#${link.slice(1)}`
  return link
}
