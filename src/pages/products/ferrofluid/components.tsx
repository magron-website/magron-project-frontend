import type { ReactNode } from 'react'

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

type FigureProps = {
  src: string
  alt: string
  caption?: string
  /** wide data image (table/chart) — keeps native size and scrolls on mobile */
  scroll?: boolean
  className?: string
}

export function Figure({ src, alt, caption, scroll = false, className = '' }: FigureProps) {
  return (
    <figure className={`ff-figure ${className}`.trim()}>
      {scroll ? (
        <div className="ff-figure__scroll">
          <img src={src} alt={alt} loading="lazy" />
        </div>
      ) : (
        <img src={src} alt={alt} loading="lazy" />
      )}
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  )
}

type Point = { label: string; value: string }

export function PointList({ points }: { points: readonly Point[] }) {
  return (
    <ul className="ff-point-list">
      {points.map((point) => (
        <li key={point.label}>
          <span className="ff-point-list__label">{point.label}</span>
          <span className="ff-point-list__value">{point.value}</span>
        </li>
      ))}
    </ul>
  )
}

export function CompanyTable({
  rows,
}: {
  rows: readonly { label: string; value: string }[]
}) {
  return (
    <div className="ff-table-wrap">
      <table className="ff-company-table">
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
