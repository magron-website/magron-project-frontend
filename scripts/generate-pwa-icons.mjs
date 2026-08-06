/**
 * Generates the PWA icon set in public/icons/ from the MAGRON logo.
 *
 * The logo only exists on the Wix CDN, but install icons have to be same-origin
 * files that the service worker can cache — an offline home-screen launch must
 * not depend on a third-party host. So the source PNG is downloaded once and
 * rasterised into the sizes the manifest declares.
 *
 * Playwright (already a devDependency for the prerender) draws the icons on a
 * canvas, which avoids adding a native image dependency such as sharp.
 *
 * Run only when the logo changes:  node scripts/generate-pwa-icons.mjs
 * The generated PNGs are committed — the build does not regenerate them.
 */
import { chromium } from 'playwright'
import { writeFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(root, 'public/icons')

const SOURCE_LOGO =
  'https://static.wixstatic.com/media/8d6a0e_c2287acce5d343d9a935278bc1aa7ab3~mv2.png'

/** Matches background_color in public/manifest.webmanifest and the site background. */
const BACKGROUND = '#ffffff'

/**
 * `scale` is the logo's share of the canvas edge.
 *
 * Maskable icons get 0.56: launchers may crop anything outside the inner 80%
 * "safe zone" circle, so the mark has to sit well inside it. Regular icons are
 * displayed whole and can run much closer to the edge.
 */
const ICONS = [
  { file: 'icon-192.png', size: 192, scale: 0.84 },
  { file: 'icon-512.png', size: 512, scale: 0.84 },
  { file: 'icon-maskable-192.png', size: 192, scale: 0.56 },
  { file: 'icon-maskable-512.png', size: 512, scale: 0.56 },
  // iOS crops home-screen icons to a rounded square itself, so leave a margin.
  { file: 'apple-touch-icon.png', size: 180, scale: 0.78 },
]

const response = await fetch(SOURCE_LOGO)
if (!response.ok) {
  throw new Error(`Failed to download the logo: ${response.status} ${response.statusText}`)
}
const logoDataUrl = `data:image/png;base64,${Buffer.from(await response.arrayBuffer()).toString('base64')}`

const browser = await chromium.launch()
const page = await browser.newPage()
await page.setContent('<!doctype html><meta charset="utf-8"><title>icons</title>')

await mkdir(outDir, { recursive: true })

for (const icon of ICONS) {
  const dataUrl = await page.evaluate(
    async ({ source, size, scale, background }) => {
      const image = new Image()
      image.src = source
      await image.decode()

      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      const context = canvas.getContext('2d')

      context.fillStyle = background
      context.fillRect(0, 0, size, size)

      // Fit the logo inside the target box without distorting its aspect ratio.
      const box = size * scale
      const ratio = Math.min(box / image.width, box / image.height)
      const width = image.width * ratio
      const height = image.height * ratio

      context.imageSmoothingEnabled = true
      context.imageSmoothingQuality = 'high'
      context.drawImage(image, (size - width) / 2, (size - height) / 2, width, height)

      return canvas.toDataURL('image/png')
    },
    { source: logoDataUrl, size: icon.size, scale: icon.scale, background: BACKGROUND },
  )

  const bytes = Buffer.from(dataUrl.split(',')[1], 'base64')
  await writeFile(path.join(outDir, icon.file), bytes)
  console.log(`  ${icon.file}  (${icon.size}x${icon.size}, ${Math.round(bytes.length / 1024)} KB)`)
}

await browser.close()
console.log(`Wrote ${ICONS.length} icons to public/icons/`)
