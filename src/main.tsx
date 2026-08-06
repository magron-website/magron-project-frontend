import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/assets/design/index.css'
import '@/i18n'
import App from './App'
import { registerServiceWorker } from '@/pwa/registerServiceWorker'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

registerServiceWorker()
