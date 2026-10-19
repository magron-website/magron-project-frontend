import { Trans, useTranslation } from 'react-i18next'
import AnswerBlock from '@/components/AnswerBlock'
import KeyFigures from '@/components/KeyFigures'
import '@/assets/design/company.css'

type Fact = { label: string; value: string }

export default function Company() {
  const { t } = useTranslation('company')
  const paragraphs = t('paragraphs', { returnObjects: true }) as string[]
  const products = t('products', { returnObjects: true }) as string[]
  const facts = t('facts', { returnObjects: true }) as Fact[]

  return (
    <article className="cp-page">
      {/* 직답 블록 — 이 화면이 무엇에 답하는지를 맨 위에 텍스트로 둔다 */}
      <AnswerBlock routePath="/company" />
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

          {/* 회사 개요 — 소개 문단만으로는 AI가 꺼내 쓸 사실(연도·위치·제품 수·시험기관)이 흩어져 있었다 */}
          <section className="cp-facts">
            <h2 className="cp-facts__title">{t('factsTitle')}</h2>
            <dl className="cp-facts__list">
              {facts.map((fact) => (
                <div className="cp-facts__row" key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </div>
      <KeyFigures />
    </article>
  )
}
