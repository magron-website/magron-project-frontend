/** 챗봇 문의서(제품별 설문) 데이터 형식. 문구는 모두 한국어 원본이고, 화면 언어는 번역 사전으로 바꾼다. */

/** 착자 패턴처럼 그림을 눌러 고르는 선택지 */
export type InquiryPictureOption = { code: string; label: string; desc: string }

export type InquiryField =
  | { k: 'r' | 'c'; opts: string[]; label?: string } // 하나 고르기 / 여러 개 고르기
  | { k: 't' | 'a'; ph?: string; label?: string } // 한 줄 / 여러 줄 입력
  | { k: 'f'; label?: string } // 파일 첨부
  | { k: 'p'; opts: InquiryPictureOption[]; label?: string } // 그림 고르기

export type InquiryQuestion = {
  /** 화면에 보이는 질문 */
  q: string
  /** 담당자 메일에 쓰는 짧은 항목 이름(한국어) */
  k: string
  req: boolean
  fields: InquiryField[]
  notice?: string
  /** 특정 선택지를 고르면 보여 주는 안내(다른 문의서로 가는 #링크 포함 가능) */
  jump?: { opt: string; html: string }
}

export type InquiryGroup = { key: string; note: string; qs: InquiryQuestion[] }

export type InquiryForm = {
  id: string
  tab: string
  title: string
  intro: string
  info: string[]
  ex: [string, string][]
  req: InquiryQuestion[]
  opt: InquiryQuestion[]
  /** 첫 질문 답에 따라 이어지는 질문 묶음(답 = key) */
  groups?: InquiryGroup[]
  /** public/inquiry/{ko|en}/ 아래 참조 그림 */
  image?: string
  imageCaption?: string
}
