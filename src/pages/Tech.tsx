import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LANGUAGES, type Language } from '@/i18n'
import { useLangPath } from '@/i18n/routing'
import AnswerBlock from '@/components/AnswerBlock'
import TechDocumentCard from '@/components/TechDocumentCard'
import { useTechDocuments } from '@/hooks/useTechDocuments'
import { openPdfInNewTab } from '@/lib/openPdf'
import '@/assets/design/tech.css'

const DATA_LINK: Record<Language, string> = {
  ko: '자료 속 시험값을 표로 한눈에 보기',
  en: 'See all test values from these documents as tables',
  zh: '以表格一览资料中的全部试验值',
}

export default function Tech() {
  const { t, i18n } = useTranslation('tech')
  const lp = useLangPath()
  const lang: Language = (LANGUAGES as readonly string[]).includes(i18n.language)
    ? (i18n.language as Language)
    : 'ko'
  const { documents, error } = useTechDocuments()
  return (
    <article className="tech-page">
      {/* 직답 블록 — 이 화면이 무엇에 답하는지를 맨 위에 텍스트로 둔다 */}
      <AnswerBlock routePath="/tech" sources />
      <div className="tech-page__hero">
        <span className="tech-page__glow tech-page__glow--one" aria-hidden="true" />
        <span className="tech-page__glow tech-page__glow--two" aria-hidden="true" />

        <div className="tech-page__inner">
          <header className="tech-page__heading">
            <h1 className="tech-page__title">{t('pageTitle')}</h1>
            <span className="tech-page__rule" aria-hidden="true" />
            <p className="tech-page__lead">{t('pageLead')}</p>
            {/* PDF 안의 시험값을 HTML 표로 옮긴 화면 — AI 검색은 PDF 표를 잘 읽지 못한다 */}
            <Link className="tech-page__data-link" to={lp('/tech-data')}>
              {DATA_LINK[lang]} →
            </Link>
          </header>

          {error ? (
            <p className="tech-page__message" role="alert">
              {error}
            </p>
          ) : null}

          <div className="tech-doc-grid">
            {documents.map((document) => (
              <TechDocumentCard
                key={document.id}
                document={document}
                isVisible
                onOpen={(doc) => doc.fileUrl && openPdfInNewTab(doc.fileUrl)}
              />
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
