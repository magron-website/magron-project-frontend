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
}
