import { Trans, useTranslation } from 'react-i18next'
import '@/assets/design/company.css'

export default function Company() {
  const { t } = useTranslation('company')
  const paragraphs = t('paragraphs', { returnObjects: true }) as string[]
  const products = t('products', { returnObjects: true }) as string[]

  return (
    <article className="cp-page">
      <div className="cp-hero">
        <span className="cp-hero__glow cp-hero__glow--one" aria-hidden="true" />
        <span className="cp-hero__glow cp-hero__glow--two" aria-hidden="true" />

        <div className="cp-hero__inner">
          <header className="cp-heading">
            <p className="cp-heading__eyebrow">{t('eyebrow')}</p>
            <h1 className="cp-heading__title">{t('title')}</h1>
            <span className="cp-heading__rule" aria-hidden="true" />
          </header>

          <section className="cp-panel">
            <span className="cp-panel__corner cp-panel__corner--tl" aria-hidden="true" />
            <span className="cp-panel__corner cp-panel__corner--br" aria-hidden="true" />

            <div className="cp-panel__body">
              {paragraphs.map((_, index) => (
                <p key={index}>
                  <Trans t={t} i18nKey={`paragraphs.${index}`} components={{ strong: <strong /> }} />
                </p>
              ))}
            </div>

            <div className="cp-product">
              <h2 className="cp-product__title">{t('mainProductTitle')}</h2>
              <ul className="cp-product__list">
                {products.map((product) => (
                  <li key={product}>{product}</li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </article>
  )
}
