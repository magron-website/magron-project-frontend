/**
 * 방문자 질문에 제품 이름이 나오면 맞는 문의서를 바로 권한다(2026-11-02 사용자 방침:
 * "자성유체면 자성유체, 피드스루면 피드스루 문의서를 바로 준다").
 * 서버 답변과 상관없이 화면에서 판단하므로 답변이 늦거나 실패해도 문의서 안내는 뜬다.
 * 순서가 중요하다 — 구체적인 제품(피드스루·Mag Oil·키트·잉크·자석)을 먼저 보고,
 * 자성유체는 반도체·진공 씰 용도면 씰용 문의서, 용도가 없으면 제품 고르기를 연다.
 */

/** 문의서 id, 또는 'picker'(제품 고르기) */
export type InquiryTarget = string

const RULES: [RegExp, InquiryTarget][] = [
  [/피드\s?스루|피드\s?쓰루|feed\s?-?through|磁流体密封传动|旋转导入|回转导入/i, 'feedthrough'],
  [/mag\s?-?oil|맥\s?오일|낚시|다이와|daiwa|fishing|\breels?\b|渔轮|鱼线轮|钓鱼/i, 'magoil'],
  [/키트|디스플레이|\bkits?\b|display|套件|展示/i, 'kit'],
  [/잉크|\binks?\b|油墨|压阻|压电/i, 'ink'],
  [/자석|마그넷|네오디뮴|사마륨|페라이트|알니코|magnet(?!ic)|ndfeb|smco|ferrite|alnico|磁铁|磁体|钕铁硼|钐钴|铁氧体/i, 'magnet'],
]
const FERROFLUID = /자성\s?유체|페로\s?플루이드|ferro\s?fluid|magnetic\s+fluid|磁流体|\bpfpe\b|\bmf[fsh]-?\w*/i
// PFPE(MFF-M)는 반도체 씰용 제품이라 용도를 안 써도 씰용 문의서로 보낸다.
const SEAL_USE = /반도체|진공|씰|실링|밀봉|cvd|ald|에칭|식각|스퍼터|semiconductor|vacuum|seal|etch|sputter|半导体|真空|密封|刻蚀|\bpfpe\b|\bmff-?m/i

export function detectInquiryTarget(text: string): InquiryTarget | null {
  for (const [pattern, target] of RULES) {
    if (pattern.test(text)) return target
  }
  if (FERROFLUID.test(text)) return SEAL_USE.test(text) ? 'ff-semi' : 'picker'
  return null
}
