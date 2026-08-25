import { useEffect } from 'react'
import type { Language } from '@/i18n'
import { LANGUAGES } from '@/i18n'
import { toCanonicalPath } from '@/i18n/routing'
import { ROUTE_META, SITE_URL } from '@/seo/routeMeta'

function upsertMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * 같은 내용의 다른 언어판이 어디에 있는지 검색엔진에 알려준다(hreflang).
 * 이게 없으면 세 언어판이 서로 "중복 문서"로 취급돼 하나만 남고 나머지가 밀린다.
 * x-default 는 어느 언어도 맞지 않는 방문자에게 보여줄 기본값 — 한국어로 둔다.
 */
function upsertAlternates(routePath: string) {
  document.head
    .querySelectorAll('link[rel="alternate"][hreflang]')
    .forEach((el) => el.remove())

  const entries: Array<[string, string]> = [
    ...LANGUAGES.map(
      (lang) => [lang, `${SITE_URL}${toCanonicalPath(lang, routePath)}`] as [string, string],
    ),
    ['x-default', `${SITE_URL}${toCanonicalPath('ko', routePath)}`],
  ]

  for (const [hreflang, href] of entries) {
    const el = document.createElement('link')
    el.setAttribute('rel', 'alternate')
    el.setAttribute('hreflang', hreflang)
    el.setAttribute('href', href)
    document.head.appendChild(el)
  }
}

/**
 * Keeps <title>, description, canonical, Open Graph and hreflang tags in sync
 * with the active route and language. This helps JS-executing crawlers and gives
 * users correct browser-tab titles; non-JS crawlers get the prerendered HTML.
 *
 * `routePath` 는 언어 접두어를 뗀 경로(/tech), `lang` 은 주소에서 읽은 언어다.
 */
export function useSeoMeta(routePath: string, lang: Language) {
  useEffect(() => {
    const meta = ROUTE_META[routePath] ?? ROUTE_META['/']
    const active = lang in meta.title ? lang : 'ko'
    const title = meta.title[active]
    const description = meta.description[active]
    const canonical = `${SITE_URL}${toCanonicalPath(active, routePath)}`

    document.title = title
    upsertMeta('meta[name="description"]', 'name', 'description', description)
    upsertMeta('meta[property="og:title"]', 'property', 'og:title', title)
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', description)
    upsertMeta('meta[property="og:url"]', 'property', 'og:url', canonical)
    upsertMeta('meta[property="og:locale"]', 'property', 'og:locale',
      active === 'ko' ? 'ko_KR' : active === 'en' ? 'en_US' : 'zh_CN')
    upsertCanonical(canonical)
    upsertAlternates(routePath)
  }, [routePath, lang])
}
