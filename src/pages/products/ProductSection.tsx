import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ClipLoader } from 'react-spinners'
import {
  getProductTileLabel,
  getProductTileTitle,
  useProductExplanations,
} from '@/hooks/useProductExplanations'
import { useInView } from '@/hooks/useInView'
import type { ProductExplanation } from '@/types/productExplanation'
import { getProductPathBySortOrder } from '@/pages/products/productRoutes'
import '@/assets/design/product-section.css'

type ProductTileCardProps = {
  product: ProductExplanation
  isActive: boolean
  onActivate: (id: string) => void
}

function ProductTileCard({ product, isActive, onActivate }: ProductTileCardProps) {
  const { t } = useTranslation('product')
  const label = getProductTileLabel(product)
  const title = getProductTileTitle(product)

  return (
    <Link
      to={getProductPathBySortOrder(product.sortOrder)}
      className={`product-scroll__tile product-scroll__tile--image${isActive ? ' product-scroll__tile--active' : ''}`}
      aria-label={t('tileDetailAria', { title })}
      aria-current={isActive ? 'true' : undefined}
      onClick={() => onActivate(product.id)}
    >
      <img className="product-scroll__tile-bg" src={product.imageUrl} alt="" />
      <div className="product-scroll__tile-overlay" aria-hidden="true" />
      <div className="product-scroll__tile-content">
        <p className="product-scroll__tile-label">{label}</p>
        <h3 className="product-scroll__tile-title">{title}</h3>
      </div>
      <p className="product-scroll__tile-brand">MAGRON</p>
    </Link>
  )
}

export default function ProductSection() {
  const { t } = useTranslation(['product', 'common'])
  const { products, isLoading, error } = useProductExplanations()
  const [activeTileId, setActiveTileId] = useState<string | null>(null)
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.06, once: false })

  return (
    <section
      id="product-info"
      ref={ref}
      className={`product-scroll${inView ? ' is-revealed' : ''}`}
      aria-label={t('product:sectionAria')}
    >
      <div className="product-scroll__inner">
        <h2 className="product-scroll__heading">{t('product:heading')}</h2>

        {isLoading ? (
          <div className="product-scroll__status" aria-busy="true">
            <ClipLoader color="#111111" size={48} aria-label={t('common:loading')} />
          </div>
        ) : products.length === 0 ? (
          <div className="product-scroll__status">
            <p className="product-scroll__message">
              {error ?? t('product:loadError')}
            </p>
          </div>
        ) : (
          <div className="product-scroll__grid">
            {products.map((product) => (
              <ProductTileCard
                key={product.id}
                product={product}
                isActive={activeTileId === product.id}
                onActivate={setActiveTileId}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
