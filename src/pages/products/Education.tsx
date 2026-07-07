import { useState } from 'react'
import { Link } from 'react-router-dom'
import QuoteRequestModal from '@/components/QuoteRequestModal'
import {
  COMPONENT_CARDS,
  EXPERIMENT_USE_CARDS,
  FERROFLUID_EXPLAIN_CARDS,
  HERO_CARDS,
  INQUIRY_ITEMS,
  KIT_DEMO_VIDEOS,
  KIT_ITEM_CATCHING_MAGNET,
  KIT_ITEM_FERROFLUID,
  KIT_ITEM_PULLING_MAGNET,
  KIT_ITEM_STAR_MAGNET,
  KIT_VIDEO_TOPICS,
  SAFETY_ITEMS,
} from '@/pages/products/education/content'
import {
  ImagePlaceholder,
  InfoCard,
  KitItemSectionView,
  Section,
  YouTubePlaceholder,
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
                자성유체의 독특한 움직임과 자기장 반응을 직접 관찰할 수 있는 실험용
                키트입니다. 강한 자석을 가까이 가져가면 액체가 뾰족한 스파이크 형태로
                변하고, 자석의 위치와 움직임에 따라 살아 움직이는 듯한 패턴을 만들어냅니다.
              </p>
              <p>
                이 키트는 과학 교육, 학교 실험, 전시 체험, 콘텐츠 제작, 연구용 데모에
                활용할 수 있습니다.
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
            <div className="ed-cta-group">
              <button
                type="button"
                className="ed-btn ed-btn--primary"
                onClick={() => setIsQuoteOpen(true)}
              >
                제품 문의
              </button>
              <a className="ed-btn ed-btn--secondary" href="#kit-videos">
                자성유체 키트 소개영상 보기
              </a>
              <button
                type="button"
                className="ed-btn ed-btn--outline"
                onClick={() => setIsQuoteOpen(true)}
              >
                제품문의
              </button>
            </div>
          </div>
          <div className="ed-hero__visual">
            <ImagePlaceholder
              id="IMAGE_PLACEHOLDER_HERO_KIT"
              description="첫 번째 이미지 상단의 자성유체 키트 대표 이미지. 손으로 자석을 잡고 병 안의 자성유체가 반응하는 이미지와 우측 상단의 Ferrofluid 입자 이미지를 Hero 메인 비주얼로 배치한다."
              src="/images/ferrofluid-kit/hero-kit.png"
              aspectRatio="4 / 3"
              className="ed-hero__placeholder"
            />
          </div>
        </div>
      </header>

      <div className="ed-page__body">
        <Link className="ed-back" to="/">
          ← 제품 목록으로
        </Link>

        {/* 2. 제품 소개 */}
        <Section title="제품 소개">
          <div className="ed-prose">
            <p>
              자성유체 키트는 자성유체와 다양한 자석을 이용해 자기장에 따른 유체의 움직임을
              관찰할 수 있는 실험 세트입니다. 자성유체는 자성을 띠는 미세 입자가 액체 안에
              분산된 특수 유체로, 외부 자기장에 반응하여 독특한 형태와 움직임을 보여줍니다.
            </p>
          </div>
          <div className="ed-component-grid">
            {COMPONENT_CARDS.map((card) => (
              <InfoCard
                key={card.title}
                title={card.title}
                subtitle={card.subtitle}
              />
            ))}
          </div>
          <ImagePlaceholder
            id="IMAGE_PLACEHOLDER_KIT_COMPONENTS"
            description="첫 번째 이미지의 “제품 구성” 영역. 작은 병 형태의 자성유체와 Star Magnet, Pulling Magnet, Catching Magnet 제품 사진 4개를 카드형으로 배치한다."
            src="/images/ferrofluid-kit/components.png"
            aspectRatio="21 / 9"
            className="ed-section__image"
          />
        </Section>

        {/* 3. 자성유체란? */}
        <Section title="자성유체란?">
          <div className="ed-prose">
            <p>
              자성유체 Ferrofluid는 액체 안에 매우 작은 자성 입자가 분산되어 있는 기능성
              유체입니다. 평소에는 액체처럼 흐르지만, 자석을 가까이 가져가면 자기장에
              반응하여 뾰족한 스파이크 형태를 만들거나 자석 방향으로 움직이는 독특한 현상을
              보여줍니다.
            </p>
            <p>
              쉽게 말해, 자성유체는 “자석에 반응하는 액체”입니다. 이 특성 덕분에 과학
              실험, 전시, 예술 콘텐츠, 교육용 교구, 공학 데모 등에 활용됩니다.
            </p>
          </div>
          <div className="ed-explain-grid">
            {FERROFLUID_EXPLAIN_CARDS.map((card) => (
              <InfoCard key={card.title} title={card.title} description={card.description} />
            ))}
          </div>
          <ImagePlaceholder
            id="IMAGE_PLACEHOLDER_FERROFLUID_CLOSEUP"
            description="자성유체가 자석에 반응해 검은색 스파이크 형태를 만드는 클로즈업 이미지를 넣는다. Hero 이미지 오른쪽 상단의 Ferrofluid 입자 이미지도 활용 가능하다."
            src="/images/ferrofluid-kit/ferrofluid-bottle.png"
            aspectRatio="16 / 9"
            className="ed-section__image"
          />
        </Section>

        {/* 4–7. 구성품별 설명 */}
        <Section title="키트 구성품" className="ed-section--kit">
          <KitItemSectionView item={KIT_ITEM_FERROFLUID} />
          <KitItemSectionView item={KIT_ITEM_STAR_MAGNET} />
          <KitItemSectionView item={KIT_ITEM_PULLING_MAGNET} />
          <KitItemSectionView item={KIT_ITEM_CATCHING_MAGNET} />
        </Section>

        {/* 8. 제품 구성과 사용 영상 */}
        <Section id="kit-videos" title="제품 구성과 사용 영상">
          <div className="ed-prose">
            <p>
              자성유체 키트는 구성품별로 다양한 실험을 진행할 수 있습니다. 아래 영상
              영역에는 각 구성품의 사용 예시와 자성유체 반응 영상을 연결할 예정입니다.
            </p>
          </div>
          <ul className="ed-topic-list">
            {KIT_VIDEO_TOPICS.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
          <div className="ed-video-grid ed-video-grid--three">
            {KIT_DEMO_VIDEOS.map((video) => (
              <YouTubePlaceholder
                key={video.id}
                id={video.id}
                description={video.description}
              />
            ))}
          </div>
          <p className="ed-note ed-note--center">동영상 링크는 추후 직접 연결할 예정입니다.</p>
          <div className="ed-cta-group ed-cta-group--center">
            <button
              type="button"
              className="ed-btn ed-btn--primary ed-btn--on-light"
              onClick={() => setIsQuoteOpen(true)}
            >
              제품 문의
            </button>
          </div>
        </Section>

        {/* 9. 실험 활용 예시 */}
        <Section title="이런 실험에 활용할 수 있습니다">
          <div className="ed-prose">
            <p>
              자성유체 키트는 단순한 관찰용 제품이 아니라 자기장, 자성, 유체, 나노입자
              개념을 시각적으로 이해할 수 있는 교육용 실험 도구입니다.
            </p>
          </div>
          <div className="ed-use-grid">
            {EXPERIMENT_USE_CARDS.map((card) => (
              <InfoCard key={card.title} title={card.title} description={card.description} />
            ))}
          </div>
        </Section>

        {/* 10. 사용 시 주의사항 */}
        <Section title="사용 시 주의사항">
          <div className="ed-prose">
            <p>
              자성유체와 자석은 안전하게 사용해야 합니다. 특히 자성유체는 검은색 액체로
              옷이나 피부, 책상에 묻으면 닦기 어려울 수 있고, 자석은 전자기기나 카드에
              영향을 줄 수 있습니다.
            </p>
          </div>
          <div className="ed-warning-card ed-warning-card--large">
            <ol className="ed-safety-list">
              {SAFETY_ITEMS.map((item, index) => (
                <li key={item}>
                  <span className="ed-safety-list__num">{index + 1}</span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
          <p className="ed-highlight">
            안전하게 사용하면 자성유체의 독특한 움직임과 자기장 반응을 매우 흥미롭게 관찰할
            수 있습니다.
          </p>
        </Section>

        {/* 11. 제품 선택 및 문의 안내 */}
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
          <ImagePlaceholder
            id="IMAGE_PLACEHOLDER_BOTTOM_KIT"
            description="두 번째 이미지 하단의 자성유체 키트 대표 이미지와 YouTube 썸네일을 함께 배치한다."
            src="/images/ferrofluid-kit/bottom-kit.png"
            aspectRatio="21 / 9"
            className="ed-section__image"
          />
        </Section>

        {/* 12. Bottom CTA */}
        <section className="ed-cta-section">
          <div className="ed-cta-section__inner">
            <h2 className="ed-cta-section__title">
              자성유체 키트로 직접 자기장 반응을 관찰해보세요
            </h2>
            <div className="ed-prose ed-prose--light">
              <p>
                자성유체의 움직임은 사진보다 실제 실험에서 훨씬 더 직관적으로 이해됩니다.
                제품 구성, 사용 방법, 대량 구매, 교육용 납품이 필요하다면 문의해주세요.
              </p>
            </div>
            <div className="ed-cta-group ed-cta-group--center">
              <a className="ed-btn ed-btn--secondary" href="/#products">
                카탈로그 다운로드
              </a>
              <button
                type="button"
                className="ed-btn ed-btn--primary"
                onClick={() => setIsQuoteOpen(true)}
              >
                제품문의
              </button>
            </div>
            <p className="ed-cta-section__footnote">
              해당 키트는 교육, 전시, 실험, 콘텐츠 제작 목적에 맞춰 활용할 수 있습니다.
            </p>
          </div>
        </section>
      </div>
    </article>
  )
}
