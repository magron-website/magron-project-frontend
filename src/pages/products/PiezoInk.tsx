import { useTranslation } from 'react-i18next'
import '@/assets/design/products/piezo-ink.css'

// Temporary placeholder — swap for the real PIEZO Ink product photo once available.
const heroImage =
  'https://oxziijsqpiasesuqtxhs.supabase.co/storage/v1/object/public/magron-website/product-explaination/nano_science.png'

type Card = { title: string; description: string }

export default function PiezoInk() {
  const { t } = useTranslation(['piezoInk', 'product'])
  const opts = { returnObjects: true, ns: 'piezoInk' } as const
  const heroLead = t('hero.lead', opts) as unknown as string[]
  const heroCards = t('heroCards', opts) as unknown as Card[]
  const inquiryItems = t('cta.items', opts) as unknown as string[]

  return (
    <article className="pi-page">
      {/* 1. Hero */}
      <header className="pi-hero">
        <div className="pi-hero__inner">
          <div className="pi-hero__content">
            <p className="pi-hero__label">{t('hero.label', { ns: 'piezoInk' })}</p>
            <h1 className="pi-hero__title">{t('hero.title', { ns: 'piezoInk' })}</h1>
            <p className="pi-hero__title-en">{t('hero.titleEn', { ns: 'piezoInk' })}</p>
            <div className="pi-hero__lead">
              {heroLead.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
            <div className="pi-hero__cards">
              {heroCards.map((card) => (
                <article key={card.title} className="pi-feature-card">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="pi-hero__visual">
            <img className="pi-hero__image" src={heroImage} alt={t('hero.heroAlt', { ns: 'piezoInk' })} />
          </div>
        </div>
      </header>

      <div className="pi-page__body">
        {/* 2. Overview */}
        <section className="pi-section">
          <header className="pi-section__header">
            <h2 className="pi-section__title">{t('overview.title', { ns: 'piezoInk' })}</h2>
          </header>
          <div className="pi-prose">
            <p>{t('overview.prose', { ns: 'piezoInk' })}</p>
          </div>
        </section>

        {/* 3. Bottom CTA */}
        <section className="pi-cta-banner">
          <div className="pi-cta-banner__inner">
            <h2>{t('cta.title', { ns: 'piezoInk' })}</h2>
            <p>{t('cta.desc', { ns: 'piezoInk' })}</p>
            <div className="pi-cta-group">
              <a className="pi-btn pi-btn--primary" href="mailto:magron@magron.co.kr">
                {t('cta.contactCta', { ns: 'piezoInk' })}
              </a>
            </div>
            <p className="pi-cta-note">{t('product:contactNote')}</p>
            <div className="pi-inquiry-list">
              <p className="pi-cta-banner__note">{t('product:inquiryNote')}</p>
              <ul className="pi-check-list">
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
