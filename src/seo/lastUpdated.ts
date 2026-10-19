import type { Language } from '@/i18n'

/**
 * 화면별 최종 수정일. 내용을 실제로 고친 화면만 적는다.
 *
 * 날짜만 바꾸고 내용은 그대로인 "가짜 갱신"은 검색엔진이 알아채고 오히려 신뢰를 깎는다.
 * 그래서 전체 화면에 일괄로 넣지 않고, 본문·제목·사양을 손본 날에만 여기 날짜를 고친다.
 * 이 값 하나가 화면 하단 "최종 수정" 표시와 WebPage 스키마의 dateModified 에 같이 쓰인다.
 */
export const LAST_UPDATED: Record<string, string> = {
  '/': '2026-10-19',
  '/company': '2026-10-19',
  '/ferrofluid': '2026-10-19',
  '/feedthrough': '2026-10-19',
  '/piezo-ink': '2026-10-19',
  '/tech': '2026-10-19',
  '/seal-comparison': '2026-10-19',
  '/tech-data': '2026-10-19',
  '/magnet': '2026-10-19',
  '/contact': '2026-10-16',
  '/privacy': '2026-10-16',
}

export const LAST_UPDATED_LABEL: Record<Language, string> = {
  ko: '최종 수정',
  en: 'Last updated',
  zh: '最后更新',
}
