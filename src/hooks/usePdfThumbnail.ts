import { useEffect, useState } from 'react'
import { renderPdfCoverToImage } from '@/lib/pdf'

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

  const promise = enqueue(() => renderPdfCoverToImage(pdfUrl, THUMBNAIL_WIDTH))
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
