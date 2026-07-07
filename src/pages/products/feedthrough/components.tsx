import type { ReactNode } from 'react'
import type { KeyValueRow, MatrixTable } from '@/pages/products/feedthrough/content'

type ImagePlaceholderProps = {
  id: string
  description: string
  src?: string
  aspectRatio?: string
  className?: string
}

export function ImagePlaceholder({
  id,
  description,
  src,
  aspectRatio = '16 / 9',
  className = '',
}: ImagePlaceholderProps) {
  return (
    <figure
      className={`ft-placeholder ${className}`.trim()}
      style={{ aspectRatio }}
    >
      {src ? (
        <img
          className="ft-placeholder__img"
          src={src}
          alt=""
          onError={(event) => {
            event.currentTarget.style.display = 'none'
          }}
        />
      ) : null}
      <figcaption className="ft-placeholder__caption">
        <span className="ft-placeholder__id">{id}</span>
        <p className="ft-placeholder__desc">{description}</p>
      </figcaption>
    </figure>
  )
}

export function MatrixTableView({ topLeft, columns, rows }: MatrixTable) {
  return (
    <div className="ft-table-wrap">
      <table className="ft-table">
        <thead>
          <tr>
            <th>{topLeft}</th>
            {columns.map((column, index) => (
              <th key={`${column}-${index}`} className="ft-table__num">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th scope="row">{row.label}</th>
              {row.cells.map((cell, index) => (
                <td key={`${row.label}-${index}`} className="ft-table__num">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function KeyValueTable({ rows }: { rows: readonly KeyValueRow[] }) {
  return (
    <div className="ft-table-wrap">
      <table className="ft-table ft-table--kv">
        <thead>
          <tr>
            <th>Item</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.item}>
              <th scope="row">{row.item}</th>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function CompanyTable({
  rows,
}: {
  rows: readonly { label: string; value: string }[]
}) {
  return (
    <div className="ft-table-wrap">
      <table className="ft-table ft-table--company">
        <thead>
          <tr>
            <th>구분</th>
            <th>내용</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th scope="row">{row.label}</th>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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
    <section id={id} className={`ft-section ${className}`.trim()}>
      <div className="ft-section__inner">
        <header className="ft-section__header">
          <h2 className="ft-section__title">{title}</h2>
          {subtitle ? <p className="ft-section__subtitle">{subtitle}</p> : null}
        </header>
        {children}
      </div>
    </section>
  )
}

type ProductSpecSectionProps = {
  title: string
  subtitle?: string
  body: string
  extraBody?: readonly string[]
  placeholders: readonly {
    id: string
    description: string
    src: string
    aspectRatio?: string
  }[]
  tables?: readonly MatrixTable[]
  keyValueTable?: readonly KeyValueRow[]
  notes?: readonly string[]
}

export function ProductSpecSection({
  title,
  subtitle,
  body,
  extraBody,
  placeholders,
  tables,
  keyValueTable,
  notes,
}: ProductSpecSectionProps) {
  return (
    <Section title={title} subtitle={subtitle} className="ft-section--product">
      <div className="ft-prose">
        <p>{body}</p>
        {extraBody?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      {placeholders.map((placeholder) => (
        <div key={placeholder.id} className="ft-spec-block">
          <ImagePlaceholder
            id={placeholder.id}
            description={placeholder.description}
            src={placeholder.src}
            aspectRatio={placeholder.aspectRatio ?? '16 / 8'}
          />
        </div>
      ))}
      {tables?.map((table, index) => (
        <MatrixTableView key={`${table.topLeft}-${index}`} {...table} />
      ))}
      {keyValueTable ? <KeyValueTable rows={keyValueTable} /> : null}
      {notes?.map((note) => (
        <p key={note} className="ft-note">
          {note}
        </p>
      ))}
    </Section>
  )
}
