/**
 * Pre-renders the cover (page 1) of every tech document into
 * src/assets/images/tech/, so the cards can show artwork immediately instead of
 * waiting on a client-side pdf.js render of a remote PDF.
 *
 * Run after uploading a new document:  node scripts/capture-tech-covers.mjs
 * Then register the new file in src/assets/images/tech/index.ts.
 */
import { chromium } from 'playwright'
import { createServer } from 'node:http'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(root, 'src/assets/images/tech')

/** Matches THUMBNAIL_WIDTH in src/hooks/usePdfThumbnail.ts — 2x the ~230px card. */
const THUMBNAIL_WIDTH = 460
const JPEG_QUALITY = 0.92

function readEnv() {
  return readFile(path.join(root, '.env'), 'utf8').then((raw) =>
    Object.fromEntries(
      raw
        .split(/\r?\n/)
        .filter((line) => line.includes('=') && !line.startsWith('#'))
        .map((line) => {
          const eq = line.indexOf('=')
          return [line.slice(0, eq).trim(), line.slice(eq + 1).trim()]
        }),
    ),
  )
}

async function fetchDocuments(env) {
  const url = `${env.VITE_SUPABASE_URL}/rest/v1/tech_documents?select=id,title,file_url&is_active=eq.true&order=sort_order`
  const response = await fetch(url, {
    headers: {
      apikey: env.VITE_SUPABASE_ANON_KEY,
      Authorization: `Bearer ${env.VITE_SUPABASE_ANON_KEY}`,
    },
  })

  if (!response.ok) {
    throw new Error(`Supabase returned ${response.status}: ${await response.text()}`)
  }

  return response.json()
}

/** "…/Active%20Gas%20TGA%20Data.pdf" -> "active-gas-tga-data" */
function slugFor(fileUrl) {
  return decodeURIComponent(fileUrl.split('/').pop().replace(/\.pdf$/i, ''))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

const env = await readEnv()
const documents = await fetchDocuments(env)
console.log(`Found ${documents.length} active tech documents.`)

// Download the PDFs up front so the browser only ever touches localhost.
const pdfs = new Map()
for (const doc of documents) {
  const response = await fetch(doc.file_url)
  if (!response.ok) {
    throw new Error(`Failed to download ${doc.file_url}: ${response.status}`)
  }
  pdfs.set(slugFor(doc.file_url), Buffer.from(await response.arrayBuffer()))
}

const pdfjsDir = path.join(root, 'node_modules/pdfjs-dist/build')

const server = createServer(async (request, response) => {
  const { pathname } = new URL(request.url, 'http://localhost')

  if (pathname === '/') {
    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.end('<!doctype html><meta charset="utf-8"><title>capture</title>')
    return
  }

  if (pathname.endsWith('.mjs')) {
    response.writeHead(200, { 'Content-Type': 'text/javascript' })
    response.end(await readFile(path.join(pdfjsDir, path.basename(pathname))))
    return
  }

  const pdf = pdfs.get(decodeURIComponent(pathname.replace(/^\/pdf\//, '').replace(/\.pdf$/, '')))
  if (pdf) {
    response.writeHead(200, { 'Content-Type': 'application/pdf' })
    response.end(pdf)
    return
  }

  response.writeHead(404)
  response.end()
})

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
const origin = `http://127.0.0.1:${server.address().port}`

const browser = await chromium.launch()
const page = await browser.newPage()
await page.goto(`${origin}/`)

await mkdir(outDir, { recursive: true })

for (const doc of documents) {
  const slug = slugFor(doc.file_url)

  const dataUrl = await page.evaluate(
    async ({ slug, width, quality }) => {
      const pdfjs = await import('/pdf.min.mjs')
      pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'

      const pdf = await pdfjs.getDocument({
        url: `/pdf/${encodeURIComponent(slug)}.pdf`,
        cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
        cMapPacked: true,
        standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
      }).promise

      const pdfPage = await pdf.getPage(1)
      const scale = width / pdfPage.getViewport({ scale: 1 }).width
      const viewport = pdfPage.getViewport({ scale })

      const canvas = document.createElement('canvas')
      canvas.width = Math.floor(viewport.width)
      canvas.height = Math.floor(viewport.height)
      const context = canvas.getContext('2d')

      await pdfPage.render({ canvasContext: context, viewport, canvas }).promise
      return canvas.toDataURL('image/jpeg', quality)
    },
    { slug, width: THUMBNAIL_WIDTH, quality: JPEG_QUALITY },
  )

  const bytes = Buffer.from(dataUrl.split(',')[1], 'base64')
  await writeFile(path.join(outDir, `${slug}.jpg`), bytes)
  console.log(`  ${slug}.jpg  (${Math.round(bytes.length / 1024)} KB)  ${doc.title}`)
}

await browser.close()
server.close()
