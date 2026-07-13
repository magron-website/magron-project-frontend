import { useState } from 'react'
import QuoteRequestModal from '@/components/QuoteRequestModal'
import CatalogDownloadButton from '@/components/CatalogDownloadButton'
import { CATEGORIES, HERO_CARDS, INQUIRY_ITEMS, heroMontage } from '@/pages/products/feedthrough/content'
import { ProductCard } from '@/pages/products/feedthrough/components'
import '@/assets/design/products/feedthrough.css'

export default function Feedthrough() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false)

  return (
    <article className="ft-page">
      <QuoteRequestModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />

      {/* 1. Hero */}
      <header className="ft-hero">
        <div className="ft-hero__inner">
          <div className="ft-hero__content">
            <p className="ft-hero__label">Products</p>
            <h1 className="ft-hero__title">Feedthrough</h1>
            <p className="ft-hero__title-en">
              Magnetic Fluid Seal 기반 고신뢰성 Vacuum Feedthrough 솔루션
            </p>
            <p className="ft-hero__lead">
              Feedthrough는 진공 챔버 또는 밀폐 장비 내부로 회전 운동, 선형 운동, 가스, 전기
              신호 등을 전달하면서도 내부 환경의 진공도와 청정성을 유지하기 위한 핵심
              부품입니다.
            </p>
            <div className="ft-hero__body">
              <p>
                Magnetic Fluid Seal 기반 Feedthrough는 회전축 주변에 형성된 자성유체 씰링
                구조를 통해 가스 누설, 외부 오염물 유입, 분진 유입을 차단합니다. 반도체,
                디스플레이, 진공 증착, 이온 주입, 로봇 이송, 항공우주 및 연구장비와 같이
                높은 신뢰성과 긴 수명이 요구되는 장비에 적합합니다.
              </p>
            </div>
            <div className="ft-hero__cards">
              {HERO_CARDS.map((card) => (
                <article key={card.title} className="ft-feature-card">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="ft-hero__visual">
            <img className="ft-hero__image" src={heroMontage} alt="Feedthrough 제품군" />
          </div>
        </div>
      </header>

      <div className="ft-page__body">
        {/* Category quick-nav */}
        <nav className="ft-catnav" aria-label="제품 카테고리">
          {CATEGORIES.map((cat) => (
            <a key={cat.id} href={`#${cat.id}`} className="ft-catnav__item">
              <span className="ft-catnav__title">{cat.title}</span>
              <span className="ft-catnav__kr">{cat.titleKr}</span>
            </a>
          ))}
        </nav>

        {/* Product catalogue by category */}
        {CATEGORIES.map((cat) => (
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
            <h2>고신뢰성 Vacuum Feedthrough가 필요하신가요?</h2>
            <p>
              제품 상세 사양, 도면, 적용 조건 검토가 필요하다면 카탈로그를 확인하거나 제품
              문의를 남겨주세요. 장비 구조와 공정 조건을 알려주시면 적합한 Feedthrough 및
              Ferrofluid Seal 사양을 검토해드립니다.
            </p>
            <div className="ft-cta-group">
              <CatalogDownloadButton product="feedthrough" className="ft-btn ft-btn--primary">
                카탈로그 다운로드
              </CatalogDownloadButton>
              <button
                type="button"
                className="ft-btn ft-btn--secondary"
                onClick={() => setIsQuoteOpen(true)}
              >
                제품문의
              </button>
            </div>
            <div className="ft-inquiry-list">
              <p className="ft-cta-banner__note">문의 시 전달하면 좋은 정보</p>
              <ul className="ft-check-list ft-check-list--light">
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
