import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import type { Language } from '@/i18n'
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
 * Keeps <title>, description, canonical and Open Graph tags in sync with the
 * active route and language. This helps JS-executing crawlers and gives users
 * correct browser-tab titles; non-JS crawlers get the prerendered HTML instead.
 */
export function useSeoMeta(pathname: string) {
  const { i18n } = useTranslation()

  useEffect(() => {
    const meta = ROUTE_META[pathname] ?? ROUTE_META['/']
    const lang = (i18n.language as Language) in meta.title ? (i18n.language as Language) : 'ko'
    const title = meta.title[lang]
    const description = meta.description[lang]
    const canonical = `${SITE_URL}${pathname === '/' ? '/' : pathname}`

    document.title = title
    upsertMeta('meta[name="description"]', 'name', 'description', description)
    upsertMeta('meta[property="og:title"]', 'property', 'og:title', title)
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', description)
    upsertMeta('meta[property="og:url"]', 'property', 'og:url', canonical)
    upsertCanonical(canonical)
  }, [pathname, i18n.language])
}
