import { trackEvent } from '@/lib/analytics'

/**
 * 2026-11-07 요청: "자석·피드스루·자성유체를 사람들이 더 쉽게 문의할 수 있게".
 * 그전까지 문의서는 챗봇 → 버튼 → 제품 고르기 → 긴 문의서로만 열려서 11/2 배포 뒤 제출 0건이었다.
 * 제품 페이지 버튼이 이 함수를 부르면 ChatbotFloater 가 받아서 큰 문의 창을 곧바로 연다.
 */

/** 문의서 id(src/data/inquiryForms.ts) — magnet · feedthrough · ff-semi 는 먼저 "문의 방법 고르기"가 뜬다. */
export type InquiryTarget = string

/** 어디서 열었는지 — GA4 inquiry_open 의 source 로 다음 달에 비교한다. */
export type InquirySource = 'hero' | 'model' | 'section' | 'bottom' | 'mobile_bar' | 'chat'

export type InquiryRequest = {
  target: InquiryTarget
  source: InquirySource
  /** 모델·재질처럼 미리 채울 값(문의서 첫 질문들·시트 메모에 들어간다) */
  model?: string
  material?: string
}

export const OPEN_INQUIRY_EVENT = 'magron:open-inquiry'

export function openInquiry(request: InquiryRequest) {
  trackEvent('inquiry_open', { product: request.target, source: request.source })
  window.dispatchEvent(new CustomEvent<InquiryRequest>(OPEN_INQUIRY_EVENT, { detail: request }))
}

/** 인콰이어리 시트(Word)가 있는 제품 — 이 제품은 문의서와 시트 중에서 고르게 한다(이사님 지시 2026-11). */
export const SHEET_PRODUCTS: Record<string, { file: string; name: string; mailTag: Record<string, string> }> = {
  magnet: { file: 'magnet', name: 'Magnet', mailTag: { ko: '[자석 문의]', en: '[Magnet inquiry]', zh: '[磁铁询价]' } },
  feedthrough: {
    file: 'feedthrough',
    name: 'Feedthrough',
    mailTag: { ko: '[피드스루 문의]', en: '[Feedthrough inquiry]', zh: '[磁流体真空馈通询价]' },
  },
  'ff-semi': {
    file: 'ferrofluid',
    name: 'Ferrofluid',
    mailTag: { ko: '[자성유체 문의]', en: '[Ferrofluid inquiry]', zh: '[磁流体询价]' },
  },
}

const SHEET_LANG_NAME = { ko: 'Korean', en: 'English', zh: 'Chinese' } as const

/**
 * 시트 파일 이름 — OneDrive 원본과 같은 'Magnet Inquiry Sheet Korean Version' 꼴, 밑줄 없이 띄어쓰기만
 * (11/9 이사님: 밑줄이 있으면 파일 찾기가 힘들다). 내려받기·메일 첨부에 같이 쓴다.
 */
export function sheetFileName(formId: string, lang: string, suffix = ''): string {
  const name = SHEET_PRODUCTS[formId]?.name ?? 'MAGRON'
  return `${name} Inquiry Sheet ${SHEET_LANG_NAME[sheetLang(lang)]} Version${suffix}.docx`
}

export function sheetLang(lang: string): 'ko' | 'en' | 'zh' {
  return lang === 'en' || lang === 'zh' ? lang : 'ko'
}

/** 메일 제목에 제품명을 미리 넣는다 — 메일 클릭이 문의 경로 1위(10/10~11/6 GA4 70회)라서. */
export function inquiryMailto(target: InquiryTarget, lang: string, model?: string) {
  const tag = SHEET_PRODUCTS[target]?.mailTag[sheetLang(lang)] ?? '[MAGRON]'
  const subject = model ? `${tag} ${model}` : tag
  return `mailto:magron@magron.co.kr?subject=${encodeURIComponent(subject)}`
}
