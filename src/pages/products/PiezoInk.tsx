import { useTranslation } from 'react-i18next'
import AnswerBlock from '@/components/AnswerBlock'
import { CATEGORIES, IN_MOLD_ADVANTAGES, IN_MOLD_STEPS } from '@/pages/products/piezoInk/content'
import { ProductCard } from '@/pages/products/piezoInk/components'
import '@/assets/design/products/piezo-ink.css'

type Card = { title: string; description: string }

export default function PiezoInk() {
  const { t } = useTranslation(['piezoInk', 'product'])
  const opts = { returnObjects: true, ns: 'piezoInk' } as const
  const heroLead = t('hero.lead', opts) as unknown as string[]
  const heroCards = t('heroCards', opts) as unknown as Card[]
  const inquiryItems = t('inquiryItems', opts) as unknown as string[]
  const noDatasheetLabel = t('noDatasheet', { ns: 'piezoInk' })
  const substratesLabel = t('substratesLabel', { ns: 'piezoInk' })

  // Merge translated prose into the catalogue data, same pattern as Feedthrough:
  // spec tables (numeric/technical) stay as-is, titleKr/description come from i18n.
  const categories = CATEGORIES.map((cat) => ({
    ...cat,
    titleKr: t(`categories.${cat.id}.titleKr`, { ns: 'piezoInk', defaultValue: cat.titleKr }),
    intro: t(`categories.${cat.id}.intro`, { ns: 'piezoInk', defaultValue: cat.intro }),
    products: cat.products.map((product) => ({
      ...product,
      titleKr: t(`products.${product.id}.titleKr`, { ns: 'piezoInk', defaultValue: product.titleKr }),
      description: t(`products.${product.id}.description`, {
        ns: 'piezoInk',
        defaultValue: product.description,
      }),
    })),
  }))

  return (
    <article className="pi-page">
      {/* 1. Hero */}
      <header className="pi-hero">
        <div className="pi-hero__inner">
          <div className="pi-hero__content">
            <p className="pi-hero__label">{t('hero.label', { ns: 'piezoInk' })}</p>
            <h1 className="pi-hero__title">{t('hero.titleEn', { ns: 'piezoInk' })}</h1>
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
        </div>
      </header>

      {/* 직답 블록 — 히어로 바로 아래가 AI 검색이 가장 먼저 읽는 자리다 */}
      <AnswerBlock routePath="/piezo-ink" />

      <div className="pi-page__body">
        {/* 1. In-Mold Electronics — application overview, shown first */}
        <section className="pi-section pi-section--inmold pi-section--first">
          <header className="pi-section__header">
            <p className="pi-section__eyebrow">01</p>
            <h2 className="pi-section__title">{t('inMold.title', { ns: 'piezoInk' })}</h2>
          </header>
          <p className="pi-prose">{t('inMold.intro', { ns: 'piezoInk' })}</p>

          <ol className="pi-process">
            {IN_MOLD_STEPS.map((step, i) => (
              <li key={step.id} className="pi-process__step">
                <span className="pi-process__num">{i + 1}</span>
                <span className="pi-process__label">
                  {t(`inMold.steps.${step.id}`, { ns: 'piezoInk', defaultValue: step.title })}
                </span>
              </li>
            ))}
          </ol>

          <div className="pi-advantage-grid">
            {IN_MOLD_ADVANTAGES.map((adv) => (
              <article key={adv.id} className="pi-advantage-card">
                <h3>{t(`inMold.advantages.${adv.id}.title`, { ns: 'piezoInk', defaultValue: adv.title })}</h3>
                <p>{t(`inMold.advantages.${adv.id}.description`, { ns: 'piezoInk' })}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Category quick-nav */}
        <nav className="pi-catnav" aria-label={t('catnavAria', { ns: 'piezoInk' })}>
          {categories.map((cat) => (
            <a key={cat.id} href={`#${cat.id}`} className="pi-catnav__item">
              <span className="pi-catnav__title">{cat.title}</span>
              <span className="pi-catnav__kr">{cat.titleKr}</span>
            </a>
          ))}
        </nav>

        {/* 2–6. Product catalogue by category, in order: Bendable Silver, Copper,
            Transparent Silver, Piezoelectric, Piezoresistive */}
        {categories.map((cat) => (
          <section key={cat.id} id={cat.id} className="pi-category">
            <header className="pi-category__header">
              <p className="pi-category__eyebrow">{cat.titleKr}</p>
              <h2 className="pi-category__title">{cat.title}</h2>
              <p className="pi-category__intro">{cat.intro}</p>
            </header>
            <div className="pi-category__products">
              {cat.products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  noDatasheetLabel={noDatasheetLabel}
                  substratesLabel={substratesLabel}
                />
              ))}
            </div>
          </section>
        ))}

        {/* Bottom CTA */}
        <section className="pi-cta-banner">
          <div className="pi-cta-banner__inner">
            <h2>{t('cta.title', { ns: 'piezoInk' })}</h2>
            <p>{t('cta.desc', { ns: 'piezoInk' })}</p>
            <div className="pi-cta-group">
              <a className="pi-btn pi-btn--primary" href="mailto:magron@magron.co.kr">
                {t('product:productInquiry')}
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
