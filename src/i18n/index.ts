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

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'ko'
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
