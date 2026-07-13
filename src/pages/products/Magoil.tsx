import { useState } from 'react'
import QuoteRequestModal from '@/components/QuoteRequestModal'
import CatalogDownloadButton from '@/components/CatalogDownloadButton'
import {
  CAPACITY_HIGHLIGHT,
  HERO_POINTS,
  INQUIRY_ITEMS,
  PACKAGE_IMAGES,
  PACKAGE_POINTS,
  SEAL_STEPS,
  heroReel,
  internalCrossSection,
  internalCutaway,
  sealPrincipleDiagram,
  sealPrincipleReel,
} from '@/pages/products/magoil/content'
import { Figure, Section, YouTubeEmbed } from '@/pages/products/magoil/components'
import '@/assets/design/products/magoil.css'

export default function Magoil() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false)

  return (
    <article className="mg-page">
      <QuoteRequestModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />

      {/* 1. Hero */}
      <header className="mg-hero">
        <div className="mg-hero__inner">
          <div className="mg-hero__content">
            <p className="mg-hero__label">Products</p>
            <h1 className="mg-hero__title">DAWA MAGSEALED</h1>
            <p className="mg-hero__subtitle">릴 수리용 자성유체</p>
            <p className="mg-hero__title-en">Ferrofluid for Fishing Reel Maintenance</p>
            <p className="mg-hero__lead">
              MAGSEALED 구조가 적용된 릴의 방수·방진 성능을 유지하기 위한 릴 수리용
              자성유체입니다. 자성유체는 릴 내부의 Magnet 주변에 안정적으로 머물면서 물,
              염분, 먼지, 이물질이 내부로 유입되는 것을 줄이고 릴의 회전 성능과 내구성을
              유지하는 데 도움을 줍니다.
            </p>
            <div className="mg-hero__cards">
              {HERO_POINTS.map((card) => (
                <article key={card.title} className="mg-point-card">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="mg-hero__visual">
            <img className="mg-hero__image" src={heroReel} alt="DAWA MAGSEALED 릴과 자성유체" />
          </div>
        </div>
      </header>

      <div className="mg-page__body">
        {/* 2. 금속 병 타입 (magoil_2) */}
        <Section title="금속 병 타입">
          <div className="mg-prose">
            <p>
              메탈 케이스에 자성유체 병과 설명서를 함께 구성한 릴 수리용 자성유체
              패키지입니다. 소량 구매가 가능하며, 대량 구매를 원하실 경우 본사로 문의해
              주시기 바랍니다.
            </p>
          </div>
          <ul className="mg-check-list">
            {PACKAGE_POINTS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="mg-capacity">
            <span className="mg-capacity__badge">CAPACITY</span>
            <div>
              <p className="mg-capacity__title">★ {CAPACITY_HIGHLIGHT.title}</p>
              <p className="mg-capacity__detail">{CAPACITY_HIGHLIGHT.detail}</p>
            </div>
          </div>
          <div className="mg-figure-grid mg-figure-grid--2">
            {PACKAGE_IMAGES.map((item) => (
              <Figure key={item.caption} src={item.image} caption={item.caption} />
            ))}
          </div>
        </Section>

        {/* 3. 방수 원리 (magoil_3) */}
        <Section title="방수 원리" className="mg-section--ocean">
          <div className="mg-prose">
            <p>
              MAGSEALED 구조는 릴의 Rotor Collar(Magnetic body)와 Magnet 사이에 자성유체를
              유지하여 물과 이물질이 내부로 들어가는 것을 줄이는 방식입니다. 자석의 자기장
              안에 머무는 자성유체가 회전부 주변에 액체 형태의 차단막(Seal Area)을
              형성합니다.
            </p>
            <p>
              바깥에서 바닷물(Seawater)과 염분이 들어오더라도 Magnet 주변에 형성된 자성유체
              층이 MAG SHIELD 역할을 하여 내부 부품으로의 침투를 줄이고, 기어·베어링·회전축의
              부식과 오염을 예방하는 데 도움을 줍니다.
            </p>
          </div>
          <div className="mg-figure-grid mg-figure-grid--principle">
            <Figure src={sealPrincipleDiagram} caption="Magnet · MAG SHIELD 씰링 구조 단면" />
            <Figure src={sealPrincipleReel} caption="릴 내 자성유체 씰 적용 위치" />
          </div>

          <h3 className="mg-subheading">자성유체가 물을 차단하는 과정</h3>
          <div className="mg-step-grid">
            {SEAL_STEPS.map((step, i) => (
              <article key={step.text} className="mg-step">
                <Figure src={step.image} />
                <p className="mg-step__text">
                  <span className="mg-step__num">{i + 1}</span>
                  {step.text}
                </p>
              </article>
            ))}
          </div>
        </Section>

        {/* 4. 릴 내부 방수 설명도 (magoil_4) */}
        <Section title="릴 내부 방수 설명도" className="mg-section--ocean">
          <div className="mg-prose">
            <p>
              릴 내부에는 Rotor, Body, CRBB(Corrosion Resistant Ball Bearing) 등 여러 회전
              부품이 존재합니다. 바닷물(Sea water)이나 염분(Salt)이 이 부품들 사이로
              유입되면 부식, 소음, 회전 저항 증가, 내구성 저하가 발생할 수 있습니다.
            </p>
            <p>
              자성유체가 없는 경우(방수 X)에는 바닷물이 로터 안쪽으로 침투하지만, 자성유체를
              적용한 경우(방수 O)에는 자성유체 막이 침투 경로를 차단하여 내부 부품을
              보호합니다.
            </p>
          </div>
          <div className="mg-figure-grid mg-figure-grid--internal">
            <Figure src={internalCrossSection} caption="MAG SEALED 적용 릴 내부 단면도" />
            <Figure src={internalCutaway} caption="자성유체 미적용(방수 X) vs 적용(방수 O) 비교" />
          </div>
        </Section>

        {/* 5. 교체방법 영상 */}
        <Section title="다이와 MAGSEALED 릴 시리즈 맥오일 교체방법">
          <div className="mg-prose">
            <p>
              다이와 MAGSEALED 릴에 맥오일을 적용하는 교체 방법과 자성유체의 작동 원리를
              영상으로 확인할 수 있습니다.
            </p>
          </div>
          <YouTubeEmbed
            videoId="iExN__XaRaQ"
            title="다이와 MAGSEALED 릴 시리즈 맥오일 교체방법"
            watchUrl="https://youtu.be/iExN__XaRaQ"
          />
        </Section>

        {/* 6. 문의 CTA */}
        <section className="mg-cta-banner">
          <div className="mg-cta-banner__inner">
            <h2>릴 수리용 자성유체가 필요하신가요?</h2>
            <p className="mg-cta-banner__lead">
              사용 중인 릴 모델과 MAGSEALED 적용 여부, 수리 목적을 알려주시면 적합한 자성유체
              사용 여부와 사용 방법을 안내해드립니다.
            </p>
            <div className="mg-cta-group">
              <CatalogDownloadButton product="magoil" className="mg-btn mg-btn--primary">
                카탈로그 다운로드
              </CatalogDownloadButton>
              <button
                type="button"
                className="mg-btn mg-btn--secondary"
                onClick={() => setIsQuoteOpen(true)}
              >
                제품문의
              </button>
            </div>
            <div className="mg-inquiry-list">
              <p className="mg-cta-banner__note">문의 시 전달하면 좋은 정보</p>
              <ul className="mg-check-list mg-check-list--light">
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
