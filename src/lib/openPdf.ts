/**
 * 책 표지를 눌렀을 때 PDF를 어떻게 열지 결정한다.
 *
 * 데스크톱은 브라우저 기본 PDF 뷰어를 새 탭으로 연다 — 책넘김(BookFlipViewer)은
 * 두 페이지를 나란히 띄우다 보니 글자가 작아 읽기 어렵다는 피드백이 있었다.
 * 새 탭이면 확대·검색·인쇄·저장이 전부 브라우저 기능으로 된다.
 *
 * 모바일·태블릿(1024px 이하)은 기존 책넘김 뷰어를 그대로 쓴다. 화면 폭이 좁아
 * 어차피 한 페이지씩 보이고, 넘기는 동작이 터치에 더 맞는다.
 * 기준값은 index.css의 데스크톱 배율 미디어쿼리와 같은 1025px.
 */
const DESKTOP_QUERY = '(min-width: 1025px)'

export function isDesktopViewport(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia(DESKTOP_QUERY).matches
}

/** 새 탭으로 PDF를 연다. 팝업이 막히면 현재 탭으로 이동해서 최소한 열리게 한다. */
export function openPdfInNewTab(pdfUrl: string): void {
  const opened = window.open(pdfUrl, '_blank', 'noopener,noreferrer')
  if (!opened) window.location.href = pdfUrl
}
