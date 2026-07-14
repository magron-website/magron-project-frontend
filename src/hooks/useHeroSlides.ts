import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import i18n, { type Language } from '@/i18n'
import { localize } from '@/lib/localizeRow'
import { supabase } from '@/lib/supabase'
import type { HeroSlide, HeroSlideRow } from '@/types/heroSlide'

function mapRow(row: HeroSlideRow, lang: Language): HeroSlide {
  return {
    id: row.id,
    imageUrl: row.image_url,
    title: localize(row, 'title', lang) ?? '',
    subtitle: localize(row, 'subtitle', lang) ?? '',
    description: localize(row, 'description', lang) ?? '',
    buttonText: localize(row, 'button_text', lang),
    buttonLink: row.button_link,
    sortOrder: row.sort_order,
  }
}

export function useHeroSlides() {
  const { i18n: i18next } = useTranslation()
  const lang = i18next.language as Language
  const [rows, setRows] = useState<HeroSlideRow[]>([])
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
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true })

        if (cancelled) return

        if (fetchError) {
          console.error('Failed to load hero slides:', fetchError.message)
          setError(fetchError.message)
          setRows([])
          return
        }

        if (data?.length) {
          setRows(data as HeroSlideRow[])
          return
        }

        setError(i18n.t('messages:heroNone'))
        setRows([])
      } catch (err) {
        if (cancelled) return
        const message = err instanceof Error ? err.message : i18n.t('messages:heroLoadFailed')
        console.error('Failed to load hero slides:', message)
        setError(message)
        setRows([])
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

  const slides = useMemo(() => rows.map((row) => mapRow(row, lang)), [rows, lang])

  return { slides, isLoading, error }
}

export function resolveHeroButtonLink(link: string | null): string {
  if (!link) return '#'
  if (link.startsWith('http') || link.startsWith('#')) return link
  if (link.startsWith('/')) return `#${link.slice(1)}`
  return link
}
