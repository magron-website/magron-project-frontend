import '@/assets/design/header.css'
import { homeImages } from '@/assets/images/homeImages'

export default function Header() {
  return (
    <header className="home-header">
      <div className="home-header__border" />
      <div className="home-header__bg" />
      <div className="home-header__inner">
        <div className="home-header__logo">
          <img
            className="home-header__logo-img"
            src={homeImages.logo}
            alt=""
          />
        </div>
        <div className="home-header__brand">
          <span className="home-header__brand-name">MAGRON</span>
        </div>
        <span className="home-header__brand-tagline">Ferrofluid</span>
        <nav className="home-header__nav">
          <span className="home-header__nav-item">제품정보</span>
          <span className="home-header__nav-item">회사소개</span>
          <span className="home-header__nav-item">카탈로그</span>
          <div className="home-header__nav-item home-header__nav-item--contact">
            <span>Contact us</span>
          </div>
        </nav>
        <div className="home-header__lang">
          <div className="home-header__lang-group">
            <img
              className="home-header__lang-flag"
              src={homeImages.flagKor}
              alt=""
            />
            <span className="home-header__lang-label">KOR</span>
          </div>
          <div className="home-header__lang-group">
            <img
              className="home-header__lang-flag"
              src={homeImages.flagEng}
              alt=""
            />
            <span className="home-header__lang-label">ENG</span>
          </div>
          <div className="home-header__lang-group">
            <img
              className="home-header__lang-flag home-header__lang-flag--chn"
              src={homeImages.flagChn}
              alt=""
            />
            <span className="home-header__lang-label home-header__lang-label--chn">CHN</span>
          </div>
        </div>
        <div className="home-header__shop">
          <span className="home-header__shop-text">쇼핑몰</span>
        </div>
      </div>
    </header>
  )
}
