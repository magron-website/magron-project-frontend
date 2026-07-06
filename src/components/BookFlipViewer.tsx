import { forwardRef, useEffect, useRef, useState, type CSSProperties } from 'react'
import HTMLFlipBook from 'react-pageflip'
import * as pdfjs from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import { ClipLoader } from 'react-spinners'
import '@/assets/design/book-flip-viewer.css'

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker

const pdfDocumentOptions = {
  cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
  cMapPacked: true,
  standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
}

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

const VIEWER_HEADER_HEIGHT = 60
const VIEWER_CONTENT_PADDING_Y = 64
const VIEWER_OUTER_PADDING = 32

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
      const panelWidth = Math.min(Math.floor(window.innerWidth * 0.98), 1500)
      const panelMaxHeight = Math.floor(window.innerHeight * 0.96)
      const maxBookHeight =
        panelMaxHeight - VIEWER_HEADER_HEIGHT - VIEWER_CONTENT_PADDING_Y - VIEWER_OUTER_PADDING
      const maxBookWidth = Math.floor((panelWidth - 64 - 48) / 2)

      let width = Math.min(580, maxBookWidth, Math.floor(window.innerWidth * 0.52))
      let height = Math.round(width * 1.414)

      if (height > maxBookHeight) {
        height = Math.max(508, maxBookHeight)
        width = Math.round(height / 1.414)
      }

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

async function renderPdfToImages(pdfUrl: string, pageWidth: number): Promise<string[]> {
  const pdf = await pdfjs.getDocument({ url: pdfUrl, ...pdfDocumentOptions }).promise
  const images: string[] = []

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber)
    const viewport = page.getViewport({ scale: 1 })
    const scale = pageWidth / viewport.width
    const scaledViewport = page.getViewport({ scale })

    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    if (!context) {
      throw new Error('Canvas is not supported')
    }

    canvas.width = Math.floor(scaledViewport.width)
    canvas.height = Math.floor(scaledViewport.height)

    const renderTask = page.render({
      canvasContext: context,
      viewport: scaledViewport,
      canvas,
    })

    await renderTask.promise
    images.push(canvas.toDataURL('image/jpeg', 0.92))
  }

  return images
}

export default function BookFlipViewer({ isOpen, title, pdfUrl, onClose }: BookFlipViewerProps) {
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
        setLoadError(`PDF를 불러오지 못했습니다. (${message})`)
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
        aria-label="닫기"
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
            닫기
          </button>
        </div>

        <div className="book-flip-viewer__content">
          {loadError ? (
            <p className="book-flip-viewer__message" role="alert">
              {loadError}
            </p>
          ) : isLoading || pageImages.length === 0 ? (
            <div className="book-flip-viewer__status" aria-busy="true">
              <ClipLoader color="#205694" size={48} aria-label="PDF 로딩 중" />
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
