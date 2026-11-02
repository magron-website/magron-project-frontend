import { useMemo, useState, type FormEvent, type MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import type { InquiryField, InquiryForm as Form, InquiryQuestion } from '@/types/inquiry'
import '@/assets/design/inquiry-form.css'

/**
 * 챗봇 안의 제품별 문의서(2026-11-02).
 * 질문 데이터는 한국어 원본(src/data/inquiryForms.ts)이고, 화면에는 번역 사전(tr)으로 바꿔 보여 준다.
 * 담당자 메일은 항상 한국어로 가야 하므로 답은 한국어 원문 값으로 모은다(선택지 value = 한국어).
 */

export type InquiryContact = { company: string; name: string; email: string; place: string; tel: string }
export type InquiryFile = { name: string; type: string; data: string }
export type InquiryPayload = {
  formId: string
  formTitle: string
  contact: InquiryContact
  answers: { q: string; a: string }[]
  missing: string[]
  files: InquiryFile[]
}
export type InquiryResult = { ok: true } | { ok: false; message: string }

// 메일 첨부는 Graph sendMail 한 번에 4MB 까지(base64 로 1.33배 커짐) — 넉넉히 2.5MB 로 막는다.
const MAX_FILES = 5
const MAX_TOTAL_BYTES = 2.5 * 1024 * 1024

type Values = Record<string, string | string[]>
type Section = { id: string; qs: InquiryQuestion[] }

const fieldId = (sectionId: string, qi: number, fi: number) => `${sectionId}-${qi}-${fi}`

export default function InquiryForm({
  form,
  tr,
  onSwitchForm,
  onBack,
  onSubmit,
}: {
  form: Form
  /** 한국어 원문 → 화면 언어 */
  tr: (ko: string) => string
  onSwitchForm: (formId: string) => void
  onBack: () => void
  onSubmit: (payload: InquiryPayload) => Promise<InquiryResult>
}) {
  const { t, i18n } = useTranslation('chatbot')
  const [values, setValues] = useState<Values>({})
  const [files, setFiles] = useState<Record<string, File[]>>({})
  const [contact, setContact] = useState<InquiryContact>({ company: '', name: '', email: '', place: '', tel: '' })
  const [consent, setConsent] = useState(false)
  const [missingIds, setMissingIds] = useState<Set<string>>(new Set())
  const [error, setError] = useState<string | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const [isSending, setIsSending] = useState(false)
  const [missingWarned, setMissingWarned] = useState(false)
  const imgLang = i18n.language === 'ko' ? 'ko' : 'en'
  const imgBase = `${import.meta.env.BASE_URL}inquiry/${imgLang}/`

  // 첫 질문(재질·용도 등) 답에 따라 이어지는 질문 묶음
  const firstAnswer = values[fieldId('req', 0, 0)]
  const activeGroup = form.groups?.find((g) => g.key === firstAnswer)
  const sections: Section[] = useMemo(() => {
    const list: Section[] = [{ id: 'req', qs: form.req }]
    if (activeGroup) list.push({ id: `g-${activeGroup.key}`, qs: activeGroup.qs })
    list.push({ id: 'opt', qs: form.opt })
    return list
  }, [form, activeGroup])

  const setValue = (id: string, value: string | string[]) => setValues((prev) => ({ ...prev, [id]: value }))

  const toggle = (id: string, opt: string) => {
    const cur = (values[id] as string[] | undefined) ?? []
    setValue(id, cur.includes(opt) ? cur.filter((o) => o !== opt) : [...cur, opt])
  }

  const addFiles = (id: string, list: FileList | null) => {
    const picked = list ? Array.from(list) : []
    const next = { ...files, [id]: picked }
    const all = Object.values(next).flat()
    const total = all.reduce((sum, file) => sum + file.size, 0)
    if (all.length > MAX_FILES || total > MAX_TOTAL_BYTES) {
      setFileError(t('inquiryFileLimit'))
      return
    }
    setFileError(null)
    setFiles(next)
  }

  /** 질문 하나의 답을 담당자 메일용 한국어 한 줄로 */
  const answerOf = (sectionId: string, qi: number, q: InquiryQuestion) => {
    const parts: string[] = []
    q.fields.forEach((fd, fi) => {
      const id = fieldId(sectionId, qi, fi)
      if (fd.k === 'f') {
        const names = (files[id] ?? []).map((file) => file.name)
        if (names.length) parts.push(`첨부: ${names.join(', ')}`)
        return
      }
      const raw = values[id]
      const text = Array.isArray(raw) ? raw.join(', ') : (raw ?? '').trim()
      if (text) parts.push(fd.label ? `${fd.label} ${text}` : text)
    })
    return parts.join(' · ')
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (isSending) return
    const answers: { q: string; a: string }[] = []
    const missing: string[] = []
    const missingSet = new Set<string>()
    for (const section of sections) {
      section.qs.forEach((q, qi) => {
        const a = answerOf(section.id, qi, q)
        if (a) answers.push({ q: q.k, a })
        else if (q.req) {
          missing.push(q.k)
          missingSet.add(`${section.id}-${qi}`)
        }
      })
    }
    setMissingIds(missingSet)
    const isEmailValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(contact.email.trim())
    if (!contact.company.trim() || !contact.name.trim() || !isEmailValid || !contact.place.trim() || !consent) {
      setError(t('inquiryContactRequired'))
      return
    }
    // 필수 질문이 비면 한 번은 알려 주고, 그래도 보내면 받는다(모르는 항목이 있을 수 있음).
    // 빈 항목은 담당자 메일에 따로 표시돼 회신 때 한 번에 묻는다.
    if (missing.length && !missingWarned) {
      setMissingWarned(true)
      setError(t('inquiryMissing', { count: missing.length }))
      return
    }
    setError(null)
    setIsSending(true)
    const encoded = await Promise.all(
      Object.values(files)
        .flat()
        .map(
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
    const result = await onSubmit({
      formId: form.id,
      formTitle: form.title,
      contact: Object.fromEntries(Object.entries(contact).map(([k, v]) => [k, v.trim()])) as InquiryContact,
      answers,
      missing,
      files: encoded,
    })
    setIsSending(false)
    if (!result.ok) setError(result.message)
  }

  // 다른 문의서로 가는 안내 링크(#kit 등)는 페이지 이동 대신 문의서를 바꾼다.
  const handleJumpClick = (event: MouseEvent<HTMLDivElement>) => {
    const anchor = (event.target as HTMLElement).closest('a')
    const href = anchor?.getAttribute('href')
    if (href?.startsWith('#')) {
      event.preventDefault()
      onSwitchForm(href.slice(1))
    }
  }

  const renderField = (fd: InquiryField, id: string, q: InquiryQuestion) => {
    const label = fd.label ? <span className="inq-field__label">{tr(fd.label)}</span> : null
    switch (fd.k) {
      case 'r':
      case 'c':
        return (
          <div className="inq-field" key={id} role="group" aria-label={tr(fd.label ?? q.q)}>
            {label}
            <div className="inq-chips">
              {fd.opts.map((opt) => {
                const checked = fd.k === 'r' ? values[id] === opt : ((values[id] as string[] | undefined) ?? []).includes(opt)
                return (
                  <label key={opt} className={`inq-chip${checked ? ' inq-chip--on' : ''}`}>
                    <input
                      type={fd.k === 'r' ? 'radio' : 'checkbox'}
                      name={id}
                      checked={checked}
                      onChange={() => (fd.k === 'r' ? setValue(id, opt) : toggle(id, opt))}
                    />
                    <span>{tr(opt)}</span>
                  </label>
                )
              })}
            </div>
          </div>
        )
      case 'p':
        return (
          <div className="inq-field" key={id} role="group" aria-label={tr(fd.label ?? q.q)}>
            {label}
            <div className="inq-pictures">
              {fd.opts.map((opt) => {
                const checked = values[id] === opt.label
                return (
                  <label key={opt.code} className={`inq-picture${checked ? ' inq-picture--on' : ''}`}>
                    <input type="radio" name={id} checked={checked} onChange={() => setValue(id, opt.label)} />
                    <img src={`${imgBase}${opt.code}.png`} alt="" loading="lazy" />
                    <b>{tr(opt.label)}</b>
                    <small>{tr(opt.desc)}</small>
                  </label>
                )
              })}
            </div>
          </div>
        )
      case 't':
      case 'a': {
        const common = {
          id,
          value: (values[id] as string | undefined) ?? '',
          placeholder: fd.ph ? tr(fd.ph) : undefined,
          'aria-label': fd.label ? undefined : tr(q.q),
          onChange: (event: { target: { value: string } }) => setValue(id, event.target.value),
        }
        return (
          <div className="inq-field" key={id}>
            {fd.label && (
              <label className="inq-field__label" htmlFor={id}>
                {tr(fd.label)}
              </label>
            )}
            {fd.k === 't' ? <input type="text" className="inq-input" {...common} /> : <textarea className="inq-input" rows={3} {...common} />}
          </div>
        )
      }
      case 'f':
        return (
          <div className="inq-field" key={id}>
            <label className="inq-field__label" htmlFor={id}>
              {tr(fd.label ?? '파일 첨부')}
            </label>
            <input id={id} type="file" multiple className="inq-file" onChange={(event) => addFiles(id, event.target.files)} />
          </div>
        )
    }
  }

  const renderQuestion = (q: InquiryQuestion, sectionId: string, qi: number, num: string) => {
    const jumpOpen = q.jump && Object.entries(values).some(([id, v]) => id.startsWith(`${sectionId}-${qi}-`) && v === q.jump?.opt)
    return (
      <div className={`inq-q${missingIds.has(`${sectionId}-${qi}`) ? ' inq-q--missing' : ''}`} key={`${sectionId}-${qi}`}>
        <div className="inq-q__head">
          <span className="inq-q__num">{num}</span>
          <span className="inq-q__text">{tr(q.q)}</span>
          <span className={`inq-badge${q.req ? '' : ' inq-badge--opt'}`}>{q.req ? t('inquiryRequired') : t('inquiryOptional')}</span>
        </div>
        {q.fields.map((fd, fi) => renderField(fd, fieldId(sectionId, qi, fi), q))}
        {q.notice && <p className="inq-notice">{tr(q.notice)}</p>}
        {jumpOpen && q.jump && (
          // 데이터 파일에 직접 쓴 안내 문구(외부 입력 아님)
          <div className="inq-jump" onClick={handleJumpClick} dangerouslySetInnerHTML={{ __html: tr(q.jump.html) }} />
        )}
      </div>
    )
  }

  const contactField = (key: keyof InquiryContact, labelKey: string, required: boolean, type = 'text', auto?: string) => (
    <label className="inq-field" key={key}>
      <span className="inq-field__label">
        {t(labelKey)}
        {required ? ' *' : ''}
      </span>
      <input
        type={type}
        className="inq-input"
        autoComplete={auto}
        value={contact[key]}
        onChange={(event) => setContact((prev) => ({ ...prev, [key]: event.target.value }))}
      />
    </label>
  )

  return (
    <form className="inq" onSubmit={handleSubmit} noValidate>
      <div className="inq__bar">
        <button type="button" className="inq__back" onClick={onBack}>
          ← {t('inquiryBack')}
        </button>
      </div>
      <div className="inq__scroll">
        <h2 className="inq__title">{tr(form.title)}</h2>
        <p className="inq__intro">{tr(form.intro)}</p>
        {form.info.length > 0 && (
          <div className="inq__info">
            <b>{t('inquiryInfoTitle')}</b>
            <ul>
              {form.info.map((line) => (
                <li key={line}>{tr(line)}</li>
              ))}
            </ul>
          </div>
        )}
        {form.image && (
          <figure className="inq__figure">
            <img src={`${imgBase}${form.image}`} alt={tr(form.imageCaption ?? '')} />
            {form.imageCaption && <figcaption>{tr(form.imageCaption)}</figcaption>}
          </figure>
        )}
        <details className="inq__example">
          <summary>{t('inquiryExample')}</summary>
          <dl>
            {form.ex.map(([k, v]) => (
              <div key={k}>
                <dt>{tr(k)}</dt>
                <dd>{tr(v)}</dd>
              </div>
            ))}
          </dl>
        </details>

        {form.req.map((q, qi) => renderQuestion(q, 'req', qi, `Q${qi + 1}`))}
        {activeGroup && (
          <section className="inq__group">
            <h3>{tr(activeGroup.key)}</h3>
            <p>{tr(activeGroup.note)}</p>
            {activeGroup.qs.map((q, qi) => renderQuestion(q, `g-${activeGroup.key}`, qi, `${qi + 1}`))}
          </section>
        )}
        {form.opt.length > 0 && (
          <details className="inq__more">
            <summary>{t('inquiryMore', { count: form.opt.length })}</summary>
            {form.opt.map((q, qi) => renderQuestion(q, 'opt', qi, `+${qi + 1}`))}
          </details>
        )}
        {fileError && <p className="inq__error">{fileError}</p>}

        <section className="inq__contact">
          <h3>{t('inquiryContactTitle')}</h3>
          <div className="inq__contact-grid">
            {contactField('company', 'inquiryCompany', true, 'text', 'organization')}
            {contactField('name', 'inquiryName', true, 'text', 'name')}
            {contactField('email', 'inquiryEmail', true, 'email', 'email')}
            {contactField('place', 'inquiryPlace', true, 'text', 'country-name')}
            {contactField('tel', 'inquiryTel', false, 'tel', 'tel')}
          </div>
          <label className="inq__consent">
            <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
            <span>
              <b>{t('inquiryConsent')}</b>
              <br />
              {t('inquiryConsentDetail')}
            </span>
          </label>
        </section>
      </div>
      <div className="inq__actions">
        {error && <p className="inq__error">{error}</p>}
        <button type="submit" className="inq__submit" disabled={isSending}>
          {isSending ? t('inquirySending') : t('inquirySubmit')}
        </button>
      </div>
    </form>
  )
}
