import { useTranslation } from 'react-i18next'
import CatalogDownloadButton from '@/components/CatalogDownloadButton'
import { MAGNET_TABLE_IMAGES, heroMagnets } from '@/pages/products/magnet/content'
import { Section, TableFigure } from '@/pages/products/magnet/components'
import '@/assets/design/products/magnet.css'

type Card = { title: string; description: string }
type GlossaryItem = { term: string; desc: string }
type FamilyTable = { id: string; title: string; description: string; note?: string }
type Family = { id: string; name: string; nameKr: string; intro: string; tables: FamilyTable[] }

export default function Magnet() {
  const { t } = useTranslation(['magnet', 'product'])
  const opts = { returnObjects: true, ns: 'magnet' } as const
  const heroCards = t('heroCards', opts) as unknown as Card[]
  const glossary = t('glossary', opts) as unknown as GlossaryItem[]
  const families = t('families', opts) as unknown as Family[]
  const inquiryItems = t('cta.items', opts) as unknown as string[]

  return (
    <article className="mn-page">
      {/* 1. Hero */}
      <header className="mn-hero">
        <div className="mn-hero__inner">
          <div className="mn-hero__content">
            <p className="mn-hero__label">{t('hero.label', { ns: 'magnet' })}</p>
            <h1 className="mn-hero__title">{t('hero.title', { ns: 'magnet' })}</h1>
            <p className="mn-hero__title-en">{t('hero.titleEn', { ns: 'magnet' })}</p>
            <p className="mn-hero__lead">{t('hero.lead', { ns: 'magnet' })}</p>
            <div className="mn-hero__body">
              <p>{t('hero.body', { ns: 'magnet' })}</p>
            </div>
            <div className="mn-hero__cards">
              {heroCards.map((card) => (
                <article key={card.title} className="mn-feature-card">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="mn-hero__visual">
            <img
              className="mn-hero__image"
              src={heroMagnets}
              alt={t('hero.heroAlt', { ns: 'magnet' })}
            />
          </div>
        </div>
      </header>

      <div className="mn-page__body">
        {/* 소재 quick-nav */}
        <nav className="mn-matnav" aria-label={t('matnavAria', { ns: 'magnet' })}>
          {families.map((fam) => (
            <a key={fam.id} href={`#${fam.id}`} className="mn-matnav__item">
              <span className="mn-matnav__name">{fam.name}</span>
              <span className="mn-matnav__kr">{fam.nameKr}</span>
            </a>
          ))}
        </nav>

        {/* 특성 용어 안내 */}
        <Section title={t('glossaryTitle', { ns: 'magnet' })}>
          <div className="mn-prose">
            <p>{t('glossaryIntro', { ns: 'magnet' })}</p>
          </div>
          <dl className="mn-glossary">
            {glossary.map((item) => (
              <div key={item.term} className="mn-glossary__row">
                <dt>{item.term}</dt>
                <dd>{item.desc}</dd>
              </div>
            ))}
          </dl>
        </Section>

        {/* 소재별 자기특성표 */}
        {families.map((fam) => (
          <Section
            key={fam.id}
            id={fam.id}
            title={`${fam.name} · ${fam.nameKr}`}
            className="mn-section--spec"
          >
            <div className="mn-prose">
              <p>{fam.intro}</p>
            </div>
            <div className="mn-mat-tables">
              {fam.tables.map((table) => (
                <TableFigure
                  key={table.id}
                  id={table.id}
                  title={table.title}
                  description={table.description}
                  image={MAGNET_TABLE_IMAGES[table.id]}
                  note={table.note}
                />
              ))}
            </div>
          </Section>
        ))}

        {/* Bottom CTA */}
        <section className="mn-cta-banner">
          <div className="mn-cta-banner__inner">
            <h2>{t('cta.title', { ns: 'magnet' })}</h2>
            <p>{t('cta.desc', { ns: 'magnet' })}</p>
            <div className="mn-cta-group">
              <CatalogDownloadButton product="magnet" className="mn-btn mn-btn--primary">
                {t('product:catalogDownload')}
              </CatalogDownloadButton>
            </div>
            <p className="product-cta-note">{t('product:contactNote')}</p>
            <div className="mn-inquiry-list">
              <p className="mn-cta-banner__note">{t('product:inquiryNote')}</p>
              <ul className="mn-check-list mn-check-list--light">
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
