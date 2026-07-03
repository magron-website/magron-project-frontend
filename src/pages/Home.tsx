import { homeImages } from '@/assets/images/homeImages'
import HeroCarousel from '@/components/HeroCarousel'
import ProductSection from '@/components/ProductSection'

function HomeHero() {
  return <HeroCarousel />
}

function HomeProducts() {
  return <ProductSection />
}

function HomeCatalog() {
  return (
    <section id="products" className="home-catalog">
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
    <section id="contact" className="home-contact">
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
      <HomeCatalog />
      <HomeContact />
      <HomeQuote />
    </>
  )
}
