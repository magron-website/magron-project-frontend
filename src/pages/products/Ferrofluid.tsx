import { useTranslation } from 'react-i18next'
import AnswerBlock from '@/components/AnswerBlock'
import CatalogDownloadButton from '@/components/CatalogDownloadButton'
import { CompanyTable, Figure, PointList, Section } from '@/pages/products/ferrofluid/components'
import {
  imgApplicationExtra,
  imgApplicationField,
  imgApplicationGrid,
  imgCompanyBuilding,
  imgCorrosiveProduct,
  imgLeakM4251,
  imgLeakM5070,
  imgProduct,
  imgSealSection,
  imgTgaMff,
  imgTgaMfsMfh,
} from '@/pages/products/ferrofluid/content'
import SpecTable from '@/components/SpecTable'
import { LANGUAGES, type Language } from '@/i18n'
import {
  corrosiveSpecTable,
  greaseSpecTable,
  leakTestTable,
  nonCorrosiveSpecTable,
} from '@/pages/products/ferrofluid/specTables'
import '@/assets/design/products/ferrofluid.css'

type Card = { title: string; description: string }
type Point = { label: string; value: string }

export default function Ferrofluid() {
  const { t, i18n } = useTranslation(['ferrofluid', 'product'])
  const lang: Language = (LANGUAGES as readonly string[]).includes(i18n.language)
    ? (i18n.language as Language)
    : 'ko'
  const opts = { returnObjects: true, ns: 'ferrofluid' } as const
  const heroCardsList = t('heroCards', opts) as unknown as Card[]
  const corrosivePoints = t('corrosive.points', opts) as unknown as Point[]
  const nonCorrosivePoints = t('nonCorrosive.points', opts) as unknown as Point[]
  const companyRows = t('company.rows', opts) as unknown as Point[]
  const inquiryItems = t('cta.items', opts) as unknown as string[]
  const titleEn = t('hero.titleEn', { ns: 'ferrofluid' })

  return (
    <article className="ff-page">
      {/* 1. Hero */}
      <header className="ff-hero">
        <div className="ff-hero__inner">
          <div className="ff-hero__content">
            <p className="ff-hero__label">{t('hero.label', { ns: 'ferrofluid' })}</p>
            <h1 className="ff-hero__title">{t('hero.title', { ns: 'ferrofluid' })}</h1>
            {titleEn ? <p className="ff-hero__title-en">{titleEn}</p> : null}
            <p className="ff-hero__lead">{t('hero.lead', { ns: 'ferrofluid' })}</p>
            <div className="ff-hero__cards">
              {heroCardsList.map((card) => (
                <article key={card.title} className="ff-feature-card">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="ff-hero__visual">
            <img
              className="ff-hero__image"
              src={imgProduct}
              alt={t('hero.productAlt', { ns: 'ferrofluid' })}
            />
          </div>
        </div>
      </header>

      {/* 1-1. 직답 블록 — 히어로 바로 아래가 AI 검색이 가장 먼저 읽는 자리다 */}
      <AnswerBlock routePath="/ferrofluid" />

      <div className="ff-page__body">
        {/* 2. Corrosive Gas */}
        <Section
          title={t('corrosive.title', { ns: 'ferrofluid' })}
          subtitle={t('corrosive.subtitle', { ns: 'ferrofluid' })}
        >
          <div className="ff-split">
            <Figure
              src={imgCorrosiveProduct}
              alt={t('corrosive.productAlt', { ns: 'ferrofluid' })}
              className="ff-figure--product"
            />
            <div className="ff-prose">
              <p>{t('corrosive.prose', { ns: 'ferrofluid' })}</p>
              <PointList points={corrosivePoints} />
            </div>
          </div>

          <h3 className="ff-subheading">{t('corrosive.specHeading', { ns: 'ferrofluid' })}</h3>
          {/* 사양표는 이미지가 아니라 HTML 표다 — 숫자가 검색·복사·AI 인용 대상이 된다 */}
          <SpecTable
            data={corrosiveSpecTable(lang)}
            caption={t('corrosive.specHeading', { ns: 'ferrofluid' })}
            hideCaption
          />

          <h3 className="ff-subheading">{t('corrosive.leakHeading', { ns: 'ferrofluid' })}</h3>
          <p className="ff-highlight">{t('corrosive.leakHighlight', { ns: 'ferrofluid' })}</p>
          {/* 차트가 담고 있는 내용을 표로 먼저 제시한다 — 확대해도 안 흐리고 검색·AI가 읽는다 */}
          <SpecTable data={leakTestTable(lang)} />
          {/* 측정기 캡처라 원본이 600px 남짓이다. 늘려 쓰면 뭉개지므로 원본 크기를 넘기지 않는다 */}
          <div className="ff-figure-pair ff-figure-pair--native">
            <Figure
              src={imgLeakM4251}
              alt={t('corrosive.leakM4251', { ns: 'ferrofluid' })}
              caption={t('corrosive.leakM4251', { ns: 'ferrofluid' })}
            />
            <Figure
              src={imgLeakM5070}
              alt={t('corrosive.leakM5070', { ns: 'ferrofluid' })}
              caption={t('corrosive.leakM5070', { ns: 'ferrofluid' })}
            />
          </div>
        </Section>

        {/* 3. Non-Corrosive Gas */}
        <Section
          title={t('nonCorrosive.title', { ns: 'ferrofluid' })}
          subtitle={t('nonCorrosive.subtitle', { ns: 'ferrofluid' })}
        >
          <div className="ff-prose">
            <p>{t('nonCorrosive.prose', { ns: 'ferrofluid' })}</p>
            <PointList points={nonCorrosivePoints} />
          </div>
          <h3 className="ff-subheading">{t('nonCorrosive.specHeading', { ns: 'ferrofluid' })}</h3>
          <SpecTable
            data={nonCorrosiveSpecTable(lang)}
            caption={t('nonCorrosive.specHeading', { ns: 'ferrofluid' })}
            hideCaption
          />

          <h3 className="ff-subheading">{t('nonCorrosive.greaseHeading', { ns: 'ferrofluid' })}</h3>
          <p className="ff-subheading-note">{t('nonCorrosive.greaseSub', { ns: 'ferrofluid' })}</p>
          <SpecTable
            data={greaseSpecTable(lang)}
            caption={t('nonCorrosive.greaseHeading', { ns: 'ferrofluid' })}
            hideCaption
          />
        </Section>

        {/* 4. Thermal stability */}
        <Section
          title={t('thermal.title', { ns: 'ferrofluid' })}
          subtitle={t('thermal.subtitle', { ns: 'ferrofluid' })}
        >
          <div className="ff-prose">
            <p>{t('thermal.prose', { ns: 'ferrofluid' })}</p>
          </div>
          <div className="ff-figure-pair">
            <Figure
              src={imgTgaMff}
              alt={t('thermal.tgaMffAlt', { ns: 'ferrofluid' })}
              caption={t('thermal.tgaMffCaption', { ns: 'ferrofluid' })}
            />
            <Figure
              src={imgTgaMfsMfh}
              alt={t('thermal.tgaMfsAlt', { ns: 'ferrofluid' })}
              caption={t('thermal.tgaMfsCaption', { ns: 'ferrofluid' })}
            />
          </div>
        </Section>

        {/* 5. Ferrofluid Seal */}
        <Section
          title={t('seal.title', { ns: 'ferrofluid' })}
          subtitle={t('seal.subtitle', { ns: 'ferrofluid' })}
        >
          <Figure
            src={imgSealSection}
            alt={t('seal.alt', { ns: 'ferrofluid' })}
            className="ff-figure--full"
          />
        </Section>

        {/* 6. Applications */}
        <Section title={t('applications.title', { ns: 'ferrofluid' })}>
          <div className="ff-image-stack">
            <Figure
              src={imgApplicationField}
              alt={t('applications.fieldAlt', { ns: 'ferrofluid' })}
              className="ff-figure--full"
            />
            <Figure
              src={imgApplicationGrid}
              alt={t('applications.gridAlt', { ns: 'ferrofluid' })}
              className="ff-figure--full"
            />
            <Figure
              src={imgApplicationExtra}
              alt={t('applications.extraAlt', { ns: 'ferrofluid' })}
              className="ff-figure--full"
            />
          </div>
        </Section>

        {/* 7. Custom order banner */}
        <section className="ff-order-banner">
          <div className="ff-order-banner__inner">
            <p className="ff-order-banner__brand">MAGRON</p>
            <h2 className="ff-order-banner__title">{t('order.title', { ns: 'ferrofluid' })}</h2>
            <p className="ff-order-banner__desc">{t('order.desc', { ns: 'ferrofluid' })}</p>
          </div>
        </section>

        {/* 8. Company information */}
        <Section title={t('company.title', { ns: 'ferrofluid' })}>
          <div className="ff-company">
            <figure className="ff-company__photo">
              <img
                src={imgCompanyBuilding}
                alt={t('company.buildingAlt', { ns: 'ferrofluid' })}
                loading="lazy"
              />
            </figure>
            <CompanyTable rows={companyRows} />
          </div>
        </Section>

        {/* 9. Bottom CTA */}
        <section className="ff-cta-banner">
          <div className="ff-cta-banner__inner">
            <h2>{t('cta.title', { ns: 'ferrofluid' })}</h2>
            <p>{t('cta.desc', { ns: 'ferrofluid' })}</p>
            <div className="ff-cta-group">
              <CatalogDownloadButton product="ferrofluid" className="ff-btn ff-btn--primary">
                {t('product:catalogDownload')}
              </CatalogDownloadButton>
            </div>
            <p className="product-cta-note">{t('product:contactNote')}</p>
            <div className="ff-inquiry-list">
              <p className="ff-cta-banner__note">{t('product:inquiryNote')}</p>
              <ul className="ff-check-list ff-check-list--light">
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
