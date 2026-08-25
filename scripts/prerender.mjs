// Post-build prerender (build-time SSR): render the real React app in a headless
// browser and emit a fully-rendered static HTML file per route. Crawlers / AI
// search bots that do not execute JavaScript then receive real, route-specific
// content — headings, product copy, and the Supabase-driven lists — instead of an
// empty shell. The React bundle still boots on top and takes over on the client.
//
// Why a headless browser instead of renderToString: the app leans on libraries
// that touch the DOM directly (book-cover-3d, react-pageflip, embla-carousel,
// pdf.js, framer-motion). Rendering the production build in a real browser keeps
// every feature and pixel intact, which server-side renderToString could not
// guarantee without invasive, risky refactoring.
//
// Runs after `vite build`. If the browser step fails for any reason, it falls
// back to injecting per-route <head> metadata into the shell so the build never
// breaks and still ships valid, indexable HTML.

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { createServer } from 'node:http'
import { dirname, join, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import { BASE_PREFIX } from './base-path.mjs'

// The canonical home of the site. Deliberately the final custom domain even
// while the build is served from github.io — canonical tags should point at
// where the content will live, so the staging URL never competes for indexing.
const SITE_URL = 'https://magron.kr'

// 언어별 URL 접두어 — src/i18n/routing.ts 와 반드시 같아야 한다.
// 한국어는 접두어 없이 기존 주소를 그대로 쓴다(쌓아둔 색인 유지).
const LANGS = ['ko', 'en', 'zh']
const LANG_PREFIX = { ko: '', en: '/en', zh: '/zh' }
const withLang = (lang, path) =>
  LANG_PREFIX[lang] ? (path === '/' ? `${LANG_PREFIX[lang]}/` : `${LANG_PREFIX[lang]}${path}`) : path
// sitemap·hreflang에 적는 주소. GitHub Pages가 슬래시 없는 주소를 301 시키므로
// 정본 주소에는 반드시 끝 슬래시를 붙인다 (src/i18n/routing.ts와 같은 규칙).
// <noscript> 안에서 쓰는 언어별 라벨. 본문(제목·설명·제품명)은 실제 렌더된
// 화면에서 그대로 긁어오므로, 여기 있는 건 고정 문구뿐이다.
const NOSCRIPT_LABELS = {
  ko: { products: '주요 제품', contact: '연락처', home: 'MAGRON 홈으로', tel: '국내', intl: '해외' },
  en: { products: 'Products', contact: 'Contact', home: 'MAGRON home', tel: 'Korea', intl: 'International' },
  zh: { products: '主要产品', contact: '联系方式', home: '返回 MAGRON 首页', tel: '韩国', intl: '海外' },
}

/**
 * JS를 실행하지 않는 크롤러용 대체 본문.
 *
 * 예전에는 shell(index.html)의 한국어 블록이 /en, /zh 페이지에도 그대로 실려서,
 * 영문 페이지에 한글 <h1>이 하나 더 잡혔다. 이제 방금 렌더한 그 화면에서
 * 제목·설명·제품 링크를 읽어 만들기 때문에 언어가 항상 맞는다.
 */
function buildNoscript(lang, snapshot) {
  const L = NOSCRIPT_LABELS[lang] || NOSCRIPT_LABELS.ko
  const products = snapshot.products
    .filter((x) => x.href && x.text)
    .map((x) => `        <li><a href="${withBase(x.href)}/">${escHtml(x.text)}</a></li>`)
    .join('\n')

  return [
    '<noscript>',
    `      <h1>${escHtml(snapshot.h1 || 'MAGRON')}</h1>`,
    `      <p>${escHtml(snapshot.description)}</p>`,
    products ? `      <h2>${L.products}</h2>` : '',
    products ? '      <ul>' : '',
    products,
    products ? '      </ul>' : '',
    `      <h2>${L.contact}</h2>`,
    '      <p>',
    snapshot.address ? `        ${escHtml(snapshot.address)}<br />` : '',
    snapshot.contact ? `        ${escHtml(snapshot.contact)}<br />` : '',
    '        E-mail: <a href="mailto:magron@magron.co.kr">magron@magron.co.kr</a>',
    '      </p>',
    `      <p><a href="${withBase(snapshot.homePath)}">${L.home}</a></p>`,
    '    </noscript>',
  ]
    .filter((line) => line !== '')
    .join('\n')
}

const canonicalPath = (lang, path) => {
  const built = withLang(lang, path)
  return built.endsWith('/') ? built : `${built}/`
}
const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'docs')

/** Prefixes a site-absolute path with the deploy base ('/tech' -> '/repo/tech'). */
const withBase = (path) => `${BASE_PREFIX}${path}`

/**
 * The <noscript> fallbacks are authored with root-absolute hrefs; under a
 * project-page base those would 404, so rewrite them to carry the prefix.
 */
function rebaseNoscriptLinks(html) {
  if (!BASE_PREFIX) return html
  return html.replace(/<noscript>[\s\S]*?<\/noscript>/, (block) =>
    block.replace(/href="(\/[^"]*)"/g, (_, path) => `href="${withBase(path)}"`),
  )
}

// Korean content mirrors src/seo/routeMeta.ts (keep in sync). `body` is the
// per-route readable fallback shown to non-JS crawlers.
const ROUTES = [
  {
    path: '/company',
    title: '회사소개 | MAGRON (주)마그론',
    description:
      '2004년 설립된 (주)마그론은 자성유체와 관련 부품을 전문적으로 제작·공급하며 반도체·디스플레이·태양전지·전자·자동차 등 다양한 산업에 적용됩니다.',
    heading: '회사소개 — (주)마그론 MAGRON',
    body: '2004년에 설립된 (주)마그론은 자성유체(Ferrofluid)와 관련 부품 등을 전문적으로 제작·공급합니다. 주로 활성·비활성 가스와 분진을 차폐하는 용도 및 센서용으로 사용되며, 반도체·태양전지·디스플레이 장비·전자제품·자동차 등에 적용됩니다.',
  },
  {
    path: '/tech',
    title: '기술정보 · 자성유체 기술자료 및 시험성적서 | MAGRON (주)마그론',
    description:
      'MFF-M 자성유체의 내열성·증기압·진공 안정성을 뒷받침하는 기술자료입니다. 증기압 기술노트, KOPTRI 공인시험 성적서, TGA 원자료를 PDF로 열람·다운로드할 수 있습니다.',
    heading: '기술정보 (Technical Information)',
    body: 'MFF-M PFPE 자성유체의 내열성·증기압·진공 안정성을 뒷받침하는 기술자료와 공인시험 성적서를 제공합니다. MFF-M 종합자료, 기술·제품 브로슈어, 증기압 기술노트, KOPTRI(한국고분자시험연구소) 증기압 공인시험 성적서, 활성/불활성 가스 TGA 원자료를 PDF로 열람하고 내려받을 수 있습니다.',
  },
  {
    path: '/ferrofluid',
    title: '유해가스 및 분진 차단용 자성유체 | MAGRON (주)마그론',
    description:
      '회전축 주변의 유해가스 누출·분진 유입·진공도 저하를 자성유체 기반 비접촉 씰링으로 차단합니다. 부식성/비부식성 가스용 MFF·MFS·MFH 시리즈를 제공합니다.',
    heading: '유해가스 및 분진 차단용 자성유체 (Ferrofluid for Corrosive Gas & Dust Blocking)',
    body: '회전축 주변에서 발생하는 유해가스 누출, 외부 분진 유입, 진공도 저하 문제를 자성유체 기반 비접촉 씰링 구조로 차단합니다. 부식성 가스용(MFF/MFF-M), 비부식성 가스용(MFS/MFH) 시리즈를 제공하며, 반도체·디스플레이 공정 장비에 사용됩니다.',
  },
  {
    path: '/feedthrough',
    title: 'Ferrofluid 진공 피드스루 (Feedthrough) | MAGRON (주)마그론',
    description:
      '자성유체 씰이 적용된 진공 회전 도입기(Feedthrough)로, 진공·가스 환경에서 회전 운동을 안정적으로 전달하면서 누설을 차단합니다.',
    heading: 'Ferrofluid 진공 피드스루 (Feedthrough)',
    body: '자성유체 씰이 적용된 진공 회전 도입기(Feedthrough)입니다. 진공 및 가스 환경에서 회전 운동을 안정적으로 전달하면서 가스·분진·오염물의 누설을 차단합니다.',
  },
  {
    path: '/magoil',
    title: '릴 수리용 맥오일 (Reel Mag oil) | MAGRON (주)마그론',
    description:
      'DAIWA MAGSEALED 구조 릴의 방수·방진 성능을 유지하기 위한 릴 수리용 자성유체(맥오일)입니다. 물·염분·이물질 유입을 줄여 회전 성능과 내구성을 유지합니다.',
    heading: '릴 수리용 맥오일 (Reel Mag oil)',
    body: 'DAIWA MAGSEALED 구조가 적용된 릴의 방수·방진 성능을 유지하기 위한 릴 수리용 자성유체(맥오일)입니다. 릴 내부 Magnet 주변에 안정적으로 머물면서 물·염분·먼지·이물질 유입을 줄여 회전 성능과 내구성을 유지합니다.',
  },
  {
    path: '/magnet',
    title: '자석 (Magnet) | MAGRON (주)마그론',
    description: '자성유체 응용 및 산업용 자석 제품을 제공합니다. 용도별 규격 주문제작이 가능합니다.',
    heading: '자석 (Magnet)',
    body: '자성유체 응용 및 산업용 자석 제품을 제공합니다. 용도와 규격에 맞춘 주문제작이 가능합니다.',
  },
  {
    path: '/education',
    title: '자성유체 교육 키트 (Education kit) | MAGRON (주)마그론',
    description: '자성유체의 원리와 특성을 직접 체험하고 학습할 수 있는 교육용 자성유체 키트입니다.',
    heading: '자성유체 교육 키트 (Education kit)',
    body: '자성유체의 원리와 특성을 직접 체험하고 학습할 수 있는 교육용 자성유체 키트입니다.',
  },
  {
    path: '/piezo-ink',
    title: 'PIEZO Ink · 압전/전도성 잉크 | MAGRON (주)마그론',
    description:
      '압력에 반응해 전기 신호를 발생시키는 압전(Piezo) 잉크와 인쇄 회로용 전도성(Conductive) 잉크입니다. 인쇄 전자, 웨어러블 센서 등에 적용됩니다.',
    heading: 'PIEZO Ink (압전/전도성 잉크)',
    body: '압력에 반응해 전기 신호를 발생시키는 압전(Piezo) 잉크와 인쇄를 통해 회로를 구현하는 전도성(Conductive) 잉크 제품입니다. 인쇄 전자, 웨어러블 센서, 압력 감지 등 다양한 분야에 적용할 수 있습니다.',
  },
  {
    path: '/display',
    title: '대형 자성유체 디스플레이 | MAGRON (주)마그론',
    description:
      '자성유체의 역동적인 움직임을 활용한 대형 자성유체 디스플레이입니다. 전시·홍보·아트 설치 등에 활용됩니다.',
    heading: '대형 자성유체 디스플레이 (Large Ferrofluid Display)',
    body: '자성유체의 역동적인 움직임을 활용한 대형 자성유체 디스플레이입니다. 전시·홍보·아트 설치 등 다양한 용도로 활용됩니다.',
  },
]

const escAttr = (s) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const escHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function setMeta(html, attr, value, content) {
  const re = new RegExp(`<meta[^>]*\\b${attr}="${value.replace(/[/]/g, '\\/')}"[^>]*>`)
  return html.replace(re, `<meta ${attr}="${value}" content="${escAttr(content)}" />`)
}

/**
 * Swaps the shell's home-page <head> metadata for the route's own — title,
 * description, canonical, Open Graph — and appends a WebPage JSON-LD block plus a
 * route-specific <noscript> fallback. Applied to both the rendered snapshot and
 * the meta-only fallback so indexable metadata is identical either way.
 */
function applyRouteMeta(shell, route) {
  // Trailing slash: GitHub Pages serves each route as a directory and 301s the
  // slash-less URL to the slashed one, so canonical/og:url must point at the
  // slashed form or search engines flag the canonical as a redirect.
  const canonical = `${SITE_URL}${route.path}/`
  let html = shell

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escHtml(route.title)}</title>`)
  html = setMeta(html, 'name', 'description', route.description)
  html = setMeta(html, 'property', 'og:title', route.title)
  html = setMeta(html, 'property', 'og:description', route.description)
  html = setMeta(html, 'property', 'og:url', canonical)
  html = html.replace(
    /<link[^>]*\brel="canonical"[^>]*>/,
    `<link rel="canonical" href="${canonical}" />`,
  )

  const jsonLd = `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: route.title,
    description: route.description,
    url: canonical,
    isPartOf: { '@type': 'WebSite', name: 'MAGRON (주)마그론', url: `${SITE_URL}/` },
    publisher: { '@type': 'Organization', name: 'MAGRON Co., Ltd.', url: `${SITE_URL}/` },
  })}</script>`
  html = html.replace('</head>', `    ${jsonLd}\n  </head>`)

  const noscript = `<noscript>\n      <h1>${escHtml(route.heading)}</h1>\n      <p>${escHtml(
    route.body,
  )}</p>\n      <p><a href="${withBase('/')}">MAGRON 홈으로</a> · <a href="mailto:magron@magron.co.kr">magron@magron.co.kr</a></p>\n    </noscript>`
  html = html.replace(/<noscript>[\s\S]*?<\/noscript>/, noscript)

  return html
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.wasm': 'application/wasm',
}

/**
 * Serves the built docs/ over HTTP with SPA-fallback semantics: real files are
 * served as-is, any other path returns index.html so the client router can take
 * the route. Playwright needs a real origin (not file://) for the router and
 * Supabase fetches to behave exactly as they do in production.
 */
function startStaticServer() {
  const server = createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent((req.url || '/').split('?')[0])
      const ext = extname(pathname)
      let filePath = join(OUT, pathname)

      // No extension (a route) or a missing file → serve the SPA shell.
      if (!ext || !existsSync(filePath)) {
        filePath = join(OUT, 'index.html')
      }

      const data = await readFile(filePath)
      res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] || 'application/octet-stream' })
      res.end(data)
    } catch (err) {
      res.writeHead(500)
      res.end(String(err))
    }
  })

  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address()
      resolve({ server, origin: `http://127.0.0.1:${port}` })
    })
  })
}

/**
 * Loads one route in the browser, waits for the app (and its Supabase-driven
 * lists) to settle, and returns the fully-rendered HTML. The autoplay carousel
 * advances every 4s, so the ~1.5s of waits here keep the snapshot on the first
 * slide.
 */
async function renderRoute(page, origin, route) {
  await page.goto(`${origin}${withBase(route.path)}`, {
    waitUntil: 'networkidle',
    timeout: 30000,
  })

  // The app has mounted once #root has children; give async data + reveal
  // transitions a beat to land. Never hard-fail on a slow list — partial content
  // still beats an empty shell.
  await page
    .waitForFunction(() => document.querySelector('#root')?.children.length > 0, null, {
      timeout: 15000,
    })
    .catch(() => {})
  await page.waitForTimeout(700)

  /* 앱(useSeoMeta)이 언어에 맞는 title·description·canonical·hreflang을 직접
     심는다. 그게 들어왔는지 확인해서, 들어왔으면 스냅샷의 head를 그대로 신뢰하고
     아래의 한국어 메타 덮어쓰기를 건너뛴다. */
  // noscript 대체 본문을 만들 재료를 방금 렌더된 화면에서 그대로 읽는다.
  const snapshot = await page.evaluate(() => ({
    h1: document.querySelector('h1')?.textContent?.trim() || '',
    description: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
    products: [...document.querySelectorAll('.product-scroll__tile')].map((a) => ({
      href: a.getAttribute('href') || '',
      text: (a.querySelector('.product-scroll__tile-title')?.textContent || '')
        .replace(/\s+/g, ' ')
        .trim(),
    })),
    homePath: document.querySelector('.home-header__left')?.getAttribute('href') || '/',
    // 주소·전화는 언어별 번역이 이미 푸터에 있다 — 그대로 쓴다.
    // textContent로 뽑으면 <br>이 사라져 "…Koreacopyright ©…"처럼 붙어버리므로
    // <br> 단위로 잘라서 필요한 줄만 쓴다.
    ...(() => {
      const lines = (el) => {
        if (!el) return []
        return [...el.childNodes]
          .reduce(
            (acc, node) => {
              if (node.nodeName === 'BR') acc.push('')
              else acc[acc.length - 1] += node.textContent || ''
              return acc
            },
            [''],
          )
          .map((line) => line.replace(/\s+/g, ' ').trim())
          .filter(Boolean)
      }
      // 첫 줄만 주소로 쓰고 copyright 줄은 버린다.
      const address = lines(document.querySelector('.home-footer__company-detail'))[0] || ''
      const contact = lines(document.querySelector('.home-footer__contact-text')).join(' · ')
      return { address, contact }
    })(),
  }))

  const hasLocalizedHead = await page
    .waitForFunction(() => document.head.querySelector('link[rel="alternate"][hreflang]') !== null, null, {
      timeout: 5000,
    })
    .then(() => true)
    .catch(() => false)

  // Strip React portals rendered outside #root (e.g. the chatbot floater, which
  // portals to document.body). If left in the snapshot they persist as dead
  // "ghost" nodes after the client boots: createRoot only manages #root, so it
  // never removes them, and the live portal renders a second copy on top. Keep
  // only #root, scripts, and the <noscript> fallback — React recreates the rest.
  await page.evaluate(() => {
    document.querySelectorAll('body > *').forEach((el) => {
      const keep = el.id === 'root' || el.tagName === 'SCRIPT' || el.tagName === 'NOSCRIPT'
      if (!keep) el.remove()
    })
  })

  return { html: await page.content(), hasLocalizedHead, snapshot }
}

async function run() {
  const shell = await readFile(join(OUT, 'index.html'), 'utf8')

  const basePaths = [{ path: '/', meta: null }, ...ROUTES.map((r) => ({ path: r.path, meta: r }))]
  // 10개 화면 × 3개 언어 = 30개 HTML. 언어마다 주소가 따로 있어야 검색엔진이
  // 영문·중문 내용을 각각 색인한다.
  const allRoutes = LANGS.flatMap((lang) =>
    basePaths.map((r) => ({ ...r, lang, url: withLang(lang, r.path) })),
  )

  let browser
  let serverHandle
  let usedBrowser = false

  try {
    serverHandle = await startStaticServer()
    browser = await chromium.launch()
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
    usedBrowser = true

    for (const route of allRoutes) {
      const { html: rendered, hasLocalizedHead, snapshot } = await renderRoute(
        page,
        serverHandle.origin,
        { path: route.url },
      )
      // 앱이 언어에 맞는 head를 심었으면 그대로 둔다. 못 심었을 때만(스크립트 실패 등)
      // 한국어 메타로라도 채워서 빈 shell이 나가지 않게 한다.
      let html =
        hasLocalizedHead || !route.meta
          ? rebaseNoscriptLinks(rendered)
          : applyRouteMeta(rendered, route.meta)
      // shell의 한국어 <noscript>를 그 화면의 언어로 갈아끼운다.
      if (snapshot.h1 || snapshot.description) {
        html = html.replace(/<noscript>[\s\S]*?<\/noscript>/, buildNoscript(route.lang, snapshot))
      }

      const outDir = route.url === '/' ? OUT : join(OUT, route.url)
      await mkdir(outDir, { recursive: true })
      await writeFile(join(outDir, 'index.html'), html, 'utf8')
      console.log(`prerendered (rendered): docs${route.url === '/' ? '' : route.url}/index.html`)
    }
  } catch (err) {
    // Browser rendering failed — fall back to shipping the shell with per-route
    // <head> metadata so the build still produces valid, indexable HTML.
    console.warn('⚠ browser prerender failed, falling back to meta-only injection:')
    console.warn(`  ${err?.message || err}`)

    for (const lang of LANGS) {
      const home = withLang(lang, '/')
      const homeDir = home === '/' ? OUT : join(OUT, home)
      await mkdir(homeDir, { recursive: true })
      await writeFile(join(homeDir, 'index.html'), rebaseNoscriptLinks(shell), 'utf8')
      for (const route of ROUTES) {
        const outDir = join(OUT, withLang(lang, route.path))
        await mkdir(outDir, { recursive: true })
        await writeFile(join(outDir, 'index.html'), applyRouteMeta(shell, route), 'utf8')
        console.log(`prerendered (meta-only): docs${withLang(lang, route.path)}/index.html`)
      }
    }
  } finally {
    if (browser) await browser.close()
    if (serverHandle) serverHandle.server.close()
  }

  // GitHub Pages has no SPA rewrite rule: every route above is emitted as a real
  // directory, but an unknown deep link (or a stale URL) would otherwise hit the
  // default 404 page. Serving the app shell there lets the router handle it.
  await writeFile(join(OUT, '404.html'), rebaseNoscriptLinks(shell), 'utf8')
  console.log('wrote: docs/404.html (SPA fallback)')

  // Without this, GitHub Pages runs the output through Jekyll, which silently
  // drops files and folders whose names begin with an underscore.
  await writeFile(join(OUT, '.nojekyll'), '', 'utf8')
  console.log('wrote: docs/.nojekyll')

  // sitemap도 여기서 만든다. public/sitemap.xml을 손으로 관리하면 라우트가 늘 때마다
  // 잊어버리기 때문. 각 URL에 세 언어판 위치(hreflang)를 함께 적어 준다.
  const sitemapPaths = ['/', ...ROUTES.map((r) => r.path)]
  const today = new Date().toISOString().slice(0, 10)
  const entries = LANGS.flatMap((lang) =>
    sitemapPaths.map((path) => {
      const alternates = [...LANGS.map((l) => [l, l]), ['ko', 'x-default']]
        .map(
          ([target, hreflang]) =>
            `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${SITE_URL}${canonicalPath(target, path)}" />`,
        )
        .join('\n')
      return [
        '  <url>',
        `    <loc>${SITE_URL}${canonicalPath(lang, path)}</loc>`,
        `    <lastmod>${today}</lastmod>`,
        `    <changefreq>${path === '/' ? 'weekly' : 'monthly'}</changefreq>`,
        `    <priority>${path === '/' ? '1.0' : '0.8'}</priority>`,
        alternates,
        '  </url>',
      ].join('\n')
    }),
  )
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...entries,
    '</urlset>',
    '',
  ].join('\n')
  await writeFile(join(OUT, 'sitemap.xml'), sitemap, 'utf8')
  console.log(`wrote: docs/sitemap.xml (${entries.length} urls)`)

  console.log(
    `prerender complete (${allRoutes.length} routes, ${
      usedBrowser ? 'rendered' : 'meta-only'
    }, base "${BASE_PREFIX || '/'}")`,
  )
}

run().catch((err) => {
  console.error('prerender failed:', err)
  process.exit(1)
})
