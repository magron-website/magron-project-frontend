import { useState } from 'react'
import { Link } from 'react-router-dom'
import QuoteRequestModal from '@/components/QuoteRequestModal'
import {
  APPLICATION_CARDS,
  COMPARISON_COLUMNS,
  COMPARISON_ROWS,
  HERO_CARDS,
  INQUIRY_ITEMS,
  MATERIAL_CARDS,
  MATERIAL_RECOMMENDATIONS,
  SELECTION_CRITERIA,
  SPEC_TAB_GROUPS,
} from '@/pages/products/magnet/content'
import {
  ApplicationCard,
  ImagePlaceholder,
  MaterialCard,
  Section,
  SpecTable,
  SpecTabs,
} from '@/pages/products/magnet/components'
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
            <div className="mn-cta-group">
              <button
                type="button"
                className="mn-btn mn-btn--primary"
                onClick={() => setIsQuoteOpen(true)}
              >
                제품 문의하기
              </button>
              <a className="mn-btn mn-btn--secondary" href="/#products">
                카탈로그 다운로드
              </a>
            </div>
          </div>
          <div className="mn-hero__visual">
            <ImagePlaceholder
              id="IMAGE_PLACEHOLDER_HERO_MAGNETS"
              description="첫 번째 이미지 상단의 다양한 원형, 링형, 블록형, 판형 자석 제품 사진을 Hero 영역에 크게 배치한다."
              src="/images/magnet/hero-magnets.png"
              aspectRatio="4 / 3"
              className="mn-hero__placeholder"
            />
          </div>
        </div>
      </header>

      <div className="mn-page__body">
        <Link className="mn-back" to="/">
          ← 제품 목록으로
        </Link>

        {/* 2. 제품 개요 */}
        <Section title="Permanent Magnet 제품군">
          <div className="mn-prose">
            <p>
              자석은 소재에 따라 자기 특성, 온도 특성, 내식성, 기계적 강도, 가격이 크게
              달라집니다. 제품 설계 시에는 단순히 자력이 강한 자석을 선택하는 것이 아니라,
              실제 사용 온도, 부식 환경, 장착 구조, 필요한 자기장 세기, 가공 형상, 비용
              조건을 함께 고려해야 합니다.
            </p>
          </div>
          <div className="mn-material-grid">
            {MATERIAL_CARDS.map((card) => (
              <MaterialCard
                key={card.title}
                title={card.title}
                description={card.description}
                applications={card.applications}
              />
            ))}
          </div>
          <ImagePlaceholder
            id="IMAGE_PLACEHOLDER_MAGNET_TYPES"
            description="Hero 하단 또는 제품군 소개 영역에 NdFeB, SmCo, AlNiCo, Ferrite 자석의 대표 형상 이미지를 4개 카드로 배치한다."
            src="/images/magnet/magnet-types.png"
            aspectRatio="21 / 9"
            className="mn-section__image"
          />
        </Section>

        {/* 3. 소재별 특성 비교 */}
        <Section title="소재별 특성 비교">
          <div className="mn-prose">
            <p>
              자석 소재는 자기력뿐 아니라 사용 온도, 내식성, 가공성, 비용 측면에서 차이가
              있습니다. 아래 비교표는 제품 선정 전 빠르게 소재별 특징을 파악하기 위한
              요약입니다.
            </p>
          </div>
          <SpecTable columns={COMPARISON_COLUMNS} rows={COMPARISON_ROWS} />
        </Section>

        {/* 4–11. 자기특성표 (탭 UI) */}
        <Section title="자기특성표" className="mn-section--spec">
          <div className="mn-prose">
            <p>
              소재 및 제조 방식에 따른 등급별 Magnetic Properties를 확인하고, 사용 온도와
              자기 특성 조건에 맞는 등급을 선정할 수 있습니다.
            </p>
          </div>
          <SpecTabs groups={SPEC_TAB_GROUPS} />
        </Section>

        {/* 12. 자석 선택 가이드 */}
        <Section title="어떤 자석을 선택해야 하나요?">
          <div className="mn-prose">
            <p>
              자석은 등급과 소재에 따라 성능 차이가 크기 때문에 사용 조건을 먼저 정의한 뒤
              소재와 등급을 선택해야 합니다. 특히 온도, 부식 환경, 필요한 자력, 제품 크기,
              가공 형상, 비용 조건을 함께 고려해야 합니다.
            </p>
          </div>
          <h3 className="mn-subheading">선택 기준</h3>
          <ul className="mn-bullet-list">
            {SELECTION_CRITERIA.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3 className="mn-subheading">소재별 추천</h3>
          <div className="mn-recommend-grid">
            {MATERIAL_RECOMMENDATIONS.map((item) => (
              <article key={item.material} className="mn-recommend-card">
                <p className="mn-recommend-card__condition">{item.condition}</p>
                <p className="mn-recommend-card__material">{item.material}</p>
              </article>
            ))}
          </div>
          <p className="mn-highlight">
            사용 온도, 형상, 목표 자력, 적용 장비를 알려주시면 적합한 자석 소재와 등급을
            검토해드립니다.
          </p>
        </Section>

        {/* 13. 적용 분야 */}
        <Section title="적용 분야">
          <div className="mn-prose">
            <p>
              Permanent Magnet은 전기·전자, 자동차, 로봇, 반도체 장비, 의료기기, 센서, 모터,
              발전기 등 다양한 분야에서 사용됩니다.
            </p>
          </div>
          <div className="mn-app-grid">
            {APPLICATION_CARDS.map((card) => (
              <ApplicationCard
                key={card.title}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>
          <ImagePlaceholder
            id="IMAGE_PLACEHOLDER_APPLICATIONS"
            description="자석이 적용되는 모터, 센서, 스피커, 자동차, 반도체 장비, 의료기기 이미지를 카드형으로 배치한다."
            src="/images/magnet/applications.png"
            aspectRatio="21 / 9"
            className="mn-section__image"
          />
        </Section>

        {/* 14. Bottom CTA */}
        <section className="mn-cta-section">
          <div className="mn-cta-section__inner">
            <h2 className="mn-cta-section__title">
              제품 조건에 맞는 자석 소재와 등급이 필요하신가요?
            </h2>
            <div className="mn-prose mn-prose--light">
              <p>
                사용 환경과 목표 성능을 알려주시면 NdFeB, SmCo, AlNiCo, Ferrite 중 적합한
                소재와 등급을 검토해드립니다. 형상, 사이즈, 도금, 착자 방향, 사용 온도, 수량
                조건에 따라 맞춤형 자석 제품 상담이 가능합니다.
              </p>
            </div>
            <h3 className="mn-cta-section__subtitle">문의 시 전달하면 좋은 정보</h3>
            <ul className="mn-check-list">
              {INQUIRY_ITEMS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mn-cta-group mn-cta-group--center">
              <a className="mn-btn mn-btn--secondary mn-btn--on-dark" href="/#products">
                카탈로그 다운로드
              </a>
              <button
                type="button"
                className="mn-btn mn-btn--primary"
                onClick={() => setIsQuoteOpen(true)}
              >
                제품문의
              </button>
            </div>
          </div>
        </section>
      </div>
    </article>
  )
}
