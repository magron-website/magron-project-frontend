import { useTranslation } from 'react-i18next'
import CatalogDownloadButton from '@/components/CatalogDownloadButton'
import {
  PACKAGE_IMAGES,
  SEAL_STEP_IMAGES,
  heroReel,
  internalCrossSection,
  internalCutaway,
  sealPrincipleDiagram,
  sealPrincipleReel,
} from '@/pages/products/magoil/content'
import { Figure, Section, YouTubeEmbed } from '@/pages/products/magoil/components'
import '@/assets/design/products/magoil.css'

type Card = { title: string; description: string }

export default function Magoil() {
  const { t } = useTranslation(['magoil', 'product'])
  const opts = { returnObjects: true, ns: 'magoil' } as const
  const heroPoints = t('heroPoints', opts) as unknown as Card[]
  const packagePoints = t('metal.points', opts) as unknown as string[]
  const packageCaptions = t('metal.imageCaptions', opts) as unknown as string[]
  const waterproofProse = t('waterproof.prose', opts) as unknown as string[]
  const sealSteps = t('waterproof.steps', opts) as unknown as string[]
  const internalProse = t('internal.prose', opts) as unknown as string[]
  const inquiryItems = t('cta.items', opts) as unknown as string[]

  return (
    <article className="mg-page">
      {/* 1. Hero */}
      <header className="mg-hero">
        <div className="mg-hero__inner">
          <div className="mg-hero__content">
            <p className="mg-hero__label">{t('hero.label', { ns: 'magoil' })}</p>
            <h1 className="mg-hero__title">{t('hero.title', { ns: 'magoil' })}</h1>
            <p className="mg-hero__subtitle">{t('hero.subtitle', { ns: 'magoil' })}</p>
            {t('hero.titleEn', { ns: 'magoil' }) ? (
              <p className="mg-hero__title-en">{t('hero.titleEn', { ns: 'magoil' })}</p>
            ) : null}
            <p className="mg-hero__lead">{t('hero.lead', { ns: 'magoil' })}</p>
            <div className="mg-hero__cards">
              {heroPoints.map((card) => (
                <article key={card.title} className="mg-point-card">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="mg-hero__visual">
            <img
              className="mg-hero__image"
              src={heroReel}
              alt={t('hero.heroAlt', { ns: 'magoil' })}
            />
          </div>
        </div>
      </header>

      <div className="mg-page__body">
        {/* 2. 금속 병 타입 (magoil_2) */}
        <Section title={t('metal.title', { ns: 'magoil' })}>
          <div className="mg-prose">
            <p>{t('metal.prose', { ns: 'magoil' })}</p>
          </div>
          <ul className="mg-check-list">
            {packagePoints.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="mg-capacity">
            <span className="mg-capacity__badge">CAPACITY</span>
            <div>
              <p className="mg-capacity__title">★ {t('metal.capacityTitle', { ns: 'magoil' })}</p>
              <p className="mg-capacity__detail">{t('metal.capacityDetail', { ns: 'magoil' })}</p>
            </div>
          </div>
          <div className="mg-figure-grid mg-figure-grid--2">
            {PACKAGE_IMAGES.map((image, i) => (
              <Figure key={packageCaptions[i]} src={image} caption={packageCaptions[i]} />
            ))}
          </div>
        </Section>

        {/* 3. 방수 원리 (magoil_3) */}
        <Section title={t('waterproof.title', { ns: 'magoil' })} className="mg-section--ocean">
          <div className="mg-prose">
            {waterproofProse.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
          <div className="mg-figure-grid mg-figure-grid--principle">
            <Figure src={sealPrincipleDiagram} caption={t('waterproof.diagramCaption', { ns: 'magoil' })} />
            <Figure src={sealPrincipleReel} caption={t('waterproof.reelCaption', { ns: 'magoil' })} />
          </div>

          <h3 className="mg-subheading">{t('waterproof.stepsHeading', { ns: 'magoil' })}</h3>
          <div className="mg-step-grid">
            {SEAL_STEP_IMAGES.map((image, i) => (
              <article key={sealSteps[i]} className="mg-step">
                <Figure src={image} />
                <p className="mg-step__text">
                  <span className="mg-step__num">{i + 1}</span>
                  {sealSteps[i]}
                </p>
              </article>
            ))}
          </div>
        </Section>

        {/* 4. 릴 내부 방수 설명도 (magoil_4) */}
        <Section title={t('internal.title', { ns: 'magoil' })} className="mg-section--ocean">
          <div className="mg-prose">
            {internalProse.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
          <div className="mg-figure-grid mg-figure-grid--internal">
            <Figure src={internalCrossSection} caption={t('internal.crossCaption', { ns: 'magoil' })} />
            <Figure src={internalCutaway} caption={t('internal.cutawayCaption', { ns: 'magoil' })} />
          </div>
        </Section>

        {/* 5. 교체방법 영상 */}
        <Section title={t('video.title', { ns: 'magoil' })}>
          <div className="mg-prose">
            <p>{t('video.prose', { ns: 'magoil' })}</p>
          </div>
          <YouTubeEmbed
            videoId="iExN__XaRaQ"
            title={t('video.title', { ns: 'magoil' })}
            watchUrl="https://youtu.be/iExN__XaRaQ"
            note={t('video.note', { ns: 'magoil' })}
          />
        </Section>

        {/* 6. 문의 CTA */}
        <section className="mg-cta-banner">
          <div className="mg-cta-banner__inner">
            <h2>{t('cta.title', { ns: 'magoil' })}</h2>
            <p className="mg-cta-banner__lead">{t('cta.lead', { ns: 'magoil' })}</p>
            <div className="mg-cta-group">
              <CatalogDownloadButton product="magoil" className="mg-btn mg-btn--primary">
                {t('product:catalogDownload')}
              </CatalogDownloadButton>
            </div>
            <p className="product-cta-note">{t('product:contactNote')}</p>
            <div className="mg-inquiry-list">
              <p className="mg-cta-banner__note">{t('product:inquiryNote')}</p>
              <ul className="mg-check-list mg-check-list--light">
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
