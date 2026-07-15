import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import BookFlipViewer from '@/components/BookFlipViewer'
import TechDocumentCard from '@/components/TechDocumentCard'
import { useTechDocuments } from '@/hooks/useTechDocuments'
import type { TechDocument } from '@/types/techDocument'
import '@/assets/design/tech.css'

export default function Tech() {
  const { t } = useTranslation('tech')
  const { documents, error } = useTechDocuments()
  const [viewerDocument, setViewerDocument] = useState<TechDocument | null>(null)

  return (
    <article className="tech-page">
      <BookFlipViewer
        isOpen={viewerDocument !== null}
        title={viewerDocument?.title ?? ''}
        pdfUrl={viewerDocument?.fileUrl ?? ''}
        onClose={() => setViewerDocument(null)}
      />

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
                onOpen={setViewerDocument}
              />
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
