import { useState } from 'react'
import QuoteRequestModal from '@/components/QuoteRequestModal'
import CatalogDownloadButton from '@/components/CatalogDownloadButton'
import {
  COMPONENT_DETAILS,
  HERO_CARDS,
  INQUIRY_ITEMS,
  KIT_COMPONENTS,
  MAKING_STEPS,
  MAKING_VIDEO,
  PACKAGING_VIDEOS,
  PRINCIPLE_TEXT,
  heroKit,
} from '@/pages/products/education/content'
import {
  ComponentDetailView,
  ProductCard,
  Section,
  VideoSlot,
} from '@/pages/products/education/components'
import '@/assets/design/products/education.css'

export default function Education() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false)

  return (
    <article className="ed-page">
      <QuoteRequestModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />

      {/* 1. Hero */}
      <header className="ed-hero">
        <div className="ed-hero__inner">
          <div className="ed-hero__content">
            <p className="ed-hero__label">Products</p>
            <h1 className="ed-hero__title">자성유체 키트</h1>
            <p className="ed-hero__title-en">Ferrofluid Kit</p>
            <div className="ed-hero__lead">
              <p>
                자성유체의 독특한 움직임과 자기장 반응을 직접 관찰하고 다뤄볼 수 있는
                실험용 키트입니다. 자성유체와 세척액·에칭제·코팅제로 구성되어 있어, 자성유체
                실험과 표면 처리 과정을 함께 체험할 수 있습니다.
              </p>
              <p>
                과학 교육, 학교 실험, 전시 체험, 콘텐츠 제작, 연구용 데모에 활용할 수
                있습니다.
              </p>
            </div>
            <div className="ed-hero__cards">
              {HERO_CARDS.map((card) => (
                <article key={card.title} className="ed-point-card">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </article>
              ))}
            </div>
            <div className="ed-hero__nav">
              <a className="ed-btn ed-btn--secondary" href="#composition">
                제품 구성
              </a>
              <a className="ed-btn ed-btn--secondary" href="#principle">
                동작 원리
              </a>
              <a className="ed-btn ed-btn--secondary" href="#making">
                제작 방법
              </a>
            </div>
          </div>
          <div className="ed-hero__visual">
            <img className="ed-hero__image" src={heroKit} alt="자성유체 키트" />
          </div>
        </div>
      </header>

      <div className="ed-page__body">
        {/* 2. 제품 구성 */}
        <Section id="composition" title="제품 구성">
          <div className="ed-prose">
            <p>
              자성유체 키트는 자성유체와 세척액, 에칭제, 코팅제로 구성됩니다. 각 구성품은
              자성유체 실험과 표면 처리 과정에서 각기 다른 역할을 합니다.
            </p>
          </div>
          <div className="ed-product-grid">
            {KIT_COMPONENTS.map((item) => (
              <ProductCard key={item.name} item={item} />
            ))}
          </div>
        </Section>

        {/* 3. 구성품별 상세 */}
        <Section title="구성품별 상세" className="ed-section--kit">
          <div className="ed-detail-list">
            {COMPONENT_DETAILS.map((detail) => (
              <ComponentDetailView key={detail.id} detail={detail} />
            ))}
          </div>
        </Section>

        {/* 4. 제품 수량 및 패키징 */}
        <Section title="제품 수량 및 패키징">
          <div className="ed-prose">
            <p>
              자성유체는 100㎖ 단위로, 세척액·에칭제·코팅제는 1,000㎖ 단위로 제공됩니다.
              사용 목적과 수량에 맞춰 구성을 조정할 수 있습니다.
            </p>
          </div>
          <div className="ed-video-grid ed-video-grid--two">
            {PACKAGING_VIDEOS.map((video) => (
              <VideoSlot key={video.label} video={video} />
            ))}
          </div>
        </Section>

        {/* 5. 동작 원리 */}
        <Section id="principle" title="동작 원리">
          <div className="ed-prose">
            {PRINCIPLE_TEXT.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="ed-highlight">
            자성유체는 “자석에 반응하는 액체”로, 자기장에 따라 살아 움직이는 듯한 패턴을
            만들어냅니다.
          </p>
        </Section>

        {/* 6. 제작 방법 */}
        <Section id="making" title="제작 방법">
          <div className="ed-prose">
            <p>
              키트 구성품을 이용해 표면 처리부터 자성유체 적용까지의 과정을 순서대로 진행할
              수 있습니다. 자세한 과정은 아래 영상과 카탈로그를 통해 확인하실 수 있습니다.
            </p>
          </div>
          <ol className="ed-safety-list ed-making-list">
            {MAKING_STEPS.map((step, index) => (
              <li key={step}>
                <span className="ed-safety-list__num">{index + 1}</span>
                {step}
              </li>
            ))}
          </ol>
          <div className="ed-making-video">
            <VideoSlot video={MAKING_VIDEO} />
            <figure className="ed-making-video__image">
              <img src={heroKit} alt="자성유체 키트 사용 예시" loading="lazy" />
            </figure>
          </div>
        </Section>

        {/* 7. 문의 안내 */}
        <Section title="자성유체 키트가 필요하신가요?">
          <div className="ed-prose">
            <p>
              교육용, 전시용, 체험용, 연구 데모용 등 사용 목적에 따라 필요한 구성과 수량이
              달라질 수 있습니다. 사용 목적을 알려주시면 적합한 자성유체 키트 구성을
              안내해드립니다.
            </p>
          </div>
          <h3 className="ed-subheading">문의 시 전달하면 좋은 정보</h3>
          <ul className="ed-check-list">
            {INQUIRY_ITEMS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>

        {/* 8. Bottom CTA */}
        <section className="ed-cta-section">
          <div className="ed-cta-section__inner">
            <h2 className="ed-cta-section__title">
              하단의 카탈로그를 다운로드하시면 더욱 자세한 내용을 확인하실 수 있습니다.
            </h2>
            <div className="ed-prose ed-prose--light">
              <p>
                자성유체의 움직임은 사진보다 실제 실험에서 훨씬 더 직관적으로 이해됩니다.
                제품 구성, 사용 방법, 대량 구매, 교육용 납품이 필요하다면 문의해주세요.
              </p>
            </div>
            <div className="ed-cta-group ed-cta-group--center">
              <CatalogDownloadButton product="education" className="ed-btn ed-btn--secondary">
                카탈로그 다운로드
              </CatalogDownloadButton>
              <button
                type="button"
                className="ed-btn ed-btn--primary"
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
