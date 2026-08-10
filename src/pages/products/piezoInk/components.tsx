import type { InkProduct, SpecRow } from '@/pages/products/piezoInk/content'

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
  noDatasheetLabel: string
  substratesLabel: string
}

export function ProductCard({ product, noDatasheetLabel, substratesLabel }: ProductCardProps) {
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

      {product.hasDatasheet && product.spec ? (
        <SpecTableView rows={product.spec} />
      ) : (
        <p className="pi-product__no-datasheet">{noDatasheetLabel}</p>
      )}

      {product.processNote ? <p className="pi-product__process-note">{product.processNote}</p> : null}
    </article>
  )
}
