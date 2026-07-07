import type { ReactNode } from 'react'

type ImagePlaceholderProps = {
  id: string
  description: string
  src?: string
  aspectRatio?: string
  className?: string
}

export function ImagePlaceholder({
  id,
  description,
  src,
  aspectRatio = '16 / 9',
  className = '',
}: ImagePlaceholderProps) {
  return (
    <figure
      className={`mg-placeholder ${className}`.trim()}
      style={{ aspectRatio }}
    >
      {src ? (
        <img
          className="mg-placeholder__img"
          src={src}
          alt=""
          onError={(event) => {
            event.currentTarget.style.display = 'none'
          }}
        />
      ) : null}
      <figcaption className="mg-placeholder__caption">
        <span className="mg-placeholder__id">{id}</span>
        <p className="mg-placeholder__desc">{description}</p>
      </figcaption>
    </figure>
  )
}

type YouTubePlaceholderProps = {
  id: string
  description: string
  thumbnailSrc?: string
  caption?: string
}

export function YouTubePlaceholder({
  id,
  description,
  thumbnailSrc = '/images/magsealed/youtube-thumbnail.png',
  caption,
}: YouTubePlaceholderProps) {
  return (
    <div className="mg-youtube">
      <figure className="mg-youtube__frame">
        <img
          className="mg-youtube__thumb"
          src={thumbnailSrc}
          alt=""
          onError={(event) => {
            event.currentTarget.style.display = 'none'
          }}
        />
        <div className="mg-youtube__overlay" aria-hidden="true">
          <span className="mg-youtube__play" />
        </div>
        <figcaption className="mg-youtube__caption">
          <span className="mg-placeholder__id">{id}</span>
          <p className="mg-placeholder__desc">{description}</p>
        </figcaption>
      </figure>
      {caption ? <p className="mg-youtube__note">{caption}</p> : null}
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
    <section id={id} className={`mg-section ${className}`.trim()}>
      <div className="mg-section__inner">
        <header className="mg-section__header">
          <h2 className="mg-section__title">{title}</h2>
          {subtitle ? <p className="mg-section__subtitle">{subtitle}</p> : null}
        </header>
        {children}
      </div>
    </section>
  )
}

type InfoCardProps = {
  title: string
  description: string
}

export function InfoCard({ title, description }: InfoCardProps) {
  return (
    <article className="mg-info-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  )
}

type CompareCardProps = {
  title: string
  items: readonly string[]
  variant: 'general' | 'magsealed'
}

export function CompareCard({ title, items, variant }: CompareCardProps) {
  return (
    <article className={`mg-compare-card mg-compare-card--${variant}`}>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  )
}
