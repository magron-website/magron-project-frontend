import '@/assets/design/spec-table.css'

/**
 * 카탈로그 사양표를 이미지 대신 진짜 HTML `<table>` 로 그린다.
 *
 * 왜 바꾸나: 사양표 숫자가 PNG 안에 있으면 검색엔진도 AI 검색도 읽지 못한다.
 * "MFF-M5070 점도" 같은 질문에 답할 근거가 사이트에 있는데도 인용되지 않는 상태였다.
 * 표로 옮기면 문단처럼 추출 대상이 되고, 화면 낭독기·복사·검색(Ctrl+F)도 같이 된다.
 *
 * 헤더가 두 줄인 이유: 원본 카탈로그가 `특성 이름 / 단위·측정조건` 2단 구조라서다.
 * `columns[].group` 이 연달아 같으면 위쪽 칸을 colspan 으로 합쳐 원본과 같은 모양이 된다.
 */

export type SpecColumn = {
  /** 위쪽 헤더 — 특성 이름. 연속으로 같으면 한 칸으로 합쳐진다 */
  group: string
  /** 아래쪽 헤더 — 단위와 측정 조건 */
  unit?: string
}

export type SpecRow = {
  /** 첫 칸 — 모델명 또는 등급 */
  grade: string
  cells: string[]
  /** 이 행 앞에 들어갈 소구분 제목 (예: Sm1Co5 / Anisotropic) */
  section?: string
}

export type SpecTableData = {
  /** 표 제목. 화면에 이미 제목이 있으면 `caption` prop 으로 넘기고 여기는 비워둔다 */
  caption?: string
  /** 좌상단 칸 (Model / Grade) */
  cornerLabel: string
  columns: SpecColumn[]
  rows: SpecRow[]
  /** 원본 카탈로그의 ※ 주석 */
  notes?: string[]
  /** 카탈로그에서 강조 표시된 모델명 */
  highlight?: string[]
}

/** 같은 그룹명이 연달아 나오면 한 칸으로 합치기 위한 colspan 계산. */
function mergeGroups(columns: SpecColumn[]): Array<{ group: string; span: number }> {
  const merged: Array<{ group: string; span: number }> = []
  for (const col of columns) {
    const last = merged[merged.length - 1]
    if (last && last.group === col.group) last.span += 1
    else merged.push({ group: col.group, span: 1 })
  }
  return merged
}

type Props = {
  data: SpecTableData
  /** 화면의 제목을 그대로 표 이름으로 쓸 때 (data.caption 보다 우선한다) */
  caption?: string
  /** 바로 위에 같은 제목이 이미 보이는 경우 — 낭독기에는 남기고 화면에서만 숨긴다 */
  hideCaption?: boolean
}

export default function SpecTable({ data, caption, hideCaption }: Props) {
  const { cornerLabel, columns, rows, notes, highlight } = data
  const title = caption ?? data.caption ?? ''
  const hasUnitRow = columns.some((col) => col.unit)
  const groups = mergeGroups(columns)
  const highlighted = new Set(highlight ?? [])

  return (
    <div className="spec-table">
      <div className="spec-table__scroll" tabIndex={0} role="group" aria-label={title}>
        <table>
          <caption
            className={`spec-table__caption${hideCaption ? ' spec-table__caption--hidden' : ''}`}
          >
            {title}
          </caption>
          <thead>
            <tr>
              <th scope="col" rowSpan={hasUnitRow ? 2 : 1} className="spec-table__corner">
                {cornerLabel}
              </th>
              {groups.map((g, i) => (
                <th key={`${g.group}-${i}`} scope="col" colSpan={g.span}>
                  {g.group}
                </th>
              ))}
            </tr>
            {hasUnitRow && (
              <tr>
                {columns.map((col, i) => (
                  <th key={`${col.group}-${col.unit}-${i}`} scope="col" className="spec-table__unit">
                    {col.unit}
                  </th>
                ))}
              </tr>
            )}
          </thead>
          <tbody>
            {rows.map((row) => (
              <SpecRows
                key={row.grade}
                row={row}
                columnCount={columns.length}
                isHighlighted={highlighted.has(row.grade)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {notes && notes.length > 0 && (
        <ul className="spec-table__notes">
          {notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

function SpecRows({
  row,
  columnCount,
  isHighlighted,
}: {
  row: SpecRow
  columnCount: number
  isHighlighted: boolean
}) {
  return (
    <>
      {row.section && (
        <tr className="spec-table__section">
          <th scope="colgroup" colSpan={columnCount + 1}>
            {row.section}
          </th>
        </tr>
      )}
      <tr className={isHighlighted ? 'spec-table__row--highlight' : undefined}>
        <th scope="row">{row.grade}</th>
        {row.cells.map((cell, i) => (
          <td key={`${row.grade}-${i}`}>{cell}</td>
        ))}
      </tr>
    </>
  )
}
