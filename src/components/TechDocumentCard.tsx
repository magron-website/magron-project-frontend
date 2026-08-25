import { useTranslation } from 'react-i18next'
import { BookCover } from 'book-cover-3d'
import { usePdfThumbnail } from '@/hooks/usePdfThumbnail'
import { getTechCover } from '@/assets/images/tech'
import { toDownloadUrl } from '@/lib/openPdf'
import type { TechDocument } from '@/types/techDocument'

/** Thinner than the catalog booklets — these are reports, not bound catalogues. */
const techBookProps = {
  width: 230,
  height: 325,
  thickness: 18,
  rotate: 28,
  rotateHover: 12,
  transitionDuration: 0.35,
  perspective: 700,
  radius: 3,
  bgColor: '#0f172a',
} as const

type TechDocumentCardProps = {
  document: TechDocument
  /** Gates the cover render until the surrounding grid is on screen. */
  isVisible: boolean
  onOpen: (document: TechDocument) => void
}

export default function TechDocumentCard({
  document,
  isVisible,
  onOpen,
}: TechDocumentCardProps) {
  const { t } = useTranslation('tech')
  /* A captured cover ships with the bundle, so it skips the pdf.js render
     entirely; documents uploaded since the last capture still fall back to it. */
  const capturedCover = getTechCover(document.fileUrl)
  const { imageUrl: renderedCover, hasFailed } = usePdfThumbnail(
    document.fileUrl,
    isVisible && !capturedCover,
  )
  const imageUrl = capturedCover ?? renderedCover

  return (
    <div className="tech-doc">
      {/* Brackets are their own spans so they can be scaled to embrace a
          two-line caption instead of sitting inline with the first line. */}
      <div className="tech-doc__title">
        <span className="tech-doc__title-bracket" aria-hidden="true">
          &lt;
        </span>
        <span className="tech-doc__title-text">
          {document.title}
          {document.titleSub ? (
            <span className="tech-doc__title-sub">{document.titleSub}</span>
          ) : null}
        </span>
        <span className="tech-doc__title-bracket" aria-hidden="true">
          &gt;
        </span>
      </div>
      <button
        type="button"
        className="tech-doc__book-button"
        onClick={() => onOpen(document)}
        disabled={!document.fileUrl}
        aria-label={t('viewPdfAria', { title: document.title })}
      >
        <div className="tech-doc__book">
          <BookCover {...techBookProps}>
            {/* book-cover-3d positions and paints its first child, so the cover
                art goes one level in — otherwise bgColor wins over it. */}
            <div className="tech-doc__cover">
              {imageUrl ? (
                <img className="tech-doc__cover-img" src={imageUrl} alt="" />
              ) : (
                <div
                  className={`tech-doc__cover-fallback${
                    hasFailed ? ' tech-doc__cover-fallback--failed' : ''
                  }`}
                  aria-hidden="true"
                  aria-busy={!hasFailed}
                />
              )}
            </div>
          </BookCover>
        </div>
        <p className="tech-doc__hint">{t('bookHint')}</p>
      </button>
      {document.description ? (
        <p className="tech-doc__desc">{document.description}</p>
      ) : null}
      {document.fileUrl ? (
        <a
          className="tech-doc__download"
          href={toDownloadUrl(document.fileUrl)}
          download
        >
          <span className="tech-doc__download-text">{t('download')}</span>
        </a>
      ) : (
        <div className="tech-doc__download tech-doc__download--disabled">
          <span className="tech-doc__download-text">{t('download')}</span>
        </div>
      )}
    </div>
  )
}
