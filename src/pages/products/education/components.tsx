import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import type { ComponentDetail, KitComponent, KitVideo } from '@/pages/products/education/content'

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

/** 제품 구성 카드 — 병 사진 + 이름/용량 */
export function ProductCard({ item }: { item: KitComponent }) {
  return (
    <article className="ed-product-card">
      <div className="ed-product-card__media">
        <img src={item.image} alt={`${item.nameKr} (${item.name})`} loading="lazy" />
      </div>
      <div className="ed-product-card__body">
        <h3>{item.nameKr}</h3>
        <p className="ed-product-card__en">{item.name}</p>
        <span className="ed-product-card__vol">{item.volume}</span>
      </div>
    </article>
  )
}

/** 영상 슬롯 — videoId가 있으면 유튜브 임베드, 없으면 "준비중" 자리표시자 */
export function VideoSlot({ video }: { video: KitVideo }) {
  const { t } = useTranslation('education')
  return (
    <figure className="ed-video-slot">
      {video.videoId ? (
        <div className="ed-video-slot__frame ed-video-slot__frame--embed">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.videoId}?rel=0`}
            title={video.label}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="ed-video-slot__frame">
          <span className="ed-video-slot__play" aria-hidden="true" />
          <span className="ed-video-slot__badge">{t('videoBadge')}</span>
        </div>
      )}
      <figcaption>{video.label}</figcaption>
    </figure>
  )
}

/** 구성품 상세 — 좌측 제품 이미지 + 우측 설명 + 하단 영상 슬롯 */
export function ComponentDetailView({ detail }: { detail: ComponentDetail }) {
  return (
    <article id={detail.id} className="ed-detail">
      <h3 className="ed-detail__title">
        <span className="ed-detail__num">{detail.index}</span>
        {detail.nameKr} <span className="ed-detail__en">({detail.name})</span>
      </h3>
      <div className="ed-detail__layout">
        <figure className="ed-detail__media">
          <img src={detail.image} alt={`${detail.nameKr} (${detail.name})`} loading="lazy" />
        </figure>
        <div className="ed-detail__content">
          <p className="ed-detail__body">{detail.body}</p>
          <ul className="ed-bullet-list">
            {detail.bulletPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          {detail.note ? <p className="ed-detail__note">{detail.note}</p> : null}
        </div>
      </div>
      {detail.videos.length > 0 ? (
        <div className="ed-video-grid ed-video-grid--two">
          {detail.videos.map((video) => (
            <VideoSlot key={video.label} video={video} />
          ))}
        </div>
      ) : null}
    </article>
  )
}
