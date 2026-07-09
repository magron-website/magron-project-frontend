import { useCallback, useRef, useState } from 'react'
import type { ChatMessage, ChatResponse } from '@/types/chat'

const API_BASE = import.meta.env.VITE_CHAT_API_URL ?? 'http://127.0.0.1:8000'

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'bot',
  text: '안녕하세요! MAGRON 챗봇입니다. 제품이나 회사에 대해 궁금한 점을 물어보세요.',
}

function createId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.floor(Math.random() * 1e6)}`
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const sessionIdRef = useRef<string>(`chat-${createId()}`)

  const sendMessage = useCallback(async (rawText: string) => {
    const text = rawText.trim()
    if (!text) return

    const userMessage: ChatMessage = {
      id: createId(),
      role: 'user',
      text,
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          session_id: sessionIdRef.current,
        }),
      })

      if (!response.ok) {
        throw new Error(`서버 오류 (${response.status})`)
      }

      const data = (await response.json()) as ChatResponse

      if (data.session_id) {
        sessionIdRef.current = data.session_id
      }

      const botMessage: ChatMessage = {
        id: createId(),
        role: 'bot',
        text: data.reply ?? '답변을 가져오지 못했습니다.',
        sources: data.sources,
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (err) {
      const message =
        err instanceof Error ? err.message : '메시지를 전송하지 못했습니다.'
      console.error('Chat request failed:', message)
      setError(message)
      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: 'bot',
          text: '죄송합니다. 답변을 가져오는 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { messages, isLoading, error, sendMessage }
}
