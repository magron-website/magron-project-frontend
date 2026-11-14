import type { InkProduct } from '@/pages/products/piezoInk/content'
import { trackEvent } from '@/lib/analytics'

type ProductCardProps = {
  product: InkProduct
  substratesLabel: string
  /** "상세표 보기" — opens the ink's TDS PDF (11/14: spec tables moved to the PDFs) */
  tdsLabel: string
}

export function ProductCard({ product, substratesLabel, tdsLabel }: ProductCardProps) {
  return (
    <article id={product.id} className="pi-product">
      <header className="pi-product__header">
        <div className="pi-product__titles">
          <p className="pi-product__code">{product.code}</p>
          <h3 className="pi-product__title">{product.title}</h3>
          <p className="pi-product__title-kr">{product.titleKr}</p>
        </div>
        {product.tags.length ? (
          <ul className="pi-product__tags">
            {product.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        ) : null}
      </header>

      <p className="pi-product__desc">{product.description}</p>

      {product.substrates ? (
        <p className="pi-product__substrates">
          <span>{substratesLabel}</span>
          {product.substrates}
        </p>
      ) : null}

      <a
        className="pi-product__tds"
        href={product.tdsUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('ink_tds_open', { product: product.id })}
      >
        {tdsLabel}
      </a>
    </article>
  )
}
