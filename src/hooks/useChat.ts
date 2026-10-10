import { useCallback, useEffect, useRef, useState } from 'react'
import i18n from '@/i18n'
import type { ChatMessage, ChatResponse } from '@/types/chat'
import { trackEvent } from '@/lib/analytics'

/**
 * The deployed chatbot backend. `.env` is gitignored, so a host that forgets to
 * set VITE_CHAT_API_URL falls back to production rather than to a localhost port
 * no visitor can reach — point the env var at 127.0.0.1 to develop against a
 * local server.
 */
const DEFAULT_API_BASE = 'https://magron-website-backend-production.up.railway.app'

/** Trailing slashes would otherwise produce a double-slashed `//api/chat`. */
const API_BASE = (import.meta.env.VITE_CHAT_API_URL || DEFAULT_API_BASE).replace(/\/+$/, '')

function createWelcomeMessage(): ChatMessage {
  return {
    id: 'welcome',
    role: 'bot',
    text: i18n.t('messages:chatWelcome'),
  }
}

function createId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.floor(Math.random() * 1e6)}`
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [createWelcomeMessage()])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const sessionIdRef = useRef<string>(`chat-${createId()}`)

  // 첫 인사말은 처음 그릴 때의 언어로 고정돼서, KOR→ENG 로 바꿔도 한국어로 남았다.
  // PC 에선 창이 늘 열려 있어 바로 보이므로 언어가 바뀌면 인사말만 다시 쓴다.
  useEffect(() => {
    const refreshWelcome = () =>
      setMessages((prev) =>
        prev.map((m) => (m.id === 'welcome' ? { ...m, text: i18n.t('messages:chatWelcome') } : m)),
      )
    refreshWelcome()
    i18n.on('languageChanged', refreshWelcome)
    return () => i18n.off('languageChanged', refreshWelcome)
  }, [])

  const sendMessage = useCallback(async (rawText: string) => {
    const text = rawText.trim()
    if (!text) return

    const userMessage: ChatMessage = {
      id: createId(),
      role: 'user',
      text,
    }

    setMessages((prev) => [...prev, userMessage])
    // 질문 내용은 보내지 않는다(개인정보가 섞일 수 있다). 횟수만 센다.
    trackEvent('chat_message')
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          session_id: sessionIdRef.current,
          // 챗봇이 질문 언어가 애매할 때 따를 화면 언어(ko/en/zh). 서버가 모르는 필드면 무시된다.
          lang: i18n.language,
          // 서버가 질문·답변을 회사 메일로 알릴 때 "어느 페이지에서 물었는지" 표시용.
          page: window.location.pathname,
        }),
      })

      if (!response.ok) {
        throw new Error(i18n.t('messages:chatServerError', { status: response.status }))
      }

      const data = (await response.json()) as ChatResponse

      if (data.session_id) {
        sessionIdRef.current = data.session_id
      }

      const botMessage: ChatMessage = {
        id: createId(),
        role: 'bot',
        text: data.reply ?? i18n.t('messages:chatNoReply'),
        sources: data.sources,
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (err) {
      const message =
        err instanceof Error ? err.message : i18n.t('messages:chatSendFailed')
      console.error('Chat request failed:', message)
      setError(message)
      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: 'bot',
          text: i18n.t('messages:chatBotError'),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { messages, isLoading, error, sendMessage }
}
