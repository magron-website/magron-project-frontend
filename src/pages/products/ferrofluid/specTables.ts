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
    '증기압은 KOPTRI(한국고분자시험연구소)에서 OECD TG 104 방법으로 측정한 공인시험 성적서를 기술정보 페이지에서 확인할 수 있습니다.',
  ],
  en: [
    'Measurement conditions follow the unit notation in each column (viscosity at 27℃, vapor pressure at 20℃).',
    'Vapor pressure is certified by KOPTRI under OECD TG 104; the report is available on the Technical Information page.',
  ],
  zh: [
    '测量条件依据各列的单位标注（粘度 27℃、蒸气压 20℃）。',
    '蒸气压由 KOPTRI（韩国高分子试验研究所）依据 OECD TG 104 方法测定，检测报告可在技术信息页面查阅。',
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
      { grade: 'MFF-R6085', cells: ['600', '8,500', '<1.5E-10', '<1.2E-12', 'Ok', '>140', '<-40', '2.25'] },
      { grade: 'MFF-R5050', cells: ['500', '5,000', '<1.5E-10', '<1.2E-12', 'Ok', '>140', '<-40', '2.2'] },
      { grade: 'MFF-R4020', cells: ['400', '2,000', '<1.5E-10', '<1.2E-12', 'Ok', '>140', '<-40', '2.14'] },
    ],
    notes: NOTES[lang],
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
