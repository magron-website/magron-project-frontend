import { useState } from 'react'
import { Link } from 'react-router-dom'
import QuoteRequestModal from '@/components/QuoteRequestModal'
import {
  CHECKLIST_ITEMS,
  FEATURE_CARDS,
  GENERAL_REEL_POINTS,
  HERO_POINTS,
  INQUIRY_ITEMS,
  INTERNAL_CARDS,
  INTERNAL_KEYWORDS,
  MAGSEALED_POINTS,
  OVERVIEW_CARDS,
  PRODUCT_COMPOSITION,
  WATERPROOF_KEYWORDS,
} from '@/pages/products/magoil/content'
import {
  CompareCard,
  ImagePlaceholder,
  InfoCard,
  Section,
  YouTubePlaceholder,
} from '@/pages/products/magoil/components'
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
            <div className="mg-cta-group">
              <button
                type="button"
                className="mg-btn mg-btn--primary"
                onClick={() => setIsQuoteOpen(true)}
              >
                제품 문의하기
              </button>
              <a className="mg-btn mg-btn--secondary" href="/#products">
                카탈로그 다운로드
              </a>
            </div>
          </div>
          <div className="mg-hero__visual">
            <ImagePlaceholder
              id="IMAGE_PLACEHOLDER_HERO_REEL"
              description="상단의 DAWA MAGSEALED 릴 이미지와 Ferrofluid 입자 이미지를 배치한다. 릴 이미지는 Hero 영역의 메인 비주얼로 크게 보여준다."
              src="/images/magsealed/hero-reel.png"
              aspectRatio="4 / 3"
              className="mg-hero__placeholder"
            />
          </div>
        </div>
      </header>

      <div className="mg-page__body">
        <Link className="mg-back" to="/">
          ← 제품 목록으로
        </Link>

        {/* 2. 제품 개요 */}
        <Section title="제품 개요">
          <div className="mg-prose">
            <p>
              본 제품은 MAGSEALED 구조가 적용된 낚시 릴의 유지보수 및 수리를 위한
              자성유체입니다. 자성유체는 자석이 있는 부위에 머무르며, 릴 내부로 물과
              이물질이 들어가는 것을 줄이는 씰링 역할을 합니다.
            </p>
          </div>
          <ul className="mg-bullet-list">
            {PRODUCT_COMPOSITION.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="mg-info-grid mg-info-grid--3">
            {OVERVIEW_CARDS.map((card) => (
              <InfoCard key={card.title} title={card.title} description={card.description} />
            ))}
          </div>
          <ImagePlaceholder
            id="IMAGE_PLACEHOLDER_PRODUCT_PACKAGE"
            description="원본 이미지의 제품 용기 사진 영역을 배치한다. 작은 튜브형 제품, 파란색 용기, 검은색 용기 등 릴 수리용 자성유체 패키지 이미지를 보여준다."
            src="/images/magsealed/product-package.png"
            aspectRatio="16 / 6"
            className="mg-section__image"
          />
        </Section>

        {/* 3. 제품 특징 */}
        <Section title="제품 특징">
          <div className="mg-feature-grid">
            {FEATURE_CARDS.map((card) => (
              <InfoCard key={card.title} title={card.title} description={card.description} />
            ))}
          </div>
          <ImagePlaceholder
            id="IMAGE_PLACEHOLDER_FEATURE_PRODUCTS"
            description="첫 번째 회색 박스에 있는 제품 패키지 사진 전체를 배치한다. 왼쪽에는 작은 자성유체 용기, 오른쪽에는 파란색/검은색 용기 제품 사진을 넣는다."
            src="/images/magsealed/feature-products.png"
            aspectRatio="16 / 6"
            className="mg-section__image"
          />
        </Section>

        {/* 4. 방수 원리 */}
        <Section title="방수 원리" className="mg-section--ocean">
          <div className="mg-prose">
            <p>
              MAGSEALED 구조는 릴 내부의 Magnet 주변에 자성유체를 유지하여 물과 이물질이
              내부로 들어가는 것을 줄이는 방식입니다. 일반적인 고무 패킹이나 기계식 씰과
              달리, 자성유체는 자기장에 의해 특정 위치에 머무르면서 회전부 주변에 액체
              형태의 차단막을 형성합니다.
            </p>
            <p>
              릴 외부에서 물과 염분이 들어오더라도 Magnet 주변에 형성된 Nano Fluid, 즉
              자성유체 층이 Seal Area 역할을 하여 내부 부품으로의 침투를 줄입니다. 이를
              통해 릴 내부 기어, 베어링, 회전축의 부식과 오염을 예방하는 데 도움을 줍니다.
            </p>
          </div>
          <ul className="mg-tag-list">
            {WATERPROOF_KEYWORDS.map((keyword) => (
              <li key={keyword}>{keyword}</li>
            ))}
          </ul>
          <div className="mg-compare-grid">
            <CompareCard title="일반 릴 구조" items={GENERAL_REEL_POINTS} variant="general" />
            <CompareCard
              title="MAGSEALED 구조"
              items={MAGSEALED_POINTS}
              variant="magsealed"
            />
          </div>
          <ImagePlaceholder
            id="IMAGE_PLACEHOLDER_WATERPROOF_PRINCIPLE"
            description="원본 이미지의 파란 배경 “방수 원리” 이미지를 배치한다. Magnet, Nano Fluid, Corrosion, Water, Seal Area가 표시된 릴 단면 설명 이미지를 넣는다."
            src="/images/magsealed/waterproof-principle.png"
            aspectRatio="16 / 7"
            className="mg-section__image"
          />
        </Section>

        {/* 5. 릴 내부 방수 성능도 */}
        <Section title="릴 내부 방수 성능도" className="mg-section--ocean">
          <div className="mg-prose">
            <p>
              릴 내부에는 Rotor, Body, S-Washer, Gear, Ball Bearing 등 여러 회전 부품이
              존재합니다. 물이나 염분이 이 부품들 사이로 유입되면 부식, 소음, 회전 저항
              증가, 내구성 저하가 발생할 수 있습니다.
            </p>
            <p>
              MAGSEALED용 자성유체는 주요 회전부 주변에서 물의 침투 경로를 줄이고, 내부
              부품을 보호하는 역할을 합니다.
            </p>
          </div>
          <ul className="mg-tag-list">
            {INTERNAL_KEYWORDS.map((keyword) => (
              <li key={keyword}>{keyword}</li>
            ))}
          </ul>
          <div className="mg-info-grid mg-info-grid--3">
            {INTERNAL_CARDS.map((card) => (
              <InfoCard key={card.title} title={card.title} description={card.description} />
            ))}
          </div>
          <ImagePlaceholder
            id="IMAGE_PLACEHOLDER_INTERNAL_WATERPROOF"
            description="원본 이미지의 “릴 내부 방수 성능도” 파란 배경 이미지를 배치한다. 왼쪽의 릴 내부 구조도와 오른쪽의 컷어웨이 단면 이미지를 함께 보여준다."
            src="/images/magsealed/internal-waterproof.png"
            aspectRatio="16 / 7"
            className="mg-section__image"
          />
        </Section>

        {/* 6. 사용 전 확인사항 */}
        <Section title="사용 전 확인사항">
          <div className="mg-prose">
            <p>
              릴 수리용 자성유체는 릴의 구조와 상태에 맞게 사용하는 것이 중요합니다.
              자성유체가 필요한 위치, 기존 오염 상태, 릴 분해 여부, 사용량에 따라 결과가
              달라질 수 있습니다.
            </p>
          </div>
          <ul className="mg-check-list">
            {CHECKLIST_ITEMS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mg-warning">
            ※ 본 제품은 릴 수리 및 유지보수용 자성유체입니다. 릴 구조와 정비 방법에 따라
            사용 위치와 사용량이 달라질 수 있으므로, 사용 전 제품 적용 부위를 반드시
            확인하세요.
          </p>
        </Section>

        {/* 7. 사용 예시 영상 */}
        <Section title="사용 예시 영상">
          <div className="mg-prose">
            <p>
              MAGSEALED 구조와 자성유체의 역할을 영상으로 확인할 수 있습니다. 영상
              링크는 추후 연결 예정입니다.
            </p>
          </div>
          <YouTubePlaceholder
            id="YOUTUBE_EMBED_PLACEHOLDER"
            description="원본 이미지 하단의 유튜브 썸네일 영역을 배치한다. 실제 YouTube 링크는 나중에 직접 연결할 예정이므로, 현재는 썸네일 카드와 재생 버튼 형태의 placeholder만 만든다."
            caption="릴 내부에서 자성유체가 어떤 방식으로 물과 이물질의 유입을 줄이는지 확인할 수 있습니다."
          />
          <p className="mg-highlight mg-highlight--red">
            다이와 MAGSEALED 작동 원리와 수리 과정을 확인할 수 있습니다.
          </p>
        </Section>

        {/* 8. 제품 선택 및 문의 */}
        <Section title="릴 수리용 자성유체가 필요하신가요?">
          <div className="mg-prose">
            <p>
              사용 중인 릴 모델, MAGSEALED 적용 여부, 수리 목적을 알려주시면 적합한
              자성유체 사용 여부를 검토해드립니다. 정비용, 보충용, 테스트용 등 사용
              목적에 따라 필요한 제품과 사용 방법을 안내할 수 있습니다.
            </p>
          </div>
          <h3 className="mg-subheading">문의 시 전달하면 좋은 정보</h3>
          <ul className="mg-check-list">
            {INQUIRY_ITEMS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mg-highlight">
            릴 모델과 사용 환경을 알려주시면 수리 목적에 맞는 자성유체를 안내해드립니다.
          </p>
        </Section>

        {/* 9. Bottom CTA */}
        <section className="mg-cta-banner">
          <div className="mg-cta-banner__inner">
            <h2>카탈로그와 제품 문의를 통해 자세한 내용을 확인할 수 있습니다.</h2>
            <div className="mg-cta-group">
              <a className="mg-btn mg-btn--primary" href="/#products">
                카탈로그 다운로드
              </a>
              <button
                type="button"
                className="mg-btn mg-btn--secondary"
                onClick={() => setIsQuoteOpen(true)}
              >
                제품문의
              </button>
            </div>
            <p className="mg-cta-banner__note">
              해당 기술과 제품은 다이와 MAGSEALED 구조의 릴 수리 및 유지보수 목적에 맞춰
              안내됩니다.
            </p>
          </div>
        </section>
      </div>
    </article>
  )
}
