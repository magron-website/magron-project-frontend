/**
 * 본문이 실제로 쓸 수 있는 화면 폭(px)을 html 의 --avail 로 알려 준다(2026-11-14).
 *
 * 제품·문서 페이지 배율(zoom)을 고정값 대신 이 폭에 맞춰 정한다(index.css 의 clamp 계산).
 * 사용자: "너무 작다, 좌우 여백 줄여서 크게" — 챗봇이 오른쪽 1/3 을 차지하면 본문 폭이 줄어
 * 예전엔 배율을 일괄로 낮췄는데, 큰 화면에선 글자가 11px 대로 작아지고 양옆이 비었다.
 *
 * --avail = (화면 폭 − 챗봇 폭 − 양옆 여백) 화면 px. 챗봇 폭은 ChatbotFloater 가 html.chat-split 에
 * 붙이는 규칙(화면의 1/3)과 같게 계산한다.
 */
const GUTTER_CSS_PX = 40

export function startPageFit() {
  if (typeof window === 'undefined') return
  const root = document.documentElement

  const update = () => {
    const zoom = parseFloat(getComputedStyle(root).zoom) || 1
    const viewport = root.clientWidth
    const dock = root.classList.contains('chat-split') ? Math.round(viewport / 3) : 0
    const avail = Math.max(320, viewport - dock - 2 * GUTTER_CSS_PX * zoom)
    root.style.setProperty('--avail', String(Math.round(avail)))
  }

  update()
  window.addEventListener('resize', update)
  // 챗봇을 열고 닫을 때(html 클래스 변화)도 다시 잰다
  new MutationObserver(update).observe(root, { attributes: true, attributeFilter: ['class'] })
}
