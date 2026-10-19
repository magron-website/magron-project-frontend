import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LANGUAGES, type Language } from '@/i18n'
import { useLangPath } from '@/i18n/routing'
import AnswerBlock from '@/components/AnswerBlock'
import { TECH_DATA_TABLES, TECH_DATA_TEXT } from '@/pages/techDataData'
import '@/assets/design/legal.css'
import '@/assets/design/key-figures.css'

export default function TechData() {
  const { i18n } = useTranslation()
  const lp = useLangPath()
  const lang: Language = (LANGUAGES as readonly string[]).includes(i18n.language)
    ? (i18n.language as Language)
    : 'ko'
  const text = TECH_DATA_TEXT[lang]
  const cell = (c: string | Record<Language, string>) => (typeof c === 'string' ? c : c[lang])

  return (
    <article className="lg-page">
      <div className="lg-hero">
        <div className="lg-inner">
          <header className="lg-heading">
            <p className="lg-heading__eyebrow">{text.eyebrow}</p>
            <h1 className="lg-heading__title">{text.title}</h1>
            <p className="lg-heading__lead">{text.lead}</p>
          </header>
        </div>
      </div>

      <AnswerBlock routePath="/tech-data" sources />

      <section className="key-figures key-figures--stack">
        <div className="key-figures__inner">
          {TECH_DATA_TABLES.map((table) => (
            <div key={table.id} className="key-figures__block" id={table.id}>
              <h2 className="key-figures__subheading">{table.title[lang]}</h2>
              <div className="key-figures__scroll" tabIndex={0}>
                <table>
                  <thead>
                    <tr>
                      {table.head.map((h, i) => (
                        <th scope="col" key={i}>
                          {cell(h)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {table.rows.map((row, r) => (
                      <tr key={r}>
                        {row.map((c, i) =>
                          i === 0 ? (
                            <th scope="row" key={i} data-label={cell(table.head[i])}>
                              {cell(c)}
                            </th>
                          ) : (
                            <td key={i} data-label={cell(table.head[i])} className={i > 0 && r === 0 ? 'key-figures__strong' : undefined}>
                              {cell(c)}
                            </td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {table.note && <p className="key-figures__lead">{table.note[lang]}</p>}
            </div>
          ))}

          <h2 className="key-figures__subheading">{text.methodTitle}</h2>
          <ul className="key-figures__links">
            {text.method.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>

          <h2 className="key-figures__subheading">{text.pdfTitle}</h2>
          <p className="key-figures__lead">{text.pdfNote}</p>
          <Link className="key-figures__compare" to={lp('/tech')}>
            {text.back} →
          </Link>
        </div>
      </section>
    </article>
  )
}
