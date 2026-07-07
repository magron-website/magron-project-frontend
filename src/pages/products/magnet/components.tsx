import { useState, type ReactNode } from 'react'
import type { SpecColumn, SpecSection, SpecTabGroup } from '@/pages/products/magnet/content'

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
      className={`mn-placeholder ${className}`.trim()}
      style={{ aspectRatio }}
    >
      {src ? (
        <img
          className="mn-placeholder__img"
          src={src}
          alt=""
          onError={(event) => {
            event.currentTarget.style.display = 'none'
          }}
        />
      ) : null}
      <figcaption className="mn-placeholder__caption">
        <span className="mn-placeholder__id">{id}</span>
        <p className="mn-placeholder__desc">{description}</p>
      </figcaption>
    </figure>
  )
}

type SpecTableProps = {
  columns: SpecColumn[]
  rows: Record<string, string>[]
}

export function SpecTable({ columns, rows }: SpecTableProps) {
  return (
    <div className="mn-table-wrap">
      <table className="mn-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`${row[columns[0].key]}-${rowIndex}`}>
              {columns.map((column) => (
                <td key={column.key}>{row[column.key]}</td>
              ))}
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

export function MagnetSpecSection({ section }: { section: SpecSection }) {
  return (
    <div className="mn-spec-block">
      <h3 className="mn-spec-block__title">{section.title}</h3>
      <div className="mn-prose">
        <p>{section.body}</p>
      </div>
      <SpecTable columns={section.columns} rows={section.rows} />
      <ImagePlaceholder
        id={section.placeholder.id}
        description={section.placeholder.description}
        src={section.placeholder.src}
        aspectRatio="16 / 8"
        className="mn-spec-block__placeholder"
      />
    </div>
  )
}

export function SpecTabs({ groups }: { groups: SpecTabGroup[] }) {
  const [activeTab, setActiveTab] = useState(groups[0]?.id ?? '')

  const activeGroup = groups.find((group) => group.id === activeTab) ?? groups[0]

  return (
    <div className="mn-tabs">
      <div className="mn-tabs__list" role="tablist" aria-label="자석 소재별 자기특성표">
        {groups.map((group) => (
          <button
            key={group.id}
            type="button"
            role="tab"
            aria-selected={activeTab === group.id}
            className={`mn-tabs__tab${activeTab === group.id ? ' mn-tabs__tab--active' : ''}`}
            onClick={() => setActiveTab(group.id)}
          >
            {group.label}
          </button>
        ))}
      </div>
      <div className="mn-tabs__panel" role="tabpanel">
        {activeGroup?.sections.map((section) => (
          <MagnetSpecSection key={section.title} section={section} />
        ))}
      </div>
    </div>
  )
}

type MaterialCardProps = {
  title: string
  description: string
  applications: readonly string[]
}

export function MaterialCard({ title, description, applications }: MaterialCardProps) {
  return (
    <article className="mn-material-card">
      <h3 className="mn-material-card__title">{title}</h3>
      <p className="mn-material-card__desc">{description}</p>
      <div className="mn-material-card__apps">
        <p className="mn-material-card__apps-label">주요 적용:</p>
        <ul>
          {applications.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}

type ApplicationCardProps = {
  title: string
  description: string
}

export function ApplicationCard({ title, description }: ApplicationCardProps) {
  return (
    <article className="mn-app-card">
      <h3 className="mn-app-card__title">{title}</h3>
      <p className="mn-app-card__desc">{description}</p>
    </article>
  )
}
