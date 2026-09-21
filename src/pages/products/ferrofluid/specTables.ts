import type { Language } from '@/i18n'
import type { SpecTableData } from '@/components/SpecTable'

/**
 * 자성유체 사양표 — 카탈로그 표 이미지(ferrofluid_3 / ferrofluid_6)를 그대로 옮긴 값.
 *
 * 숫자와 모델명은 언어와 무관하므로 번역하지 않는다. 특성 이름과 단위도 원본
 * 카탈로그가 영문이라 그대로 두고, 표 제목만 언어별로 바꾼다.
 *
 * 값을 고칠 일이 생기면 반드시 카탈로그 원본과 대조할 것. 여기 숫자가 AI 검색이
 * "MFF-M5070 점도는?" 같은 질문에 답할 때 인용하는 근거가 된다.
 */

const COLUMNS = [
  { group: 'Saturation Magnetization', unit: 'Gauss' },
  { group: 'Viscosity', unit: 'mPa·s (cP) at 27℃' },
  { group: 'Vapor Pressure', unit: 'Pa at 20℃' },
  { group: 'Vapor Pressure', unit: 'Torr (mmHg) at 20℃' },
  { group: 'Helium gas leak (Torr·L/s)', unit: 'Less than 1E-11' },
  { group: '1 wt% loss Temp. (TGA)', unit: '℃' },
  { group: 'Pour point', unit: '℃' },
  { group: 'Density', unit: 'g/cm³' },
]

const CAPTIONS = {
  corrosive: {
    ko: 'Corrosive Gas용 자성유체 사양 (MFF / MFF-M Series)',
    en: 'Ferrofluid for Corrosive Gas — Specifications (MFF / MFF-M Series)',
    zh: '腐蚀性气体用磁流体规格 (MFF / MFF-M 系列)',
  },
  nonCorrosive: {
    ko: 'Non-Corrosive Gas용 자성유체 사양 (MFS / MFH Series)',
    en: 'Ferrofluid for Non-Corrosive Gas — Specifications (MFS / MFH Series)',
    zh: '非腐蚀性气体用磁流体规格 (MFS / MFH 系列)',
  },
} satisfies Record<string, Record<Language, string>>

const NOTES = {
  ko: [
    '측정 조건은 각 열의 단위 표기를 따릅니다 (점도 27℃, 증기압 20℃ 기준).',
    '증기압은 한국고분자시험연구원(KOPTRI)에서 OECD TG 104 유출법으로 측정했으며, 측정 자료는 기술정보 페이지에서 확인할 수 있습니다.',
  ],
  en: [
    'Measurement conditions follow the unit notation in each column (viscosity at 27℃, vapor pressure at 20℃).',
    'Vapor pressure was measured at KOPTRI (Korea Polymer Testing & Research Institute) using the OECD TG 104 effusion method; the data is available on the Technical Information page.',
  ],
  zh: [
    '测量条件依据各列的单位标注（粘度 27℃、蒸气压 20℃）。',
    '蒸气压由韩国高分子试验研究院（KOPTRI）依据 OECD TG 104 逸出法测定，测定资料可在技术信息页面查阅。',
  ],
} satisfies Record<Language, string[]>

/** 부식성 가스용 — MFF / MFF-M 시리즈. */
export function corrosiveSpecTable(lang: Language): SpecTableData {
  return {
    caption: CAPTIONS.corrosive[lang],
    cornerLabel: 'Model',
    columns: COLUMNS,
    // 카탈로그에서 주황 테두리로 강조된 두 모델 — 리크 테스트 데이터가 공개된 모델이다
    highlight: ['MFF-M4251', 'MFF-M5070'],
    rows: [
      { grade: 'MFF-M4251', cells: ['420', '5,100', '<1.5E-10', '<1.2E-12', 'Ok', '>280', '<-40', '2.198'] },
      { grade: 'MFF-M5070', cells: ['500', '7,000', '<1.5E-10', '<1.2E-12', 'Ok', '>280', '<-40', '2.240'] },
    ],
    notes: NOTES[lang],
  }
}

/**
 * 리크 테스트 결과 — 차트 이미지가 담고 있는 내용을 표로 옮긴 것.
 *
 * 차트는 측정기 화면 캡처라 해상도가 낮아 확대하면 읽기 어렵고, 그림이라
 * 검색·AI·낭독기 어디에서도 읽히지 않는다. 실제 정보량은 아래 표가 전부이므로
 * 표를 본문으로 두고 차트는 근거 이미지로 아래에 남긴다.
 */
const LEAK_CAPTIONS = {
  ko: '리크 테스트 결과 (Helium)',
  en: 'Helium Leak Test Results',
  zh: '氦气检漏测试结果',
} satisfies Record<Language, string>

const LEAK_COLUMNS: Record<Language, { group: string; unit: string }[]> = {
  ko: [
    { group: '측정일', unit: '' },
    { group: 'Setpoint 1', unit: 'Pa·m³/s' },
    { group: 'Setpoint 2', unit: 'Pa·m³/s' },
    { group: '수렴까지 걸린 시간', unit: '분 (약)' },
    { group: '수렴 리크율', unit: 'Pa·m³/s' },
  ],
  en: [
    { group: 'Test date', unit: '' },
    { group: 'Setpoint 1', unit: 'Pa·m³/s' },
    { group: 'Setpoint 2', unit: 'Pa·m³/s' },
    { group: 'Time to settle', unit: 'min (approx.)' },
    { group: 'Settled leak rate', unit: 'Pa·m³/s' },
  ],
  zh: [
    { group: '测定日期', unit: '' },
    { group: 'Setpoint 1', unit: 'Pa·m³/s' },
    { group: 'Setpoint 2', unit: 'Pa·m³/s' },
    { group: '达到稳定所需时间', unit: '分钟（约）' },
    { group: '稳定泄漏率', unit: 'Pa·m³/s' },
  ],
}

const LEAK_NOTES: Record<Language, string[]> = {
  ko: [
    '리크헌팅 없이 안정적으로 수렴하며, 수렴 후에는 진공도가 일정하게 유지됩니다.',
    '아래 차트는 위 표의 근거가 되는 측정기 원본 기록입니다.',
  ],
  en: [
    'The rate settles without leak hunting, and the vacuum level stays constant afterwards.',
    'The charts below are the original instrument records behind this table.',
  ],
  zh: [
    '无检漏波动，稳定收敛，收敛后真空度保持恒定。',
    '下方图表为本表所依据的仪器原始记录。',
  ],
}

/** 리크 테스트 결과표 — 차트 이미지를 대신하는 본문. */
export function leakTestTable(lang: Language): SpecTableData {
  return {
    caption: LEAK_CAPTIONS[lang],
    cornerLabel: 'Model',
    columns: LEAK_COLUMNS[lang],
    rows: [
      { grade: 'MFF-M4251', cells: ['2024-07-03', '1.0E-07', '1.0E-12', '38', '1E-10 ~ 1E-11'] },
      { grade: 'MFF-M5070', cells: ['2024-09-11', '1.0E-07', '1.0E-12', '53', '1E-10 ~ 1E-11'] },
    ],
    notes: LEAK_NOTES[lang],
  }
}

/** 비부식성 가스용 — MFS(Silicon) / MFH(Hydrocarbon) 시리즈. */
export function nonCorrosiveSpecTable(lang: Language): SpecTableData {
  return {
    caption: CAPTIONS.nonCorrosive[lang],
    cornerLabel: 'Model',
    columns: COLUMNS,
    rows: [
      { grade: 'MFS-7390', cells: ['730', '9,000', '<5E-11', '<3.75E-13', 'Ok', '200', '<-40', '1.50'] },
      { grade: 'MFS-6022 (MFS-630)', cells: ['600', '2,200', '<5E-11', '<3.75E-13', 'Ok', '200', '<-40', '1.39'] },
      { grade: 'MFS-5009 (MFS-513)', cells: ['500', '900', '<5E-11', '<3.75E-13', 'Ok', '200', '<-40', '1.31'] },
      { grade: 'MFS-4005 (MFS-407)', cells: ['400', '500', '<5E-11', '<3.75E-13', 'Ok', '200', '<-40', '1.21'] },
      { grade: 'MFH-7730', cells: ['770', '3,000', '<5E-11', '<3.75E-13', 'Ok', '170', '<-40', '1.52'] },
      { grade: 'MFH-6206', cells: ['620', '650', '<5E-11', '<3.75E-13', 'Ok', '170', '<-40', '1.39'] },
      { grade: 'MFH-5002 (MFH-503)', cells: ['500', '210', '<5E-11', '<3.75E-13', 'Ok', '170', '<-40', '1.30'] },
      { grade: 'MFH-4401', cells: ['440', '150', '<5E-11', '<3.75E-13', 'Ok', '170', '<-40', '1.22'] },
    ],
    notes: NOTES[lang],
  }
}
