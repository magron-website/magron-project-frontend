import * as pdfjs from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import type { PDFPageProxy } from 'pdfjs-dist'

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker

/** Shared cMap/font config so every renderer handles CJK-bearing PDFs the same way. */
export const pdfDocumentOptions = {
  cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
  cMapPacked: true,
  standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
}

/** Rasterises one page to a JPEG data URL, scaled so the page is `pageWidth` px wide. */
export async function renderPageToDataUrl(
  page: PDFPageProxy,
  pageWidth: number,
  quality = 0.92,
): Promise<string> {
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

  await page.render({ canvasContext: context, viewport: scaledViewport, canvas }).promise

  return canvas.toDataURL('image/jpeg', quality)
}

/** Rasterises every page of `pdfUrl`, in order. Used by the full-document flip viewer. */
export async function renderPdfToImages(pdfUrl: string, pageWidth: number): Promise<string[]> {
  const pdf = await pdfjs.getDocument({ url: pdfUrl, ...pdfDocumentOptions }).promise
  const images: string[] = []

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber)
    images.push(await renderPageToDataUrl(page, pageWidth))
  }

  return images
}

/**
 * Rasterises only the cover (page 1) of `pdfUrl`.
 *
 * `disableAutoFetch` keeps this to the byte ranges page 1 actually needs instead
 * of pulling the whole file down — the grids render several covers at once.
 */
export async function renderPdfCoverToImage(pdfUrl: string, pageWidth: number): Promise<string> {
  const pdf = await pdfjs.getDocument({
    url: pdfUrl,
    ...pdfDocumentOptions,
    disableAutoFetch: true,
    disableStream: true,
  }).promise

  try {
    if (pdf.numPages < 1) {
      throw new Error('PDF has no pages')
    }

    const page = await pdf.getPage(1)
    return await renderPageToDataUrl(page, pageWidth)
  } finally {
    void pdf.destroy()
  }
}
