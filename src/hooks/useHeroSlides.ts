import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import i18n, { type Language } from '@/i18n'
import { supabase } from '@/lib/supabase'
import type { HeroSlide, HeroSlideRow } from '@/types/heroSlide'

/**
 * Supabase supplies the slide image only — the wording comes from
 * `locales/hero.ts`, keyed by sort order. A slide added to the DB before its
 * copy is written falls back to the row's own Korean columns so it still
 * renders.
 */
function mapRow(row: HeroSlideRow, lang: Language): HeroSlide {
  const text = (field: string, fallback: string | null) =>
    i18n.t(`hero:slides.${row.sort_order}.${field}`, {
      lng: lang,
      defaultValue: fallback ?? '',
    })

  return {
    id: row.id,
    imageUrl: row.image_url,
    title: text('title', row.title),
    subtitle: text('subtitle', row.subtitle),
    description: text('description', row.description),
    buttonText: text('buttonText', row.button_text) || null,
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

