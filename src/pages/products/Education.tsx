import { useTranslation } from 'react-i18next'
import CatalogDownloadButton from '@/components/CatalogDownloadButton'
import {
  COMPONENT_DETAIL_MEDIA,
  KIT_COMPONENT_MEDIA,
  MAKING_VIDEO_ID,
  PACKAGING_VIDEO_IDS,
  heroKit,
  type ComponentDetail,
  type KitComponent,
  type KitVideo,
} from '@/pages/products/education/content'
import {
  ComponentDetailView,
  ProductCard,
  Section,
  VideoSlot,
} from '@/pages/products/education/components'
import '@/assets/design/products/education.css'

type Card = { title: string; description: string }
type CompText = {
  nameKr: string
  body: string
  bullets: string[]
  note?: string
  videoLabels: string[]
}

export default function Education() {
  const { t } = useTranslation(['education', 'product'])
  const opts = { returnObjects: true, ns: 'education' } as const
  const heroLead = t('hero.lead', opts) as unknown as string[]
  const heroCards = t('heroCards', opts) as unknown as Card[]
  const components = t('components', opts) as unknown as Record<string, CompText>
  const principleText = t('principle.text', opts) as unknown as string[]
  const makingSteps = t('making.steps', opts) as unknown as string[]
  const packagingLabels = t('packaging.videoLabels', opts) as unknown as string[]
  const inquiryItems = t('cta.items', opts) as unknown as string[]

  const kitComponents: KitComponent[] = KIT_COMPONENT_MEDIA.map((m) => ({
    name: m.name,
    nameKr: components[m.id].nameKr,
    volume: m.volume,
    image: m.image,
  }))

  const componentDetails: ComponentDetail[] = COMPONENT_DETAIL_MEDIA.map((m) => {
    const c = components[m.id]
    return {
      id: m.id,
      index: m.index,
      name: m.name,
      nameKr: c.nameKr,
      image: m.image,
      body: c.body,
      bulletPoints: c.bullets,
      note: c.note,
      videos: m.videoIds.map((videoId, i) => ({ label: c.videoLabels[i], videoId })),
    }
  })

  const packagingVideos: KitVideo[] = PACKAGING_VIDEO_IDS.map((videoId, i) => ({
    label: packagingLabels[i],
    videoId,
  }))

  const makingVideo: KitVideo = {
    label: t('making.videoLabel', { ns: 'education' }),
    videoId: MAKING_VIDEO_ID,
  }

  return (
    <article className="ed-page">
      {/* 1. Hero */}
      <header className="ed-hero">
        <div className="ed-hero__inner">
          <div className="ed-hero__content">
            <p className="ed-hero__label">{t('hero.label', { ns: 'education' })}</p>
            <h1 className="ed-hero__title">{t('hero.title', { ns: 'education' })}</h1>
            {t('hero.titleEn', { ns: 'education' }) ? (
              <p className="ed-hero__title-en">{t('hero.titleEn', { ns: 'education' })}</p>
            ) : null}
            <div className="ed-hero__lead">
              {heroLead.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
            <div className="ed-hero__cards">
              {heroCards.map((card) => (
                <article key={card.title} className="ed-point-card">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="ed-hero__visual">
            <img
              className="ed-hero__image"
              src={heroKit}
              alt={t('hero.heroAlt', { ns: 'education' })}
            />
          </div>
        </div>
      </header>

      <div className="ed-page__body">
        {/* 2. 제품 구성 */}
        <Section title={t('compose.title', { ns: 'education' })}>
          <div className="ed-prose">
            <p>{t('compose.prose', { ns: 'education' })}</p>
          </div>
          <div className="ed-product-grid">
            {kitComponents.map((item) => (
              <ProductCard key={item.name} item={item} />
            ))}
          </div>
        </Section>

        {/* 3. 구성품별 상세 */}
        <Section title={t('detailTitle', { ns: 'education' })} className="ed-section--kit">
          <div className="ed-detail-list">
            {componentDetails.map((detail) => (
              <ComponentDetailView key={detail.id} detail={detail} />
            ))}
          </div>
        </Section>

        {/* 4. 제품 수량 및 패키징 */}
        <Section title={t('packaging.title', { ns: 'education' })}>
          <div className="ed-prose">
            <p>{t('packaging.prose', { ns: 'education' })}</p>
          </div>
          <div className="ed-video-grid ed-video-grid--two">
            {packagingVideos.map((video) => (
              <VideoSlot key={video.label} video={video} />
            ))}
          </div>
        </Section>

        {/* 5. 동작 원리 */}
        <Section title={t('principle.title', { ns: 'education' })}>
          <div className="ed-prose">
            {principleText.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="ed-highlight">{t('principle.highlight', { ns: 'education' })}</p>
        </Section>

        {/* 6. 제작 방법 */}
        <Section title={t('making.title', { ns: 'education' })}>
          <div className="ed-prose">
            <p>{t('making.prose', { ns: 'education' })}</p>
          </div>
          <ol className="ed-safety-list ed-making-list">
            {makingSteps.map((step, index) => (
              <li key={step}>
                <span className="ed-safety-list__num">{index + 1}</span>
                {step}
              </li>
            ))}
          </ol>
          <div className="ed-making-video">
            <VideoSlot video={makingVideo} />
            <figure className="ed-making-video__image">
              <img src={heroKit} alt={t('making.imageAlt', { ns: 'education' })} loading="lazy" />
            </figure>
          </div>
        </Section>

        {/* 7. Bottom CTA */}
        <section className="ed-cta-banner">
          <div className="ed-cta-banner__inner">
            <h2>{t('cta.title', { ns: 'education' })}</h2>
            <p>{t('cta.desc', { ns: 'education' })}</p>
            <div className="ed-cta-group">
              <CatalogDownloadButton product="education" className="ed-btn ed-btn--primary">
                {t('product:catalogDownload')}
              </CatalogDownloadButton>
            </div>
            <p className="product-cta-note">{t('product:contactNote')}</p>
            <div className="ed-inquiry-list">
              <p className="ed-cta-banner__note">{t('product:inquiryNote')}</p>
              <ul className="ed-check-list ed-check-list--light">
                {inquiryItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </article>
  )
}
