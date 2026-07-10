import { useState } from 'react'
import QuoteRequestModal from '@/components/QuoteRequestModal'
import CatalogDownloadButton from '@/components/CatalogDownloadButton'
import { CompanyTable, Figure, PointList, Section } from '@/pages/products/ferrofluid/components'
import {
  COMPANY_INFO_ROWS,
  CORROSIVE_POINTS,
  HERO_CARDS,
  INQUIRY_ITEMS,
  NON_CORROSIVE_POINTS,
  imgApplicationExtra,
  imgApplicationField,
  imgApplicationGrid,
  imgCompanyBuilding,
  imgCorrosiveProduct,
  imgCorrosiveSpec,
  imgLeakM4251,
  imgLeakM5070,
  imgNonCorrosiveSpec,
  imgProduct,
  imgSealSection,
  imgTgaMff,
  imgTgaMfsMfh,
} from '@/pages/products/ferrofluid/content'
import '@/assets/design/products/ferrofluid.css'

export default function Ferrofluid() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false)

  return (
    <article className="ff-page">
      <QuoteRequestModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />

      {/* 1. Hero */}
      <header className="ff-hero">
        <div className="ff-hero__inner">
          <div className="ff-hero__content">
            <p className="ff-hero__label">Products</p>
            <h1 className="ff-hero__title">유해가스 및 분진 차단용 자성유체</h1>
            <p className="ff-hero__title-en">Ferrofluid for Corrosive Gas &amp; Dust Blocking</p>
            <p className="ff-hero__lead">
              회전축 주변에서 발생하는 유해가스 누출, 외부 분진 유입, 진공도 저하 문제를
              자성유체 기반 비접촉 씰링 구조로 차단합니다. 자기장 안에 유지되는 자성유체가
              회전 운동을 허용하면서도 가스·분진·오염물의 이동을 안정적으로 막아줍니다.
            </p>
            <div className="ff-hero__cards">
              {HERO_CARDS.map((card) => (
                <article key={card.title} className="ff-feature-card">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="ff-hero__visual">
            <img className="ff-hero__image" src={imgProduct} alt="Ferrofluid Feedthrough 제품" />
          </div>
        </div>
      </header>

      <div className="ff-page__body">
        {/* 2. Corrosive Gas */}
        <Section title="Corrosive Gas용 자성유체" subtitle="활성(부식성) 가스 차단">
          <div className="ff-split">
            <Figure
              src={imgCorrosiveProduct}
              alt="Corrosive Gas용 Ferrofluid Feedthrough"
              className="ff-figure--product"
            />
            <div className="ff-prose">
              <p>
                부식성 가스 환경에서는 Carrier Fluid로 Perfluoro-Polyether(PFPE) 계열을
                사용하여 화학적 안정성과 낮은 증기압 특성을 확보합니다. 반도체·디스플레이
                공정의 활성 가스 라인에서 회전축 누설과 부식을 억제합니다.
              </p>
              <PointList points={CORROSIVE_POINTS} />
            </div>
          </div>

          <h3 className="ff-subheading">Specification (MFF / MFF-M Series)</h3>
          <Figure
            src={imgCorrosiveSpec}
            alt="Corrosive Gas용 Ferrofluid 사양표"
            scroll
            caption="모델별 포화자화 · 점도 · 증기압 · Helium gas leak · TGA 중량손실 온도 · 유동점 · 밀도"
          />

          <h3 className="ff-subheading">Leak Test Data</h3>
          <p className="ff-highlight">진공 배기 시간이 짧으며, 진공도도 일정하게 유지되고 있습니다.</p>
          <div className="ff-figure-pair">
            <Figure src={imgLeakM4251} alt="MFF-M4251 Leak test data" caption="MFF-M4251 Leak test data" />
            <Figure src={imgLeakM5070} alt="MFF-M5070 Leak test data" caption="MFF-M5070 Leak test data" />
          </div>
        </Section>

        {/* 3. Non-Corrosive Gas */}
        <Section title="Non-Corrosive Gas용 자성유체" subtitle="비활성(비부식성) 가스 차단">
          <div className="ff-prose">
            <p>
              비부식성 가스 환경에서는 운전 조건에 따라 점도·포화자화·온도 특성과 Carrier
              Fluid를 선택할 수 있습니다. MFS 시리즈는 Silicon 계열, MFH 시리즈는 Hydrocarbon
              계열을 기반으로 합니다.
            </p>
            <PointList points={NON_CORROSIVE_POINTS} />
          </div>
          <h3 className="ff-subheading">Specification (MFS / MFH Series)</h3>
          <Figure
            src={imgNonCorrosiveSpec}
            alt="Non-Corrosive Gas용 Ferrofluid 사양표"
            scroll
            caption="MFS(Silicon) · MFH(Hydrocarbon) 시리즈 등급별 자기·물리 특성"
          />
        </Section>

        {/* 4. Thermal stability */}
        <Section title="TGA & DTA 측정" subtitle="열적 안정성 (Thermal Stability)">
          <div className="ff-prose">
            <p>
              TGA(Thermo Gravimetric Analysis)와 DTA(Differential Thermal Analysis)로 온도
              변화에 따른 중량 손실과 열적 거동을 분석하여 Carrier Fluid의 안정성과 사용 가능
              온도 범위를 평가합니다.
            </p>
          </div>
          <div className="ff-figure-pair">
            <Figure src={imgTgaMff} alt="MFF-M Series TGA & DTA 측정 결과" caption="MFF-M Series" />
            <Figure src={imgTgaMfsMfh} alt="MFS / MFH Series TGA 측정 결과" caption="MFS / MFH Series" />
          </div>
        </Section>

        {/* 5. Ferrofluid Seal */}
        <Section title="Ferrofluid Seal" subtitle="자성유체 씰이란?">
          <Figure
            src={imgSealSection}
            alt="Ferrofluid Seal 원리 · 특장점 · Feedthrough 분해도"
            className="ff-figure--full"
          />
        </Section>

        {/* 6. Applications */}
        <Section title="자성유체 사용 장비 및 분야">
          <div className="ff-image-stack">
            <Figure src={imgApplicationField} alt="자성유체 & Feedthrough 적용 분야" className="ff-figure--full" />
            <Figure src={imgApplicationGrid} alt="자성유체 적용 장비 이미지 (1)" className="ff-figure--full" />
            <Figure src={imgApplicationExtra} alt="자성유체 적용 장비 이미지 (2)" className="ff-figure--full" />
          </div>
        </Section>

        {/* 7. Custom order banner */}
        <section className="ff-order-banner">
          <div className="ff-order-banner__inner">
            <p className="ff-order-banner__brand">MAGRON</p>
            <h2 className="ff-order-banner__title">귀사에서 원하시는 규격으로 주문제작 가능합니다.</h2>
            <p className="ff-order-banner__desc">
              당사는 지속적으로 새로운 제품을 개발하고, 출시하고 있습니다. 문의하여 주시기
              바랍니다.
            </p>
          </div>
        </section>

        {/* 8. Company information */}
        <Section title="Company Information">
          <div className="ff-company">
            <figure className="ff-company__photo">
              <img src={imgCompanyBuilding} alt="MAGRON 사옥" loading="lazy" />
            </figure>
            <CompanyTable rows={COMPANY_INFO_ROWS} />
          </div>
        </Section>

        {/* 9. Bottom CTA */}
        <section className="ff-cta-banner">
          <div className="ff-cta-banner__inner">
            <h2>유해가스·분진 차단용 자성유체 Seal이 필요하신가요?</h2>
            <p>
              공정 조건과 장비 구조를 알려주시면 적합한 Ferrofluid Seal 사양을 검토해드립니다.
              하단의 카탈로그를 다운로드하시면 더욱 자세한 내용을 확인하실 수 있습니다.
            </p>
            <div className="ff-cta-group">
              <CatalogDownloadButton product="ferrofluid" className="ff-btn ff-btn--primary">
                카탈로그 다운로드
              </CatalogDownloadButton>
              <button
                type="button"
                className="ff-btn ff-btn--secondary"
                onClick={() => setIsQuoteOpen(true)}
              >
                제품문의
              </button>
            </div>
            <div className="ff-inquiry-list">
              <p className="ff-cta-banner__note">문의 시 전달하면 좋은 정보</p>
              <ul className="ff-check-list ff-check-list--light">
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
