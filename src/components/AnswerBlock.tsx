import { useTranslation } from 'react-i18next'
import { LANGUAGES, type Language } from '@/i18n'
import { getPageAnswers } from '@/seo/answers'
import '@/assets/design/answer-block.css'

type Props = {
  /** 언어 접두어를 뗀 경로. 예: '/ferrofluid' */
  routePath: string
}

/**
 * 화면 맨 위의 직답 블록 — 질문 한 줄과 그 답 한 문단, 이어서 FAQ.
 *
 * 접어두지 않고 전부 펼쳐 두는 이유: AI 검색은 문단을 통째로 꺼내 쓰는데,
 * 아코디언으로 감춘 글은 추출 우선순위가 떨어진다. 길이도 한 답당 100~150자로
 * 묶어 두었기 때문에 펼쳐 둬도 화면이 길어지지 않는다.
 *
 * 여기 보이는 문장과 FAQPage 구조화 데이터의 문장은 answers.ts 라는 같은 출처를
 * 쓴다. 화면에 없는 FAQ 를 스키마에만 넣으면 검색엔진이 무시한다.
 */
export default function AnswerBlock({ routePath }: Props) {
  const { i18n } = useTranslation()
  const lang: Language = (LANGUAGES as readonly string[]).includes(i18n.language)
    ? (i18n.language as Language)
    : 'ko'

  const answers = getPageAnswers(routePath)
  if (!answers) return null

  const { summary, faqs } = answers

  return (
    <section className="answer-block" aria-labelledby="answer-block__heading">
      <div className="answer-block__inner">
        <h2 className="answer-block__question" id="answer-block__heading">
          {summary.question[lang]}
        </h2>
        <p className="answer-block__answer">{summary.answer[lang]}</p>

        {faqs.length > 0 && (
          <dl className="answer-block__faq">
            {faqs.map((qa) => (
              <div className="answer-block__faq-item" key={qa.question.ko}>
                <dt>{qa.question[lang]}</dt>
                <dd>{qa.answer[lang]}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  )
}
