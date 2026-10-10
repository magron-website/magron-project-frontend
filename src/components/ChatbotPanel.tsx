import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import chatbotImage from '@/assets/images/chatbot.webp'
import { useChat } from '@/hooks/useChat'
import '@/assets/design/chatbot-panel.css'

type ChatbotPanelProps = {
  isOpen: boolean
  onClose: () => void
  /**
   * PC: 화면을 덮지 않고 오른쪽에 붙는 창(배경 어둡게 X, 페이지 계속 스크롤·클릭 가능).
   * 휴대폰: 기존처럼 화면 전체를 덮는 서랍.
   */
  docked?: boolean
  /** 붙박이 창 위치·크기 — 본문과 겹치지 않게 ChatbotFloater 가 재서 넘긴다. */
  dockStyle?: CSSProperties
  /** 자동으로 열릴 때는 입력창에 포커스를 주지 않는다(휴대폰 키보드·스크롤 튐 방지). */
  autoFocus?: boolean
}

export default function ChatbotPanel({
  isOpen,
  onClose,
  docked = false,
  dockStyle,
  autoFocus = true,
}: ChatbotPanelProps) {
  const { t } = useTranslation('chatbot')
  const { messages, isLoading, sendMessage } = useChat()
  const [input, setInput] = useState('')
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages, isLoading])

  useEffect(() => {
    if (isOpen && autoFocus) {
      inputRef.current?.focus()
    }
  }, [isOpen, autoFocus])

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  const handleSubmit = () => {
    if (isLoading || !input.trim()) return
    void sendMessage(input)
    setInput('')
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSubmit()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {!docked && (
            <motion.div
              className="chat-panel__overlay"
              onClick={onClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
          <motion.aside
            className={`chat-panel${docked ? ' chat-panel--docked' : ''}`}
            style={docked ? dockStyle : undefined}
            role="dialog"
            aria-modal={docked ? 'false' : 'true'}
            aria-label={t('title')}
            initial={docked ? { opacity: 0, y: 16 } : { x: '100%' }}
            animate={docked ? { opacity: 1, y: 0 } : { x: 0 }}
            exit={docked ? { opacity: 0, y: 16 } : { x: '100%' }}
            transition={{ type: 'tween', ease: [0.4, 0, 0.2, 1], duration: docked ? 0.24 : 0.32 }}
          >
            <header className="chat-panel__header">
              <div className="chat-panel__brand">
                <img className="chat-panel__avatar" src={chatbotImage} alt="" />
                <div>
                  <p className="chat-panel__title">{t('title')}</p>
                  <p className="chat-panel__subtitle">{t('subtitle')}</p>
                </div>
              </div>
              <button
                type="button"
                className="chat-panel__close"
                onClick={onClose}
                aria-label={t('close')}
              >
                <span />
                <span />
              </button>
            </header>

            <div className="chat-panel__messages" ref={listRef}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`chat-message chat-message--${message.role}`}
                >
                  <div className="chat-message__bubble">
                    {message.role === 'bot' ? (
                      <div className="chat-markdown">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {message.text}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      message.text
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="chat-message chat-message--bot">
                  <div className="chat-message__bubble chat-message__bubble--typing">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}
            </div>

            <div className="chat-panel__composer">
              <textarea
                ref={inputRef}
                className="chat-panel__input"
                placeholder={t('placeholder')}
                rows={1}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                type="button"
                className="chat-panel__send"
                onClick={handleSubmit}
                disabled={isLoading || !input.trim()}
                aria-label={t('send')}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                  <path
                    d="M3.4 20.4 21 12 3.4 3.6 3.4 10l12.6 2-12.6 2z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
