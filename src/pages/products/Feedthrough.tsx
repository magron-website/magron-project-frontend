import { useState } from 'react'
import QuoteRequestModal from '@/components/QuoteRequestModal'
import {
  APPLICATION_CARDS,
  COMPANY_INFO_ROWS,
  CUSTOM_ITEMS,
  FERROFLUID_ADVANTAGES,
  FERROFLUID_SEAL_KEYWORDS,
  FLANGE_MOUNT_TABLES,
  HERO_CARDS,
  HOLLOW_CANTILEVER_TABLES,
  HOLLOW_FLANGE_TABLES,
  INQUIRY_ITEMS,
  LINEUP_CARDS,
  MINIATURE_TABLES,
  PURGE_MODE_SPEC,
  ROTARY_GAS_UNION_SPEC,
  THREE_AXIS_SPEC,
  THREE_COAXIAL_LINEAR_SPEC,
  THROUGH_HOLE_TABLES_1,
  THROUGH_HOLE_TABLES_2,
  TWO_COAXIAL_SPEC,
  UHV_SPEC,
} from '@/pages/products/feedthrough/content'
import {
  CompanyTable,
  ImagePlaceholder,
  ProductSpecSection,
  Section,
} from '@/pages/products/feedthrough/components'
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
            <ImagePlaceholder
              id="IMAGE_PLACEHOLDER_HERO_FEEDTHROUGH"
              description="Feedthrough 제품 대표 이미지들을 배치한다. Miniature Feedthrough, Through Hole Mount Feedthrough, Flange Mount Feedthrough 제품 렌더링을 조합하여 Hero 영역에 보여준다."
              src="/images/feedthrough/hero-feedthrough.png"
              aspectRatio="4 / 3"
              className="ft-hero__placeholder"
            />
          </div>
        </div>
      </header>

      <div className="ft-page__body">
        {/* 2. Feedthrough란? */}
        <Section title="Feedthrough">
          <div className="ft-split">
            <div className="ft-prose">
              <p>
                Feedthrough는 외부의 회전축, 구동력, 가스 라인, 전기 신호 등을 진공 챔버
                내부로 전달하기 위한 장치입니다. 일반적인 베어링이나 기계식 씰만으로는
                진공 누설, 마모, 파티클 발생, 수명 저하 문제가 발생할 수 있기 때문에
                고청정·고진공 환경에서는 특수 씰링 구조가 필요합니다.
              </p>
              <p>
                Magnetic Fluid Seal 기반 Feedthrough는 자석과 Pole Piece가 형성하는 자기장
                안에 Ferrofluid를 유지하여 회전축 주변에 액체 링 형태의 씰링 장벽을
                형성합니다. 이 구조는 회전 운동을 허용하면서도 가스 누설과 오염물 유입을
                효과적으로 차단합니다.
              </p>
            </div>
            <ImagePlaceholder
              id="IMAGE_PLACEHOLDER_FEEDTHROUGH_OVERVIEW"
              description="원본 이미지 첫 번째 페이지의 Feedthrough 제목과 Miniature Feedthrough 제품 렌더링을 배치한다."
              src="/images/feedthrough/feedthrough-overview.png"
              aspectRatio="4 / 3"
            />
          </div>
        </Section>

        {/* 3. Product Line-up */}
        <Section title="Feedthrough Product Line-up">
          <div className="ft-prose">
            <p>
              장비 구조와 적용 목적에 따라 다양한 Feedthrough 제품군을 선택할 수 있습니다.
              Miniature Type부터 Through Hole Mount, Flange Mount, Hollow Shaft, Coaxial,
              UHV, Purge Mode, Rotary Gas Union까지 다양한 구조를 제공합니다.
            </p>
          </div>
          <div className="ft-lineup-grid">
            {LINEUP_CARDS.map((card) => (
              <article key={card.title} className="ft-lineup-card">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
          <ImagePlaceholder
            id="IMAGE_PLACEHOLDER_PRODUCT_LINEUP"
            description="전체 Feedthrough 제품 렌더링을 카드형으로 배치한다."
            src="/images/feedthrough/product-lineup.png"
            aspectRatio="16 / 7"
            className="ft-section__support-image"
          />
        </Section>

        {/* 4. Miniature */}
        <ProductSpecSection
          title="Miniature Feedthrough"
          body="Miniature Feedthrough는 제한된 공간에서 회전 운동을 전달하면서도 진공 씰링 성능을 유지해야 하는 소형 장비에 적합합니다. 연구용 장비, 소형 진공 챔버, 정밀 구동 모듈 등에 적용할 수 있습니다."
          placeholders={[
            {
              id: 'IMAGE_PLACEHOLDER_MINIATURE_FEEDTHROUGH_1',
              description:
                '첫 번째 이미지 상단의 Miniature Feedthrough 첫 번째 제품 렌더링과 도면, 스펙 표를 배치한다.',
              src: '/images/feedthrough/miniature-feedthrough-1.png',
            },
            {
              id: 'IMAGE_PLACEHOLDER_MINIATURE_FEEDTHROUGH_2',
              description:
                '첫 번째 이미지 중간의 Miniature Feedthrough 두 번째 제품 렌더링과 도면, 스펙 표를 배치한다.',
              src: '/images/feedthrough/miniature-feedthrough-2.png',
            },
          ]}
          tables={MINIATURE_TABLES}
          notes={[
            'Miniature Feedthrough 표는 원본 이미지가 매우 작아 대부분 수치가 불명확하다. `?`는 추후 원본 자료 기준으로 수정할 예정이다.',
          ]}
        />

        {/* 5. Through Hole Mount */}
        <ProductSpecSection
          title="Through Hole Mount Feedthroughs"
          body="Through Hole Mount Feedthroughs는 장비 벽면 또는 플레이트를 관통하여 설치하는 구조입니다. 진공 챔버와 외부 구동부를 연결하면서도 회전축 주변의 진공 누설을 차단할 수 있습니다."
          placeholders={[
            {
              id: 'IMAGE_PLACEHOLDER_THROUGH_HOLE_MOUNT_1',
              description:
                '첫 번째 이미지 하단의 Through Hole Mount Feedthrough 제품 렌더링, 도면, 스펙 표를 배치한다.',
              src: '/images/feedthrough/through-hole-mount-1.png',
            },
            {
              id: 'IMAGE_PLACEHOLDER_THROUGH_HOLE_MOUNT_2',
              description:
                '두 번째 이미지 상단의 Through Hole Mount Feedthroughs 제품 렌더링, 도면 2개, 스펙 표를 배치한다.',
              src: '/images/feedthrough/through-hole-mount-2.png',
            },
          ]}
          tables={[...THROUGH_HOLE_TABLES_1, ...THROUGH_HOLE_TABLES_2]}
          notes={[
            'Note: Tapped hole type through-hole mount shaft size range is 8D-50D로 보임.',
          ]}
        />

        {/* 6. Flange Mount */}
        <ProductSpecSection
          title="Flange Mount Feedthroughs"
          body="Flange Mount Feedthroughs는 플랜지 체결 방식으로 장비에 고정하는 타입입니다. 설치 안정성이 높고 유지보수가 용이하여 산업용 진공 장비와 공정 장비에 폭넓게 적용할 수 있습니다."
          placeholders={[
            {
              id: 'IMAGE_PLACEHOLDER_FLANGE_MOUNT_FEEDTHROUGHS',
              description:
                '두 번째 이미지 하단의 Flange Mount Feedthroughs 제품 렌더링 2개, 도면, 스펙 표를 배치한다.',
              src: '/images/feedthrough/flange-mount.png',
            },
          ]}
          tables={FLANGE_MOUNT_TABLES}
          notes={[
            'Configuration can be changed in accordance with application requirements to enable components.',
            'Temperature flow bearing is available to accept high-temperature, high-speed applications.',
            'The standard type uses metric threads.',
          ]}
        />

        {/* 7. Hollow Shaft Flange */}
        <ProductSpecSection
          title="Hollow Shaft Feedthroughs, Flange Mount Type"
          body="Hollow Shaft Feedthroughs는 중공축 구조가 필요한 장비에 적용되는 Feedthrough입니다. 중앙 관통 구조를 통해 배선, 샤프트, 가스 라인 또는 특수 구동 구조와 결합할 수 있습니다."
          placeholders={[
            {
              id: 'IMAGE_PLACEHOLDER_HOLLOW_SHAFT_FLANGE',
              description:
                '세 번째 이미지 상단의 Hollow Shaft Feedthroughs, Flange Mount Type 제품 렌더링, 도면, 스펙 표를 배치한다.',
              src: '/images/feedthrough/hollow-shaft-flange.png',
            },
          ]}
          tables={HOLLOW_FLANGE_TABLES}
          notes={[
            'Configuration can be changed in accordance with application requirements.',
            'Standard hollow shaft size range는 약 10D-50D로 보임.',
          ]}
        />

        {/* 8. Hollow Shaft Cantilevered */}
        <ProductSpecSection
          title="Hollow Shaft Feedthroughs, Cantilevered Seal Type"
          body="Cantilevered Seal Type은 한쪽 지지 구조 또는 특수 장착 조건에서 사용할 수 있는 Hollow Shaft Feedthrough입니다. 장비 내부 구조상 일반 플랜지형 적용이 어려운 경우 선택할 수 있습니다."
          placeholders={[
            {
              id: 'IMAGE_PLACEHOLDER_HOLLOW_SHAFT_CANTILEVERED',
              description:
                '세 번째 이미지 하단의 Hollow Shaft Feedthroughs, Cantilevered Seal Type 제품 렌더링, 도면, 스펙 표를 배치한다.',
              src: '/images/feedthrough/hollow-shaft-cantilevered.png',
            },
          ]}
          tables={HOLLOW_CANTILEVER_TABLES}
          notes={[
            'Configuration can be changed in accordance with application requirements.',
            'Standard hollow shaft size range는 약 50D-120D로 보임.',
          ]}
        />

        {/* 9. Two Coaxial */}
        <ProductSpecSection
          title="Two Coaxial Type"
          body="Two Coaxial Type은 동축 구조의 복합 회전 전달이 필요한 장비에 적용되는 Feedthrough입니다. 2개의 회전축 또는 이중 구동 구조를 하나의 Feedthrough 안에서 구성해야 하는 특수 장비에 적합합니다."
          placeholders={[
            {
              id: 'IMAGE_PLACEHOLDER_TWO_COAXIAL_TYPE',
              description:
                '네 번째 이미지 상단의 Two Coaxial Type 제품 렌더링, 도면, 스펙 표를 배치한다.',
              src: '/images/feedthrough/two-coaxial.png',
            },
          ]}
          keyValueTable={TWO_COAXIAL_SPEC}
          notes={[
            'The internal shaft rotates at high speed and high vacuum environment.',
            'High temperature and low torque specifications can be changed by request.',
          ]}
        />

        {/* 10. Three Axis */}
        <ProductSpecSection
          title="Three Axis Type"
          body="Three Axis Type은 3축 회전 또는 다축 구동이 필요한 복합 장비용 Feedthrough입니다. 진공 환경에서 여러 축을 동시에 구동해야 하는 장비에 적합합니다."
          placeholders={[
            {
              id: 'IMAGE_PLACEHOLDER_THREE_AXIS_TYPE',
              description:
                '네 번째 이미지 중간의 Three Axis Type 제품 렌더링, 도면, 스펙 표를 배치한다.',
              src: '/images/feedthrough/three-axis.png',
            },
          ]}
          keyValueTable={THREE_AXIS_SPEC}
          notes={[
            'Three axis type allows independent rotation using magnetic coupling? 또는 coaxial shaft 구조로 보임.',
            '자세한 문장은 원본에서 흐릿하여 추후 수정 필요.',
          ]}
        />

        {/* 11. UHV */}
        <ProductSpecSection
          title="Ultra High Vacuum Feedthroughs"
          body="Ultra High Vacuum Feedthroughs는 고진공 또는 초고진공 환경에서 회전 운동을 전달하기 위한 제품입니다. 낮은 누설률과 안정적인 재질 구성이 요구되는 연구장비, 증착장비, 분석장비, 반도체 공정 장비에 적합합니다."
          placeholders={[
            {
              id: 'IMAGE_PLACEHOLDER_UHV_FEEDTHROUGH',
              description:
                '네 번째 이미지 하단의 Ultra High Vacuum Feedthroughs 제품 렌더링, 도면, 스펙 표를 배치한다.',
              src: '/images/feedthrough/uhv-feedthrough.png',
            },
          ]}
          keyValueTable={UHV_SPEC}
          notes={[
            '1. Rotation of UHV operation and addition temperature process by ? operation.',
            '2. The inner hole is possible from 10? shaft by request.',
            '3. Sealing and magnetic fluid cannot be ?.',
            '4. The compact type can be provided with very high vacuum pressure at 10^-? Pa.',
          ]}
        />

        {/* 12. Three Coaxial and Linear */}
        <ProductSpecSection
          title="Three Coaxial and Linear Feedthroughs"
          body="Three Coaxial and Linear Feedthroughs는 회전 운동과 선형 운동을 동시에 전달해야 하는 복합 구동 장비용 Feedthrough입니다. 고정밀 진공 장비, 특수 연구장비, 복합 이송 장비에 적합합니다."
          placeholders={[
            {
              id: 'IMAGE_PLACEHOLDER_THREE_COAXIAL_LINEAR',
              description:
                '다섯 번째 이미지 상단의 Three Coaxial and Linear Feedthroughs 제품 렌더링, 단면 도면, 스펙 표를 배치한다.',
              src: '/images/feedthrough/three-coaxial-linear.png',
            },
          ]}
          keyValueTable={THREE_COAXIAL_LINEAR_SPEC}
          notes={[
            'Three coaxial type allows rotation of three axes and linear movement.',
            '특수 장비 요청 사양에 따라 제작 가능한 구조로 보임.',
          ]}
        />

        {/* 13. Purge Mode */}
        <ProductSpecSection
          title="Purge Mode Type"
          body="Purge Mode Type은 Feedthrough 내부 또는 씰링 주변에 퍼지 가스를 공급하여 공정가스, 오염물, 분진의 유입 또는 축적을 억제하는 구조입니다. 부식성 가스, 분진 공정, 고청정 공정에서 장비 수명과 안정성을 높이는 데 활용할 수 있습니다."
          placeholders={[
            {
              id: 'IMAGE_PLACEHOLDER_PURGE_MODE_TYPE',
              description:
                '여섯 번째 이미지 상단의 Purge Mode Type 제품 렌더링, 도면, 스펙 표를 배치한다.',
              src: '/images/feedthrough/purge-mode.png',
            },
          ]}
          keyValueTable={PURGE_MODE_SPEC}
          extraBody={[
            'Purge flow removes contaminating gas and dust on the seal area.',
            'This type is useful for preventing the inflow of process gas and particles into the seal structure.',
          ]}
        />

        {/* 14. Rotary Gas Union */}
        <ProductSpecSection
          title="Rotary Gas Union"
          body="Rotary Gas Union은 회전축을 통해 가스를 공급하거나 배출해야 하는 장비에 적용됩니다. 회전 운동을 유지하면서 가스 라인을 연결해야 하는 공정 장비, 분석 장비, 진공 장비에 적합합니다."
          placeholders={[
            {
              id: 'IMAGE_PLACEHOLDER_ROTARY_GAS_UNION',
              description:
                '여섯 번째 이미지 중간의 Rotary Gas Union 제품 렌더링, 도면, 스펙 표를 배치한다.',
              src: '/images/feedthrough/rotary-gas-union.png',
            },
          ]}
          keyValueTable={ROTARY_GAS_UNION_SPEC}
          extraBody={[
            'Highly purified gas can be injected into instruments through this component.',
            'Application examples include chemical analysis equipment and various vacuum process systems.',
          ]}
        />

        {/* 15. Ferrofluid Seal */}
        <Section title="Ferrofluid Seal" subtitle="What is Ferrofluid Seal?">
          <div className="ft-split">
            <div className="ft-prose">
              <p>
                Ferrofluid Seal은 회전축과 하우징 사이에 자성유체를 배치하고, 자석과 Pole
                Piece가 형성하는 자기장을 이용하여 자성유체를 안정적으로 유지하는 비접촉식
                씰링 구조입니다.
              </p>
              <p>
                자성유체는 회전축 주변에 여러 단계의 액체 링을 형성하며, 이 링이 압력
                차이를 견디는 씰링 장벽 역할을 합니다. 이를 통해 회전 운동은 유지하면서도
                가스 누설, 진공도 저하, 분진 유입을 방지할 수 있습니다.
              </p>
              <ul className="ft-tag-list">
                {FERROFLUID_SEAL_KEYWORDS.map((keyword) => (
                  <li key={keyword}>{keyword}</li>
                ))}
              </ul>
            </div>
            <ImagePlaceholder
              id="IMAGE_PLACEHOLDER_FERROFLUID_SEAL"
              description="여섯 번째 이미지 하단의 Ferrofluid Seal 설명 영역, Pressure & Advantage 원형 아이콘 5개, Feedthrough Parts Diagram 단면 이미지를 배치한다."
              src="/images/feedthrough/ferrofluid-seal-diagram.png"
              aspectRatio="3 / 4"
            />
          </div>
          <div className="ft-advantage-grid">
            {FERROFLUID_ADVANTAGES.map((item) => (
              <article key={item.title} className="ft-advantage-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </Section>

        {/* 16. Application */}
        <Section title="Application">
          <div className="ft-prose">
            <p>
              Ferrofluid Seal과 Feedthrough는 진공, 회전, 고청정, 유해가스, 분진 차단이
              필요한 다양한 장비에 적용됩니다. 특히 반도체, 디스플레이, 진공 증착, 이온
              주입, 로봇 이송, 의료/바이오, 항공우주 및 방산 장비와 같이 높은 신뢰성이
              요구되는 분야에서 활용됩니다.
            </p>
          </div>
          <div className="ft-app-grid">
            {APPLICATION_CARDS.map((card) => (
              <article key={card.title} className="ft-app-card">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
          <div className="ft-image-stack">
            <ImagePlaceholder
              id="IMAGE_PLACEHOLDER_APPLICATION_TOP"
              description="일곱 번째 이미지 상단의 파란 배경 Application 섹션과 원형 아이콘 5개를 배치한다."
              src="/images/feedthrough/application-top.png"
              aspectRatio="16 / 5"
            />
            <ImagePlaceholder
              id="IMAGE_PLACEHOLDER_APPLICATION_GRID_1"
              description="일곱 번째 이미지 중간의 Feedthrough, Chemical Vapor Deposition Equipment, Sputtering Equipment, Ion Implanter 이미지 그리드를 배치한다."
              src="/images/feedthrough/application-grid-1.png"
              aspectRatio="16 / 6"
            />
            <ImagePlaceholder
              id="IMAGE_PLACEHOLDER_APPLICATION_GRID_2"
              description="일곱 번째 이미지 하단과 여덟 번째 이미지 상단의 Etching Equipment, Vacuum Transfer Robot, Arc Discharge, Ion Beam Equipment, LED/OLED Manufacturing Equipment, Vacuum Chuck, Solar Panel, New Energy Battery, Single Crystal Growth, Vacuum Furnace 이미지를 그리드로 배치한다."
              src="/images/feedthrough/application-grid-2.png"
              aspectRatio="16 / 8"
            />
            <ImagePlaceholder
              id="IMAGE_PLACEHOLDER_APPLICATION_GRID_3"
              description="여덟 번째 이미지 중간의 Nuclear Power, Nuclear Fusion, Military, Medical Equipment, Aerospace 이미지 그리드를 배치한다."
              src="/images/feedthrough/application-grid-3.png"
              aspectRatio="16 / 5"
            />
          </div>
        </Section>

        {/* 17. Custom order */}
        <Section title="You can make an order with the specifications you want">
          <div className="ft-prose">
            <p>
              Feedthrough와 Ferrofluid Seal은 장비 조건에 따라 축 직경, 회전 속도, 진공도,
              장착 방식, 재질, 가스 호환성, 온도 범위를 다르게 설계해야 합니다. 표준
              제품 외에도 고객 장비 사양에 맞춘 커스텀 제작이 가능합니다.
            </p>
          </div>
          <ul className="ft-check-list">
            {CUSTOM_ITEMS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <ImagePlaceholder
            id="IMAGE_PLACEHOLDER_CUSTOM_ORDER_BANNER"
            description='여덟 번째 이미지 하단의 "You can make an order with the specifications you want" 배너 이미지를 배치한다.'
            src="/images/feedthrough/custom-order-banner.png"
            aspectRatio="16 / 4"
            className="ft-section__support-image"
          />
        </Section>

        {/* 18. Company */}
        <Section title="Company Information">
          <div className="ft-prose">
            <p>
              고객의 장비 환경과 공정 조건에 맞는 Feedthrough 및 Ferrofluid Seal 사양을
              검토하고, 필요한 경우 맞춤형 제품 제작을 지원합니다.
            </p>
          </div>
          <CompanyTable rows={COMPANY_INFO_ROWS} />
          <p className="ft-note">
            회사 정보는 이미지에서 글자가 작아 정확히 읽히지 않는다. `?` 값은 추후 수정할
            예정이다.
          </p>
          <ImagePlaceholder
            id="IMAGE_PLACEHOLDER_COMPANY_INFO"
            description="마지막 이미지의 회사 건물 사진과 Company Information 표를 배치한다."
            src="/images/feedthrough/company-info.png"
            aspectRatio="16 / 7"
            className="ft-section__support-image"
          />
        </Section>

        {/* 19. Bottom CTA */}
        <section className="ft-cta-banner">
          <div className="ft-cta-banner__inner">
            <h2>Download the catalog below for more information</h2>
            <p>
              제품 상세 사양, 도면, 적용 조건 검토가 필요하다면 카탈로그를 확인하거나 제품
              문의를 남겨주세요. 장비 구조와 공정 조건을 알려주시면 적합한 Feedthrough 및
              Ferrofluid Seal 사양을 검토해드립니다.
            </p>
            <div className="ft-cta-group">
              <a className="ft-btn ft-btn--primary" href="/#products">
                Download Catalogue
              </a>
              <button
                type="button"
                className="ft-btn ft-btn--secondary"
                onClick={() => setIsQuoteOpen(true)}
              >
                Contact Us
              </button>
            </div>
            <div className="ft-inquiry-list">
              <p className="ft-cta-banner__note">문의 시 전달하면 좋은 정보:</p>
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
