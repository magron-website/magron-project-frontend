import type { ReactNode } from 'react'
import { useBooks } from '@/hooks/useBooks'
import { PRODUCT_SORT_ORDER, type ProductPageKey } from '@/pages/products/productRoutes'

type CatalogDownloadButtonProps = {
  /** which product's catalogue to download (matched to the home catalog by sort order) */
  product: ProductPageKey
  className?: string
  children: ReactNode
}

/**
 * Downloads the product's catalogue PDF — the same file the home catalog offers.
 * Falls back to the home catalog section while the book list is loading or if the
 * product has no catalogue registered yet.
 */
export default function CatalogDownloadButton({
  product,
  className,
  children,
}: CatalogDownloadButtonProps) {
  const { books } = useBooks()
  const sortOrder = PRODUCT_SORT_ORDER[product]
  const pdfUrl = books.find((book) => book.sortOrder === sortOrder)?.pdfUrl

  if (pdfUrl) {
    return (
      <a
        className={className}
        href={pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        download
      >
        {children}
      </a>
    )
  }

  return (
    <a className={className} href="/#products">
      {children}
    </a>
  )
}
