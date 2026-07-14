import { useTranslation } from 'react-i18next'
import CatalogDownloadButton from '@/components/CatalogDownloadButton'
import { CATEGORIES, heroMontage } from '@/pages/products/feedthrough/content'
import { ProductCard } from '@/pages/products/feedthrough/components'
import '@/assets/design/products/feedthrough.css'

type Card = { title: string; description: string }

export default function Feedthrough() {
  const { t } = useTranslation(['feedthrough', 'product'])
  const heroCards = t('heroCards', { returnObjects: true, ns: 'feedthrough' }) as unknown as Card[]
  const inquiryItems = t('inquiryItems', { returnObjects: true, ns: 'feedthrough' }) as unknown as string[]

  // Merge translated prose into the catalogue data; the spec tables (numeric/
  // technical) stay as-is. defaultValue falls back to the Korean source.
  const categories = CATEGORIES.map((cat) => ({
    ...cat,
    titleKr: t(`categories.${cat.id}.titleKr`, { ns: 'feedthrough', defaultValue: cat.titleKr }),
    intro: t(`categories.${cat.id}.intro`, { ns: 'feedthrough', defaultValue: cat.intro }),
    products: cat.products.map((product) => ({
      ...product,
      titleKr: t(`products.${product.id}.titleKr`, {
        ns: 'feedthrough',
        defaultValue: product.titleKr,
      }),
      description: t(`products.${product.id}.description`, {
        ns: 'feedthrough',
        defaultValue: product.description,
      }),
    })),
  }))

  return (
    <article className="ft-page">
      {/* 1. Hero */}
      <header className="ft-hero">
        <div className="ft-hero__inner">
          <div className="ft-hero__content">
            <p className="ft-hero__label">{t('hero.label', { ns: 'feedthrough' })}</p>
            <h1 className="ft-hero__title">Feedthrough</h1>
            <p className="ft-hero__title-en">{t('hero.titleEn', { ns: 'feedthrough' })}</p>
            <p className="ft-hero__lead">{t('hero.lead', { ns: 'feedthrough' })}</p>
            <div className="ft-hero__body">
              <p>{t('hero.body', { ns: 'feedthrough' })}</p>
            </div>
            <div className="ft-hero__cards">
              {heroCards.map((card) => (
                <article key={card.title} className="ft-feature-card">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="ft-hero__visual">
            <img
              className="ft-hero__image"
              src={heroMontage}
              alt={t('hero.heroAlt', { ns: 'feedthrough' })}
            />
          </div>
        </div>
      </header>

      <div className="ft-page__body">
        {/* Category quick-nav */}
        <nav className="ft-catnav" aria-label={t('catnavAria', { ns: 'feedthrough' })}>
          {categories.map((cat) => (
            <a key={cat.id} href={`#${cat.id}`} className="ft-catnav__item">
              <span className="ft-catnav__title">{cat.title}</span>
              <span className="ft-catnav__kr">{cat.titleKr}</span>
            </a>
          ))}
        </nav>

        {/* Product catalogue by category */}
        {categories.map((cat) => (
          <section key={cat.id} id={cat.id} className="ft-category">
            <header className="ft-category__header">
              <p className="ft-category__eyebrow">{cat.titleKr}</p>
              <h2 className="ft-category__title">{cat.title}</h2>
              <p className="ft-category__intro">{cat.intro}</p>
            </header>
            <div className="ft-category__products">
              {cat.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        ))}

        {/* Bottom CTA */}
        <section className="ft-cta-banner">
          <div className="ft-cta-banner__inner">
            <h2>{t('cta.title', { ns: 'feedthrough' })}</h2>
            <p>{t('cta.desc', { ns: 'feedthrough' })}</p>
            <div className="ft-cta-group">
              <CatalogDownloadButton product="feedthrough" className="ft-btn ft-btn--primary">
                {t('product:catalogDownload')}
              </CatalogDownloadButton>
            </div>
            <p className="product-cta-note">{t('product:contactNote')}</p>
            <div className="ft-inquiry-list">
              <p className="ft-cta-banner__note">{t('product:inquiryNote')}</p>
              <ul className="ft-check-list ft-check-list--light">
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
