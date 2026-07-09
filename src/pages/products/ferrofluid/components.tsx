import type { ReactNode } from 'react'

type ImagePlaceholderProps = {
  id: string
  description: string
  src?: string
  aspectRatio?: string
  className?: string
  hideCaption?: boolean
  alt?: string
  fit?: 'cover' | 'contain'
}

export function ImagePlaceholder({
  id,
  description,
  src,
  aspectRatio = '16 / 9',
  className = '',
  hideCaption = false,
  alt = '',
  fit = 'contain',
}: ImagePlaceholderProps) {
  const hasImage = Boolean(src)
  // When a real image is present we let the box hug the image (natural fit) so
  // nothing gets cropped or letter-boxed. The fixed aspect ratio is only used
  // for the empty placeholder state and for cover-style banners (hero).
  const isNatural = hasImage && fit === 'contain'

  const figureClassName = [
    'ff-placeholder',
    hasImage ? 'ff-placeholder--filled' : '',
    isNatural ? 'ff-placeholder--natural' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <figure
      className={figureClassName}
      style={isNatural ? undefined : { aspectRatio }}
    >
      {src ? (
        <img
          className="ff-placeholder__img"
          src={src}
          alt={alt}
          onError={(event) => {
            event.currentTarget.style.display = 'none'
          }}
        />
      ) : null}
      {hideCaption ? null : (
        <figcaption className="ff-placeholder__caption">
          <span className="ff-placeholder__id">{id}</span>
          <p className="ff-placeholder__desc">{description}</p>
        </figcaption>
      )}
    </figure>
  )
}

type SpecColumn = {
  key: string
  label: string
  align?: 'left' | 'right'
}

type SpecTableProps = {
  columns: SpecColumn[]
  rows: Record<string, string>[]
  variant?: 'default' | 'magenta' | 'company'
}

export function SpecTable({ columns, rows, variant = 'default' }: SpecTableProps) {
  return (
    <div className="ff-table-wrap">
      <table className={`ff-table ff-table--${variant}`}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} className={column.align === 'right' ? 'ff-table__num' : ''}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[columns[0].key]}>
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={column.align === 'right' ? 'ff-table__num' : ''}
                >
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

type SectionProps = {
  id?: string
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
}

export function Section({ id, title, subtitle, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`ff-section ${className}`.trim()}>
      <div className="ff-section__inner">
        <header className="ff-section__header">
          <h2 className="ff-section__title">{title}</h2>
          {subtitle ? <p className="ff-section__subtitle">{subtitle}</p> : null}
        </header>
        {children}
      </div>
    </section>
  )
}

type CompareCardProps = {
  title: string
  items: readonly string[]
  variant: 'negative' | 'positive'
}

export function CompareCard({ title, items, variant }: CompareCardProps) {
  return (
    <article className={`ff-compare-card ff-compare-card--${variant}`}>
      <h3 className="ff-compare-card__title">{title}</h3>
      <ul className="ff-compare-card__list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  )
}

type InfoListProps = {
  items: readonly { label: string; value: string }[]
}

export function InfoList({ items }: InfoListProps) {
  return (
    <dl className="ff-info-list">
      {items.map((item) => (
        <div key={item.label} className="ff-info-list__row">
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}

type CompanyTableProps = {
  rows: readonly { label: string; value: string }[]
}

export function CompanyTable({ rows }: CompanyTableProps) {
  return (
    <div className="ff-table-wrap">
      <table className="ff-table ff-table--company">
        <thead>
          <tr>
            <th>구분</th>
            <th>내용</th>
          </tr>
        </thead>
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
