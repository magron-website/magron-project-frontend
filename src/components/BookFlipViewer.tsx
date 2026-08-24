import { forwardRef, useEffect, useRef, useState, type CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import HTMLFlipBook from 'react-pageflip'
import { ClipLoader } from 'react-spinners'
import { renderPdfToImages } from '@/lib/pdf'
import '@/assets/design/book-flip-viewer.css'

type BookFlipViewerProps = {
  isOpen: boolean
  title: string
  pdfUrl: string
  onClose: () => void
}

type FlipPageProps = {
  src: string
  width: number
  height: number
}

const FlipPage = forwardRef<HTMLDivElement, FlipPageProps>(({ src, width, height }, ref) => (
  <div className="book-flip-viewer__page" ref={ref} style={{ width, height }}>
    <img src={src} alt="" width={width} height={height} draggable={false} />
  </div>
))

FlipPage.displayName = 'FlipPage'

// CSS(book-flip-viewer.css)의 실제 여백과 반드시 같아야 한다.
// 헤더 48 / 안쪽 위아래 10+12=22 / 바깥 6+6=12 / 안쪽 좌우 16
const VIEWER_HEADER_HEIGHT = 48
const VIEWER_CONTENT_PADDING_Y = 22
const VIEWER_OUTER_PADDING = 12
const VIEWER_CONTENT_PADDING_X = 16

function useViewerLayout() {
  const [layout, setLayout] = useState({
    width: 520,
    height: 735,
    panelWidth: 1200,
    panelHeight: 919,
    contentHeight: 799,
  })

  useEffect(() => {
    const updateLayout = () => {
      // 창을 화면에 꽉 채우고, 그 안에서 A4(1:1.414) 두 장이 들어갈 수 있는
      // 최대 크기를 구한다. 예전 코드엔 페이지 폭 580px 상한이 있었지만
      // 실제로는 화면 높이가 먼저 막아서 상한이 걸리지도 않았다.
      // 이제 가로·세로 제약 중 작은 쪽에 맞춰 최대화한다.
      // index.css가 데스크톱에서 html에 zoom(0.75)을 걸기 때문에,
      // window.innerWidth/Height(장치 픽셀)를 그대로 px로 쓰면
      // 그 값이 다시 0.75배로 렌더돼서 창이 화면의 73%밖에 차지 않는다.
      // zoom으로 나눠 'CSS 픽셀' 기준으로 계산해야 실제로 꽉 찬다.
      const zoom = parseFloat(getComputedStyle(document.documentElement).zoom) || 1
      const viewportWidth = window.innerWidth / zoom
      const viewportHeight = window.innerHeight / zoom

      const panelWidth = Math.floor(viewportWidth * 0.98)
      const panelMaxHeight = Math.floor(viewportHeight * 0.96)
      const maxBookHeight =
        panelMaxHeight - VIEWER_HEADER_HEIGHT - VIEWER_CONTENT_PADDING_Y - VIEWER_OUTER_PADDING
      const maxBookWidth = Math.floor((panelWidth - VIEWER_CONTENT_PADDING_X * 2) / 2)

      let height = Math.min(maxBookHeight, Math.round(maxBookWidth * 1.414))
      let width = Math.round(height / 1.414)

      width = Math.max(360, width)
      height = Math.max(508, height)

      const contentHeight = height + VIEWER_CONTENT_PADDING_Y
      const panelHeight = VIEWER_HEADER_HEIGHT + contentHeight

      setLayout({
        width,
        height,
        panelWidth,
        panelHeight,
        contentHeight,
      })
    }

    updateLayout()
    window.addEventListener('resize', updateLayout)
    return () => window.removeEventListener('resize', updateLayout)
  }, [])

  return layout
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return String((error as { message: unknown }).message)
  }
  return String(error)
}

export default function BookFlipViewer({ isOpen, title, pdfUrl, onClose }: BookFlipViewerProps) {
  const { t } = useTranslation('viewer')
  const [pageImages, setPageImages] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)
  const { width, height, panelWidth, panelHeight, contentHeight } = useViewerLayout()
  const pageWidthRef = useRef(width)

  pageWidthRef.current = width

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen || !pdfUrl) {
      setPageImages([])
      setLoadError(null)
      setIsLoading(false)
      return
    }

    let cancelled = false

    async function loadPdf() {
      setIsLoading(true)
      setLoadError(null)
      setPageImages([])

      try {
        const images = await renderPdfToImages(pdfUrl, pageWidthRef.current)

        if (cancelled) return

        if (images.length === 0) {
          throw new Error('PDF has no pages')
        }

        setPageImages(images)
      } catch (error) {
        if (cancelled) return
        const message = getErrorMessage(error)
        console.error('Failed to load PDF:', error)
        setLoadError(t('pdfError', { message }))
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    void loadPdf()

    return () => {
      cancelled = true
    }
  }, [isOpen, pdfUrl])

  if (!isOpen) return null

  return (
    <div className="book-flip-viewer" role="dialog" aria-modal="true" aria-label={`${title} PDF`}>
      <button
        type="button"
        className="book-flip-viewer__backdrop"
        aria-label={t('close')}
        onClick={onClose}
      />
      <div
        className="book-flip-viewer__panel"
        style={
          {
            '--book-viewer-panel-width': `${panelWidth}px`,
            '--book-viewer-panel-height': `${panelHeight}px`,
            '--book-viewer-content-height': `${contentHeight}px`,
          } as CSSProperties
        }
      >
        <div className="book-flip-viewer__header">
          <h2 className="book-flip-viewer__title">{title}</h2>
          <button type="button" className="book-flip-viewer__close" onClick={onClose}>
            {t('close')}
          </button>
        </div>

        <div className="book-flip-viewer__content">
          {loadError ? (
            <p className="book-flip-viewer__message" role="alert">
              {loadError}
            </p>
          ) : isLoading || pageImages.length === 0 ? (
            <div className="book-flip-viewer__status" aria-busy="true">
              <ClipLoader color="#205694" size={48} aria-label={t('pdfLoading')} />
            </div>
          ) : (
            <HTMLFlipBook
              key={`${pdfUrl}-${pageImages.length}`}
              className="book-flip-viewer__flipbook"
              width={width}
              height={height}
              showCover
              maxShadowOpacity={0.5}
              mobileScrollSupport={false}
              drawShadow
              useMouseEvents
              flippingTime={800}
            >
              {pageImages.map((src, index) => (
                <FlipPage
                  key={`page-${index + 1}`}
                  src={src}
                  width={width}
                  height={height}
                />
              ))}
            </HTMLFlipBook>
          )}
        </div>
      </div>
    </div>
  )
}
