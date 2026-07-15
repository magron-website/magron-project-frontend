import { BrowserRouter, Route, Routes } from 'react-router-dom'
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

function App() {
  return (
    <BrowserRouter>
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
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
