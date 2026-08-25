import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'
import Company from '@/pages/Company'
import Tech from '@/pages/Tech'
import { LANG_PREFIX } from '@/i18n/routing'
import {
  Display,
  Education,
  Feedthrough,
  Ferrofluid,
  Magoil,
  Magnet,
  PiezoInk,
} from '@/pages/products'

/**
 * GitHub Pages serves this project under /<repo>/, so the router has to strip
 * that prefix before matching. Vite injects BASE_URL from `base` in
 * vite.config.ts, so switching to the root domain needs no change here.
 */
const BASENAME = import.meta.env.BASE_URL.replace(/\/$/, '')

/** 언어와 무관한 화면 목록. 세 언어가 똑같은 화면을 공유한다. */
function pageRoutes() {
  return (
    <>
      <Route index element={<Home />} />
      <Route path="company" element={<Company />} />
      <Route path="tech" element={<Tech />} />
      <Route path="ferrofluid" element={<Ferrofluid />} />
      <Route path="feedthrough" element={<Feedthrough />} />
      <Route path="magoil" element={<Magoil />} />
      <Route path="magnet" element={<Magnet />} />
      <Route path="education" element={<Education />} />
      <Route path="piezo-ink" element={<PiezoInk />} />
      <Route path="display" element={<Display />} />
    </>
  )
}

function App() {
  return (
    <BrowserRouter basename={BASENAME}>
      <Routes>
        {/* 한국어는 접두어 없이 기존 주소 그대로 (/tech …) — 쌓아둔 색인을 유지한다.
            영어·중국어는 /en, /zh 아래에 같은 화면을 그대로 붙인다.
            화면 언어는 Layout이 주소를 보고 맞춘다. */}
        <Route element={<Layout />}>
          {pageRoutes()}
          <Route path={LANG_PREFIX.en.slice(1)}>{pageRoutes()}</Route>
          <Route path={LANG_PREFIX.zh.slice(1)}>{pageRoutes()}</Route>
          {/* GitHub Pages serves docs/404.html for any unmatched deep link, so
              the app boots with a path no route claims. Without this the shell
              would render blank; send those visitors to the home page. */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
