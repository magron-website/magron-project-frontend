import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/assets/design/index.css'
import '@/i18n'
import App from './App'
import { registerServiceWorker } from '@/pwa/registerServiceWorker'
import { initAnalytics } from '@/lib/analytics'
import { startPageFit } from '@/lib/pageFit'

initAnalytics()
startPageFit()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

registerServiceWorker()
