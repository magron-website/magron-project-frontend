import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { ProductExplanation, ProductExplanationRow } from '@/types/productExplanation'

function formatLabel(category: string | null, title: string): string {
  const cat = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : 'Product'
  return `${cat} | ${title}`
}

function mapRow(row: ProductExplanationRow): ProductExplanation {
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle ?? '',
    imageUrl: row.image_url,
    category: row.category ?? 'product',
    sortOrder: row.sort_order,
  }
}

export function useProductExplanations() {
  const [products, setProducts] = useState<ProductExplanation[]>([])
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
          .select(
            'id, title, subtitle, image_url, category, sort_order, is_active',
          )
          .eq('is_active', true)
          .order('sort_order', { ascending: true })

        if (cancelled) return

        if (fetchError) {
          console.error('Failed to load product explanations:', fetchError.message)
          setError(fetchError.message)
          setProducts([])
          return
        }

        if (data?.length) {
          setProducts(data.map((row) => mapRow(row as ProductExplanationRow)))
          return
        }

        setError('등록된 제품 정보가 없습니다.')
        setProducts([])
      } catch (err) {
        if (cancelled) return
        const message =
          err instanceof Error ? err.message : '제품 정보를 불러오지 못했습니다.'
        console.error('Failed to load product explanations:', message)
        setError(message)
        setProducts([])
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

  return { products, isLoading, error }
}

export function getProductTileLabel(product: ProductExplanation): string {
  return formatLabel(product.category, product.title)
}

export function getProductTileTitle(product: ProductExplanation): string {
  return product.subtitle || product.title
}
