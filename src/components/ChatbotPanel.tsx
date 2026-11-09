import { Fragment, useEffect, useRef, useState, type CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import chatbotImage from '@/assets/images/chatbot.webp'
import { useChat } from '@/hooks/useChat'
import InquiryForm from '@/components/InquiryForm'
import InquiryChooser from '@/components/InquiryChooser'
import { SHEET_PRODUCTS, type InquiryRequest } from '@/lib/inquiryOpener'
import type { InquiryForm as Form } from '@/types/inquiry'
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
  /** 제품 페이지 버튼으로 들어온 문의 — 바뀔 때마다 큰 문의 창을 그 제품으로 연다. */
  inquiryRequest?: (InquiryRequest & { nonce: number }) | null
}

/** 모델·재질 버튼에서 연 경우 문의서 첫 질문을 미리 채운다(필드 id = 섹션-질문-칸). */
function prefillFor(request: InquiryRequest | null | undefined, formId: string | null): Record<string, string> | undefined {
  if (!request || request.target !== formId) return undefined
  if (formId === 'magnet' && request.material) return { 'req-0-0': request.material }
  if (formId === 'feedthrough' && request.model) return { 'req-0-1': `MAGRON ${request.model}` }
  if (formId === 'ff-semi' && request.model) return { 'req-1-0': '마그론 모델', 'req-1-1': request.model }
  return undefined
}

export default function ChatbotPanel({
  isOpen,
  onClose,
  docked = false,
  dockStyle,
  autoFocus = true,
  inquiryRequest,
}: ChatbotPanelProps) {
  const { t, i18n } = useTranslation('chatbot')
  const { messages, isLoading, sendMessage, submitContact, submitInquiry } = useChat()
  const [input, setInput] = useState('')
  const [isContactOpen, setIsContactOpen] = useState(false)
  // 문의서: 'picker' = 제품 고르기, 'choose' = 문의 방법 고르기(웹 문의서·인콰이어리 시트·메일),
  // 'form' = 문의서 작성. choose·form 은 창이 크게 펼쳐진다.
  const [inquiryMode, setInquiryMode] = useState<'off' | 'picker' | 'choose' | 'form'>('off')
  const [formId, setFormId] = useState<string | null>(null)
  const inquiry = useInquiryData(inquiryMode !== 'off', i18n.language)
  const isExpanded = inquiryMode === 'form' || inquiryMode === 'choose'

  // 시트가 있는 제품(자석·피드스루·자성유체 씰용)은 먼저 방법을 고르게 하고, 나머지는 문의서로 바로
  const openForm = (id: string) => {
    setFormId(id)
    setInquiryMode(SHEET_PRODUCTS[id] ? 'choose' : 'form')
  }

  // 창을 닫으면 문의 화면도 접는다 — 다음에 챗봇을 열 때 큰 문의 창이 그대로 뜨지 않게
  useEffect(() => {
    if (!isOpen) setInquiryMode('off')
  }, [isOpen])

  useEffect(() => {
    if (!inquiryRequest) return
    setIsContactOpen(false)
    if (inquiryRequest.target === 'picker') setInquiryMode('picker')
    else openForm(inquiryRequest.target)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inquiryRequest])
  const expandedStyle = useExpandedStyle(isOpen && isExpanded)
  const activeForm = inquiry.forms?.find((form) => form.id === formId) ?? null
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  /*
   * 휴대폰 전체 화면 창: 자판이 올라오면 브라우저(특히 iOS)가 화면을 통째로 위로 밀어
   * 창 제목과 인사말이 화면 밖으로 사라졌다(2026-10-10 지적). 실제로 보이는 영역
   * (visualViewport)의 높이·위치에 창을 맞춰, 자판 위 남은 공간 안에서만 줄어들게 한다.
   */
  // React 상태로 높이를 넘기면 매 이벤트마다 다시 그려 열림 애니메이션이 중간에 멈췄다
  // (창이 옆에서 들어오다 걸림). 그래서 DOM 스타일을 직접 바꾼다.
  const panelRef = useRef<HTMLElement>(null)
  const scrollToFit = () => {
    if (!listRef.current) return
    // 인사말만 있을 땐 맨 위부터 — 인사말이 길어져(B안) 맨 아래로 내리면 첫 줄이 가려졌다.
    const onlyWelcome = messages.length <= 1 && !isLoading
    listRef.current.scrollTop = onlyWelcome ? 0 : listRef.current.scrollHeight
  }
  const scrollToFitRef = useRef(scrollToFit)
  scrollToFitRef.current = scrollToFit

  useEffect(() => {
    const viewport = window.visualViewport
    if (!isOpen || docked || !viewport) return
    const update = () => {
      const panel = panelRef.current
      if (!panel) return
      panel.style.height = `${viewport.height}px`
      panel.style.top = `${viewport.offsetTop}px`
      scrollToFitRef.current()
    }
    update()
    viewport.addEventListener('resize', update)
    viewport.addEventListener('scroll', update)
    return () => {
      viewport.removeEventListener('resize', update)
      viewport.removeEventListener('scroll', update)
    }
  }, [isOpen, docked])

  useEffect(() => {
    scrollToFit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, isLoading])

  useEffect(() => {
    if (isOpen && autoFocus) {
      inputRef.current?.focus()
    }
  }, [isOpen, autoFocus])

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (event: KeyboardEvent) => {
      // 문의 방법 고르기·문의서 작성 중에는 Esc 로 창이 닫히지 않게(시트 크게 보기도 Esc 로 닫는다)
      if (event.key === 'Escape' && inquiryMode !== 'form' && inquiryMode !== 'choose') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose, inquiryMode])

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
          {(!docked || isExpanded) && (
            <motion.div
              className={`chat-panel__overlay${isExpanded ? ' chat-panel__overlay--expanded' : ''}`}
              onClick={isExpanded ? undefined : onClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
          <motion.aside
            className={`chat-panel${docked ? ' chat-panel--docked' : ''}${isExpanded ? ' chat-panel--expanded' : ''}`}
            ref={panelRef}
            style={isExpanded ? expandedStyle : docked ? dockStyle : undefined}
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

            {isExpanded ? (
              inquiryMode === 'choose' && formId ? (
                <InquiryChooser
                  key={`${formId}-${inquiryRequest?.nonce ?? 0}`}
                  formId={formId}
                  formTitle={activeForm?.title ?? formId}
                  model={inquiryRequest?.target === formId ? inquiryRequest.model ?? inquiryRequest.material : undefined}
                  onPickForm={() => setInquiryMode('form')}
                  onClose={() => setInquiryMode('off')}
                  onSubmitSheet={async (payload) => {
                    const result = await submitInquiry(payload)
                    if (result.ok) setInquiryMode('off')
                    return result
                  }}
                />
              ) : activeForm && inquiry.tr ? (
                <InquiryForm
                  key={activeForm.id}
                  form={activeForm}
                  tr={inquiry.tr}
                  prefill={prefillFor(inquiryRequest, activeForm.id)}
                  onSwitchForm={(id) => setFormId(id)}
                  onBack={() => (SHEET_PRODUCTS[activeForm.id] ? setInquiryMode('choose') : setInquiryMode('picker'))}
                  onSubmit={async (payload) => {
                    const result = await submitInquiry(payload)
                    if (result.ok) setInquiryMode('off')
                    return result
                  }}
                />
              ) : (
                <p className="chat-panel__notice">{t('inquiryLoading')}</p>
              )
            ) : (
            <>
            <div className="chat-panel__messages" ref={listRef}>
              {messages.map((message, index) => (
                <Fragment key={message.id}>
                <div
                  className={`chat-message chat-message--${message.role}`}
                >
                  <div className="chat-message__bubble">
                    {message.role === 'bot' ? (
                      <div className="chat-markdown">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {message.text}
                        </ReactMarkdown>
                        {message.inquiryTarget && (
                          <button
                            type="button"
                            className="chat-message__inquiry"
                            onClick={() => {
                              const target = message.inquiryTarget!
                              if (target === 'picker') {
                                setInquiryMode('picker')
                              } else {
                                openForm(target)
                              }
                            }}
                          >
                            {t(`inquiryOpen.${message.inquiryTarget}`)}
                          </button>
                        )}
                      </div>
                    ) : (
                      message.text
                    )}
                  </div>
                </div>
                {/* 인사말 바로 아래 문의서 목록 — 챗봇을 열면 바로 제품을 눌러 문의서로 간다(2026-11-09 지시) */}
                {index === 0 && <QuickInquiryList onPick={openForm} />}
                </Fragment>
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

            {inquiryMode === 'picker' ? (
              <InquiryPicker
                forms={inquiry.forms}
                tr={inquiry.tr}
                onPick={(id) => openForm(id)}
                onCancel={() => setInquiryMode('off')}
              />
            ) : isContactOpen ? (
              <ContactForm
                onCancel={() => setIsContactOpen(false)}
                onSubmit={async (contact) => {
                  const result = await submitContact(contact)
                  if (result.ok) setIsContactOpen(false)
                  return result
                }}
              />
            ) : (
            <>
            <button
              type="button"
              className="chat-panel__contact-open chat-panel__inquiry-open"
              onClick={() => setInquiryMode('picker')}
            >
              {t('inquiryButton')}
            </button>
            <button
              type="button"
              className="chat-panel__contact-open"
              onClick={() => setIsContactOpen(true)}
            >
              {t('contactButton')}
            </button>

            {/* 질문·답변이 회사 메일로 전달되므로(백엔드 notifier) 방문자에게 미리 알린다. */}
            <p className="chat-panel__notice">{t('notice')}</p>

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
            </>
            )}
            </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

type ContactResult = { ok: true } | { ok: false; message: string }

/**
 * "담당자에게 답변 받기" 입력칸. 이메일(필수)·이름/회사(선택)·개인정보 동의(필수, 보유 1년).
 * 접수되면 대화 전체가 회사 메일로 가고, 답장 주소가 방문자 이메일로 잡힌다(백엔드 /api/contact).
 */
function ContactForm({
  onCancel,
  onSubmit,
}: {
  onCancel: () => void
  onSubmit: (contact: { email: string; name: string }) => Promise<ContactResult>
}) {
  const { t } = useTranslation('chatbot')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [consent, setConsent] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const isEmailValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!isEmailValid || !consent || isSending) return
    setIsSending(true)
    setErrorMessage(null)
    const result = await onSubmit({ email, name })
    setIsSending(false)
    if (!result.ok) setErrorMessage(result.message)
  }

  return (
    <form className="chat-contact" onSubmit={handleSubmit}>
      <p className="chat-contact__title">{t('contactTitle')}</p>
      <input
        className="chat-contact__input"
        type="email"
        required
        autoComplete="email"
        placeholder={t('contactEmail')}
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        className="chat-contact__input"
        type="text"
        autoComplete="organization"
        placeholder={t('contactName')}
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <label className="chat-contact__consent">
        <input
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
        />
        <span>
          <b>{t('contactConsent')}</b>
          <br />
          {t('contactConsentDetail')}
        </span>
      </label>
      {errorMessage && <p className="chat-contact__error">{errorMessage}</p>}
      <div className="chat-contact__actions">
        <button type="button" className="chat-contact__cancel" onClick={onCancel}>
          {t('contactCancel')}
        </button>
        <button
          type="submit"
          className="chat-contact__submit"
          disabled={!isEmailValid || !consent || isSending}
        >
          {isSending ? t('contactSending') : t('contactSubmit')}
        </button>
      </div>
    </form>
  )
}

/**
 * 제품 고르기 순서(2026-11-09 사용자 지시): 1 자성유체 → 2 자석 → 3 피드스루 → 4 Mag Oil → 5 디스플레이(키트)
 * → 6 피에조·전도성 잉크. 자성유체는 씰용(반도체·진공)을 먼저, 그 외 용도를 바로 아래에 둔다.
 */
const PICKER_LAYOUT: (string | { group: string; ids: string[] })[] = [
  { group: 'ferrofluid', ids: ['ff-semi', 'ff-other'] },
  'magnet',
  'feedthrough',
  'magoil',
  'kit',
  'ink',
]

/**
 * 챗봇 인사말 아래 작은 "문의서 바로 열기" 버튼들(2열). 번호 순서는 PICKER_LAYOUT 과 같다.
 * 목록이 크면 방문자가 "이걸 꼭 눌러야 하나?" 싶어 질문을 안 해서(2026-11-09) 한 줄짜리 버튼으로 줄이고,
 * 설명은 마우스를 올리면(title) 보이게 했다. 아래 한 줄로 "질문은 입력창에" 를 안내한다.
 */
function QuickInquiryList({ onPick }: { onPick: (id: string) => void }) {
  const { t } = useTranslation('chatbot')
  const items = PICKER_LAYOUT.flatMap((entry, i) =>
    typeof entry === 'string'
      ? [{ id: entry, n: i + 1, label: t(`quickName.${entry}`) }]
      : entry.ids.map((id) => ({ id, n: i + 1, label: `${t('inquiryPickFerrofluid')} · ${t(`quickName.${id}`)}` })),
  )
  return (
    <div className="chat-quick">
      <p className="chat-quick__title">{t('quickTitle')}</p>
      <ul className="chat-quick__list">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className="chat-quick__item"
              title={t(`quickDesc.${item.id}`)}
              onClick={() => onPick(item.id)}
            >
              <span className="chat-quick__num">{item.n}</span>
              <span className="chat-quick__label">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
      <p className="chat-quick__sub">{t('quickSub')}</p>
    </div>
  )
}

function InquiryPicker({
  forms,
  tr,
  onPick,
  onCancel,
}: {
  forms: Form[] | null
  tr: ((ko: string) => string) | null
  onPick: (id: string) => void
  onCancel: () => void
}) {
  const { t } = useTranslation('chatbot')
  if (!forms || !tr) return <p className="chat-panel__notice">{t('inquiryLoading')}</p>
  const item = (id: string, n?: number) => {
    const form = forms.find((f) => f.id === id)
    if (!form) return null
    return (
      <button key={id} type="button" className="inq-picker__item" onClick={() => onPick(id)}>
        <b>
          {n ? `${n}. ` : ''}
          {id === 'ink' ? t('inquiryPickInk') : tr(form.tab)}
        </b>
        <small>{tr(form.title)}</small>
      </button>
    )
  }
  return (
    <div className="inq-picker">
      <p className="inq-picker__title">{t('inquiryPickTitle')}</p>
      <div className="inq-picker__list">
        {PICKER_LAYOUT.map((entry, i) =>
          typeof entry === 'string' ? (
            item(entry, i + 1)
          ) : (
            <div key={entry.group} style={{ display: 'contents' }}>
              <p className="inq-picker__group">
                {i + 1}. {t('inquiryPickFerrofluid')}
              </p>
              {entry.ids.map((id) => item(id))}
            </div>
          ),
        )}
      </div>
      <button type="button" className="inq-picker__cancel" onClick={onCancel}>
        {t('inquiryPickCancel')}
      </button>
    </div>
  )
}

/**
 * 문의서 데이터(약 100KB)와 번역 사전은 처음 문의서를 열 때만 불러온다 — 챗봇만 쓰는 방문자의
 * 첫 화면 용량을 늘리지 않기 위해. 사전에 없는 문구는 한국어 원문 그대로 보인다.
 */
function useInquiryData(active: boolean, lang: string) {
  const [forms, setForms] = useState<Form[] | null>(null)
  const [dict, setDict] = useState<{ lang: string; map: Record<string, string> } | null>(null)

  useEffect(() => {
    if (!active || forms) return
    void import('@/data/inquiryForms').then((mod) => setForms(mod.default))
  }, [active, forms])

  useEffect(() => {
    if (!active || dict?.lang === lang) return
    if (lang !== 'en' && lang !== 'zh') {
      setDict({ lang, map: {} })
      return
    }
    const load = lang === 'zh' ? import('@/data/inquiry-i18n/zh.json') : import('@/data/inquiry-i18n/en.json')
    void load.then((mod) => setDict({ lang, map: mod.default as Record<string, string> }))
  }, [active, lang, dict])

  const tr = dict && dict.lang === lang ? (ko: string) => dict.map[ko] ?? ko : null
  return { forms, tr }
}

/**
 * 펼친 창 크기 — 화면 가운데 큰 창(최대 1100px). 사이트 전체 zoom(1920 화면 0.75) 때문에
 * 화면 픽셀을 zoom 으로 나눠 넣는다(붙박이 창 useDockStyle 과 같은 방식). 휴대폰은 전체 화면.
 */
function useExpandedStyle(active: boolean): CSSProperties | undefined {
  const [style, setStyle] = useState<CSSProperties>()
  useEffect(() => {
    if (!active) return
    const update = () => {
      const zoom = parseFloat(getComputedStyle(document.documentElement).zoom) || 1
      const vw = document.documentElement.clientWidth
      const vh = window.innerHeight
      if (vw < 768) {
        setStyle({ top: 0, left: 0, right: 'auto', width: vw / zoom, maxWidth: 'none', height: vh / zoom })
        return
      }
      // 11/7 사용자: "컴퓨터 화면은 더 크게, 저만해지게" — 화면 거의 전체(가로 92%·세로 94%)를 쓴다.
      // 아주 넓은 모니터에서 줄이 너무 길어지지 않게 2200px(화면 픽셀)에서만 멈춘다.
      const width = Math.min(vw * 0.83, 2000) // 11/7 "너무 큼, 10% 줄여" — 92% → 83%
      const height = vh * 0.85
      setStyle({
        top: (vh - height) / 2 / zoom,
        left: (vw - width) / 2 / zoom,
        right: 'auto',
        width: width / zoom,
        maxWidth: 'none',
        height: height / zoom,
      })
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [active])
  return active ? style : undefined
}
