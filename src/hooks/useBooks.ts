import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import i18n, { type Language } from '@/i18n'
import { localize } from '@/lib/localizeRow'
import { supabase } from '@/lib/supabase'
import type { Book, BookRow } from '@/types/book'

function mapRow(row: BookRow, lang: Language): Book {
  return {
    id: row.id,
    title: localize(row, 'title', lang) ?? '',
    subtitle: localize(row, 'subtitle', lang) ?? '',
    imageUrl: row.image_url,
    pdfUrl: row.pdf_url,
    sortOrder: row.sort_order,
  }
}

export function useBooks() {
  const { i18n: i18next } = useTranslation()
  const lang = i18next.language as Language
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

  const books = useMemo(() => rows.map((row) => mapRow(row, lang)), [rows, lang])

  return { books, isLoading, error }
}
