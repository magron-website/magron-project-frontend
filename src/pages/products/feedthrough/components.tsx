import type { Product, SpecTable, Variant } from '@/pages/products/feedthrough/content'

/** Renders a spec/dimension matrix. A row with a single cell but multiple
 *  columns is rendered as one cell spanning all data columns. */
export function SpecTableView({ table }: { table: SpecTable }) {
  const colCount = table.columns.length
  return (
    <figure className="ft-table-block">
      <figcaption className="ft-table-block__cap">{table.caption}</figcaption>
      <div className="ft-table-wrap">
        <table className="ft-table">
          <thead>
            <tr>
              <th className="ft-table__head">{table.head}</th>
              {table.columns.map((col) => (
                <th key={col} className="ft-table__num">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, r) => (
              <tr key={`${row.label}-${r}`}>
                <th scope="row">{row.label}</th>
                {row.cells.length === 1 && colCount > 1 ? (
                  <td className="ft-table__span" colSpan={colCount}>
                    {row.cells[0]}
                  </td>
                ) : (
                  row.cells.map((cell, i) => (
                    <td key={i} className="ft-table__num">
                      {cell}
                    </td>
                  ))
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  )
}

function VariantBlock({ variant }: { variant: Variant }) {
  return (
    <div className="ft-variant">
      {variant.label ? <h4 className="ft-variant__label">{variant.label}</h4> : null}
      <div className="ft-variant__grid">
        <div className="ft-variant__figures">
          <figure className="ft-figure ft-figure--photo">
            <img src={variant.photo} alt="" loading="lazy" />
          </figure>
          {variant.drawing ? (
            <figure className="ft-figure ft-figure--drawing">
              <img src={variant.drawing} alt="" loading="lazy" />
              <figcaption>Dimensional drawing</figcaption>
            </figure>
          ) : null}
        </div>
        <div className="ft-variant__tables">
          {variant.dimensions ? <SpecTableView table={variant.dimensions} /> : null}
          <SpecTableView table={variant.spec} />
        </div>
      </div>
      {variant.notes?.length ? (
        <ul className="ft-note-list">
          {variant.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <article id={product.id} className="ft-product">
      <header className="ft-product__header">
        <div className="ft-product__titles">
          <h3 className="ft-product__title">{product.title}</h3>
          <p className="ft-product__title-kr">{product.titleKr}</p>
        </div>
        {product.tags?.length ? (
          <ul className="ft-product__tags">
            {product.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        ) : null}
      </header>
      <p className="ft-product__desc">{product.description}</p>
      <div className="ft-product__body">
        {product.variants.map((variant, i) => (
          <VariantBlock key={variant.label ?? i} variant={variant} />
        ))}
      </div>
    </article>
  )
}
