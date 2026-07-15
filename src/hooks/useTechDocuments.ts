import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import i18n, { type Language } from '@/i18n'
import { localize } from '@/lib/localizeRow'
import { supabase } from '@/lib/supabase'
import type { TechDocument, TechDocumentRow } from '@/types/techDocument'

function mapRow(row: TechDocumentRow, lang: Language): TechDocument {
  return {
    id: row.id,
    title: localize(row, 'title', lang) ?? '',
    description: localize(row, 'description', lang) ?? '',
    fileUrl: row.file_url,
    sortOrder: row.sort_order,
  }
}

export function useTechDocuments() {
  const { i18n: i18next } = useTranslation()
  const lang = i18next.language as Language
  const [rows, setRows] = useState<TechDocumentRow[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchTechDocuments() {
      setIsLoading(true)
      setError(null)

      try {
        const { data, error: fetchError } = await supabase
          .from('tech_documents')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true })

        if (cancelled) return

        if (fetchError) {
          console.error('Failed to load tech documents:', fetchError.message)
          setError(fetchError.message)
          setRows([])
          return
        }

        if (data?.length) {
          setRows(data as TechDocumentRow[])
          return
        }

        setError(i18n.t('messages:techNone'))
        setRows([])
      } catch (err) {
        if (cancelled) return
        const message =
          err instanceof Error ? err.message : i18n.t('messages:techLoadFailed')
        console.error('Failed to load tech documents:', message)
        setError(message)
        setRows([])
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    void fetchTechDocuments()

    return () => {
      cancelled = true
    }
  }, [])

  const documents = useMemo(() => rows.map((row) => mapRow(row, lang)), [rows, lang])

  return { documents, isLoading, error }
}
