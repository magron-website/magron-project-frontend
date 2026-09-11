import type { ReactNode } from 'react'
import SpecTable, { type SpecTableData } from '@/components/SpecTable'

type TableFigureProps = {
  id?: string
  title: string
  description: string
  image: string
  note?: string
  /** 카탈로그 표를 옮긴 데이터. 있으면 이미지 대신 진짜 HTML 표로 그린다 */
  table?: SpecTableData
}

/**
 * 등급별 특성표 한 덩어리.
 *
 * `table` 이 있으면 HTML `<table>` 로 그린다 — 표 안의 숫자가 검색·복사·낭독기에
 * 잡히고, AI 검색이 "N52 최대 사용온도" 같은 질문에 이 표를 근거로 인용할 수 있다.
 * 아직 옮기지 못한 표만 기존 카탈로그 이미지로 남는다.
 */
export function TableFigure({ id, title, description, image, note, table }: TableFigureProps) {
  return (
    <article id={id} className="mn-mat-table">
      <h3 className="mn-mat-table__title">{title}</h3>
      <p className="mn-mat-table__desc">{description}</p>
      {table ? (
        <div className="mn-mat-table__data">
          {/* 제목은 바로 위 h3 가 이미 보여주므로 표 caption 은 낭독기용으로만 남긴다 */}
          <SpecTable data={table} caption={title} hideCaption />
          {note ? <p className="mn-mat-table__note">{note}</p> : null}
        </div>
      ) : (
        <figure className="mn-mat-table__figure">
          <div className="mn-mat-table__scroll">
            <img src={image} alt={title} loading="lazy" />
          </div>
          {note ? <figcaption>{note}</figcaption> : null}
        </figure>
      )}
    </article>
  )
}

type SectionProps = {
  id?: string
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
}

export function Section({ id, title, subtitle, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`mn-section ${className}`.trim()}>
      <div className="mn-section__inner">
        <header className="mn-section__header">
          <h2 className="mn-section__title">{title}</h2>
          {subtitle ? <p className="mn-section__subtitle">{subtitle}</p> : null}
        </header>
        {children}
      </div>
    </section>
  )
}
