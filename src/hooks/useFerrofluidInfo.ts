import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import i18n, { type Language } from '@/i18n'
import { localize } from '@/lib/localizeRow'
import { supabase } from '@/lib/supabase'
import type { FerrofluidInfo, FerrofluidInfoRow } from '@/types/ferrofluidInfo'

function mapRow(row: FerrofluidInfoRow, lang: Language): FerrofluidInfo {
  return {
    id: row.id,
    title: localize(row, 'title', lang) ?? '',
    subtitle: localize(row, 'subtitle', lang) ?? '',
    description: localize(row, 'description', lang) ?? '',
    imageUrl: row.image_url,
    category: localize(row, 'category', lang) ?? 'ferrofluid',
    sortOrder: row.sort_order,
  }
}

export function useFerrofluidInfo() {
  const { i18n: i18next } = useTranslation()
  const lang = i18next.language as Language
  const [rows, setRows] = useState<FerrofluidInfoRow[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchImages() {
      setIsLoading(true)
      setError(null)

      try {
        const { data, error: fetchError } = await supabase
          .from('ferrofluid_info')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true })

        if (cancelled) return

        if (fetchError) {
          console.error('Failed to load ferrofluid images:', fetchError.message)
          setError(fetchError.message)
          setRows([])
          return
        }

        if (data?.length) {
          setRows(data as FerrofluidInfoRow[])
          return
        }

        setError(i18n.t('messages:ferroNone'))
        setRows([])
      } catch (err) {
        if (cancelled) return
        const message =
          err instanceof Error ? err.message : i18n.t('messages:ferroLoadFailed')
        console.error('Failed to load ferrofluid images:', message)
        setError(message)
        setRows([])
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    void fetchImages()

    return () => {
      cancelled = true
    }
  }, [])

  const images = useMemo(() => rows.map((row) => mapRow(row, lang)), [rows, lang])

  return { images, isLoading, error }
}
