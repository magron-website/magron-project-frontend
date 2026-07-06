import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Book, BookRow } from '@/types/book'

function mapRow(row: BookRow): Book {
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle ?? '',
    imageUrl: row.image_url,
    pdfUrl: row.pdf_url,
    sortOrder: row.sort_order,
  }
}

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([])
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
          .select(
            'id, title, subtitle, image_url, pdf_url, sort_order, is_active',
          )
          .eq('is_active', true)
          .order('sort_order', { ascending: true })

        if (cancelled) return

        if (fetchError) {
          console.error('Failed to load books:', fetchError.message)
          setError(fetchError.message)
          setBooks([])
          return
        }

        if (data?.length) {
          setBooks(data.map((row) => mapRow(row as BookRow)))
          return
        }

        setError('등록된 카탈로그가 없습니다.')
        setBooks([])
      } catch (err) {
        if (cancelled) return
        const message =
          err instanceof Error ? err.message : '카탈로그를 불러오지 못했습니다.'
        console.error('Failed to load books:', message)
        setError(message)
        setBooks([])
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

  return { books, isLoading, error }
}
