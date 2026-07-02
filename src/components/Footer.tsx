import '@/assets/design/footer.css'
import { homeImages } from '@/assets/images/homeImages'

export default function Footer() {
  return (
    <footer className="home-footer">
      <div className="home-footer__inner">
        <div className="home-footer__company">
          <div className="home-footer__company-name">㈜마그론 / MAGRON</div>
          <div className="home-footer__company-detail">
            (15588) 경기도 안산시 상록구 해안로 705 경기테크노파크 3동 403호
            <br />
            copyright ⓒ 2024 MAGRON
            <br />
            All Rights Reserved.
          </div>
        </div>
        <div className="home-footer__divider">
          <div className="home-footer__divider-bar" />
        </div>
        <div className="home-footer__contact">
          TEL : (Domestic) 031-500-4633
          <br />
          {'         '}(Express) +82) 31-500-4632
          <br />
          FAX : 82-31-500-4631
        </div>
        <div className="home-footer__email-wrap">
          <div className="home-footer__email-icon">
            <div className="home-footer__email-icon-bar1" />
            <div className="home-footer__email-icon-bar2" />
          </div>
          <span className="home-footer__email">magron@magron.co.kr</span>
        </div>
        <div className="home-footer__social">
          <img
            className="home-footer__social-icon"
            src={homeImages.socialLinkedIn}
            alt=""
          />
          <img
            className="home-footer__social-icon"
            src={homeImages.socialInstagram}
            alt=""
          />
          <img
            className="home-footer__social-icon"
            src={homeImages.socialYoutube}
            alt=""
          />
        </div>
      </div>
    </footer>
  )
}
