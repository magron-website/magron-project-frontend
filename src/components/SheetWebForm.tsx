import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import type { InquiryContact, InquiryFile, InquiryPayload, InquiryResult } from '@/components/InquiryForm'
import { sheetLang } from '@/lib/inquiryOpener'

/**
 * 인콰이어리 시트를 웹에서 바로 채우기(2026-11-07 사용자 요청: "웹 문의서처럼 웹에서 다 가능하고 저장하면 우리한테 오도록").
 * 칸 배치는 Word 시트 그대로다 — scripts/build-inquiry-sheets.mjs 가 docx 표를 src/data/inquiry-sheets/*.json 으로 옮긴다.
 * ☐ 는 눌러서 체크, 빈칸·밑줄은 바로 입력. 쓰는 동안 이 브라우저에 임시 저장되고, [저장하고 보내기]를 누르면
 * 문의서와 같은 /api/inquiry 로 회사 메일에 도착한다(담당자 메일은 항목 이름이 시트 언어 그대로).
 */

type Token =
  | { t: 'text'; v: string }
  | { t: 'check'; label: string }
  | { t: 'blank'; w: number }
  | { t: 'br' }
  | { t: 'img'; src: string }
type Cell = { span: number; kind: 'head' | 'label' | 'content' | 'input'; tokens: Token[]; merged?: boolean }
type Block = { type: 'p'; tokens: Token[]; strong?: boolean } | { type: 'table'; cols: number; rows: Cell[][] }
type Sheet = { product: string; lang: string; blocks: Block[] }

const loaders = import.meta.glob<{ default: Sheet }>('../data/inquiry-sheets/*.json')
const FILE: Record<string, string> = { magnet: 'magnet', feedthrough: 'feedthrough', 'ff-semi': 'ferrofluid' }
const MAX_TOTAL_BYTES = 2.5 * 1024 * 1024

const textOf = (tokens: Token[]) =>
  tokens
    .map((tk) => (tk.t === 'text' ? tk.v : tk.t === 'check' ? tk.label : ' '))
    .join('')
    .replace(/\s+/g, ' ')
    .trim()

/** 입력이 있는 칸마다 메일에 쓸 항목 이름 — 같은 줄에서 그 칸 바로 앞의 글자 칸들 */
type Field = { key: string; label: string; cell: Cell }
function collectFields(sheet: Sheet): Field[] {
  const fields: Field[] = []
  sheet.blocks.forEach((block, bi) => {
    if (block.type !== 'table') return
    let section = ''
    block.rows.forEach((row, ri) => {
      if (row.length === 1 && row[0].kind === 'head') section = textOf(row[0].tokens)
      let labelParts: string[] = []
      row.forEach((cell, ci) => {
        const hasInput = cell.kind === 'input' || cell.tokens.some((tk) => tk.t === 'check' || tk.t === 'blank')
        if (!hasInput) {
          if (cell.kind !== 'head' && cell.tokens.length) labelParts.push(textOf(cell.tokens))
          return
        }
        if (cell.merged) return
        fields.push({ key: `${bi}-${ri}-${ci}`, label: labelParts.join(' ') || section, cell })
        labelParts = []
      })
    })
  })
  return fields
}

const CONTACT_RULES: [keyof InquiryContact, RegExp][] = [
  ['company', /회사명|업체명|^company|公司/i],
  ['name', /담당자|^contact|联系人/i],
  ['email', /이메일|e-?mail|邮箱|电子邮/i],
  ['place', /^국가|^country|国家/i],
  ['tel', /전화|phone|电话/i],
]

export default function SheetWebForm({
  formId,
  formTitle,
  model,
  onBack,
  onSubmit,
}: {
  formId: string
  formTitle: string
  model?: string
  onBack: () => void
  onSubmit: (payload: InquiryPayload) => Promise<InquiryResult>
}) {
  const { t, i18n } = useTranslation('chatbot')
  const lang = sheetLang(i18n.language)
  const draftKey = `magron-sheet-${formId}-${lang}`
  const [sheet, setSheet] = useState<Sheet | null>(null)
  const [values, setValues] = useState<Record<string, string | boolean>>(() => {
    try {
      return JSON.parse(localStorage.getItem(draftKey) || '{}')
    } catch {
      return {}
    }
  })
  const [files, setFiles] = useState<File[]>([])
  const [memo, setMemo] = useState(model ? `${t('sheetModelPrefix')} ${model}` : '')
  const [consent, setConsent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSending, setIsSending] = useState(false)
  const [savedAt, setSavedAt] = useState<string | null>(null)

  useEffect(() => {
    const load = loaders[`../data/inquiry-sheets/${FILE[formId]}-${lang}.json`]
    if (load) void load().then((mod) => setSheet(mod.default))
  }, [formId, lang])

  // 쓰는 동안 이 브라우저에 임시 저장 — 창을 닫았다 다시 열어도 이어서 쓸 수 있게
  useEffect(() => {
    try {
      localStorage.setItem(draftKey, JSON.stringify(values))
      if (Object.keys(values).length) setSavedAt(new Date().toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' }))
    } catch {
      /* 저장소를 못 쓰는 브라우저(사생활 보호 모드 등) — 임시 저장 없이 그대로 진행 */
    }
  }, [values, draftKey, i18n.language])

  const fields = useMemo(() => (sheet ? collectFields(sheet) : []), [sheet])
  const set = (id: string, v: string | boolean) => setValues((prev) => ({ ...prev, [id]: v }))

  /** 칸 하나의 답을 한 줄로 — 체크한 선택지 + "앞 글자 입력값" */
  const answerOf = (field: Field) => {
    if (field.cell.kind === 'input') return String(values[field.key] ?? '').trim()
    const parts: string[] = []
    let context = ''
    field.cell.tokens.forEach((tk, ti) => {
      const id = `${field.key}-${ti}`
      if (tk.t === 'text') context = tk.v.replace(/[:：]\s*$/, '').trim().split(/\s{2,}|\/\s*/).pop() ?? ''
      if (tk.t === 'check') {
        if (values[id]) parts.push(tk.label.replace(/[:：(（]\s*$/, '').trim())
        context = tk.label.replace(/[:：]\s*$/, '').trim()
      }
      if (tk.t === 'blank') {
        const v = String(values[id] ?? '').trim()
        // 빈칸 바로 뒤 짧은 글자는 단위(개, 개 / 년, kPa, ℃, mm …) — 값 뒤에 붙인다
        const next = field.cell.tokens[ti + 1]
        const unit = next?.t === 'text' ? next.v.split(/\s{2,}|※|\(/)[0].trim() : ''
        const withUnit = unit && unit.length <= 10 && !/[:：]$/.test(unit) ? `${v} ${unit}` : v
        if (v) parts.push(context ? `${context}: ${withUnit}` : withUnit)
      }
    })
    return parts.join(' · ')
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (isSending || !sheet) return
    const answers = fields.map((f) => ({ q: f.label.slice(0, 190), a: answerOf(f) })).filter((a) => a.a)
    const contact: InquiryContact = { company: '', name: '', email: '', place: '', tel: '' }
    for (const [key, re] of CONTACT_RULES) {
      const f = fields.find((x) => x.cell.kind === 'input' && re.test(x.label))
      if (f && !contact[key]) contact[key] = String(values[f.key] ?? '').trim()
    }
    // 자석 시트는 "이메일 / 전화"가 한 칸 — 이메일만 골라낸다
    const emailMatch = (contact.email || contact.tel).match(/[^@\s,;/]+@[^@\s,;/]+\.[^@\s,;/]+/)
    if (!emailMatch) {
      setError(t('sheetWebNeedEmail'))
      return
    }
    if (!consent) {
      setError(t('quickNeedConsent'))
      return
    }
    const missing = fields.filter((f) => f.label.includes('◎') && !answerOf(f)).map((f) => f.label.slice(0, 80))
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
    if (memo.trim()) answers.push({ q: '메모', a: memo.trim() })
    const result = await onSubmit({
      formId: `${formId}-websheet`,
      formTitle: `${formTitle} · 인콰이어리 시트(웹 작성)`,
      contact: {
        company: contact.company || '(미기재)',
        name: contact.name || '(미기재)',
        email: emailMatch[0],
        place: contact.place || '(미기재)',
        // "이메일 / 전화" 한 칸이면 이메일을 빼고 남은 번호만
        tel: contact.tel.replace(emailMatch[0], '').replace(/^[\s/,;·]+|[\s/,;·]+$/g, ''),
      },
      answers,
      missing,
      files: encoded,
    })
    setIsSending(false)
    if (result.ok) {
      try {
        localStorage.removeItem(draftKey)
      } catch {
        /* 무시 */
      }
    } else setError(result.message)
  }

  const renderTokens = (tokens: Token[], key: string) =>
    tokens.map((tk, ti) => {
      const id = `${key}-${ti}`
      if (tk.t === 'text') return <span key={ti}>{tk.v}</span>
      if (tk.t === 'br') return <br key={ti} />
      if (tk.t === 'img')
        return <img key={ti} className="sheet-web__img" src={`${import.meta.env.BASE_URL}inquiry-sheets/${tk.src}`} alt="" loading="lazy" />
      if (tk.t === 'check')
        return (
          <label key={ti} className={`sheet-web__check${values[id] ? ' sheet-web__check--on' : ''}`}>
            <input type="checkbox" checked={!!values[id]} onChange={(event) => set(id, event.target.checked)} />
            <span>{tk.label}</span>
          </label>
        )
      return (
        <input
          key={ti}
          className="sheet-web__blank"
          style={{ width: `${Math.max(5, Math.min(tk.w, 18))}ch` }}
          value={String(values[id] ?? '')}
          onChange={(event) => set(id, event.target.value)}
        />
      )
    })

  return (
    <form className="inq-sheet sheet-web" onSubmit={handleSubmit} noValidate>
      <div className="inq-choose__head">
        <p className="inq-choose__title">{t('sheetWebTitle')}</p>
        <button type="button" className="inq-choose__close" onClick={onBack}>
          ← {t('sheetBack')}
        </button>
      </div>
      <p className="sheet-web__hint">
        {t('sheetWebHint')}
        {savedAt ? <span className="sheet-web__saved"> · {t('sheetWebDraftSaved', { time: savedAt })}</span> : null}
      </p>

      {!sheet ? (
        <p className="chat-panel__notice">{t('inquiryLoading')}</p>
      ) : (
        <div className="sheet-web__paper">
          {sheet.blocks.map((block, bi) =>
            block.type === 'p' ? (
              block.strong ? (
                <h3 key={bi} className="sheet-web__title">{renderTokens(block.tokens, `p${bi}`)}</h3>
              ) : (
                <p key={bi} className="sheet-web__p">{renderTokens(block.tokens, `p${bi}`)}</p>
              )
            ) : (
              <div key={bi} className="sheet-web__table-wrap">
                <table className="sheet-web__table">
                  <tbody>
                    {block.rows.map((row, ri) => (
                      <tr key={ri}>
                        {row.map((cell, ci) => {
                          const key = `${bi}-${ri}-${ci}`
                          if (cell.kind === 'head')
                            return (
                              <th key={ci} colSpan={cell.span} className="sheet-web__head">
                                {renderTokens(cell.tokens, key)}
                              </th>
                            )
                          if (cell.kind === 'label')
                            return (
                              <th key={ci} colSpan={cell.span} className="sheet-web__label">
                                {renderTokens(cell.tokens, key)}
                              </th>
                            )
                          if (cell.kind === 'input')
                            return (
                              <td key={ci} colSpan={cell.span} className="sheet-web__cell">
                                {cell.merged ? null : (
                                  <textarea
                                    className="sheet-web__field"
                                    rows={1}
                                    value={String(values[key] ?? '')}
                                    onChange={(event) => set(key, event.target.value)}
                                  />
                                )}
                              </td>
                            )
                          return (
                            <td key={ci} colSpan={cell.span} className="sheet-web__cell">
                              {renderTokens(cell.tokens, key)}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ),
          )}
        </div>
      )}

      <label className="inq-sheet__file">
        <span>{t('sheetWebFiles')}</span>
        <input
          type="file"
          multiple
          onChange={(event) => {
            const picked = event.target.files ? Array.from(event.target.files).slice(0, 5) : []
            if (picked.reduce((sum, f) => sum + f.size, 0) > MAX_TOTAL_BYTES) return setError(t('inquiryFileLimit'))
            setError(null)
            setFiles(picked)
          }}
        />
        {files.length ? <small>{files.map((f) => f.name).join(', ')}</small> : null}
      </label>
      <label className="inq-sheet__field">
        <span>{t('sheetMemo')}</span>
        <textarea rows={2} value={memo} onChange={(event) => setMemo(event.target.value)} />
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
      <button type="submit" className="inq-choose__btn inq-choose__btn--primary inq-sheet__submit" disabled={isSending || !sheet}>
        {isSending ? t('inquirySending') : t('sheetWebSubmit')}
      </button>
    </form>
  )
}
