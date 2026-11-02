export type ChatRole = 'user' | 'bot'

export type ChatSource = {
  source: string
  content: string
  score: number
}

export type ChatTool = {
  name: string
  description: string
  used: boolean
}

export type ChatResponse = {
  reply: string
  intent: string
  confidence: number
  is_company_info: boolean
  route: string
  tools: ChatTool[]
  sources: ChatSource[]
  session_id: string
}

export type ChatMessage = {
  id: string
  role: ChatRole
  text: string
  sources?: ChatSource[]
  /** 질문에 제품 이름이 있을 때 권하는 문의서 id('picker' = 제품 고르기) */
  inquiryTarget?: string
}
