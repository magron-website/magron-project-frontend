import activeGasTgaData from './active-gas-tga-data.jpg'
import inertGasTgaData from './inert-gas-tga-data.jpg'
import koptriVaporPressureReport from './koptri-vapor-pressure-report.jpg'
import mffMOverview from './mff-m-overview.jpg'
import productBrochure from './product-brochure.jpg'
import vaporPressureNote from './vapor-pressure-note.jpg'
import whatIsFerrofluidEn from './what-is-ferrofluid-en.jpg'
import whatIsFerrofluidKr from './what-is-ferrofluid-kr.jpg'
import whatIsFerrofluidZh from './what-is-ferrofluid-zh.jpg'

/**
 * Covers pre-rendered from each PDF's first page by
 * `scripts/capture-tech-covers.mjs`, keyed by the PDF's filename slug.
 *
 * Rendering them at build time keeps the cards from waiting on a client-side
 * pdf.js pass over a remote PDF. A document with no entry here still falls back
 * to that live render, so a freshly uploaded PDF is never coverless — re-run the
 * script and add it here to make it instant.
 */
const techCovers: Record<string, string> = {
  'active-gas-tga-data': activeGasTgaData,
  'inert-gas-tga-data': inertGasTgaData,
  'koptri-vapor-pressure-report': koptriVaporPressureReport,
  'mff-m-overview': mffMOverview,
  'product-brochure': productBrochure,
  'vapor-pressure-note': vaporPressureNote,
  'what-is-ferrofluid-kr': whatIsFerrofluidKr,
  'what-is-ferrofluid-en': whatIsFerrofluidEn,
  'what-is-ferrofluid-zh': whatIsFerrofluidZh,
}

/** "…/Active%20Gas%20TGA%20Data.pdf" -> "active-gas-tga-data" */
function slugFromPdfUrl(pdfUrl: string): string {
  const filename = pdfUrl.split('/').pop() ?? ''
  return decodeURIComponent(filename.replace(/\.pdf$/i, ''))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/** The pre-rendered cover for `pdfUrl`, or null if it hasn't been captured yet. */
export function getTechCover(pdfUrl: string): string | null {
  if (!pdfUrl) return null
  return techCovers[slugFromPdfUrl(pdfUrl)] ?? null
}
