import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import {
  getProductTileLabel,
  getProductTileTitle,
  useProductExplanations,
} from '@/hooks/useProductExplanations'
import type { ProductExplanation } from '@/types/productExplanation'
import { getProductPathBySortOrder } from '@/pages/products/productRoutes'
import '@/assets/design/product-section.css'

type ProductTileCardProps = {
  product: ProductExplanation
  isActive: boolean
  onActivate: (id: string) => void
}

function ProductTileCard({ product, isActive, onActivate }: ProductTileCardProps) {
  const label = getProductTileLabel(product)
  const title = getProductTileTitle(product)

  return (
    <Link
      to={getProductPathBySortOrder(product.sortOrder)}
      className={`product-scroll__tile product-scroll__tile--image${isActive ? ' product-scroll__tile--active' : ''}`}
      aria-label={`${title} 상세 보기`}
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
  const { products, isLoading, error } = useProductExplanations()
  const [activeTileId, setActiveTileId] = useState<string | null>(null)

  return (
    <section className="product-scroll" aria-label="제품 소개">
      <div className="product-scroll__inner">
        <h2 className="product-scroll__heading">제품 정보</h2>

        {isLoading ? (
          <div className="product-scroll__status" aria-busy="true">
            <ClipLoader color="#111111" size={48} aria-label="로딩 중" />
          </div>
        ) : products.length === 0 ? (
          <div className="product-scroll__status">
            <p className="product-scroll__message">
              {error ?? '제품 정보를 불러올 수 없습니다.'}
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
