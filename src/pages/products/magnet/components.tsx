import type { ReactNode } from 'react'

type TableFigureProps = {
  id?: string
  title: string
  description: string
  image: string
  note?: string
}

export function TableFigure({ id, title, description, image, note }: TableFigureProps) {
  return (
    <article id={id} className="mn-mat-table">
      <h3 className="mn-mat-table__title">{title}</h3>
      <p className="mn-mat-table__desc">{description}</p>
      <figure className="mn-mat-table__figure">
        <div className="mn-mat-table__scroll">
          <img src={image} alt={title} loading="lazy" />
        </div>
        {note ? <figcaption>{note}</figcaption> : null}
      </figure>
    </article>
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
    <section id={id} className={`mn-section ${className}`.trim()}>
      <div className="mn-section__inner">
        <header className="mn-section__header">
          <h2 className="mn-section__title">{title}</h2>
          {subtitle ? <p className="mn-section__subtitle">{subtitle}</p> : null}
        </header>
        {children}
      </div>
    </section>
  )
}
