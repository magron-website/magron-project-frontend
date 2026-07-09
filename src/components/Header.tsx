import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import '@/assets/design/header.css'
import { homeImages } from '@/assets/images/homeImages'
import { PRODUCT_PAGE_PATHS } from '@/pages/products/productRoutes'

const NAV_ITEMS = ['회사소개', '제품정보', '카탈로그', '기술정보'] as const
const COMPANY_SUB_ITEMS = ['회사정보', '대표소개'] as const
const PRODUCT_SUB_ITEMS = [
  { label: 'Ferrofluid', to: PRODUCT_PAGE_PATHS.ferrofluid },
  { label: 'Feedthrough', to: PRODUCT_PAGE_PATHS.feedthrough },
  { label: 'Reel Mag oil', to: PRODUCT_PAGE_PATHS.magoil },
  { label: 'Magnet', to: PRODUCT_PAGE_PATHS.magnet },
  { label: 'Education kit', to: PRODUCT_PAGE_PATHS.education },
  { label: 'Large Ferrofluid Display', to: PRODUCT_PAGE_PATHS.display },
] as const

const PRODUCT_PAGE_PATH_LIST = Object.values(PRODUCT_PAGE_PATHS)

export default function Header() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [companyOpen, setCompanyOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const isProductPage = PRODUCT_PAGE_PATH_LIST.includes(pathname)

  const goToTop = () => {
    setCompanyOpen(false)
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    navigate('/')
  }

  const goToSection = (sectionId: string) => {
    setProductsOpen(false)
    navigate(`/#${sectionId}`)
    if (pathname === '/') {
      requestAnimationFrame(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
      })
    }
  }

  return (
    <header className="home-header">
      <div className="home-header__border" />
      <div className="home-header__bg" />
      <div className="home-header__inner">
        <Link to="/" className="home-header__left" aria-label="홈으로 이동">
          <img
            className="home-header__logo-img"
            src={homeImages.logo}
            alt="MAGRON"
          />
          <div className="home-header__brand">
            <span className="home-header__brand-name">MAGRON</span>
            <span className="home-header__brand-tagline">Ferrofluid</span>
          </div>
        </Link>

        <nav className="home-header__nav" aria-label="주요 메뉴">
          <button
            type="button"
            className={`home-header__nav-item home-header__nav-item--link${pathname === '/' ? ' home-header__nav-item--active' : ''}`}
            onClick={goToTop}
          >
            Home
          </button>
          {NAV_ITEMS.map((item) =>
            item === '회사소개' ? (
              <div
                key={item}
                className="home-header__nav-dropdown"
                onMouseEnter={() => setCompanyOpen(true)}
                onMouseLeave={() => setCompanyOpen(false)}
              >
                <button
                  type="button"
                  className={`home-header__nav-item home-header__nav-item--trigger${companyOpen ? ' home-header__nav-item--active' : ''}`}
                  aria-expanded={companyOpen}
                  aria-haspopup="true"
                  onClick={goToTop}
                >
                  {item}
                </button>
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
            ) : item === '제품정보' ? (
              <div
                key={item}
                className="home-header__nav-dropdown"
                onMouseEnter={() => setProductsOpen(true)}
                onMouseLeave={() => setProductsOpen(false)}
              >
                <button
                  type="button"
                  className={`home-header__nav-item home-header__nav-item--trigger${productsOpen || isProductPage ? ' home-header__nav-item--active' : ''}`}
                  aria-expanded={productsOpen}
                  aria-haspopup="true"
                  onClick={() => goToSection('product-info')}
                >
                  {item}
                </button>
                {productsOpen && (
                  <div className="home-header__dropdown">
                    <ul className="home-header__dropdown-list home-header__dropdown-list--wide">
                      {PRODUCT_SUB_ITEMS.map((subItem) => (
                        <li key={subItem.label}>
                          <Link
                            to={subItem.to}
                            className="home-header__dropdown-item"
                            onClick={() => setProductsOpen(false)}
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : item === '카탈로그' ? (
              <button
                key={item}
                type="button"
                className="home-header__nav-item home-header__nav-item--link"
                onClick={() => goToSection('products')}
              >
                {item}
              </button>
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
          <a
            className="home-header__shop"
            href="https://www.ferrofluidshop.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="home-header__shop-text">쇼핑몰</span>
          </a>
        </div>
      </div>
    </header>
  )
}
