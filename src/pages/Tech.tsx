import { useTranslation } from 'react-i18next'
import AnswerBlock from '@/components/AnswerBlock'
import TechDocumentCard from '@/components/TechDocumentCard'
import { useTechDocuments } from '@/hooks/useTechDocuments'
import { openPdfInNewTab } from '@/lib/openPdf'
import '@/assets/design/tech.css'

export default function Tech() {
  const { t } = useTranslation('tech')
  const { documents, error } = useTechDocuments()
  return (
    <article className="tech-page">
      {/* 직답 블록 — 이 화면이 무엇에 답하는지를 맨 위에 텍스트로 둔다 */}
      <AnswerBlock routePath="/tech" />
      <div className="tech-page__hero">
        <span className="tech-page__glow tech-page__glow--one" aria-hidden="true" />
        <span className="tech-page__glow tech-page__glow--two" aria-hidden="true" />

        <div className="tech-page__inner">
          <header className="tech-page__heading">
            <h1 className="tech-page__title">{t('pageTitle')}</h1>
            <span className="tech-page__rule" aria-hidden="true" />
            <p className="tech-page__lead">{t('pageLead')}</p>
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
