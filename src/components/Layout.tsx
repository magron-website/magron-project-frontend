import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { splitLangPath } from '@/i18n/routing'
import '@/assets/design/home.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ChatbotFloater from '@/components/ChatbotFloater'
import InstallPrompt from '@/components/InstallPrompt'
import { useSeoMeta } from '@/seo/useSeoMeta'

export default function Layout() {
  const { pathname, hash } = useLocation()
  const { i18n } = useTranslation()
  const { lang, path } = splitLangPath(pathname)
  const isHome = path === '/'

  /* 주소가 화면 언어의 기준이다. /en/tech 로 직접 들어오거나 뒤로가기를 눌러도
     주소만 보고 언어가 맞춰지므로, 저장된 값과 어긋날 일이 없다. */
  useEffect(() => {
    if (i18n.language !== lang) void i18n.changeLanguage(lang)
  }, [lang, i18n])

  useSeoMeta(path, lang)

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }

    window.scrollTo({ top: 0, left: 0 })
  }, [pathname, hash])

  return (
    <div className={`home${isHome ? '' : ' home--page'}`}>
      <Header />
      <div className="home__content">
        <Outlet />
      </div>
      <ChatbotFloater />
      <InstallPrompt />
      <Footer />
    </div>
  )
}
