import { homeImages } from '@/assets/images/homeImages'
import HeroCarousel from '@/components/HeroCarousel'

function HomeHero() {
  return <HeroCarousel />
}

function HomeProducts() {
  return (
    <section className="home-products">
      <div className="home-products__title">원하시는 제품을 Click 하세요</div>
      <div className="home-products__cta" />
      <div className="home-products__cta-text">자성유체 - Ferrofluid</div>

      <div className="home-products__card home-products__card--ferrofluid" />
      <div className="home-products__card-text">
        <span className="home-products__card-line1">유해가스 & 분진 차단용 </span>
        <span className="home-products__card-highlight">자성유체</span>
        <span className="home-products__card-paren-open">(</span>
        <span className="home-products__card-ferrofluid">Ferrofluid</span>
        <span className="home-products__card-paren-close"> For Feedthrough)</span>
      </div>
      <div className="home-products__img-circle home-products__img-circle--sm">
        <img src={homeImages.ferrofluidSm} alt="" />
      </div>
      <div className="home-products__img-circle home-products__img-circle--lg">
        <img src={homeImages.ferrofluidLg} alt="" />
      </div>

      <div className="home-products__card home-products__card--feedthrough" />
      <span className="home-products__card-label home-products__label--feedthrough">Feedthrough</span>
      <div className="home-products__img-circle home-products__img-circle--feedthrough">
        <img src={homeImages.feedthrough} alt="" />
      </div>

      <div className="home-products__card home-products__card--waterproof" />
      <div className="home-products__card-label-group home-products__label-group--waterproof">
        <span className="home-products__card-label">방수용 자성유체</span>
        <span className="home-products__card-label">(낚시 Reel Mag oil)</span>
      </div>
      <div className="home-products__img--waterproof">
        <img src={homeImages.waterproof} alt="" />
      </div>

      <div className="home-products__card home-products__card--magnet" />
      <div className="home-products__card-label-group home-products__label-group--magnet">
        <span className="home-products__card-label">자석 Magnet</span>
        <span className="home-products__card-label">Nd, AlNiCo, Ferrite, SmCo, FeCrCo, etc</span>
      </div>
      <div className="home-products__img--magnet">
        <img src={homeImages.magnet} alt="" />
      </div>

      <div className="home-products__card home-products__card--education">
        <div className="home-products__card-bg">
          <img src={homeImages.educationKit} alt="" />
        </div>
        <div className="home-products__card-overlay" />
      </div>
      <span className="home-products__card-label home-products__label--education">교육용 자성유체 키트</span>
      <div className="home-products__img-circle home-products__img-circle--education-sm">
        <img src={homeImages.educationKit} alt="" />
      </div>

      <div className="home-products__card home-products__card--display" />
      <div className="home-products__card-label-group home-products__label-group--display">
        <span className="home-products__card-label">대형 자성유체 디스플레이</span>
      </div>
      <div className="home-products__img-circle home-products__img-circle--display-lg">
        <img src={homeImages.displayLg} alt="" />
      </div>
      <div className="home-products__img-circle home-products__img-circle--display-sm">
        <img src={homeImages.displaySm} alt="" />
      </div>
    </section>
  )
}

function HomeAbout() {
  return (
    <section className="home-about">
      <div className="home-about__bg-wrap">
        <img
          className="home-about__bg"
          src={homeImages.aboutBg}
          alt=""
        />
        <div className="home-about__title">회사소개</div>
        <div className="home-about__title-line" />
        <div className="home-about__box" />
        <div className="home-about__corner home-about__corner--tl-1" />
        <div className="home-about__corner home-about__corner--tl-2" />
        <div className="home-about__content">
          <p className="home-about__paragraph">
            2004년에 설립된 Magron은 자성유체와 관련 부품등을 전문적으로 제작, 공급합니다.
          </p>
          <p className="home-about__paragraph">
            주로 활성&비활성 가스와 분진을 차폐하는 용도와 센서용으로 사용되고 있습니다.
          </p>
          <p className="home-about__paragraph">
            당사의 제품은 반도체, 태양전지, 디스플레이 장비,전자제품, 자동차 등에 사용됩니다.
          </p>
          <p className="home-about__paragraph">
            CVD, PVD, 스퍼터링, 이온 주입기, 박막, 로봇, 단결정 성장 제조 장비, 항공우주, 원자력, 핵융합 등 다양한 분야에 활용 되고 있습니다.
          </p>
          <p className="home-about__paragraph">
            우리의 신속한 업무처리, 고 품질, 경쟁력 있는 가격은 당신을 만족 시킬 것 입니다.
          </p>
          <p className="home-about__paragraph">
            언제든지 문의 바랍니다. 전 세계 어디서든 화상 회의를 신청하십시오. 항상 준비되어 있습니다.
          </p>
          <p className="home-about__section-title">Main Product</p>
          <p className="home-about__list-item">- Ferrofluid</p>
          <p className="home-about__list-item">- Ferrofluid sealed vaccum feedthrough</p>
          <p className="home-about__list-item">
            - Ferrofluid sealed vacuum OLED deposition robot, etc.
          </p>
        </div>
        <div className="home-about__corner home-about__corner--br-1" />
        <div className="home-about__corner home-about__corner--br-2" />
      </div>
      <div className="home-about__divider" />
    </section>
  )
}

function HomeCatalog() {
  return (
    <section className="home-catalog">
      <div className="home-catalog__inner">
        <div className="home-catalog__title">카탈로그</div>
        <div className="home-catalog__title-line" />
        <div className="home-catalog__item">
          <div className="home-catalog__item-title">&lt; Ferrofluid For Gas&Dust Sealing &gt;</div>
          <img
            className="home-catalog__item-img"
            src={homeImages.catalogGasDust}
            alt=""
          />
          <div className="home-catalog__download">
            <span className="home-catalog__download-text">Download</span>
          </div>
        </div>
        <div className="home-catalog__item">
          <div className="home-catalog__item-title">&lt; Feedthrough &gt;</div>
          <img
            className="home-catalog__item-img"
            src={homeImages.catalogFeedthrough}
            alt=""
          />
          <div className="home-catalog__download">
            <span className="home-catalog__download-text">Download</span>
          </div>
        </div>
        <div className="home-catalog__item">
          <div className="home-catalog__item-title">&lt; Mag-oil &gt;</div>
          <img
            className="home-catalog__item-img"
            src={homeImages.catalogMagOil}
            alt=""
          />
          <div className="home-catalog__download">
            <span className="home-catalog__download-text">Download</span>
          </div>
        </div>
      </div>
      <div className="home-catalog__row2">
        <div className="home-catalog__item home-catalog__item--row2">
          <img
            className="home-catalog__item-img"
            src={homeImages.catalogDisplayKit}
            alt=""
          />
          <div className="home-catalog__download">
            <span className="home-catalog__download-text">Download</span>
          </div>
          <div className="home-catalog__item-title">&lt; For display kit &gt;</div>
        </div>
        <div className="home-catalog__item home-catalog__item--row2">
          <img
            className="home-catalog__item-img"
            src={homeImages.catalogWhatIsFerrofluid}
            alt=""
          />
          <div className="home-catalog__download">
            <span className="home-catalog__download-text">Download</span>
          </div>
          <div className="home-catalog__item-title">&lt; What is Ferrofluid? &gt;</div>
        </div>
        <div className="home-catalog__item home-catalog__item--row2">
          <img
            className="home-catalog__item-img"
            src={homeImages.catalogMagnet}
            alt=""
          />
          <div className="home-catalog__download">
            <span className="home-catalog__download-text">Download</span>
          </div>
          <div className="home-catalog__item-title">&lt; Magnet &gt;</div>
        </div>
      </div>
      <div className="home-catalog__keywords">
        ferrofluid, magnetic fluid, ferofluidic seal, ferro seal, magnetic fluid seal, ferro vaccum
        seal, 방수용 자성유체, waterprrof ferrofluid, Daiwa mag oil, Daiwa reel,
        <br />
        feedthrough
      </div>
    </section>
  )
}

function HomeContact() {
  return (
    <section className="home-contact">
      <div className="home-contact__bg-wrap">
        <img
          className="home-contact__bg"
          src={homeImages.contactBg}
          alt=""
        />
        <div className="home-contact__title-line" />
        <div className="home-contact__title">Contact Us</div>
        <div className="home-contact__box" />
        <div className="home-contact__address">
          경기도 안산시 상록구 해안로 705 경기테크노파크 3동 403호 (우편번호: 15588)
        </div>
        <span className="home-contact__label home-contact__label--tel">TEL</span>
        <div className="home-contact__tel">
          Domestic 031-500-4633
          <br />
          Export 031-500-4632
        </div>
        <span className="home-contact__label home-contact__label--mail">Mail</span>
        <div className="home-contact__mail">magron@magron.co.kr</div>
        <span className="home-contact__label home-contact__label--web">
          <span className="home-contact__label-muted">We</span>b
        </span>
        <img
          className="home-contact__web-icon"
          src={homeImages.contactFlagKor}
          alt=""
        />
        <img
          className="home-contact__web-icon"
          src={homeImages.contactFlagEng}
          alt=""
        />
        <img
          className="home-contact__web-icon"
          src={homeImages.contactFlagChn}
          alt=""
        />
        <div className="home-contact__web">www.ferrofluidmagron.co.kr (www.magron.co.kr)</div>
        <div className="home-contact__web">www.ferrofluidmagron.com (www.ferrozone.co.kr)</div>
        <div className="home-contact__web">www.ferrofluidmagron.cn</div>
        <span className="home-contact__label home-contact__label--fax">FAX</span>
        <div className="home-contact__fax">82-31-500-4631</div>
      </div>
    </section>
  )
}

function HomeQuote() {
  const requestItems = [
    { label: '유해가스 및 분진 차단용 자성 유체', small: false },
    { label: 'Feedthrough', small: true },
    { label: '낚시릴 수리용 맥오일', small: false },
    { label: '자석', small: false },
    { label: '대형 자성유체 디스플레이', small: false },
    { label: '자성유체 키트', small: false },
    { label: '기타', small: false },
  ]

  return (
    <section className="home-quote">
      <img
        className="home-quote__bg"
        src={homeImages.quoteBg}
        alt=""
      />
      <div className="home-quote__form-wrap">
        <div className="home-quote__form">
          <div className="home-quote__title">견적서 요청</div>

          <div className="home-quote__field-group home-quote__field-group--name">
            <div className="home-quote__label">
              이름<span className="home-quote__label-required">*</span>
            </div>
            <div className="home-quote__input home-quote__input--half" />
          </div>
          <div className="home-quote__field-group home-quote__field-group--surname">
            <div className="home-quote__label">성</div>
            <div className="home-quote__input home-quote__input--half" />
          </div>

          <div className="home-quote__field-group home-quote__field-group--company">
            <div className="home-quote__label">
              회사명<span className="home-quote__label-required">*</span>
            </div>
            <div className="home-quote__input home-quote__input--full" />
          </div>

          <div className="home-quote__field-group home-quote__field-group--location">
            <div className="home-quote__label">위치</div>
            <div className="home-quote__input home-quote__input--full" />
          </div>

          <div className="home-quote__field-group home-quote__field-group--email">
            <div className="home-quote__label">
              이메일<span className="home-quote__label-required">*</span>
            </div>
            <div className="home-quote__input home-quote__input--full" />
          </div>

          <div className="home-quote__field-group home-quote__field-group--items">
            <div className="home-quote__label">
              요청 항목<span className="home-quote__label-required">*</span>
            </div>
            <div className="home-quote__checkboxes">
              {requestItems.map((item) => (
                <div key={item.label} className="home-quote__checkbox-row">
                  <div className="home-quote__checkbox" />
                  <span
                    className={
                      item.small
                        ? 'home-quote__checkbox-label home-quote__checkbox-label--sm'
                        : 'home-quote__checkbox-label'
                    }
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="home-quote__field-group home-quote__field-group--other">
            <div className="home-quote__label">기타 (금액 및 용량)</div>
            <div className="home-quote__input home-quote__input--textarea" />
          </div>

          <p className="home-quote__privacy">
            제출 시, 당사의 [개인정보 처리방침]에 동의하며 요청하신 문의 사항
            <br />
            과 관련하여 연락을 취하는 것에 동의하는 것으로 간주됩니다.
          </p>

          <div className="home-quote__submit">
            <span className="home-quote__submit-text">제출</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeProducts />
      <HomeAbout />
      <HomeCatalog />
      <HomeContact />
      <HomeQuote />
    </>
  )
}
