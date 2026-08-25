import { useTranslation } from 'react-i18next'
import { LANGUAGES, type Language } from '@/i18n'

/**
 * 언어별 URL 규칙.
 *
 * 예전에는 세 언어가 전부 같은 주소(`magron.kr/`)를 썼다. 검색엔진 입장에서는
 * 한국어 페이지 하나만 존재하는 셈이라 영문·중문 내용이 아예 색인되지 않았다.
 * 이제 언어마다 주소를 준다.
 *
 *   한국어  /            /tech        ← 기존 주소 그대로 (쌓아둔 색인을 잃지 않으려고)
 *   영어    /en/         /en/tech
 *   중국어  /zh/         /zh/tech
 */
export const LANG_PREFIX: Record<Language, string> = {
  ko: '',
  en: '/en',
  zh: '/zh',
}

/** 주소에서 언어와 언어 없는 경로를 분리한다. `/en/tech` → `{ lang:'en', path:'/tech' }` */
export function splitLangPath(pathname: string): { lang: Language; path: string } {
  const normalized = pathname.replace(/\/+$/, '') || '/'
  for (const lang of LANGUAGES) {
    const prefix = LANG_PREFIX[lang]
    if (!prefix) continue
    if (normalized === prefix) return { lang, path: '/' }
    if (normalized.startsWith(`${prefix}/`)) return { lang, path: normalized.slice(prefix.length) }
  }
  return { lang: 'ko', path: normalized }
}

/** 언어 없는 경로를 그 언어의 주소로 만든다. `('en','/tech')` → `/en/tech` */
export function withLang(lang: Language, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`
  const prefix = LANG_PREFIX[lang]
  if (!prefix) return clean
  return clean === '/' ? `${prefix}/` : `${prefix}${clean}`
}

/**
 * 검색엔진에 알려줄 절대 주소(canonical·hreflang·og:url)용 경로.
 *
 * GitHub Pages는 각 화면을 폴더로 서빙해서 `/tech` 를 `/tech/` 로 301 시킨다.
 * 슬래시 없는 주소를 canonical로 적으면 "리다이렉트되는 주소를 정본이라 우긴다"고
 * 판정돼 색인에서 손해를 본다. 그래서 여기서만 끝 슬래시를 붙인다.
 * (화면 안 <Link> 주소는 붙이지 않는다 — 라우터가 알아서 매칭한다)
 */
export function toCanonicalPath(lang: Language, path: string): string {
  const built = withLang(lang, path)
  return built.endsWith('/') ? built : `${built}/`
}

/**
 * 지금 화면 언어에 맞춰 링크 주소를 만들어 주는 훅.
 *
 * `<Link to={lp('/tech')}>` 처럼 쓴다. 영어로 보고 있으면 `/en/tech`가 되므로
 * 사이트 안에서 돌아다니는 동안 언어가 풀리지 않는다.
 * 해시(`/#products`)와 이미 접두어가 붙은 주소도 그대로 처리한다.
 */
export function useLangPath(): (path: string) => string {
  const { i18n } = useTranslation()
  const lang = (LANGUAGES as readonly string[]).includes(i18n.language)
    ? (i18n.language as Language)
    : 'ko'

  return (path: string) => {
    const [base, hash] = path.split('#')
    const { path: bare } = splitLangPath(base || '/')
    const built = withLang(lang, bare)
    return hash ? `${built}#${hash}` : built
  }
}
