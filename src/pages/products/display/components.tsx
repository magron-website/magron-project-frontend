import type { ReactNode } from 'react'
import { YOUTUBE_URL_PLACEHOLDER } from '@/pages/products/display/content'

export function isVideoUrlReady(url: string): boolean {
  return Boolean(url) && url !== YOUTUBE_URL_PLACEHOLDER
}

function getYouTubeEmbedUrl(url: string): string | null {
  if (!isVideoUrlReady(url)) return null

  try {
    const parsed = new URL(url)
    if (parsed.hostname.includes('youtu.be')) {
      const id = parsed.pathname.replace('/', '')
      return id ? `https://www.youtube.com/embed/${id}` : null
    }
    if (parsed.hostname.includes('youtube.com')) {
      const id = parsed.searchParams.get('v')
      return id ? `https://www.youtube.com/embed/${id}` : null
    }
  } catch {
    return null
  }

  return null
}

type VideoCardProps = {
  placeholderId: string
  description: string
  youtubeUrl: string
  thumbnailSrc: string
  title?: string
  subtitle?: string
  variant?: 'hero' | 'portfolio'
  className?: string
}

export function VideoCard({
  placeholderId,
  description,
  youtubeUrl,
  thumbnailSrc,
  title,
  subtitle,
  variant = 'portfolio',
  className = '',
}: VideoCardProps) {
  const embedUrl = getYouTubeEmbedUrl(youtubeUrl)

  return (
    <article className={`dp-video-card dp-video-card--${variant} ${className}`.trim()}>
      <div className="dp-video-card__media">
        {embedUrl ? (
          <iframe
            className="dp-video-card__iframe"
            src={embedUrl}
            title={title ?? placeholderId}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <figure className="dp-video-card__fallback">
            <img
              className="dp-video-card__thumb"
              src={thumbnailSrc}
              alt=""
              onError={(event) => {
                event.currentTarget.style.display = 'none'
              }}
            />
            <div className="dp-video-card__overlay" aria-hidden="true">
              <span className="dp-video-card__play" />
            </div>
            <figcaption className="dp-video-card__caption">
              <span className="dp-video-card__placeholder-id">{placeholderId}</span>
              <p className="dp-video-card__placeholder-desc">{description}</p>
            </figcaption>
          </figure>
        )}
      </div>
      {title || subtitle ? (
        <div className="dp-video-card__info">
          {title ? <h3 className="dp-video-card__title">{title}</h3> : null}
          {subtitle ? <p className="dp-video-card__desc">{subtitle}</p> : null}
        </div>
      ) : null}
    </article>
  )
}

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
  aspectRatio = '21 / 9',
  className = '',
}: ImagePlaceholderProps) {
  return (
    <figure
      className={`dp-placeholder ${className}`.trim()}
      style={{ aspectRatio }}
    >
      {src ? (
        <img
          className="dp-placeholder__img"
          src={src}
          alt=""
          onError={(event) => {
            event.currentTarget.style.display = 'none'
          }}
        />
      ) : null}
      <figcaption className="dp-placeholder__caption">
        <span className="dp-placeholder__id">{id}</span>
        <p className="dp-placeholder__desc">{description}</p>
      </figcaption>
    </figure>
  )
}

type SectionProps = {
  id?: string
  title: string
  children: ReactNode
  className?: string
  titleVariant?: 'default' | 'portfolio'
}

export function Section({
  id,
  title,
  children,
  className = '',
  titleVariant = 'default',
}: SectionProps) {
  return (
    <section id={id} className={`dp-section ${className}`.trim()}>
      <div className="dp-section__inner">
        <header className="dp-section__header">
          <h2
            className={`dp-section__title${titleVariant === 'portfolio' ? ' dp-section__title--portfolio' : ''}`}
          >
            {title}
          </h2>
        </header>
        {children}
      </div>
    </section>
  )
}

type ApplicationCardProps = {
  title: string
  description: string
}

export function ApplicationCard({ title, description }: ApplicationCardProps) {
  return (
    <article className="dp-app-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  )
}
