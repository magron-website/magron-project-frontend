import { useEffect, useState } from 'react'

/** Rendered wide enough to stay sharp on the ~230px cards at 2x pixel density. */
const THUMBNAIL_WIDTH = 460

const covers = new Map<string, string>()
const inflight = new Map<string, Promise<string>>()

/**
 * Covers render one at a time: each one spins up its own pdf.js worker, and a
 * grid of them starting together stalls the main thread on first scroll.
 */
let queue: Promise<unknown> = Promise.resolve()

function enqueue<T>(task: () => Promise<T>): Promise<T> {
  const run = queue.then(task, task)
  queue = run.catch(() => undefined)
  return run
}

function loadCover(pdfUrl: string): Promise<string> {
  const pending = inflight.get(pdfUrl)
  if (pending) return pending

  /* pdf.js는 압축 전 1.5MB짜리 라이브러리다. 기술자료 표지는 대부분 번들에 담긴
     캡처본으로 해결되고, 여기까지 오는 건 캡처가 없는 새 문서뿐이다. 정적 import면
     그 소수 경우 때문에 모든 방문자가 첫 화면에서 pdf.js를 내려받게 되므로,
     실제로 렌더가 필요한 순간에만 동적으로 불러온다. */
  const promise = enqueue(async () => {
    const { renderPdfCoverToImage } = await import('@/lib/pdf')
    return renderPdfCoverToImage(pdfUrl, THUMBNAIL_WIDTH)
  })
    .then((dataUrl) => {
      covers.set(pdfUrl, dataUrl)
      return dataUrl
    })
    .finally(() => {
      inflight.delete(pdfUrl)
    })

  inflight.set(pdfUrl, promise)
  return promise
}

/**
 * Uses a document's own first page as its cover image, so a newly uploaded PDF
 * gets a thumbnail with no separate artwork to produce or register.
 *
 * `enabled` defers the work until the grid scrolls into view; results are cached
 * per URL for the session, so the home section and /tech share one render.
 */
export function usePdfThumbnail(pdfUrl: string, enabled: boolean) {
  const [imageUrl, setImageUrl] = useState<string | null>(() => covers.get(pdfUrl) ?? null)
  const [hasFailed, setHasFailed] = useState(false)

  useEffect(() => {
    if (!pdfUrl) {
      setImageUrl(null)
      return
    }

    const cached = covers.get(pdfUrl)
    if (cached) {
      setImageUrl(cached)
      setHasFailed(false)
      return
    }

    setImageUrl(null)

    if (!enabled) return

    let cancelled = false
    setHasFailed(false)

    loadCover(pdfUrl)
      .then((dataUrl) => {
        if (!cancelled) setImageUrl(dataUrl)
      })
      .catch((error) => {
        console.error(`Failed to render the cover for ${pdfUrl}:`, error)
        if (!cancelled) setHasFailed(true)
      })

    return () => {
      cancelled = true
    }
  }, [pdfUrl, enabled])

  return { imageUrl, hasFailed }
}
