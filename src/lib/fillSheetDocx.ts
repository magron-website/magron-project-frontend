/**
 * 웹에서 채운 인콰이어리 시트 값을 실제 Word 시트(docx)에 다시 써 넣는다(2026-11-09 요청:
 * "메일 들어올 때 인콰이어리 시트로 딱 들어오게"). 담당자는 메일에 첨부된 채워진 Word 시트를 그대로 본다.
 *
 * 위치 정보는 scripts/build-inquiry-sheets.mjs 가 시트 데이터에 넣어 둔다:
 *   체크칸 = 문서의 몇 번째 <w:sdt>, 빈칸 = 몇 번째 <w:t> 의 몇 번째 글자, 빈 칸 = 몇 번째 <w:tc>.
 * JSZip(약 100KB)은 보낼 때만 불러온다.
 */

type Token =
  | { t: 'text'; v: string }
  | { t: 'check'; label: string; sdt?: number }
  | { t: 'blank'; w: number; at?: { wt: number; off: number; len: number } | null }
  | { t: 'br' }
  | { t: 'img'; src: string }
type Cell = { span: number; kind: 'head' | 'label' | 'content' | 'input'; tokens: Token[]; tc?: number; merged?: boolean }
type Block = { type: 'p'; tokens: Token[] } | { type: 'table'; cols: number; rows: Cell[][] }
export type SheetData = { product: string; lang: string; blocks: Block[] }
type Values = Record<string, string | boolean>

const decode = (s: string) =>
  s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/&amp;/g, '&')
const encode = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/**
 * 다른 언어 시트에서 쓴 값을 이 시트 칸으로 옮긴다 — 같은 칸 안에서 "몇 번째 체크칸·빈칸"끼리 짝짓는다.
 * 칸 배치가 다르면(피드스루 영문판) null.
 */
export function mapValues(from: SheetData, to: SheetData, values: Values): Values | null {
  const cells = (s: SheetData) => {
    const out: { key: string; cell: Cell }[] = []
    s.blocks.forEach((b, bi) => {
      if (b.type === 'table') b.rows.forEach((r, ri) => r.forEach((cell, ci) => out.push({ key: `${bi}-${ri}-${ci}`, cell })))
    })
    return out
  }
  const a = cells(from)
  const b = cells(to)
  if (a.length !== b.length) return null
  const mapped: Values = {}
  for (let i = 0; i < a.length; i++) {
    const [x, y] = [a[i], b[i]]
    if (x.key !== y.key || (x.cell.kind === 'input') !== (y.cell.kind === 'input')) return null
    if (x.cell.kind === 'input') {
      if (values[x.key] !== undefined) mapped[y.key] = values[x.key]
      continue
    }
    const idx = (cell: Cell, type: 'check' | 'blank') =>
      cell.tokens.map((tk, ti) => (tk.t === type ? ti : -1)).filter((ti) => ti >= 0)
    const [xc, yc] = [idx(x.cell, 'check'), idx(y.cell, 'check')]
    if (xc.length !== yc.length) return null
    xc.forEach((ti, n) => {
      const v = values[`${x.key}-${ti}`]
      if (v !== undefined) mapped[`${y.key}-${yc[n]}`] = v
    })
    const [xb, yb] = [idx(x.cell, 'blank'), idx(y.cell, 'blank')]
    xb.forEach((ti, n) => {
      const v = values[`${x.key}-${ti}`]
      if (v !== undefined && yb[n] !== undefined) mapped[`${y.key}-${yb[n]}`] = v
    })
  }
  return mapped
}

/** docx 를 받아 값을 채운 새 docx(Blob) — 체크칸은 ☒, 빈칸·빈 칸은 입력값 */
export async function fillSheetDocx(docUrl: string, sheet: SheetData, values: Values): Promise<Blob> {
  const { default: JSZip } = await import('jszip')
  const zip = await JSZip.loadAsync(await fetch(docUrl).then((r) => r.arrayBuffer()))
  let xml = await zip.file('word/document.xml')!.async('string')

  const checks = new Set<number>()
  const blanks = new Map<number, { off: number; len: number; value: string }[]>()
  const inputs = new Map<number, string>()
  sheet.blocks.forEach((block, bi) => {
    if (block.type !== 'table') return
    block.rows.forEach((row, ri) =>
      row.forEach((cell, ci) => {
        const key = `${bi}-${ri}-${ci}`
        if (cell.kind === 'input') {
          const v = String(values[key] ?? '').trim()
          if (v && cell.tc !== undefined && !cell.merged) inputs.set(cell.tc, v)
          return
        }
        cell.tokens.forEach((tk, ti) => {
          const v = values[`${key}-${ti}`]
          if (tk.t === 'check' && v === true && tk.sdt !== undefined) checks.add(tk.sdt)
          if (tk.t === 'blank' && tk.at && String(v ?? '').trim()) {
            const list = blanks.get(tk.at.wt) ?? []
            list.push({ off: tk.at.off, len: tk.at.len, value: String(v).trim() })
            blanks.set(tk.at.wt, list)
          }
        })
      }),
    )
  })

  // 1) 빈칸: n번째 <w:t> 안의 밑줄·공백 자리를 값으로 바꾼다(새 <w:t> 를 만들지 않으므로 순번이 안 바뀐다)
  let wt = -1
  xml = xml.replace(/<w:t(\s[^>]*)?(\/>|>([^<]*)<\/w:t>)/g, (m, attrs = '', _end, inner) => {
    wt++
    const edits = blanks.get(wt)
    if (!edits) return m
    let text = decode(inner ?? '')
    for (const e of [...edits].sort((p, q) => q.off - p.off)) {
      text = `${text.slice(0, e.off)} ${e.value} ${text.slice(e.off + e.len)}`
    }
    const keep = /xml:space=/.test(attrs) ? attrs : `${attrs} xml:space="preserve"`
    return `<w:t${keep}>${encode(text)}</w:t>`
  })

  // 2) 체크칸: n번째 <w:sdt> 를 체크 상태로(☐ → 체크 기호)
  let sdt = -1
  xml = xml.replace(/<w:sdt>[\s\S]*?<\/w:sdt>|<w:sdt\s[\s\S]*?<\/w:sdt>/g, (m) => {
    sdt++
    if (!checks.has(sdt) || !m.includes('w14:checkbox')) return m
    const on = (m.match(/w14:checkedState w14:val="([0-9A-Fa-f]+)"/) || [])[1] ?? '2612'
    const ch = String.fromCodePoint(parseInt(on, 16))
    return m
      .replace(/w14:checked w14:val="0"/, 'w14:checked w14:val="1"')
      .replace(/(<w:sdtContent>[\s\S]*?)<w:sym w:char="2610"/, `$1<w:sym w:char="${on}"`)
      .replace(/(<w:sdtContent>[\s\S]*?<w:t[^>]*>)☐(<\/w:t>)/, `$1${ch}$2`)
  })

  // 3) 빈 칸: n번째 <w:tc> 첫 문단 끝에 글자를 넣는다(새 <w:t> 가 생기므로 맨 마지막에)
  let tc = -1
  xml = xml.replace(/<w:tc(?=[\s>])[\s\S]*?<\/w:p>/g, (m) => {
    tc++
    const v = inputs.get(tc)
    if (!v) return m
    const runs = v
      .split('\n')
      .map((line, i) => `${i ? '<w:br/>' : ''}<w:t xml:space="preserve">${encode(line)}</w:t>`)
      .join('')
    return m.replace(/<\/w:p>$/, `<w:r><w:rPr><w:sz w:val="18"/><w:szCs w:val="18"/></w:rPr>${runs}</w:r></w:p>`)
  })

  zip.file('word/document.xml', xml)
  return zip.generateAsync({
    type: 'blob',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    compression: 'DEFLATE', // 메일 4MB 한도 — 압축 안 하면 원본보다 40% 커졌다
  })
}
