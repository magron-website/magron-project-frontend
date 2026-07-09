import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { FerrofluidInfo, FerrofluidInfoRow } from '@/types/ferrofluidInfo'

function mapRow(row: FerrofluidInfoRow): FerrofluidInfo {
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle ?? '',
    description: row.description ?? '',
    imageUrl: row.image_url,
    category: row.category ?? 'ferrofluid',
    sortOrder: row.sort_order,
  }
}

export function useFerrofluidInfo() {
  const [images, setImages] = useState<FerrofluidInfo[]>([])
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
          .select('id, title, subtitle, description, image_url, category, sort_order, is_active')
          .eq('is_active', true)
          .order('sort_order', { ascending: true })

        if (cancelled) return

        if (fetchError) {
          console.error('Failed to load ferrofluid images:', fetchError.message)
          setError(fetchError.message)
          setImages([])
          return
        }

        if (data?.length) {
          setImages(data.map((row) => mapRow(row as FerrofluidInfoRow)))
          return
        }

        setError('등록된 Ferrofluid 이미지가 없습니다.')
        setImages([])
      } catch (err) {
        if (cancelled) return
        const message =
          err instanceof Error ? err.message : 'Ferrofluid 이미지를 불러오지 못했습니다.'
        console.error('Failed to load ferrofluid images:', message)
        setError(message)
        setImages([])
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

  return { images, isLoading, error }
}
