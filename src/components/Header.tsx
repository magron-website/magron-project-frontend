import { useState } from 'react'
import '@/assets/design/header.css'
import { homeImages } from '@/assets/images/homeImages'

const NAV_ITEMS = ['회사소개', '제품정보', '고객서비스', 'ESG경영'] as const
const COMPANY_SUB_ITEMS = ['회사정보', '대표소개'] as const

export default function Header() {
  const [companyOpen, setCompanyOpen] = useState(false)

  return (
    <header className="home-header">
      <div className="home-header__border" />
      <div className="home-header__bg" />
      <div className="home-header__inner">
        <div className="home-header__left">
          <img
            className="home-header__logo-img"
            src={homeImages.logo}
            alt="MAGRON"
          />
          <div className="home-header__brand">
            <span className="home-header__brand-name">MAGRON</span>
            <span className="home-header__brand-tagline">Ferrofluid</span>
          </div>
        </div>

        <nav className="home-header__nav" aria-label="주요 메뉴">
          {NAV_ITEMS.map((item) =>
            item === '회사소개' ? (
              <div
                key={item}
                className="home-header__nav-dropdown"
                onMouseEnter={() => setCompanyOpen(true)}
                onMouseLeave={() => setCompanyOpen(false)}
              >
                <span
                  className={`home-header__nav-item home-header__nav-item--trigger${companyOpen ? ' home-header__nav-item--active' : ''}`}
                  aria-expanded={companyOpen}
                  aria-haspopup="true"
                >
                  {item}
                </span>
                {companyOpen && (
                  <div className="home-header__dropdown">
                    <ul className="home-header__dropdown-list">
                      {COMPANY_SUB_ITEMS.map((subItem) => (
                        <li key={subItem}>
                          <button type="button" className="home-header__dropdown-item">
                            {subItem}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <span key={item} className="home-header__nav-item">
                {item}
              </span>
            ),
          )}
        </nav>

        <div className="home-header__right">
          <div className="home-header__lang">
            <div className="home-header__lang-group">
              <img
                className="home-header__lang-flag"
                src={homeImages.flagKor}
                alt="한국어"
              />
              <span className="home-header__lang-label">KOR</span>
            </div>
            <div className="home-header__lang-group">
              <img
                className="home-header__lang-flag"
                src={homeImages.flagEng}
                alt="English"
              />
              <span className="home-header__lang-label">ENG</span>
            </div>
            <div className="home-header__lang-group">
              <img
                className="home-header__lang-flag home-header__lang-flag--chn"
                src={homeImages.flagChn}
                alt="中文"
              />
              <span className="home-header__lang-label home-header__lang-label--chn">CHN</span>
            </div>
          </div>
          <div className="home-header__shop">
            <span className="home-header__shop-text">쇼핑몰</span>
          </div>
        </div>
      </div>
    </header>
  )
}
