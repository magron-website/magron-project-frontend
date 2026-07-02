import type { ReactNode } from 'react'
import '@/assets/design/home.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="home">
      <Header />
      <div className="home__content">{children}</div>
      <Footer />
    </div>
  )
}
