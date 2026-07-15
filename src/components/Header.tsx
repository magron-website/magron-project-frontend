import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import '@/assets/design/header.css'
import { homeImages } from '@/assets/images/homeImages'
import { PRODUCT_PAGE_PATHS } from '@/pages/products/productRoutes'
import { LANGUAGES, type Language } from '@/i18n'

const NAV_KEYS = ['company', 'products', 'catalog', 'tech'] as const

const PRODUCT_SUB_ITEMS = [
  { key: 'ferrofluid', to: PRODUCT_PAGE_PATHS.ferrofluid },
  { key: 'feedthrough', to: PRODUCT_PAGE_PATHS.feedthrough },
  { key: 'magoil', to: PRODUCT_PAGE_PATHS.magoil },
  { key: 'magnet', to: PRODUCT_PAGE_PATHS.magnet },
  { key: 'education', to: PRODUCT_PAGE_PATHS.education },
  { key: 'display', to: PRODUCT_PAGE_PATHS.display },
] as const

const LANG_META: Record<Language, { flag: string; label: string; alt: string; chn?: boolean }> = {
  ko: { flag: homeImages.flagKor, label: 'KOR', alt: '한국어' },
  en: { flag: homeImages.flagEng, label: 'ENG', alt: 'English' },
  zh: { flag: homeImages.flagChn, label: 'CHN', alt: '中文', chn: true },
}

const PRODUCT_PAGE_PATH_LIST = Object.values(PRODUCT_PAGE_PATHS)

export default function Header() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { t, i18n } = useTranslation('header')
  const [companyOpen, setCompanyOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const isProductPage = PRODUCT_PAGE_PATH_LIST.includes(pathname)
  const currentLang = i18n.language as Language

  const goToTop = () => {
    setCompanyOpen(false)
    setMobileOpen(false)
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    navigate('/')
  }

  const goToCompany = () => {
    setCompanyOpen(false)
    setMobileOpen(false)
    navigate('/company')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goToSection = (sectionId: string) => {
    setProductsOpen(false)
    setMobileOpen(false)
    navigate(`/#${sectionId}`)
    if (pathname === '/') {
      requestAnimationFrame(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
      })
    }
  }

  const changeLanguage = (lang: Language) => {
    void i18n.changeLanguage(lang)
  }

  return (
    <header className="home-header">
      <div className="home-header__border" />
      <div className="home-header__bg" />
      <div className="home-header__inner">
        <Link to="/" className="home-header__left" aria-label={t('ariaHome')}>
          <img className="home-header__logo-img" src={homeImages.logo} alt="MAGRON" />
          <div className="home-header__brand">
            <span className="home-header__brand-name">MAGRON</span>
            <span className="home-header__brand-tagline">{t('brandTagline')}</span>
          </div>
        </Link>

        <nav className="home-header__nav" aria-label={t('nav.products')}>
          <button
            type="button"
            className={`home-header__nav-item home-header__nav-item--link${pathname === '/' ? ' home-header__nav-item--active' : ''}`}
            onClick={goToTop}
          >
            {t('nav.home')}
          </button>
          {NAV_KEYS.map((key) =>
            key === 'company' ? (
              <div
                key={key}
                className="home-header__nav-dropdown"
                onMouseEnter={() => setCompanyOpen(true)}
                onMouseLeave={() => setCompanyOpen(false)}
              >
                <button
                  type="button"
                  className={`home-header__nav-item home-header__nav-item--trigger${companyOpen || pathname === '/company' ? ' home-header__nav-item--active' : ''}`}
                  aria-expanded={companyOpen}
                  aria-haspopup="true"
                  onClick={goToCompany}
                >
                  {t('nav.company')}
                </button>
                {companyOpen && (
                  <div className="home-header__dropdown">
                    <ul className="home-header__dropdown-list">
                      <li>
                        <button
                          type="button"
                          className="home-header__dropdown-item"
                          onClick={goToCompany}
                        >
                          {t('companyMenu.info')}
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : key === 'products' ? (
              <div
                key={key}
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
                  {t('nav.products')}
                </button>
                {productsOpen && (
                  <div className="home-header__dropdown">
                    <ul className="home-header__dropdown-list home-header__dropdown-list--wide">
                      {PRODUCT_SUB_ITEMS.map((subItem) => (
                        <li key={subItem.key}>
                          <Link
                            to={subItem.to}
                            className="home-header__dropdown-item"
                            onClick={() => setProductsOpen(false)}
                          >
                            {t(`productMenu.${subItem.key}`)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : key === 'catalog' ? (
              <button
                key={key}
                type="button"
                className="home-header__nav-item home-header__nav-item--link"
                onClick={() => goToSection('products')}
              >
                {t('nav.catalog')}
              </button>
            ) : (
              <Link
                key={key}
                to="/tech"
                className={`home-header__nav-item home-header__nav-item--link${pathname === '/tech' ? ' home-header__nav-item--active' : ''}`}
              >
                {t('nav.tech')}
              </Link>
            ),
          )}
        </nav>

        <div className="home-header__right">
          <div className="home-header__lang">
            {LANGUAGES.map((lang) => {
              const meta = LANG_META[lang]
              return (
                <button
                  key={lang}
                  type="button"
                  className={`home-header__lang-group${currentLang === lang ? ' home-header__lang-group--active' : ''}`}
                  onClick={() => changeLanguage(lang)}
                  aria-pressed={currentLang === lang}
                >
                  <img
                    className={`home-header__lang-flag${meta.chn ? ' home-header__lang-flag--chn' : ''}`}
                    src={meta.flag}
                    alt={meta.alt}
                  />
                  <span
                    className={`home-header__lang-label${meta.chn ? ' home-header__lang-label--chn' : ''}`}
                  >
                    {meta.label}
                  </span>
                </button>
              )
            })}
          </div>
          <a
            className="home-header__shop"
            href="https://www.ferrofluidshop.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="home-header__shop-text">{t('shop')}</span>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className={`home-header__burger${mobileOpen ? ' home-header__burger--open' : ''}`}
          aria-label={mobileOpen ? t('nav.home') : t('nav.products')}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <button
            type="button"
            className="home-header__mobile-overlay"
            aria-label={t('nav.home')}
            onClick={() => setMobileOpen(false)}
          />
          <nav className="home-header__mobile" aria-label={t('nav.products')}>
            <button type="button" className="home-header__mobile-item" onClick={goToTop}>
              {t('nav.home')}
            </button>
            <button type="button" className="home-header__mobile-item" onClick={goToCompany}>
              {t('nav.company')}
            </button>
            <button
              type="button"
              className="home-header__mobile-item"
              onClick={() => goToSection('product-info')}
            >
              {t('nav.products')}
            </button>
            <div className="home-header__mobile-sub">
              {PRODUCT_SUB_ITEMS.map((subItem) => (
                <Link
                  key={subItem.key}
                  to={subItem.to}
                  className="home-header__mobile-subitem"
                  onClick={() => setMobileOpen(false)}
                >
                  {t(`productMenu.${subItem.key}`)}
                </Link>
              ))}
            </div>
            <button
              type="button"
              className="home-header__mobile-item"
              onClick={() => goToSection('products')}
            >
              {t('nav.catalog')}
            </button>
            <Link
              to="/tech"
              className="home-header__mobile-item"
              onClick={() => setMobileOpen(false)}
            >
              {t('nav.tech')}
            </Link>

            <div className="home-header__mobile-divider" />

            <div className="home-header__mobile-lang">
              {LANGUAGES.map((lang) => {
                const meta = LANG_META[lang]
                return (
                  <button
                    key={lang}
                    type="button"
                    className={`home-header__lang-group${currentLang === lang ? ' home-header__lang-group--active' : ''}`}
                    onClick={() => changeLanguage(lang)}
                    aria-pressed={currentLang === lang}
                  >
                    <img
                      className={`home-header__lang-flag${meta.chn ? ' home-header__lang-flag--chn' : ''}`}
                      src={meta.flag}
                      alt={meta.alt}
                    />
                    <span
                      className={`home-header__lang-label${meta.chn ? ' home-header__lang-label--chn' : ''}`}
                    >
                      {meta.label}
                    </span>
                  </button>
                )
              })}
            </div>

            <a
              className="home-header__mobile-shop"
              href="https://www.ferrofluidshop.com/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
            >
              {t('shop')}
            </a>
          </nav>
        </>
      )}
    </header>
  )
}
