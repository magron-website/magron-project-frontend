import { useCallback, useRef, useState } from 'react'
import i18n from '@/i18n'
import type { ChatMessage, ChatResponse } from '@/types/chat'

/**
 * The deployed chatbot backend. `.env` is gitignored, so a host that forgets to
 * set VITE_CHAT_API_URL falls back to production rather than to a localhost port
 * no visitor can reach — point the env var at 127.0.0.1 to develop against a
 * local server.
 */
const DEFAULT_API_BASE = 'https://magron-website-backend-production-1289.up.railway.app'

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
