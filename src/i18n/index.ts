import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

export const LANGUAGES = ['ko', 'en', 'zh'] as const
export type Language = (typeof LANGUAGES)[number]

const STORAGE_KEY = 'magron-lang'

/** A locale module exports translations for every supported language. */
type LocaleBundle = Record<Language, Record<string, unknown>>

/**
 * Every file under `./locales/*.ts` is a namespace named after its filename and
 * must `export default` a `{ ko, en, zh }` bundle. Registering via glob keeps
 * `index.ts` untouched when new namespaces are added.
 */
const modules = import.meta.glob<{ default: LocaleBundle }>('./locales/*.ts', {
  eager: true,
})

const resources: Record<Language, Record<string, Record<string, unknown>>> = {
  ko: {},
  en: {},
  zh: {},
}

for (const [path, mod] of Object.entries(modules)) {
  const namespace = path.replace(/^.*\/locales\//, '').replace(/\.ts$/, '')
  const bundle = mod.default
  for (const lang of LANGUAGES) {
    resources[lang][namespace] = bundle[lang]
  }
}

function isLanguage(value: string | null): value is Language {
  return value !== null && (LANGUAGES as readonly string[]).includes(value)
}

/**
 * 첫 화면 언어는 **주소가 먼저**다. /en/tech 로 들어온 사람에게 저장된 한국어를
 * 보여줬다가 곧바로 영어로 바뀌면 글자가 한 번 깜빡이고, 프리렌더된 영문 HTML과도
 * 어긋난다. 접두어가 없을 때만 지난번 선택(localStorage)을 쓴다.
 */
function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'ko'

  const path = window.location.pathname
  for (const lang of LANGUAGES) {
    if (lang === 'ko') continue
    if (path === `/${lang}` || path.startsWith(`/${lang}/`)) return lang
  }

  const stored = window.localStorage.getItem(STORAGE_KEY)
  return isLanguage(stored) ? stored : 'ko'
}

const initialLanguage = getInitialLanguage()

i18n.use(initReactI18next).init({
  resources,
  lng: initialLanguage,
  fallbackLng: 'ko',
  defaultNS: 'common',
  interpolation: { escapeValue: false },
  returnNull: false,
})

if (typeof document !== 'undefined') {
  document.documentElement.lang = initialLanguage
}

i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, lng)
    document.documentElement.lang = lng
  }
})

export default i18n
