import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LANGUAGES, type Language } from '@/i18n'
import { useLangPath } from '@/i18n/routing'
import AnswerBlock from '@/components/AnswerBlock'
import { COMPARISON_ROWS, COMPARISON_TEXT, SOURCE_LINKS } from '@/pages/sealComparisonData'
import '@/assets/design/legal.css'
import '@/assets/design/key-figures.css'

export default function SealComparison() {
  const { i18n } = useTranslation()
  const lp = useLangPath()
  const lang: Language = (LANGUAGES as readonly string[]).includes(i18n.language)
    ? (i18n.language as Language)
    : 'ko'
  const text = COMPARISON_TEXT[lang]

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

      <AnswerBlock routePath="/seal-comparison" />

      <section className="key-figures" aria-labelledby="seal-comparison__table">
        <div className="key-figures__inner">
          <h2 className="key-figures__heading" id="seal-comparison__table">
            {text.tableHeading}
          </h2>
          <div className="key-figures__scroll" tabIndex={0}>
            <table>
              <thead>
                <tr>
                  <th scope="col">{text.criterion}</th>
                  <th scope="col">{text.ferrofluid}</th>
                  <th scope="col">{text.lip}</th>
                  <th scope="col">{text.mechanical}</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.criterion.en}>
                    <th scope="row">{row.criterion[lang]}</th>
                    <td className="key-figures__strong">{row.ferrofluid[lang]}</td>
                    <td>{row.lip[lang]}</td>
                    <td>{row.mechanical[lang]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="key-figures__lead">{text.note}</p>

          <h2 className="key-figures__subheading">{text.sourcesHeading}</h2>
          <ul className="key-figures__links">
            {SOURCE_LINKS.map((source) => (
              <li key={source.href}>
                <a href={source.href} target="_blank" rel="noopener noreferrer">
                  {source.label[lang]}
                </a>
              </li>
            ))}
          </ul>

          <h2 className="key-figures__subheading">{text.related}</h2>
          <ul className="key-figures__links">
            <li>
              <Link to={lp('/ferrofluid')}>{text.relatedFerrofluid}</Link>
            </li>
            <li>
              <Link to={lp('/feedthrough')}>{text.relatedFeedthrough}</Link>
            </li>
          </ul>
        </div>
      </section>
    </article>
  )
}
