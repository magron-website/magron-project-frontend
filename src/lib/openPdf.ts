/**
 * 카탈로그·기술자료 PDF를 여는 방법 두 가지.
 *
 * 예전에는 책 표지를 누르면 책넘김(BookFlipViewer)이 떴는데, 두 페이지를
 * 나란히 띄우다 보니 글자가 작아 안 보인다는 피드백이 있었다. 지금은 PC·모바일·
 * 태블릿 모두 브라우저 기본 PDF 뷰어를 새 탭으로 연다 — 확대·검색·인쇄·저장이
 * 전부 브라우저 기능으로 되고, 모바일에서는 OS 기본 뷰어가 받아준다.
 */

/**
 * 새 탭으로 PDF를 연다.
 *
 * window.open을 쓰지 않는 이유: 세 번째 인자에 noopener를 주면 크롬은 성공해도
 * 반환값을 항상 null로 준다. 그걸 팝업 차단으로 오해해 현재 탭까지 PDF로
 * 넘겨버려서 PDF 창이 두 개가 됐다.
 */
export function openPdfInNewTab(pdfUrl: string): void {
  clickTempLink((link) => {
    link.href = pdfUrl
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
  })
}

/**
 * "Download" 버튼이 실제로 파일을 내려받게 만드는 URL.
 *
 * <a download>은 같은 출처에서만 동작한다. PDF는 Supabase Storage(다른 출처)에
 * 있어서 그동안 download 속성이 무시되고 새 탭에서 열리기만 했다.
 * Supabase Storage는 ?download=<파일명>을 붙이면
 * Content-Disposition: attachment 로 내려주므로 그때부터 진짜 다운로드가 된다.
 */
export function toDownloadUrl(fileUrl: string): string {
  if (!fileUrl) return fileUrl
  const fileName = decodeURIComponent(fileUrl.split('/').pop() ?? '') || 'MAGRON.pdf'
  const separator = fileUrl.includes('?') ? '&' : '?'
  return `${fileUrl}${separator}download=${encodeURIComponent(fileName)}`
}

function clickTempLink(configure: (link: HTMLAnchorElement) => void): void {
  const link = document.createElement('a')
  configure(link)
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  link.remove()
}
