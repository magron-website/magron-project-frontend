import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'
import Company from '@/pages/Company'
import Tech from '@/pages/Tech'
import {
  Display,
  Education,
  Feedthrough,
  Ferrofluid,
  Magoil,
  Magnet,
} from '@/pages/products'

/**
 * GitHub Pages serves this project under /<repo>/, so the router has to strip
 * that prefix before matching. Vite injects BASE_URL from `base` in
 * vite.config.ts, so switching to the root domain needs no change here.
 */
const BASENAME = import.meta.env.BASE_URL.replace(/\/$/, '')

function App() {
  return (
    <BrowserRouter basename={BASENAME}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/company" element={<Company />} />
          <Route path="/tech" element={<Tech />} />
          <Route path="/ferrofluid" element={<Ferrofluid />} />
          <Route path="/feedthrough" element={<Feedthrough />} />
          <Route path="/magoil" element={<Magoil />} />
          <Route path="/magnet" element={<Magnet />} />
          <Route path="/education" element={<Education />} />
          <Route path="/display" element={<Display />} />
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
