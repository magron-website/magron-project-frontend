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

/**
 * 질문을 쓴 언어(2026-11-16): 한국어 화면에서 영어로 물으면 답은 영어로 오는데 문의서 안내·문의서는
 * 화면 언어(한국어)로 떠서 섞였다. 사용자 방침(서버 _reply_lang 과 같은 규칙): 한국어→ko, 중국어→zh,
 * 그 밖의 언어는 전부 en — 일본어(가나가 섞이면 한자가 있어도), 러시아어·베트남어·태국어·아랍어 등.
 * 숫자·기호뿐이라 언어를 알 수 없을 때만 화면 언어.
 */
export function detectMessageLang(text: string, fallback: string): 'ko' | 'en' | 'zh' {
  if (/[가-힣]/.test(text)) return 'ko'
  if (/[぀-ヿ]/.test(text)) return 'en'
  if (/[一-鿿]/.test(text)) return 'zh'
  if (/\p{L}/u.test(text)) return 'en'
  return fallback === 'en' || fallback === 'zh' ? fallback : 'ko'
}

/*
 * 답변 밑에 이메일 한 칸을 띄울지(2026-11-21). 살 마음이 보이는 질문(가격·수량·납기·구매·샘플)이거나
 * 챗봇이 "담당자가 확인"으로 넘긴 답변이면 띄운다. 그동안 이런 방문자가 연락처 없이 나가
 * 회신할 길이 없었다(11/1 네오디뮴 30×30×30 견적, 피에조 잉크 MOQ, 11/20 N40UH 등).
 * 답변 끝 꼬리 문구('담당자에게 답변 받기')는 매번 붙으므로 그 표현은 보지 않는다.
 */
const BUYING_INTENT =
  /가격|단가|견적|얼마|비용|최소\s*(?:주문|구매|수량)|moq|수량|납기|배송|구매|주문|발주|샘플|사고\s*싶|살\s*수|\bprices?\b|\bcosts?\b|quot(?:e|ation)|how\s+much|minimum\s+order|lead\s*time|delivery|\bbuy\b|purchas|\border\b|\bsamples?\b|\bwe\s+need\b|\bi\s+need\b|looking\s+for|suppl(?:y|ier)|\bpcs\b|价格|價格|报价|報價|多少钱|起订|最小|交期|交货|购买|購買|订购|訂購|样品|樣品|采购/i
const HANDOFF =
  /담당자가\s*(?:정확히\s*)?확인|확인해서\s*메일|team\s+(?:will|can)\s+(?:check|confirm|get)|get\s+you\s+the\s+details|工作人员.{0,8}确认|团队.{0,8}确认/i

export function needsContact(question: string, reply: string): boolean {
  return BUYING_INTENT.test(question) || HANDOFF.test(reply)
}

export function detectInquiryTarget(text: string): InquiryTarget | null {
  for (const [pattern, target] of RULES) {
    if (pattern.test(text)) return target
  }
  if (FERROFLUID.test(text)) return SEAL_USE.test(text) ? 'ff-semi' : 'picker'
  return null
}
