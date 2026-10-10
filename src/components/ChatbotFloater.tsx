import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
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
 * - PC: 들어오는 즉시 화면을 덮지 않는 붙박이 창으로 열려 있다("항상 열려 있게"). 닫으면
 *   사이트 안에서 페이지를 옮기는 동안은 접혀 있고, 새로 들어오거나 새로고침하면 다시 열린다.
 * - 휴대폰: 화면을 덮는 자동 팝업은 쓰기 불편하고 구글이 검색 순위에서 감점한다(intrusive
 *   interstitial). 대신 아래쪽에 늘 보이는 "챗봇 문의 | 메일 문의" 바를 둔다.
 */
const MOBILE_QUERY = '(max-width: 767px)'

/** 프리렌더(Playwright)에서 열면 정적 HTML에 열린 창이 박힌다. */
function shouldAutoOpen(): boolean {
  return (
    typeof window !== 'undefined' &&
    !navigator.webdriver &&
    !window.matchMedia(MOBILE_QUERY).matches
  )
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

/*
 * PC 붙박이 창이 본문을 덮지 않게, 본문(.home__content) 오른쪽 바깥 여백에 맞춰 폭을 정한다.
 * 사이트 전체에 화면 폭별 zoom(index.css, 1920 화면에서 0.75)이 걸려 있어서 CSS 고정값
 * (top 112px·폭 380px)으로는 화면마다 어긋났다 — 1920 화면에서 본문을 70px 덮고 헤더 밑에 깔렸다.
 * getBoundingClientRect 는 확대·축소가 반영된 화면 픽셀이고, style 에 넣는 px 은 zoom 이
 * 곱해지므로 zoom 으로 나눠 넣는다.
 */
const DOCK_GAP = 16
const DOCK_MIN_WIDTH = 280 // 이보다 여백이 좁으면(노트북 등) 이 폭을 지키고 본문 끝을 조금 덮는다
const DOCK_MAX_WIDTH = 380
const DOCK_MAX_HEIGHT = 720

function useDockStyle(active: boolean, pathname: string): CSSProperties | undefined {
  const [style, setStyle] = useState<CSSProperties>()

  useLayoutEffect(() => {
    if (!active) return
    const update = () => {
      const zoom = parseFloat(getComputedStyle(document.documentElement).zoom) || 1
      const gap = DOCK_GAP * zoom
      const content = document.querySelector('.home__content')
      const header = document.querySelector('.home-header')
      // innerWidth 는 세로 스크롤바까지 포함해서 그만큼(약 15px) 본문을 덮었다
      const viewportWidth = document.documentElement.clientWidth
      const contentRight = content?.getBoundingClientRect().right ?? viewportWidth
      const free = viewportWidth - contentRight - gap * 2
      const width = Math.min(Math.max(free, DOCK_MIN_WIDTH * zoom), DOCK_MAX_WIDTH * zoom)
      const top = (header?.getBoundingClientRect().bottom ?? 0) + gap
      const height = Math.min(DOCK_MAX_HEIGHT * zoom, window.innerHeight - top - gap)
      setStyle({
        top: top / zoom,
        right: gap / zoom,
        width: width / zoom,
        maxWidth: 'none',
        height: height / zoom,
      })
    }
    update()
    window.addEventListener('resize', update)
    const content = document.querySelector('.home__content')
    const observer =
      typeof ResizeObserver !== 'undefined' && content ? new ResizeObserver(update) : null
    if (content) observer?.observe(content)
    return () => {
      window.removeEventListener('resize', update)
      observer?.disconnect()
    }
  }, [active, pathname])

  return active ? style : undefined
}

type FloaterMode = 'hero' | 'top'

export default function ChatbotFloater() {
  const { t } = useTranslation('chatbot')
  const { pathname } = useLocation()
  const floaterRef = useRef<HTMLDivElement>(null)
  const [mode, setMode] = useState<FloaterMode>('hero')
  const [heroCoords, setHeroCoords] = useState({ top: 0, right: HERO_MARGIN })
  const [isVisible, setIsVisible] = useState(false)
  // createRoot 로 그리므로(하이드레이션 없음) 첫 렌더부터 열어 두어도 어긋나지 않는다.
  const [isChatOpen, setIsChatOpen] = useState(shouldAutoOpen)
  const [openedAutomatically, setOpenedAutomatically] = useState(shouldAutoOpen)
  const isMobile = useIsMobile()
  const dockStyle = useDockStyle(!isMobile && isChatOpen, pathname)

  useEffect(() => {
    // chat_open 은 "사람이 직접 눌러 연 것"만 세야 의미가 있어서 이름을 나눈다.
    if (openedAutomatically) trackEvent('chat_auto_open')
    // 첫 진입 한 번만
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // PC 크기에서 자동으로 열린 뒤 창을 좁히면(태블릿 회전·창 줄이기·개발자도구 기기 모드)
  // 붙박이 창이 휴대폰용 전체 화면 창으로 바뀌어 화면을 덮는다. 사람이 연 게 아니면 닫는다.
  useEffect(() => {
    if (isMobile && isChatOpen && openedAutomatically) {
      setIsChatOpen(false)
      setOpenedAutomatically(false)
    }
  }, [isMobile, isChatOpen, openedAutomatically])

  const openChat = (source: 'floater' | 'mobile_bar') => {
    setOpenedAutomatically(false)
    setIsChatOpen(true)
    trackEvent('chat_open', { source })
  }

  const closeChat = () => setIsChatOpen(false)

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
            <span className="chat-mobile-bar__text">
              <span className="chat-mobile-bar__title">{t('mobileBarChat')}</span>
              <span className="chat-mobile-bar__sub">{t('mobileBarChatSub')}</span>
            </span>
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
        dockStyle={dockStyle}
        // 휴대폰에선 열자마자 자판을 띄우지 않는다 — 자판이 화면 절반을 덮어 인사말이 안 보였다.
        autoFocus={!openedAutomatically && !isMobile}
      />
    </>,
    document.body,
  )
}
