import { useState } from 'react'
import QuoteRequestModal from '@/components/QuoteRequestModal'
import CatalogDownloadButton from '@/components/CatalogDownloadButton'
import {
  FAMILIES,
  HERO_CARDS,
  INQUIRY_ITEMS,
  PROPERTY_GLOSSARY,
  heroMagnets,
} from '@/pages/products/magnet/content'
import { Section, TableFigure } from '@/pages/products/magnet/components'
import '@/assets/design/products/magnet.css'

export default function Magnet() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false)

  return (
    <article className="mn-page">
      <QuoteRequestModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />

      {/* 1. Hero */}
      <header className="mn-hero">
        <div className="mn-hero__inner">
          <div className="mn-hero__content">
            <p className="mn-hero__label">Products</p>
            <h1 className="mn-hero__title">자석 Permanent MAGNET</h1>
            <p className="mn-hero__title-en">
              산업용 영구자석 소재 및 등급별 Magnetic Properties
            </p>
            <p className="mn-hero__lead">
              Permanent Magnet은 모터, 센서, 발전기, 스피커, 자기 커플링, 자성유체 Seal,
              의료기기, 전장부품, 자동화 장비 등 다양한 산업 분야에서 핵심 기능 부품으로
              사용됩니다.
            </p>
            <div className="mn-hero__body">
              <p>
                사용 환경에 따라 요구되는 자속밀도, 보자력, 최대 에너지적, 내열성, 내식성,
                가공성, 비용 조건이 다르기 때문에 적절한 자석 소재와 등급을 선택하는 것이
                중요합니다.
              </p>
            </div>
            <div className="mn-hero__cards">
              {HERO_CARDS.map((card) => (
                <article key={card.title} className="mn-feature-card">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="mn-hero__visual">
            <img className="mn-hero__image" src={heroMagnets} alt="다양한 영구자석 제품군" />
          </div>
        </div>
      </header>

      <div className="mn-page__body">
        {/* 소재 quick-nav */}
        <nav className="mn-matnav" aria-label="자석 소재">
          {FAMILIES.map((fam) => (
            <a key={fam.id} href={`#${fam.id}`} className="mn-matnav__item">
              <span className="mn-matnav__name">{fam.name}</span>
              <span className="mn-matnav__kr">{fam.nameKr}</span>
            </a>
          ))}
        </nav>

        {/* 특성 용어 안내 */}
        <Section title="자기특성 용어 안내">
          <div className="mn-prose">
            <p>
              아래 특성표에서 공통으로 사용하는 자기 특성 용어입니다. 제품 선정 시 사용
              온도와 요구 자기장 조건을 함께 검토하세요.
            </p>
          </div>
          <dl className="mn-glossary">
            {PROPERTY_GLOSSARY.map((item) => (
              <div key={item.term} className="mn-glossary__row">
                <dt>{item.term}</dt>
                <dd>{item.desc}</dd>
              </div>
            ))}
          </dl>
        </Section>

        {/* 소재별 자기특성표 */}
        {FAMILIES.map((fam) => (
          <Section key={fam.id} id={fam.id} title={`${fam.name} · ${fam.nameKr}`} className="mn-section--spec">
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
                  image={table.image}
                  note={table.note}
                />
              ))}
            </div>
          </Section>
        ))}

        {/* Bottom CTA */}
        <section className="mn-cta-banner">
          <div className="mn-cta-banner__inner">
            <h2>자석 소재 선정이 필요하신가요?</h2>
            <p>
              적용 제품과 사용 환경, 요구 자기 특성을 알려주시면 적합한 자석 소재와 등급을
              검토해드립니다. 형상·치수·착자 방향에 맞춘 맞춤 제작도 가능합니다.
            </p>
            <div className="mn-cta-group">
              <CatalogDownloadButton product="magnet" className="mn-btn mn-btn--primary">
                카탈로그 다운로드
              </CatalogDownloadButton>
              <button
                type="button"
                className="mn-btn mn-btn--secondary"
                onClick={() => setIsQuoteOpen(true)}
              >
                제품문의
              </button>
            </div>
            <div className="mn-inquiry-list">
              <p className="mn-cta-banner__note">문의 시 전달하면 좋은 정보</p>
              <ul className="mn-check-list mn-check-list--light">
                {INQUIRY_ITEMS.map((item) => (
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
