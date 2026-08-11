import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import i18n, { type Language } from '@/i18n'
import { supabase } from '@/lib/supabase'
import type { ProductExplanation, ProductExplanationRow } from '@/types/productExplanation'

function formatLabel(category: string | null, title: string): string {
  const cat = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : 'Product'
  return `${cat} | ${title}`
}

/**
 * Supabase supplies the tile image only — the wording comes from the `tiles`
 * block in `locales/product.ts`, keyed by sort order. A row added to the DB
 * before its copy is written falls back to its own Korean columns.
 */
function mapRow(row: ProductExplanationRow, lang: Language): ProductExplanation {
  const text = (field: string, fallback: string | null) =>
    i18n.t(`product:tiles.${row.sort_order}.${field}`, {
      lng: lang,
      defaultValue: fallback ?? '',
    })

  return {
    id: row.id,
    title: text('title', row.title),
    subtitle: text('subtitle', row.subtitle),
    imageUrl: row.image_url,
    category: text('category', row.category) || 'product',
    sortOrder: row.sort_order,
  }
}

export function useProductExplanations() {
  const { i18n: i18next } = useTranslation()
  const lang = i18next.language as Language
  const [rows, setRows] = useState<ProductExplanationRow[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchProducts() {
      setIsLoading(true)
      setError(null)

      try {
        const { data, error: fetchError } = await supabase
          .from('product_explanations')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true })

        if (cancelled) return

        if (fetchError) {
          console.error('Failed to load product explanations:', fetchError.message)
          setError(fetchError.message)
          setRows([])
          return
        }

        if (data?.length) {
          setRows(data as ProductExplanationRow[])
          return
        }

        setError(i18n.t('messages:productNone'))
        setRows([])
      } catch (err) {
        if (cancelled) return
        const message =
          err instanceof Error ? err.message : i18n.t('messages:productLoadFailed')
        console.error('Failed to load product explanations:', message)
        setError(message)
        setRows([])
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    void fetchProducts()

    return () => {
      cancelled = true
    }
  }, [])

  const products = useMemo(() => rows.map((row) => mapRow(row, lang)), [rows, lang])

  return { products, isLoading, error }
}

export function useProductBySortOrder(sortOrder: number) {
  const { i18n: i18next } = useTranslation()
  const lang = i18next.language as Language
  const [row, setRow] = useState<ProductExplanationRow | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchProduct() {
      setIsLoading(true)
      setError(null)

      try {
        const { data, error: fetchError } = await supabase
          .from('product_explanations')
          .select('*')
          .eq('sort_order', sortOrder)
          .eq('is_active', true)
          .maybeSingle()

        if (cancelled) return

        if (fetchError) {
          console.error('Failed to load product explanation:', fetchError.message)
          setError(fetchError.message)
          setRow(null)
          return
        }

        if (!data) {
          setError(i18n.t('messages:productNotFound'))
          setRow(null)
          return
        }

        setRow(data as ProductExplanationRow)
      } catch (err) {
        if (cancelled) return
        const message =
          err instanceof Error ? err.message : i18n.t('messages:productLoadFailed')
        console.error('Failed to load product explanation:', message)
        setError(message)
        setRow(null)
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    void fetchProduct()

    return () => {
      cancelled = true
    }
  }, [sortOrder])

  const product = useMemo(() => (row ? mapRow(row, lang) : null), [row, lang])

  return { product, isLoading, error }
}

export function getProductTileLabel(product: ProductExplanation): string {
  return formatLabel(product.category, product.title)
}

export function getProductTileTitle(product: ProductExplanation): string {
  return product.subtitle || product.title
}
