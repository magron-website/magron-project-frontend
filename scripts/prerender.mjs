// Post-build prerender: emit a static HTML file per route so crawlers / AI search
// bots that do not execute JavaScript still receive route-specific <head> tags,
// JSON-LD, and readable <noscript> content. Runs after `vite build`.
//
// No headless browser required — it clones the built docs/index.html shell and
// swaps in per-route metadata. The React app still boots normally on top of it.

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { BASE_PREFIX } from './base-path.mjs'

// The canonical home of the site. Deliberately the final custom domain even
// while the build is served from github.io — canonical tags should point at
// where the content will live, so the staging URL never competes for indexing.
const SITE_URL = 'https://www.magron.co.kr'
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

function applyRoute(shell, route) {
  const canonical = `${SITE_URL}${route.path}`
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

async function run() {
  const shell = await readFile(join(OUT, 'index.html'), 'utf8')

  // The home shell ships as-is apart from its <noscript> links.
  await writeFile(join(OUT, 'index.html'), rebaseNoscriptLinks(shell), 'utf8')

  for (const route of ROUTES) {
    const outDir = join(OUT, route.path)
    await mkdir(outDir, { recursive: true })
    await writeFile(join(outDir, 'index.html'), applyRoute(shell, route), 'utf8')
    console.log(`prerendered: docs${route.path}/index.html`)
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

  console.log(`prerender complete (${ROUTES.length} routes, base "${BASE_PREFIX || '/'}")`)
}

run().catch((err) => {
  console.error('prerender failed:', err)
  process.exit(1)
})
