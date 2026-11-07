// 인콰이어리 시트(Word) → 웹에서 바로 채우는 시트 데이터 (2026-11-07)
//
// 사용: node scripts/build-inquiry-sheets.mjs
// 입력: public/inquiry-sheets/{magnet,feedthrough,ferrofluid}-{ko,en,zh}.docx (OneDrive 4. INQUIRY SHEET 최종본 복사본)
// 출력: src/data/inquiry-sheets/{product}-{lang}.json + public/inquiry-sheets/media/*.png(시트 안 그림)
//
// Word 표를 그대로 옮긴다: 표 → 줄 → 칸. 칸 안의 ☐(체크박스)·"____"(빈칸)·빈 칸은 입력으로,
// 진한 배경 한 줄짜리 칸은 섹션 제목으로, 연한 배경 칸은 항목 이름으로 쓴다.
// 시트를 고치면(Word) public/inquiry-sheets 의 docx 를 바꾸고 이 스크립트를 다시 돌릴 것.
import { execFileSync } from 'node:child_process'
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, '$1')), '..')
const SRC = path.join(ROOT, 'public/inquiry-sheets')
const OUT = path.join(ROOT, 'src/data/inquiry-sheets')
const MEDIA = path.join(SRC, 'media')
fs.mkdirSync(OUT, { recursive: true })
fs.mkdirSync(MEDIA, { recursive: true })

const unzip = (file, entry, binary = false) => execFileSync('unzip', ['-p', file, entry], { maxBuffer: 1 << 28, encoding: binary ? 'buffer' : 'utf8' })
const decode = (s) =>
  s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n)).replace(/&amp;/g, '&')

/** 아주 작은 XML 트리 — Word document.xml 은 형식이 고정이라 이 정도로 충분하다 */
function parseXml(xml) {
  const root = { name: '#root', attrs: '', children: [] }
  const stack = [root]
  const re = /<(\/?)([\w:.-]+)([^>]*?)(\/?)>|([^<]+)/g
  let m
  while ((m = re.exec(xml))) {
    if (m[5] !== undefined) {
      stack[stack.length - 1].children.push({ text: m[5] })
      continue
    }
    const [, close, name, attrs, self] = m
    if (name.startsWith('?') || name.startsWith('!')) continue
    if (close) {
      while (stack.length > 1 && stack.pop().name !== name);
      continue
    }
    const el = { name, attrs, children: [] }
    stack[stack.length - 1].children.push(el)
    if (!self) stack.push(el)
  }
  return root
}
const kids = (el, name) => el.children.filter((c) => c.name === name)
const find = (el, name) => {
  for (const c of el.children || []) {
    if (c.name === name) return c
    const f = find(c, name)
    if (f) return f
  }
  return null
}
const attr = (el, key) => el && (el.attrs.match(new RegExp(`${key}="([^"]*)"`)) || [])[1]

/** 칸(또는 문단) 안을 순서대로 [글자 | 체크박스 | 그림] 토큰으로 */
function tokens(el, rels, ctx, out = []) {
  for (const c of el.children || []) {
    if (c.text !== undefined) continue
    if (c.name === 'w:sdt' && find(c, 'w14:checkbox')) {
      out.push({ t: 'check' })
      continue
    }
    if (c.name === 'w:t') {
      const v = decode(c.children.map((x) => x.text ?? '').join(''))
      if (v) out.push({ t: 'text', v })
      continue
    }
    if (c.name === 'w:sym' && /2610|2612|2611/i.test(attr(c, 'w:char') || '')) {
      out.push({ t: 'check' })
      continue
    }
    if (c.name === 'w:tab') { out.push({ t: 'text', v: ' ' }); continue }
    if (c.name === 'w:br') { out.push({ t: 'br' }); continue }
    if (c.name === 'a:blip') {
      const id = attr(c, 'r:embed')
      if (id && rels[id]) out.push({ t: 'img', src: ctx.saveImage(rels[id]) })
      continue
    }
    if (c.name === 'w:p') {
      // 칸 안 문단 사이는 줄바꿈
      if (out.length && out[out.length - 1].t !== 'br') out.push({ t: 'br' })
      tokens(c, rels, ctx, out)
      continue
    }
    tokens(c, rels, ctx, out)
  }
  return out
}

/** 연속 글자 토큰을 합치고, "____" 는 빈칸 입력으로 쪼갠다 */
function normalize(list) {
  const merged = []
  for (const tk of list) {
    const last = merged[merged.length - 1]
    if (tk.t === 'text' && last?.t === 'text') last.v += tk.v
    else merged.push({ ...tk })
  }
  // 빈칸 표시: 밑줄 "____"(자석 시트), 콜론·Ø·괄호 뒤 공백, 4칸 이상 공백(피드스루·자성유체 시트)
  const BLANK = '\u0000'
  const out = []
  for (const tk of merged) {
    if (tk.t !== 'text') { out.push(tk); continue }
    const marked = tk.v
      .replace(/_{3,}/g, (m) => BLANK + m.length + BLANK)
      .replace(/([:：Ø(（])[  ]{2,}/g, (_, p, i, s) => p + BLANK + 8 + BLANK)
      .replace(/[  ]{4,}/g, (m) => BLANK + Math.max(m.length, 6) + BLANK)
    marked.split(new RegExp(`(${BLANK}\\d+${BLANK})`)).forEach((part) => {
      const m = part.match(new RegExp(`^${BLANK}(\\d+)${BLANK}$`))
      if (m) out.push({ t: 'blank', w: Math.min(+m[1], 32) })
      else if (part) out.push({ t: 'text', v: part })
    })
  }
  while (out.length && out[out.length - 1].t === 'br') out.pop()
  // "값:" 처럼 콜론으로 끝나면 그 뒤가 입력칸
  const tail = out[out.length - 1]
  if (tail?.t === 'text' && /[:：]\s*$/.test(tail.v)) out.push({ t: 'blank', w: 12 })
  // 체크박스 → 다음 글자까지를 선택지 이름으로(☐ 소결 NdFeB ☐ SmCo …)
  const res = []
  for (let i = 0; i < out.length; i++) {
    const tk = out[i]
    if (tk.t === 'check') {
      const next = out[i + 1]
      if (next?.t === 'text') {
        // 다음 체크박스·빈칸 앞까지의 글자 중, 넉넉한 공백(2칸 이상) 앞까지를 이름으로
        const m = next.v.match(/^(\s*\S(?:.*?\S)?)(\s{2,}.*|$)/s)
        const label = (m ? m[1] : next.v).trim()
        const rest = m ? m[2] : ''
        res.push({ t: 'check', label })
        if (rest && rest.trim()) res.push({ t: 'text', v: rest })
        i++
      } else res.push({ t: 'check', label: '' })
    } else res.push(tk)
  }
  return res
}

const darkFill = (fill) => {
  if (!fill || fill === 'auto') return false
  const n = parseInt(fill, 16)
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255
  return 0.299 * r + 0.587 * g + 0.114 * b < 110
}
const lightFill = (fill) => fill && fill !== 'auto' && fill.toUpperCase() !== 'FFFFFF' && !darkFill(fill)

function buildSheet(file, product, lang) {
  const xml = unzip(file, 'word/document.xml')
  const relsXml = unzip(file, 'word/_rels/document.xml.rels')
  const rels = Object.fromEntries([...relsXml.matchAll(/Id="([^"]+)"[^>]*Target="([^"]+)"/g)].map((m) => [m[1], m[2]]))
  const ctx = {
    saveImage(target) {
      const buf = unzip(file, `word/${target}`, true)
      const ext = path.extname(target) || '.png'
      const name = `${crypto.createHash('sha1').update(buf).digest('hex').slice(0, 12)}${ext}`
      const dest = path.join(MEDIA, name)
      if (!fs.existsSync(dest)) fs.writeFileSync(dest, buf)
      return `media/${name}`
    },
  }
  const body = find(parseXml(xml), 'w:body')
  const blocks = []
  for (const el of body.children) {
    if (el.name === 'w:p') {
      const tk = normalize(tokens(el, rels, ctx))
      if (!tk.length) continue
      // 큰 글씨(16pt 이상) 문단 = 제목
      const sizes = []
      const walk = (n) => (n.children || []).forEach((c) => { if (c.name === 'w:sz') sizes.push(+attr(c, 'w:val') || 0); walk(c) })
      walk(el)
      const sz = Math.max(0, ...sizes)
      blocks.push({ type: 'p', tokens: tk, strong: sz >= 32 })
    } else if (el.name === 'w:tbl') {
      const cols = kids(find(el, 'w:tblGrid') || { children: [] }, 'w:gridCol').length || 1
      const rows = kids(el, 'w:tr').map((tr) =>
        kids(tr, 'w:tc').map((tc) => {
          const pr = find(tc, 'w:tcPr')
          const span = +(attr(pr && find(pr, 'w:gridSpan'), 'w:val') || 1)
          const fill = attr(pr && find(pr, 'w:shd'), 'w:fill')
          const tk = normalize(tokens(tc, rels, ctx))
          const kind = !tk.length ? 'input' : darkFill(fill) ? 'head' : lightFill(fill) ? 'label' : 'content'
          const vMerge = pr && find(pr, 'w:vMerge')
          return { span, kind, tokens: tk, ...(vMerge && !attr(vMerge, 'w:val') ? { merged: true } : {}) }
        }),
      )
      blocks.push({ type: 'table', cols, rows })
    }
  }
  return { product, lang, blocks }
}

const PRODUCTS = ['magnet', 'feedthrough', 'ferrofluid']
for (const product of PRODUCTS)
  for (const lang of ['ko', 'en', 'zh']) {
    const file = path.join(SRC, `${product}-${lang}.docx`)
    const sheet = buildSheet(file, product, lang)
    const out = path.join(OUT, `${product}-${lang}.json`)
    fs.writeFileSync(out, JSON.stringify(sheet))
    const cells = sheet.blocks.flatMap((b) => (b.type === 'table' ? b.rows.flat() : []))
    const checks = cells.flatMap((c) => c.tokens).filter((t) => t.t === 'check').length
    const inputs = cells.filter((c) => c.kind === 'input').length
    const blanks = cells.flatMap((c) => c.tokens).filter((t) => t.t === 'blank').length
    console.log(`${product}-${lang}: tables ${sheet.blocks.filter((b) => b.type === 'table').length}, checks ${checks}, empty cells ${inputs}, blanks ${blanks}, ${fs.statSync(out).size} bytes`)
  }
