/**
 * GA4 측정 (2026-10-03 신설).
 *
 * 그동안 사이트에 측정 태그가 하나도 없어서 방문·문의·카탈로그 다운로드가 전혀 잡히지
 * 않았고, Google Ads 전환도 "Misconfigured"로 떠 있었다. GA4 하나만 심고, Ads 전환은
 * GA4의 주요 이벤트를 Ads로 가져오는 방식으로 잇는다 — 태그를 두 벌 관리하지 않기 위해.
 *
 * 측정 ID는 비밀값이 아니라(페이지 소스에 그대로 보인다) .env 가 아니라 여기에 둔다.
 * .env 는 gitignore 라서 다른 PC에서 빌드하면 빠지고, 그러면 아무 경고 없이 측정이 끊긴다.
 */
// magron@magron.co.kr 계정 "MAGRON" > 속성 "MAGRON (magron.kr)"(557071092) > 웹 스트림 15979635424.
// 2026-10-03 새로 만든 것. magron@naver.com 쪽 옛 속성(278238749, 구 도메인용)은 쓰지 않는다.
const GA4_ID = 'G-YGJ1KPQ2JM'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

/**
 * 측정하지 않는 환경:
 * - 프리렌더(Playwright)는 navigator.webdriver 가 true 다. 여기서 gtag를 심으면
 *   빌드할 때마다 가짜 방문 30건이 찍히고, 정적 HTML에 스크립트 태그까지 박힌다.
 * - 로컬 개발 서버.
 * - 헤드리스 크롬 봇. 2026-10-10 GA4 실측(9/12~10/9)에서 Direct 202세션 중 137세션이
 *   화면 800x600(헤드리스 크롬 기본값)·참여 0·이벤트 3개(page_view/session_start/first_visit)
 *   ·도시 (not set)/Council Bluffs/Singapore 였다. webdriver 를 숨기고 들어오는 봇이라
 *   위 조건에 안 걸린다. 지금 800x600 모니터를 쓰는 실제 방문자는 사실상 없다.
 */
function isHeadlessBot(): boolean {
  if (/HeadlessChrome/i.test(navigator.userAgent)) return true
  return window.screen.width === 800 && window.screen.height === 600
}

function shouldTrack(): boolean {
  if (!GA4_ID || typeof window === 'undefined') return false
  if (navigator.webdriver || isHeadlessBot()) return false
  const host = window.location.hostname
  return host !== 'localhost' && host !== '127.0.0.1'
}

let initialized = false

export function initAnalytics(): void {
  if (initialized || !shouldTrack()) return
  initialized = true

  window.dataLayer = window.dataLayer || []
  // gtag.js 는 arguments 객체 자체를 dataLayer 에 넣어야 인식한다(배열로 바꾸면 무시됨).
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments)
  }
  window.gtag('js', new Date())
  // 화면 전환(SPA)마다 trackPageView 가 직접 보낸다. 자동 page_view 를 켜 두면
  // 첫 화면이 두 번 잡힌다.
  window.gtag('config', GA4_ID, { send_page_view: false })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`
  document.head.appendChild(script)

  // 메일 주소 클릭은 푸터·제품 페이지 여러 곳에 흩어져 있어 한 군데서 받는다.
  document.addEventListener(
    'click',
    (event) => {
      const link = (event.target as Element | null)?.closest?.('a[href^="mailto:"]')
      if (link) trackEvent('contact_email', { link_url: link.getAttribute('href') })
    },
    { capture: true },
  )
}

/** title 은 useSeoMeta 가 바꾼 뒤의 값을 읽어야 하므로 Layout 에서 그 다음에 부른다. */
let lastPageLocation = ''

export function trackPageView(): void {
  if (!initialized) return
  // 개발 모드 StrictMode 는 effect 를 두 번 돌린다. 같은 주소 연속 두 번은 한 번으로 친다.
  if (window.location.href === lastPageLocation) return
  lastPageLocation = window.location.href
  window.gtag?.('event', 'page_view', {
    page_location: window.location.href,
    page_title: document.title,
  })
}

export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  if (!initialized) return
  window.gtag?.('event', name, params)
}
