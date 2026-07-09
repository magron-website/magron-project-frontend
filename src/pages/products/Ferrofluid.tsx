import { useState } from 'react'
import QuoteRequestModal from '@/components/QuoteRequestModal'
import { useFerrofluidInfo } from '@/hooks/useFerrofluidInfo'
import {
  CompareCard,
  CompanyTable,
  ImagePlaceholder,
  InfoList,
  Section,
  SpecTable,
} from '@/pages/products/ferrofluid/components'
import {
  APPLICATION_CARDS,
  COMPANY_INFO_ROWS,
  CORROSIVE_SPEC_COLUMNS,
  CORROSIVE_SPEC_ROWS,
  FERROFLUID_SEAL_POINTS,
  HERO_CARDS,
  LEAK_TEST_CARDS,
  MECHANICAL_SEAL_POINTS,
  MFS_GREASE_COLUMNS,
  MFS_GREASE_ROWS,
  NON_CORROSIVE_SPEC_COLUMNS,
  NON_CORROSIVE_SPEC_ROWS,
  PRODUCT_INFO,
  SEAL_STRUCTURE_ITEMS,
  SELECTION_CRITERIA,
  TGA_DTA_CARDS,
  TGA_GRAPH_CARDS,
} from '@/pages/products/ferrofluid/content'
import '@/assets/design/products/ferrofluid.css'

export default function Ferrofluid() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false)
  const { images } = useFerrofluidInfo()
  const imageByOrder = new Map(images.map((image) => [image.sortOrder, image]))

  const heroImage = imageByOrder.get(2)
  const sealStructureImage = imageByOrder.get(4)
  const productOverviewImage = imageByOrder.get(1)
  const leakTestImage = imageByOrder.get(5)
  const ferrofluidSealImage = imageByOrder.get(6)
  const applicationsImage1 = imageByOrder.get(9)
  const applicationsImage2 = imageByOrder.get(10)

  return (
    <article className="ff-page">
      <QuoteRequestModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />

      {/* 1. Hero */}
      <header className="ff-hero">
        <div className="ff-hero__inner">
          <div className="ff-hero__content">
            <p className="ff-hero__label">Products</p>
            <h1 className="ff-hero__title">유해가스 및 분진 차단용 자성유체</h1>
            <p className="ff-hero__title-en">
              Ferrofluid for Corrosive Gas &amp; Dust Blocking
            </p>
            <p className="ff-hero__lead">
              회전축 주변에서 발생하는 유해가스 누출, 외부 분진 유입, 진공도 저하 문제를
              자성유체 기반 비접촉 씰링 구조로 차단합니다.
            </p>
            <div className="ff-hero__body">
              <p>
                자성유체 Ferrofluid는 자기장 안에서 안정적으로 유지되는 기능성 유체입니다.
                자성유체 Seal은 회전축 주변에 형성된 자기장 안에 Ferrofluid를 유지하여,
                기계적 접촉을 최소화하면서도 가스, 분진, 파티클, 오염물의 이동을 차단합니다.
              </p>
              <p>
                일반적인 Mechanical Seal이나 O-ring 방식이 마모, 발열, 파티클 발생, 화학적
                열화 문제를 겪는 환경에서도 자성유체 Seal은 안정적인 밀봉 성능과 긴 수명을
                제공합니다.
              </p>
            </div>
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
            <ImagePlaceholder
              id="IMAGE_PLACEHOLDER_HERO_PRODUCTS"
              description="TGA/DTA 그래프 3개를 Hero 영역에 배치한다."
              src={heroImage?.imageUrl}
              aspectRatio="16 / 9"
              className="ff-hero__placeholder"
              hideCaption={Boolean(heroImage?.imageUrl)}
              alt={heroImage?.title ?? 'Ferrofluid hero image'}
              fit="cover"
            />
          </div>
        </div>
      </header>

      <div className="ff-page__body">

        {/* 2. Why needed */}
        <Section title="왜 자성유체 Seal이 필요한가?">
          <div className="ff-split">
            <div className="ff-prose">
              <p>
                진공 장비, 가스 공정 장비, 반도체/디스플레이 공정 장비에서는 회전축을 따라
                미세한 누설 경로가 발생할 수 있습니다. 이 누설 경로는 공정가스의 외부
                유출, 외부 분진 유입, 장비 내부 오염, 진공도 저하, 제품 수율 저하로 이어질
                수 있습니다.
              </p>
              <p>
                Ferrofluid Seal은 자석과 Pole Piece가 만드는 자기장 안에 Ferrofluid를 링
                형태로 유지하여 회전축 주변에 액체 O-ring과 같은 차단막을 형성합니다. 이
                구조는 회전 운동을 허용하면서도 가스와 오염물의 이동을 안정적으로
                차단합니다.
              </p>
            </div>
            <ImagePlaceholder
              id="IMAGE_PLACEHOLDER_SEAL_STRUCTURE"
              description="네 번째 이미지의 Ferrofluid Seal 구조도 또는 Feedthrough H25 단면 이미지를 배치한다. Shaft, Magnet, Pole Piece, Ferrofluid 위치가 보이는 단면도가 적합하다."
              src={sealStructureImage?.imageUrl}
              aspectRatio="16 / 9"
              className="ff-placeholder--inset"
              hideCaption={Boolean(sealStructureImage?.imageUrl)}
              alt={sealStructureImage?.title ?? 'Ferrofluid Info 3'}
            />
          </div>
          <div className="ff-compare-grid">
            <CompareCard
              title="일반 Mechanical Seal"
              items={MECHANICAL_SEAL_POINTS}
              variant="negative"
            />
            <CompareCard
              title="Ferrofluid Seal"
              items={FERROFLUID_SEAL_POINTS}
              variant="positive"
            />
          </div>
        </Section>

        {/* 3. Product overview */}
        <Section title="제품 개요">
          <div className="ff-split ff-split--overview">
            <div className="ff-prose">
              <p>
                본 제품은 유해가스 및 분진 차단용 자성유체입니다. 특히 부식성 가스
                환경에서는 Carrier Fluid로 Perfluoro Polyether, PFPE 계열을 사용하여 화학적
                안정성과 낮은 증기압 특성을 확보합니다.
              </p>
              <InfoList items={PRODUCT_INFO} />
            </div>
            <ImagePlaceholder
              id="IMAGE_PLACEHOLDER_PRODUCT_OVERVIEW"
              description="첫 번째 이미지의 제품 렌더링 2종을 제품 개요 영역에 배치한다."
              src={productOverviewImage?.imageUrl}
              aspectRatio="4 / 3"
              className="ff-placeholder--overview"
              hideCaption={Boolean(productOverviewImage?.imageUrl)}
              alt={productOverviewImage?.title ?? 'Ferrofluid information image 3'}
            />
          </div>
        </Section>

        {/* 4. Corrosive spec */}
        <Section
          title="Corrosive Gas용 Ferrofluid Specification"
          className="ff-section--spec"
        >
          <div className="ff-prose">
            <p>
              부식성 가스 환경용 Ferrofluid는 PFPE 계열 Carrier Fluid를 기반으로 하며, 낮은
              증기압과 높은 화학적 안정성을 목표로 설계되었습니다. 아래 표는 원본 이미지에서
              확인한 모델별 포화자화, 점도, 증기압, Helium gas leak test, TGA 기준 중량
              손실 온도, 유동점, 밀도 정보입니다.
            </p>
          </div>
          <SpecTable
            columns={CORROSIVE_SPEC_COLUMNS}
            rows={CORROSIVE_SPEC_ROWS}
            variant="magenta"
          />
          <p className="ff-note">
            ※ 모델별 최적 적용 조건은 장비 구조, 회전축 직경, 회전 속도, 가스 종류, 온도
            조건에 따라 달라질 수 있습니다. 적용 전 기술 상담을 권장합니다.
          </p>
        </Section>

        {/* 5. Leak test */}
        <Section title="Leak Test Data" className="ff-section--data">
          <div className="ff-prose">
            <p>
              자성유체 Seal의 핵심 성능은 장시간 운전 중에도 누설률과 진공도를 안정적으로
              유지하는 것입니다. 원본 자료에서는 MFF-M4251과 MFF-M5070 모델의 Leak Test
              Data가 제시되어 있으며, 두 그래프 모두 초기 안정화 이후 일정한 수준으로
              유지되는 모습을 보여줍니다.
            </p>
            <p className="ff-highlight">
              진공 배기 시간이 짧으며, 진공도도 일정하게 유지되고 있습니다.
            </p>
          </div>
          <div className="ff-data-grid ff-data-grid--2">
            {LEAK_TEST_CARDS.map((card) => (
              <article key={card.title} className="ff-data-card">
                <h3>{card.title}</h3>
                <ul>
                  {card.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <ImagePlaceholder
            id="IMAGE_PLACEHOLDER_LEAK_TEST"
            description="두 번째 이미지 상단의 MFF-M4251 Leak Test Data 그래프와 MFF-M5070 Leak Test Data 그래프를 좌우 2컬럼으로 배치한다."
            src={leakTestImage?.imageUrl}
            aspectRatio="16 / 6"
            hideCaption={Boolean(leakTestImage?.imageUrl)}
            alt={leakTestImage?.title ?? 'Ferrofluid information image 4'}
          />
        </Section>

        {/* 6. Non-corrosive spec */}
        <Section title="Non-Corrosive Gas용 Ferrofluid Specification" className="ff-section--spec">
          <div className="ff-prose">
            <p>
              비부식성 가스 환경에서는 장비의 운전 조건에 따라 점도, 포화자화, 온도 특성,
              Carrier Fluid를 선택할 수 있습니다. 원본 이미지의 표가 작아 일부 모델명과
              수치가 흐릿하지만, 보이는 범위 기준으로 아래와 같이 정리합니다. `?`가 있는
              값은 원본 이미지에서 불명확한 값입니다.
            </p>
          </div>
          <SpecTable
            columns={NON_CORROSIVE_SPEC_COLUMNS}
            rows={NON_CORROSIVE_SPEC_ROWS}
            variant="magenta"
          />
          <p className="ff-note">
            ※ 위 Non-Corrosive Gas용 표는 제공 이미지에서 읽히는 범위대로 정리한 값입니다.
            원본 자료와 대조 후 최종 수치를 확정해야 합니다.
          </p>
        </Section>

        {/* 7. MFS series */}
        <Section title="MFS-Series &amp; MFS-Grease">
          <div className="ff-prose">
            <p>
              원본 자료에는 MFS-Series 및 MFS-Grease 항목이 함께 표시되어 있습니다.
              MFS-Series는 자성유체 Seal 적용을 위한 제품군으로 보이며, MFS-Grease는 Grease
              Type 제품으로 구분되어 있습니다.
            </p>
            <ul className="ff-bullet-list">
              <li>MFS-Series</li>
              <li>MFS-Grease</li>
              <li>
                MFS-grease는 고진공 및 저속 회전 조건에서 사용할 수 있는 Grease Type
                제품으로 보임
              </li>
              <li>Grease Type</li>
              <li>For Non-Corrosive Gas / Dust Sealing / Lubrication</li>
            </ul>
          </div>
          <h3 className="ff-subheading">MFS-Grease</h3>
          <SpecTable columns={MFS_GREASE_COLUMNS} rows={MFS_GREASE_ROWS} />
          <p className="ff-note">
            MFS-Grease 표는 원본 이미지에서 매우 작게 보여 일부 컬럼과 값이 정확하지 않다.
            `?` 값은 흐릿하게 보이는 값이다.
          </p>
        </Section>

        {/* 8. TGA / DTA */}
        <Section title="Thermal Stability Test" className="ff-section--data">
          <div className="ff-prose">
            <p>
              Ferrofluid의 열적 안정성은 고온 공정 또는 장시간 연속 운전 환경에서 중요한
              판단 기준입니다. TGA와 DTA 분석을 통해 온도 변화에 따른 중량 손실과 열적
              거동을 확인할 수 있으며, 이는 Carrier Fluid의 안정성과 사용 가능 온도 범위를
              평가하는 데 활용됩니다.
            </p>
            <ul className="ff-bullet-list">
              <li>TGA&amp;DTA 측정</li>
              <li>Thermo Gravimetric Analysis, TGA</li>
              <li>Differential Thermal Analysis, DTA</li>
              <li>MFF-M Series</li>
              <li>MPS Series</li>
              <li>MPH Series</li>
            </ul>
          </div>
          <div className="ff-data-grid ff-data-grid--2">
            {TGA_DTA_CARDS.map((card) => (
              <article key={card.title} className="ff-data-card">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
          <div className="ff-data-grid ff-data-grid--3">
            {TGA_GRAPH_CARDS.map((card) => (
              <article key={card.title} className="ff-data-card ff-data-card--graph">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </Section>

        {/* 9. Seal structure */}
        <Section title="Ferrofluid Seal" subtitle="자성유체 Seal이란?">
          <div className="ff-split">
            <div className="ff-prose">
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
              <dl className="ff-structure-list">
                {SEAL_STRUCTURE_ITEMS.map((item) => (
                  <div key={item.term} className="ff-structure-list__row">
                    <dt>{item.term}</dt>
                    <dd>{item.description}</dd>
                  </div>
                ))}
              </dl>
              <ul className="ff-tag-list">
                <li>Ferrofluid Seal</li>
                <li>Feedthrough H25</li>
                <li>Ferrofluid</li>
                <li>Magnet</li>
                <li>Pole Piece</li>
                <li>Shaft</li>
                <li>Seal Body</li>
              </ul>
            </div>
            <ImagePlaceholder
              id="IMAGE_PLACEHOLDER_FERROFLUID_SEAL_STRUCTURE"
              description="네 번째 이미지 상단의 Ferrofluid Seal 설명 영역과 Feedthrough H25 단면 구조 이미지를 넣는다."
              src={ferrofluidSealImage?.imageUrl}
              aspectRatio="3 / 4"
              hideCaption={Boolean(ferrofluidSealImage?.imageUrl)}
              alt={ferrofluidSealImage?.title ?? 'Ferrofluid information image 6'}
            />
          </div>
        </Section>

        {/* 10. Applications */}
        <Section title="자성유체 사용 장비 및 분야">
          <div className="ff-prose">
            <p>
              자성유체 Seal은 유해가스, 진공, 분진, 고청정 환경이 동시에 요구되는 다양한
              산업 장비에 적용됩니다. 특히 회전축이 존재하면서도 내부 환경을 외부와
              안정적으로 분리해야 하는 장비에서 높은 효과를 발휘합니다.
            </p>
          </div>
          <div className="ff-app-grid">
            {APPLICATION_CARDS.map((card) => (
              <article key={card.title} className="ff-app-card">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
          <div className="ff-image-stack">
            <ImagePlaceholder
              id="IMAGE_PLACEHOLDER_APPLICATION_GRID_1"
              description="네 번째 이미지 하단의 적용 분야 이미지 그리드를 넣는다."
              src={applicationsImage1?.imageUrl}
              aspectRatio="16 / 6"
              hideCaption={Boolean(applicationsImage1?.imageUrl)}
              alt={applicationsImage1?.title ?? 'Ferrofluid information image 7'}
            />
            <ImagePlaceholder
              id="IMAGE_PLACEHOLDER_APPLICATION_GRID_2"
              description="다섯 번째 이미지 상단의 Room energy battery, Bio, Rechargeable battery, Aerospace/Defense 관련 이미지 그리드를 넣는다."
              src={applicationsImage2?.imageUrl}
              aspectRatio="16 / 6"
              hideCaption={Boolean(applicationsImage2?.imageUrl)}
              alt={applicationsImage2?.title ?? 'Ferrofluid information image 8'}
            />
          </div>
        </Section>

        {/* 11. Selection guide */}
        <Section title="어떤 모델을 선택해야 하나요?">
          <div className="ff-prose">
            <p>
              Ferrofluid Seal은 단순히 모델명만 보고 선택하는 제품이 아닙니다. 실제 적용
              환경의 가스 종류, 온도, 회전 속도, 축 직경, 압력 차, 요구 수명, 유지보수
              조건을 함께 검토해야 합니다.
            </p>
          </div>
          <ul className="ff-check-list">
            {SELECTION_CRITERIA.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="ff-highlight">
            적용 조건을 알려주시면 장비 환경에 맞는 Ferrofluid, Seal 구조, Feedthrough
            사양을 함께 검토해드립니다.
          </p>
        </Section>

        {/* 12. Company */}
        <Section title="공정 환경을 이해하는 자성유체 Seal 파트너">
          <div className="ff-prose">
            <p>
              자성유체 Seal은 단순 부품이 아니라 장비의 안정성, 수율, 작업자 안전에 직접
              연결되는 핵심 기능 부품입니다. 가스, 진공, 온도, 회전 조건을 함께 고려해야
              하므로 제품 선정 단계부터 기술 검토가 중요합니다.
            </p>
            <p>
              국내에서 생산되는 자성유체를 연구개발/제조하는 기업입니다.
            </p>
          </div>
          <CompanyTable rows={COMPANY_INFO_ROWS} />
          <p className="ff-note">
            회사 정보 표는 원본 이미지에서 글자가 작아 일부 값이 불명확하다. `?`가 있는
            항목은 추후 수정 가능하게 표시한다.
          </p>
        </Section>

        {/* 13. Bottom CTA */}
        <section className="ff-cta-banner">
          <div className="ff-cta-banner__inner">
            <h2>유해가스·분진 차단용 자성유체 Seal이 필요하신가요?</h2>
            <p>
              공정 조건과 장비 구조를 알려주시면 적합한 Ferrofluid Seal 사양을
              검토해드립니다. 부식성 가스, 진공 유지, 분진 차단, 회전축 누설 문제를 함께
              해결할 수 있는 맞춤형 솔루션을 제안합니다.
            </p>
            <div className="ff-cta-group">
              <a className="ff-btn ff-btn--primary" href="/#products">
                카탈로그 다운로드
              </a>
              <button
                type="button"
                className="ff-btn ff-btn--secondary"
                onClick={() => setIsQuoteOpen(true)}
              >
                제품문의
              </button>
            </div>
            <p className="ff-cta-banner__note">
              문의 시 사용 가스, 온도, 회전축 직경, 회전 속도, 장비 압력 조건을 함께
              전달해주시면 더 정확한 검토가 가능합니다.
            </p>
          </div>
        </section>
      </div>
    </article>
  )
}
