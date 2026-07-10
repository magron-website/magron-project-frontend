import '@/assets/design/company.css'

const COMPANY_PARAGRAPHS = [
  <>
    <strong>2004년</strong>에 설립된 <strong>Magron</strong>은 자성유체와 관련 부품 등을
    전문적으로 제작·공급합니다.
  </>,
  <>주로 활성 &amp; 비활성 가스와 분진을 차폐하는 용도와 센서용으로 사용되고 있습니다.</>,
  <>당사의 제품은 반도체, 태양전지, 디스플레이 장비, 전자제품, 자동차 등에 사용됩니다.</>,
  <>
    <strong>CVD, PVD</strong>, 스퍼터링, 이온 주입기, 박막, 로봇, 단결정 성장 제조 장비,
    항공우주, 원자력, 핵융합 등 다양한 분야에 활용되고 있습니다.
  </>,
  <>우리의 신속한 업무처리, 고품질, 경쟁력 있는 가격은 당신을 만족시킬 것입니다.</>,
  <>
    언제든지 문의 바랍니다. 전 세계 어디서든 화상 회의를 신청하십시오. 항상 준비되어
    있습니다.
  </>,
]

const MAIN_PRODUCTS = [
  'Ferrofluid',
  'Ferrofluid sealed vacuum feedthrough',
  'Ferrofluid sealed vacuum OLED deposition robot, etc.',
]

export default function Company() {
  return (
    <article className="cp-page">
      <div className="cp-hero">
        <span className="cp-hero__glow cp-hero__glow--one" aria-hidden="true" />
        <span className="cp-hero__glow cp-hero__glow--two" aria-hidden="true" />

        <div className="cp-hero__inner">
          <header className="cp-heading">
            <p className="cp-heading__eyebrow">Company</p>
            <h1 className="cp-heading__title">회사소개</h1>
            <span className="cp-heading__rule" aria-hidden="true" />
          </header>

          <section className="cp-panel">
            <span className="cp-panel__corner cp-panel__corner--tl" aria-hidden="true" />
            <span className="cp-panel__corner cp-panel__corner--br" aria-hidden="true" />

            <div className="cp-panel__body">
              {COMPANY_PARAGRAPHS.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="cp-product">
              <h2 className="cp-product__title">Main Product</h2>
              <ul className="cp-product__list">
                {MAIN_PRODUCTS.map((product) => (
                  <li key={product}>{product}</li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </article>
  )
}
