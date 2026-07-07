import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import '@/assets/design/home.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Layout() {
  const { pathname, hash } = useLocation()
  const isHome = pathname === '/'

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
      <Footer />
    </div>
  )
}
