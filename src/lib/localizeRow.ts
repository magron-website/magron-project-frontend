import type { Language } from '@/i18n'

/**
 * Picks a per-language value from a Supabase row.
 *
 * For a base column `title`, a non-Korean language looks for `title_en` /
 * `title_zh` and uses it when present and non-empty; otherwise it falls back to
 * the base Korean column. This lets the DB stay untouched (Korean only) until
 * the localized columns are added, at which point they're used automatically.
 */
export function localize(
  row: Record<string, unknown>,
  field: string,
  lang: Language,
): string | null {
  if (lang !== 'ko') {
    const value = row[`${field}_${lang}`]
    if (typeof value === 'string' && value.trim() !== '') return value
  }
  const base = row[field]
  return typeof base === 'string' ? base : null
}
