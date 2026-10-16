import { useTranslation } from 'react-i18next'
import '@/assets/design/legal.css'

type Table = { head: string[]; rows: string[][] }
type Section = {
  title: string
  paragraphs?: string[]
  items?: string[]
  table?: Table
  after?: string[]
}

export default function Privacy() {
  const { t } = useTranslation('privacy')
  const sections = t('sections', { returnObjects: true }) as Section[]

  return (
    <article className="lg-page">
      <div className="lg-hero">
        <div className="lg-inner">
          <header className="lg-heading">
            <p className="lg-heading__eyebrow">{t('eyebrow')}</p>
            <h1 className="lg-heading__title">{t('title')}</h1>
            <p className="lg-heading__lead">{t('intro')}</p>
            <p className="lg-heading__meta">{t('effective')}</p>
          </header>

          {sections.map((section) => (
            <section className="lg-section" key={section.title}>
              <h2 className="lg-section__title">{section.title}</h2>
              {section.paragraphs?.map((text) => <p key={text}>{text}</p>)}
              {section.table && (
                <div className="lg-table-wrap">
                  <table className="lg-table">
                    <thead>
                      <tr>
                        {section.table.head.map((cell) => (
                          <th key={cell} scope="col">
                            {cell}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {section.items && (
                <ul className="lg-list">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {section.after?.map((text) => <p key={text}>{text}</p>)}
            </section>
          ))}
        </div>
      </div>
    </article>
  )
}
