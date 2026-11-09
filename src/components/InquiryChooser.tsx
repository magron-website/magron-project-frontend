import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import type { InquiryContact, InquiryFile, InquiryPayload, InquiryResult } from '@/components/InquiryForm'
import SheetWebForm from '@/components/SheetWebForm'
import { SHEET_PRODUCTS, inquiryMailto, sheetFileName, sheetLang } from '@/lib/inquiryOpener'
import { trackEvent } from '@/lib/analytics'
import '@/assets/design/inquiry-chooser.css'

/**
 * 문의 방법 고르기(2026-11-07, 이사님 지시: "설문지와 인콰이어리 시트 중 하나를 고르게, 시트는 화면에 띄워 준다").
 * - 웹 문의서: 질문을 따라가며 고르는 기존 문의서(InquiryForm)
 * - 인콰이어리 시트: Word 한 장 — 미리보기를 보여 주고, 내려받아 채운 파일을 여기서 첨부해 보낸다
 * - 메일: 제품명이 제목에 들어간 메일 쓰기(실제로 가장 많이 쓰는 경로)
 */
export default function InquiryChooser({
  formId,
  formTitle,
  model,
  onPickForm,
  onClose,
  onSubmitSheet,
}: {
  formId: string
  /** 담당자 메일 제목용 한국어 문의서 이름 */
  formTitle: string
  model?: string
  onPickForm: () => void
  onClose: () => void
  onSubmitSheet: (payload: InquiryPayload) => Promise<InquiryResult>
}) {
  const { t, i18n } = useTranslation('chatbot')
  const [view, setView] = useState<'choose' | 'websheet' | 'sheet'>('choose')
  const [zoomed, setZoomed] = useState(false)
  const sheet = SHEET_PRODUCTS[formId]
  const lang = sheetLang(i18n.language)
  const base = `${import.meta.env.BASE_URL}inquiry-sheets/${sheet?.file}-${lang}`
  const docUrl = `${base}.docx`
  const docName = sheetFileName(formId, lang)
  const previewUrl = `${base}.jpg`
  const choice = (kind: 'form' | 'websheet' | 'sheet' | 'sheet_download' | 'mail') =>
    trackEvent('inquiry_choice', { product: formId, choice: kind })

  useEffect(() => {
    if (!zoomed) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setZoomed(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [zoomed])

  if (view === 'websheet') {
    return (
      <SheetWebForm
        formId={formId}
        formTitle={formTitle}
        model={model}
        onBack={() => setView('choose')}
        onSubmit={onSubmitSheet}
      />
    )
  }

  if (view === 'sheet') {
    return (
      <SheetUpload
        formId={formId}
        formTitle={formTitle}
        model={model}
        docUrl={docUrl}
        docName={docName}
        onBack={() => setView('choose')}
        onSubmit={onSubmitSheet}
      />
    )
  }

  return (
    <div className="inq-choose">
      <div className="inq-choose__head">
        <div className="inq-choose__headline">
          <p className="inq-choose__title">{t('chooseTitle')}</p>
          <p className="inq-choose__sub">{t('chooseSub')}</p>
        </div>
        <button type="button" className="inq-choose__close" onClick={onClose}>
          ✕ {t('inquiryBack')}
        </button>
        {model ? <p className="inq-choose__model">{t('chooseModel', { model })}</p> : null}
      </div>

      <div className="inq-choose__grid">
        <button
          type="button"
          className="inq-choose__card inq-choose__card--form"
          onClick={() => {
            choice('form')
            onPickForm()
          }}
        >
          <CardHead icon="form" n={1} badge={t('chooseFormBadge')} title={t('chooseFormTitle')} />
          <span className="inq-choose__desc">{t('chooseFormDesc')}</span>
          <span className="inq-choose__btn inq-choose__btn--primary inq-choose__btn--wide inq-choose__btn--push">
            {t('chooseFormGo')} →
          </span>
        </button>

        {sheet ? (
          <div className="inq-choose__card inq-choose__card--sheet">
            <CardHead icon="sheet" n={2} badge={t('chooseSheetBadge')} title={t('chooseSheetTitle')} />
            <span className="inq-choose__desc">{t(`chooseSheetDesc.${formId}`, { defaultValue: t('chooseSheetDescDefault') })}</span>
            <button
              type="button"
              className="inq-choose__preview"
              onClick={() => setZoomed(true)}
              aria-label={t('chooseSheetZoom')}
            >
              <img src={previewUrl} alt={t('chooseSheetPreviewAlt')} loading="lazy" />
              <span>{t('chooseSheetZoom')}</span>
            </button>
            {/* 기본은 웹에서 바로 채우기 — Word 내려받기·작성 파일 첨부는 오프라인으로 쓰는 분용 */}
            <button
              type="button"
              className="inq-choose__btn inq-choose__btn--primary inq-choose__btn--wide"
              onClick={() => {
                choice('websheet')
                setView('websheet')
              }}
            >
              {t('chooseSheetWeb')} →
            </button>
            <div className="inq-choose__actions inq-choose__actions--sub">
              <a href={docUrl} download={docName} onClick={() => choice('sheet_download')}>
                {t('chooseSheetDownload')}
              </a>
              <button
                type="button"
                onClick={() => {
                  choice('sheet')
                  setView('sheet')
                }}
              >
                {t('chooseSheetSend')}
              </button>
            </div>
          </div>
        ) : null}

        <QuickInquiry
          formId={formId}
          formTitle={formTitle}
          model={model}
          onSent={() => choice('mail')}
          onSubmit={onSubmitSheet}
        />
      </div>

      {zoomed ? (
        <div className="inq-choose__zoom" role="dialog" aria-label={t('chooseSheetPreviewAlt')} onClick={() => setZoomed(false)}>
          <div className="inq-choose__zoom-bar">
            <a href={docUrl} download={docName} onClick={(event) => { event.stopPropagation(); choice('sheet_download') }}>
              {t('chooseSheetDownload')}
            </a>
            <button type="button" onClick={() => setZoomed(false)}>
              {t('close')}
            </button>
          </div>
          <img src={previewUrl} alt={t('chooseSheetPreviewAlt')} onClick={(event) => event.stopPropagation()} />
        </div>
      ) : null}
    </div>
  )
}

/** 카드 머리 — 번호 + 아이콘 + 대상 배지 + 제목 (한눈에 셋을 구별하게 크게) */
function CardHead({ icon, n, badge, title }: { icon: 'form' | 'sheet' | 'mail'; n: number; badge: string; title: string }) {
  const paths: Record<typeof icon, ReactNode> = {
    form: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M8.5 8h7M8.5 12h7M8.5 16h4" />
      </>
    ),
    sheet: (
      <>
        <path d="M6 3h8l4 4v14H6z" />
        <path d="M14 3v4h4M9 12l2 2 4-4M9 17h6" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
  }
  // "이럴 때 고르세요"가 먼저 눈에 들어오게 — 카드 맨 위 큰 띠(11/7 "이 문구 더 크게, 아 이럴 때 이거 선택하는구나")
  return (
    <>
      <span className={`inq-choose__when inq-choose__when--${icon}`}>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m5 12.5 4.5 4.5L19 7.5" />
        </svg>
        {badge}
      </span>
      <span className="inq-choose__cardhead">
        <span className={`inq-choose__icon inq-choose__icon--${icon}`} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            {paths[icon]}
          </svg>
          <em>{n}</em>
        </span>
        <b className="inq-choose__cardtitle">{title}</b>
      </span>
    </>
  )
}

/**
 * 간단 문의(11/7 사용자 요청: "이메일 주소만 입력하면 챗봇 메일처럼 우리한테 오게").
 * 메일 앱을 띄우는 대신 이메일 + 궁금한 점만 받아 문의서와 같은 /api/inquiry 로 보낸다 →
 * 공유 사서함에 [챗봇 문의서] 메일로 도착하고, 답장하면 방문자 이메일로 간다(Reply-To).
 */
function QuickInquiry({
  formId,
  formTitle,
  model,
  onSent,
  onSubmit,
}: {
  formId: string
  formTitle: string
  model?: string
  onSent: () => void
  onSubmit: (payload: InquiryPayload) => Promise<InquiryResult>
}) {
  const { t, i18n } = useTranslation('chatbot')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState(model ? `${t('sheetModelPrefix')} ${model}\n` : '')
  const [consent, setConsent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSending, setIsSending] = useState(false)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (isSending) return
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) return setError(t('inquiryEmailInvalid'))
    if (!message.trim()) return setError(t('quickNoMessage'))
    if (!consent) return setError(t('quickNeedConsent'))
    setError(null)
    setIsSending(true)
    const result = await onSubmit({
      formId: `${formId}-quick`,
      formTitle: `${formTitle} · 간단 문의`,
      // 서버가 회사·이름·국가를 필수로 받는다 — 간단 문의는 적지 않으니 표시만 해 둔다
      contact: { company: '(미기재)', name: '(미기재)', email: email.trim(), place: '(미기재)', tel: '' },
      answers: [{ q: '문의 내용', a: message.trim() }],
      missing: [],
      files: [],
    })
    setIsSending(false)
    if (result.ok) onSent()
    else setError(result.message)
  }

  return (
    <form className="inq-choose__card inq-choose__card--mail" onSubmit={handleSubmit} noValidate>
      <CardHead icon="mail" n={3} badge={t('chooseMailBadge')} title={t('chooseMailTitle')} />
      <span className="inq-choose__desc">{t('chooseMailDesc')}</span>
      <input
        className="inq-quick__input"
        type="email"
        autoComplete="email"
        placeholder={t('inquiryEmail')}
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <textarea
        className="inq-quick__input"
        rows={4}
        placeholder={t('quickMessage')}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <label className="inq-quick__consent">
        <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
        <span>{t('quickConsent')}</span>
      </label>
      {error ? <p className="inq-sheet__error">{error}</p> : null}
      <button type="submit" className="inq-choose__btn inq-choose__btn--primary inq-choose__btn--wide" disabled={isSending}>
        {isSending ? t('inquirySending') : `${t('quickSend')} →`}
      </button>
      <a className="inq-quick__mailto" href={inquiryMailto(formId, i18n.language, model)}>
        {t('quickMailApp')}
      </a>
    </form>
  )
}

// InquiryForm 과 같은 한도 — Graph sendMail 한 번에 4MB(base64 1.33배)
const MAX_TOTAL_BYTES = 2.5 * 1024 * 1024

/** 작성한 인콰이어리 시트 보내기 — 연락처 + 파일 + 메모만. 접수는 문의서와 같은 /api/inquiry. */
function SheetUpload({
  formId,
  formTitle,
  model,
  docUrl,
  docName,
  onBack,
  onSubmit,
}: {
  formId: string
  formTitle: string
  model?: string
  docUrl: string
  docName: string
  onBack: () => void
  onSubmit: (payload: InquiryPayload) => Promise<InquiryResult>
}) {
  const { t } = useTranslation('chatbot')
  const [contact, setContact] = useState<InquiryContact>({ company: '', name: '', email: '', place: '', tel: '' })
  const [files, setFiles] = useState<File[]>([])
  const [memo, setMemo] = useState(model ? `${t('sheetModelPrefix')} ${model}` : '')
  const [consent, setConsent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSending, setIsSending] = useState(false)

  const pick = (list: FileList | null) => {
    const picked = list ? Array.from(list).slice(0, 5) : []
    if (picked.reduce((sum, f) => sum + f.size, 0) > MAX_TOTAL_BYTES) {
      setError(t('inquiryFileLimit'))
      return
    }
    setError(null)
    setFiles(picked)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (isSending) return
    const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(contact.email.trim())
    if (!files.length) return setError(t('sheetNoFile'))
    if (!contact.company.trim() || !contact.name.trim() || !contact.email.trim() || !contact.place.trim() || !consent)
      return setError(t('inquiryContactRequired'))
    if (!emailOk) return setError(t('inquiryEmailInvalid'))
    setError(null)
    setIsSending(true)
    const encoded = await Promise.all(
      files.map(
        (file) =>
          new Promise<InquiryFile>((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () =>
              resolve({ name: file.name, type: file.type || 'application/octet-stream', data: String(reader.result).split(',')[1] ?? '' })
            reader.onerror = () => reject(reader.error)
            reader.readAsDataURL(file)
          }),
      ),
    )
    // 담당자 메일은 한국어로 — 항목 이름은 한국어 고정
    const answers = [{ q: '제출 방식', a: `인콰이어리 시트 첨부 (${files.map((f) => f.name).join(', ')})` }]
    if (memo.trim()) answers.push({ q: '메모', a: memo.trim() })
    const result = await onSubmit({
      formId: `${formId}-sheet`,
      formTitle: `${formTitle} · 인콰이어리 시트`,
      contact: Object.fromEntries(Object.entries(contact).map(([k, v]) => [k, v.trim()])) as InquiryContact,
      answers,
      missing: [],
      files: encoded,
    })
    setIsSending(false)
    if (!result.ok) setError(result.message)
  }

  const field = (key: keyof InquiryContact, label: string, required = true, type = 'text') => (
    <label className="inq-sheet__field">
      <span>
        {label}
        {required ? ' *' : ''}
      </span>
      <input
        type={type}
        value={contact[key]}
        onChange={(event) => setContact((prev) => ({ ...prev, [key]: event.target.value }))}
      />
    </label>
  )

  return (
    <form className="inq-sheet" onSubmit={handleSubmit} noValidate>
      <div className="inq-choose__head">
        <p className="inq-choose__title">{t('sheetTitle')}</p>
        <button type="button" className="inq-choose__close" onClick={onBack}>
          ← {t('sheetBack')}
        </button>
      </div>
      <ol className="inq-sheet__steps">
        <li>
          {t('sheetStep1')}{' '}
          <a href={docUrl} download={docName}>
            {t('chooseSheetDownload')}
          </a>
        </li>
        <li>{t('sheetStep2')}</li>
        <li>{t('sheetStep3')}</li>
      </ol>
      <label className="inq-sheet__file">
        <span>{t('sheetFile')} *</span>
        <input type="file" multiple accept=".doc,.docx,.pdf,.jpg,.jpeg,.png,.xlsx,.zip" onChange={(event) => pick(event.target.files)} />
        {files.length ? <small>{files.map((f) => f.name).join(', ')}</small> : null}
      </label>
      <div className="inq-sheet__grid">
        {field('company', t('inquiryCompany'))}
        {field('name', t('inquiryName'))}
        {field('email', t('inquiryEmail'), true, 'email')}
        {field('place', t('inquiryPlace'))}
        {field('tel', t('inquiryTel'), false, 'tel')}
      </div>
      <label className="inq-sheet__field">
        <span>{t('sheetMemo')}</span>
        <textarea rows={3} value={memo} onChange={(event) => setMemo(event.target.value)} />
      </label>
      <label className="inq-sheet__consent">
        <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
        <span>
          <b>{t('inquiryConsent')}</b>
          <br />
          {t('inquiryConsentDetail')}
        </span>
      </label>
      {error ? <p className="inq-sheet__error">{error}</p> : null}
      <button type="submit" className="inq-choose__btn inq-choose__btn--primary inq-sheet__submit" disabled={isSending}>
        {isSending ? t('inquirySending') : t('inquirySubmit')}
      </button>
    </form>
  )
}
