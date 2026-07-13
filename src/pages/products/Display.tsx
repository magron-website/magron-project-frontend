import { useState } from 'react'
import QuoteRequestModal from '@/components/QuoteRequestModal'
import CatalogDownloadButton from '@/components/CatalogDownloadButton'
import {
  APPLICATION_CARDS,
  INQUIRY_ITEMS,
  MAIN_VIDEO,
  PORTFOLIO_VIDEOS,
} from '@/pages/products/display/content'
import {
  ApplicationCard,
  Section,
  VideoCard,
} from '@/pages/products/display/components'
import '@/assets/design/products/display.css'

export default function Display() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false)

  return (
    <article className="dp-page">
      <QuoteRequestModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />

      {/* 1. Hero */}
      <header className="dp-hero">
        <div className="dp-hero__inner">
          <p className="dp-hero__label">Products</p>
          <h1 className="dp-hero__title">대형 자성유체 디스플레이</h1>
          <p className="dp-hero__title-en">Large Ferrofluid Display</p>
          <p className="dp-hero__lead">
            자성유체의 움직임을 대형 디스플레이 형태로 구현한 전시·홍보·체험용
            콘텐츠입니다. 자기장에 반응하는 유체의 움직임을 영상으로 확인해보세요.
          </p>
        </div>
      </header>

      <div className="dp-main-video">
        <div className="dp-main-video__inner">
          <VideoCard
            variant="hero"
            placeholderId={MAIN_VIDEO.placeholderId}
            description={MAIN_VIDEO.description}
            youtubeUrl={MAIN_VIDEO.youtubeUrl}
            thumbnailSrc={MAIN_VIDEO.thumbnailSrc}
          />
        </div>
      </div>

      <div className="dp-page__body">
        {/* 2. Portfolio */}
        <Section title="PORTFOLIO" titleVariant="portfolio">
          <p className="dp-section__lead">
            대형 자성유체 디스플레이의 실제 작동 모습과 전시 적용 사례를 영상으로 확인할 수
            있습니다.
          </p>
          <div className="dp-portfolio-grid">
            {PORTFOLIO_VIDEOS.map((video) => (
              <VideoCard
                key={video.placeholderId}
                variant="portfolio"
                placeholderId={video.placeholderId}
                description={video.description}
                videoSrc={video.videoSrc}
                thumbnailSrc={video.thumbnailSrc}
                title={video.title}
                subtitle={video.description}
              />
            ))}
          </div>
        </Section>

        {/* 3. Application */}
        <Section title="전시와 홍보에 활용 가능한 자성유체 콘텐츠">
          <p className="dp-section__lead">
            대형 자성유체 디스플레이는 관람객의 시선을 끄는 시각적 효과가 강해 전시, 홍보관,
            과학관, 기업 쇼룸, 체험 부스에 활용할 수 있습니다.
          </p>
          <div className="dp-app-grid">
            {APPLICATION_CARDS.map((card) => (
              <ApplicationCard
                key={card.title}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>
        </Section>

        {/* 4. Custom Order Banner */}
        <section className="dp-banner">
          <div className="dp-banner__content">
            <h2 className="dp-banner__title">귀사에서 원하는 규격으로 주문제작 가능합니다.</h2>
            <p className="dp-banner__desc">
              전시 공간, 설치 방식, 디스플레이 크기, 제어 방식에 따라 맞춤형 제작을 검토할 수
              있습니다.
            </p>
          </div>
        </section>

        {/* 6. Bottom CTA */}
        <section className="dp-cta-banner">
          <div className="dp-cta-banner__inner">
            <h2>대형 자성유체 디스플레이가 필요하신가요?</h2>
            <p>
              전시 공간과 원하는 디스플레이 형태를 알려주시면 맞춤형 제작 가능 여부를
              검토해드립니다.
            </p>
            <div className="dp-cta-group">
              <CatalogDownloadButton product="display" className="dp-btn dp-btn--primary">
                카탈로그 다운로드
              </CatalogDownloadButton>
              <button
                type="button"
                className="dp-btn dp-btn--secondary"
                onClick={() => setIsQuoteOpen(true)}
              >
                제품문의
              </button>
            </div>
            <div className="dp-inquiry-list">
              <p className="dp-cta-banner__note">문의 시 전달하면 좋은 정보</p>
              <ul className="dp-check-list dp-check-list--light">
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
