import { useEffect, useMemo, useState } from 'react'
import i18n from '@/i18n'
import { supabase } from '@/lib/supabase'
import type { Book, BookRow } from '@/types/book'

/**
 * Supabase supplies the cover image and the PDF only — a book's caption is the
 * catalog label in `locales/home.ts` (`catalog.items`, keyed by sort order).
 */
function mapRow(row: BookRow): Book {
  return {
    id: row.id,
    imageUrl: row.image_url,
    pdfUrl: row.pdf_url,
    sortOrder: row.sort_order,
  }
}

export function useBooks() {
  const [rows, setRows] = useState<BookRow[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchBooks() {
      setIsLoading(true)
      setError(null)

      try {
        const { data, error: fetchError } = await supabase
          .from('books')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true })

        if (cancelled) return

        if (fetchError) {
          console.error('Failed to load books:', fetchError.message)
          setError(fetchError.message)
          setRows([])
          return
        }

        if (data?.length) {
          setRows(data as BookRow[])
          return
        }

        setError(i18n.t('messages:booksNone'))
        setRows([])
      } catch (err) {
        if (cancelled) return
        const message =
          err instanceof Error ? err.message : i18n.t('messages:booksLoadFailed')
        console.error('Failed to load books:', message)
        setError(message)
        setRows([])
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    void fetchBooks()

    return () => {
      cancelled = true
    }
  }, [])

  const books = useMemo(() => rows.map(mapRow), [rows])

  return { books, isLoading, error }
}
