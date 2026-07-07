import type { ReactNode } from 'react'
import type { KitItemSection } from '@/pages/products/education/content'

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
      className={`ed-placeholder ${className}`.trim()}
      style={{ aspectRatio }}
    >
      {src ? (
        <img
          className="ed-placeholder__img"
          src={src}
          alt=""
          onError={(event) => {
            event.currentTarget.style.display = 'none'
          }}
        />
      ) : null}
      <figcaption className="ed-placeholder__caption">
        <span className="ed-placeholder__id">{id}</span>
        <p className="ed-placeholder__desc">{description}</p>
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
  thumbnailSrc = '/images/ferrofluid-kit/youtube-thumbnail.png',
  caption,
}: YouTubePlaceholderProps) {
  return (
    <div className="ed-youtube">
      <figure className="ed-youtube__frame">
        <img
          className="ed-youtube__thumb"
          src={thumbnailSrc}
          alt=""
          onError={(event) => {
            event.currentTarget.style.display = 'none'
          }}
        />
        <div className="ed-youtube__overlay" aria-hidden="true">
          <span className="ed-youtube__play" />
        </div>
        <figcaption className="ed-youtube__caption">
          <span className="ed-placeholder__id">{id}</span>
          <p className="ed-placeholder__desc">{description}</p>
        </figcaption>
      </figure>
      {caption ? <p className="ed-youtube__note">{caption}</p> : null}
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
    <section id={id} className={`ed-section ${className}`.trim()}>
      <div className="ed-section__inner">
        <header className="ed-section__header">
          <h2 className="ed-section__title">{title}</h2>
          {subtitle ? <p className="ed-section__subtitle">{subtitle}</p> : null}
        </header>
        {children}
      </div>
    </section>
  )
}

type InfoCardProps = {
  title: string
  description?: string
  subtitle?: string
}

export function InfoCard({ title, description, subtitle }: InfoCardProps) {
  return (
    <article className="ed-info-card">
      <h3>{title}</h3>
      {subtitle ? <p className="ed-info-card__subtitle">{subtitle}</p> : null}
      {description ? <p>{description}</p> : null}
    </article>
  )
}

type ExperimentStepCardProps = {
  step: string
  description: string
}

export function ExperimentStepCard({ step, description }: ExperimentStepCardProps) {
  return (
    <article className="ed-step-card">
      <span className="ed-step-card__num">{step}</span>
      <p>{description}</p>
    </article>
  )
}

export function KitItemSectionView({ item }: { item: KitItemSection }) {
  return (
    <div className="ed-kit-item">
      <h3 className="ed-kit-item__title">{item.title}</h3>
      <div className="ed-kit-item__layout">
        <div className="ed-kit-item__content">
          <div className="ed-prose">
            <p>{item.body}</p>
          </div>
          {item.bulletPoints ? (
            <ul className="ed-bullet-list">
              {item.bulletPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          ) : null}
          {item.warning ? (
            <div className="ed-warning-card" role="note">
              <p>{item.warning}</p>
            </div>
          ) : null}
          {item.caution ? (
            <div className="ed-warning-card ed-warning-card--caution" role="note">
              <p>{item.caution}</p>
            </div>
          ) : null}
          {item.extraNote ? <p className="ed-note">{item.extraNote}</p> : null}
        </div>
        <ImagePlaceholder
          id={item.image.id}
          description={item.image.description}
          src={item.image.src}
          aspectRatio={item.image.aspectRatio ?? '4 / 5'}
          className="ed-kit-item__image"
        />
      </div>
      {item.experimentSteps ? (
        <div className="ed-step-grid">
          {item.experimentSteps.map((step) => (
            <ExperimentStepCard key={step.step} step={step.step} description={step.description} />
          ))}
        </div>
      ) : null}
      {item.videos && item.videos.length > 0 ? (
        <div className="ed-video-grid">
          {item.videos.map((video) => (
            <YouTubePlaceholder
              key={video.id}
              id={video.id}
              description={video.description}
            />
          ))}
        </div>
      ) : null}
      {item.videoNote ? <p className="ed-note ed-note--center">{item.videoNote}</p> : null}
    </div>
  )
}
