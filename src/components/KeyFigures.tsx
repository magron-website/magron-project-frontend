import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LANGUAGES, type Language } from '@/i18n'
import { useLangPath } from '@/i18n/routing'
import { KEY_FIGURES, KEY_FIGURES_TEXT } from '@/seo/keyFigures'
import '@/assets/design/key-figures.css'

/**
 * 홈·회사소개의 "핵심 사양" 표. 이미지가 아니라 HTML 표라 AI 검색이 행 단위로 읽는다.
 * 값은 keyFigures.ts 한 곳에서 관리한다.
 */
export default function KeyFigures() {
  const { i18n } = useTranslation()
  const lp = useLangPath()
  const lang: Language = (LANGUAGES as readonly string[]).includes(i18n.language)
    ? (i18n.language as Language)
    : 'ko'
  const text = KEY_FIGURES_TEXT[lang]

  return (
    <section className="key-figures" aria-labelledby="key-figures__heading">
      <div className="key-figures__inner">
        <h2 className="key-figures__heading" id="key-figures__heading">
          {text.heading}
        </h2>
        <p className="key-figures__lead">{text.lead}</p>

        <div className="key-figures__scroll" tabIndex={0}>
          <table>
            <thead>
              <tr>
                <th scope="col">{text.product}</th>
                <th scope="col">{text.item}</th>
                <th scope="col">{text.value}</th>
                <th scope="col">{text.basis}</th>
              </tr>
            </thead>
            <tbody>
              {KEY_FIGURES.map((row) => (
                <tr key={`${row.path}-${row.item.en}`}>
                  <th scope="row">
                    <Link to={lp(row.path)}>{row.product[lang]}</Link>
                  </th>
                  <td>{row.item[lang]}</td>
                  <td className="key-figures__value">{row.value}</td>
                  <td>{row.basis[lang]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Link className="key-figures__compare" to={lp('/seal-comparison')}>
          {text.compare} →
        </Link>
      </div>
    </section>
  )
}
