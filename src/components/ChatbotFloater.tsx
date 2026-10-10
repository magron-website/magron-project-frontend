import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { createPortal } from 'react-dom'
import { useLocation } from 'react-router-dom'
import chatbotImage from '@/assets/images/chatbot.webp'
import ChatbotPanel from '@/components/ChatbotPanel'
import { trackEvent } from '@/lib/analytics'
import '@/assets/design/chatbot-floater.css'

const HERO_MARGIN = 24
const HEADER_OFFSET = 96

/*
 * 2026-10-10 요청: "챗봇이 작게 있지 말고 들어가면 대화창이 바로 열려 있게", "휴대폰에서도
 * 문의할 수 있는 게 바로 보이게".
 * - PC: 첫 방문 때 화면을 덮지 않는 붙박이 창으로 자동으로 연다. 닫으면 그 방문(탭) 동안은
 *   다시 안 연다 — 페이지를 옮길 때마다 다시 뜨면 성가시다.
 * - 휴대폰: 화면을 덮는 자동 팝업은 쓰기 불편하고 구글이 검색 순위에서 감점한다(intrusive
 *   interstitial). 대신 아래쪽에 늘 보이는 "챗봇 문의 | 메일 문의" 바를 둔다.
 */
const MOBILE_QUERY = '(max-width: 767px)'
const AUTO_OPEN_DELAY_MS = 1200
const AUTO_DISMISSED_KEY = 'magron-chat-auto-dismissed'

function readDismissed(): boolean {
  try {
    return sessionStorage.getItem(AUTO_DISMISSED_KEY) === '1'
  } catch {
    return false
  }
}

function writeDismissed(): void {
  try {
    sessionStorage.setItem(AUTO_DISMISSED_KEY, '1')
  } catch {
    // 사파리 개인정보 보호 모드 등에서는 저장이 막힌다. 그러면 새로고침 때 다시 열릴 뿐이다.
  }
}

function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches,
  )
  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY)
    const update = () => setIsMobile(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  return isMobile
}

type FloaterMode = 'hero' | 'top'

export default function ChatbotFloater() {
  const { t } = useTranslation('chatbot')
  const { pathname } = useLocation()
  const floaterRef = useRef<HTMLDivElement>(null)
  const [mode, setMode] = useState<FloaterMode>('hero')
  const [heroCoords, setHeroCoords] = useState({ top: 0, right: HERO_MARGIN })
  const [isVisible, setIsVisible] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [openedAutomatically, setOpenedAutomatically] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    // 프리렌더(Playwright)에서 열면 정적 HTML에 열린 창이 박힌다.
    if (navigator.webdriver || window.matchMedia(MOBILE_QUERY).matches || readDismissed()) return
    const timer = window.setTimeout(() => {
      setOpenedAutomatically(true)
      setIsChatOpen(true)
      // chat_open 은 "사람이 직접 눌러 연 것"만 세야 의미가 있어서 이름을 나눈다.
      trackEvent('chat_auto_open')
    }, AUTO_OPEN_DELAY_MS)
    return () => window.clearTimeout(timer)
  }, [])

  const openChat = (source: 'floater' | 'mobile_bar') => {
    setOpenedAutomatically(false)
    setIsChatOpen(true)
    trackEvent('chat_open', { source })
  }

  const closeChat = () => {
    setIsChatOpen(false)
    if (!isMobile) writeDismissed()
  }

  useLayoutEffect(() => {
    const updatePosition = () => {
      const hero = document.getElementById('visual')
      const productSection = document.querySelector('.product-scroll')
      const floater = floaterRef.current

      if (!floater) {
        setIsVisible(false)
        return
      }

      // Pages without the home hero (e.g. product info pages): pin to top-right.
      if (!hero) {
        setMode('top')
        setIsVisible(true)
        return
      }

      const heroRect = hero.getBoundingClientRect()
      const productRect = productSection?.getBoundingClientRect()
      const floaterHeight = floater.offsetHeight
      const anchorTop = heroRect.bottom - floaterHeight - HERO_MARGIN

      if (productRect && productRect.top <= HEADER_OFFSET) {
        setMode('top')
      } else {
        setMode('hero')
        setHeroCoords({
          top: Math.max(anchorTop, HERO_MARGIN),
          right: HERO_MARGIN,
        })
      }

      setIsVisible(true)
    }

    updatePosition()

    window.addEventListener('scroll', updatePosition, { passive: true })
    window.addEventListener('resize', updatePosition)

    const resizeObserver =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(updatePosition) : null

    const hero = document.getElementById('visual')
    const productSection = document.querySelector('.product-scroll')

    if (resizeObserver) {
      if (hero) resizeObserver.observe(hero)
      if (productSection) resizeObserver.observe(productSection)
    }

    return () => {
      window.removeEventListener('scroll', updatePosition)
      window.removeEventListener('resize', updatePosition)
      resizeObserver?.disconnect()
    }
  }, [pathname])

  return createPortal(
    <>
      <div
        ref={floaterRef}
        className={`chatbot-floater chatbot-floater--${mode}${isVisible && !isChatOpen && !isMobile ? '' : ' chatbot-floater--hidden'}`}
        style={mode === 'hero' ? { top: heroCoords.top, right: heroCoords.right } : undefined}
      >
        <div className="chatbot-floater__panel">
          <p className="chatbot-floater__text">
            {(t('floaterLines', { returnObjects: true }) as string[]).map((line, index) => (
              <span key={index}>
                {line}
                {index < 2 ? <br /> : null}
              </span>
            ))}
          </p>
        </div>
        <button
          type="button"
          className="chatbot-floater__button"
          aria-label={t('open')}
          onClick={() => openChat('floater')}
        >
          <img className="chatbot-floater__icon" src={chatbotImage} alt="" />
        </button>
      </div>
      {isMobile && !isChatOpen && (
        <nav className="chat-mobile-bar" aria-label={t('mobileBarLabel')}>
          <button
            type="button"
            className="chat-mobile-bar__btn chat-mobile-bar__btn--chat"
            onClick={() => openChat('mobile_bar')}
          >
            <img className="chat-mobile-bar__icon" src={chatbotImage} alt="" />
            {t('mobileBarChat')}
          </button>
          {/* mailto 클릭은 analytics.ts 의 전역 리스너가 contact_email 로 잡는다. */}
          <a className="chat-mobile-bar__btn chat-mobile-bar__btn--mail" href="mailto:magron@magron.co.kr">
            <svg viewBox="0 0 16 16" width="18" height="18" fill="none" aria-hidden="true">
              <rect x="1.5" y="3.5" width="13" height="9" rx="1" stroke="currentColor" strokeWidth="1.3" />
              <path d="M2 5.5 8 9.5l6-4" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
            </svg>
            {t('mobileBarMail')}
          </a>
        </nav>
      )}
      <ChatbotPanel
        isOpen={isChatOpen}
        onClose={closeChat}
        docked={!isMobile}
        autoFocus={!openedAutomatically}
      />
    </>,
    document.body,
  )
}
