import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { DisplayVideo, DisplayVideoRow } from '@/types/displayVideo'

/**
 * Portfolio video sources for the Display page, ordered by `sort_order`.
 *
 * Only the media lives in Supabase — the on-page titles and per-language
 * descriptions stay in `content.ts` / the `display` namespace, because the
 * `display_videos` table has no localized columns and pulling its Korean text
 * would break the EN/ZH copy.
 *
 * Streaming these instead of bundling them keeps ~63 MB of MP4 out of the
 * committed `docs/` build that GitHub Pages serves.
 */
export function useDisplayVideos() {
  const [videos, setVideos] = useState<DisplayVideo[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function fetchDisplayVideos() {
      setIsLoading(true)

      try {
        const { data, error } = await supabase
          .from('display_videos')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true })

        if (cancelled) return

        if (error) {
          console.error('Failed to load display videos:', error.message)
          setVideos([])
          return
        }

        setVideos(
          (data as DisplayVideoRow[] | null)?.map((row) => ({
            id: row.id,
            title: row.title,
            videoUrl: row.video_url,
            sortOrder: row.sort_order,
          })) ?? [],
        )
      } catch (err) {
        if (cancelled) return
        console.error('Failed to load display videos:', err)
        setVideos([])
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    void fetchDisplayVideos()

    return () => {
      cancelled = true
    }
  }, [])

  return { videos, isLoading }
}
