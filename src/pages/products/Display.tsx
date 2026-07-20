import { useTranslation } from 'react-i18next'
import CatalogDownloadButton from '@/components/CatalogDownloadButton'
import { useDisplayVideos } from '@/hooks/useDisplayVideos'
import { MAIN_VIDEO, PORTFOLIO_VIDEOS } from '@/pages/products/display/content'
import { ApplicationCard, Section, VideoCard } from '@/pages/products/display/components'
import '@/assets/design/products/display.css'

type Card = { title: string; description: string }

export default function Display() {
  const { t } = useTranslation(['display', 'product'])
  const { videos } = useDisplayVideos()
  const opts = { returnObjects: true, ns: 'display' } as const
  const portfolioDescriptions = t('portfolio.descriptions', opts) as unknown as string[]
  const applicationCards = t('application.cards', opts) as unknown as Card[]
  const inquiryItems = t('cta.items', opts) as unknown as string[]

  return (
    <article className="dp-page">
      {/* 1. Hero */}
      <header className="dp-hero">
        <div className="dp-hero__inner">
          <p className="dp-hero__label">{t('hero.label', { ns: 'display' })}</p>
          <h1 className="dp-hero__title">{t('hero.title', { ns: 'display' })}</h1>
          {t('hero.titleEn', { ns: 'display' }) ? (
            <p className="dp-hero__title-en">{t('hero.titleEn', { ns: 'display' })}</p>
          ) : null}
          <p className="dp-hero__lead">{t('hero.lead', { ns: 'display' })}</p>
        </div>
      </header>

      <div className="dp-main-video">
        <div className="dp-main-video__inner">
          <VideoCard
            variant="hero"
            placeholderId={MAIN_VIDEO.placeholderId}
            description={t('mainVideoDesc', { ns: 'display' })}
            youtubeUrl={MAIN_VIDEO.youtubeUrl}
            thumbnailSrc={MAIN_VIDEO.thumbnailSrc}
          />
        </div>
      </div>

      <div className="dp-page__body">
        {/* 2. Portfolio */}
        <Section title={t('portfolio.title', { ns: 'display' })} titleVariant="portfolio">
          <p className="dp-section__lead">{t('portfolio.lead', { ns: 'display' })}</p>
          <div className="dp-portfolio-grid">
            {PORTFOLIO_VIDEOS.map((video, i) => (
              <VideoCard
                key={video.placeholderId}
                variant="portfolio"
                placeholderId={video.placeholderId}
                description={portfolioDescriptions[i]}
                /* Positional pairing: card i takes the i-th row by sort_order. */
                videoSrc={videos[i]?.videoUrl}
                thumbnailSrc={video.thumbnailSrc}
                title={video.title}
                subtitle={portfolioDescriptions[i]}
              />
            ))}
          </div>
        </Section>

        {/* 3. Application */}
        <Section title={t('application.title', { ns: 'display' })}>
          <p className="dp-section__lead">{t('application.lead', { ns: 'display' })}</p>
          <div className="dp-app-grid">
            {applicationCards.map((card) => (
              <ApplicationCard key={card.title} title={card.title} description={card.description} />
            ))}
          </div>
        </Section>

        {/* 4. Custom Order Banner */}
        <section className="dp-banner">
          <div className="dp-banner__content">
            <h2 className="dp-banner__title">{t('banner.title', { ns: 'display' })}</h2>
            <p className="dp-banner__desc">{t('banner.desc', { ns: 'display' })}</p>
          </div>
        </section>

        {/* 6. Bottom CTA */}
        <section className="dp-cta-banner">
          <div className="dp-cta-banner__inner">
            <h2>{t('cta.title', { ns: 'display' })}</h2>
            <p>{t('cta.desc', { ns: 'display' })}</p>
            <div className="dp-cta-group">
              <CatalogDownloadButton product="display" className="dp-btn dp-btn--primary">
                {t('product:catalogDownload')}
              </CatalogDownloadButton>
            </div>
            <p className="product-cta-note">{t('product:contactNote')}</p>
            <div className="dp-inquiry-list">
              <p className="dp-cta-banner__note">{t('product:inquiryNote')}</p>
              <ul className="dp-check-list dp-check-list--light">
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
