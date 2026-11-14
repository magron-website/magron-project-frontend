import type { InkProduct, SpecRow } from '@/pages/products/piezoInk/content'
import { trackEvent } from '@/lib/analytics'

export function SpecTableView({ rows }: { rows: SpecRow[] }) {
  return (
    <div className="pi-table-wrap">
      <table className="pi-table">
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th scope="row">{row.label}</th>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

type ProductCardProps = {
  product: InkProduct
  substratesLabel: string
  /** "상세표 보기" — opens the ink's full TDS PDF */
  tdsLabel: string
}

/** 한 줄에 카드 하나 — 왼쪽 설명·버튼, 오른쪽 간단 사양표(11/14 사용자 지시) */
export function ProductCard({ product, substratesLabel, tdsLabel }: ProductCardProps) {
  return (
    <article id={product.id} className="pi-product">
      <div className="pi-product__main">
        <p className="pi-product__code">{product.code}</p>
        <h3 className="pi-product__title">{product.title}</h3>
        <p className="pi-product__title-kr">{product.titleKr}</p>

        {product.tags.length ? (
          <ul className="pi-product__tags">
            {product.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        ) : null}

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
      </div>

      <div className="pi-product__spec">
        <SpecTableView rows={product.spec} />
      </div>
    </article>
  )
}
