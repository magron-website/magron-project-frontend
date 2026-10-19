import type { Language } from '@/i18n'

type Localized = Record<Language, string>

export type SourceLink = { label: Localized; href: string }

/**
 * 시험법·시험기관 외부 링크. 기술정보·자성유체·씰 비교 화면이 같이 쓴다.
 * (주)마그론 명의 특허는 KIPRIS 기준 자성유체와 무관한 1건(KR 10-2319257, 에어로졸 장치)뿐이라 걸지 않는다(2026-10-19 조사).
 */
export const SOURCE_LINKS: SourceLink[] = [
  {
    label: {
      ko: 'OECD 시험지침 104: 증기압 (Test No. 104: Vapour Pressure)',
      en: 'OECD Test Guideline No. 104: Vapour Pressure',
      zh: 'OECD 测试准则 104：蒸气压（Test No. 104: Vapour Pressure）',
    },
    href: 'https://doi.org/10.1787/9789264069565-en',
  },
  {
    label: {
      ko: '한국고분자시험연구원 (KOPTRI) — 증기압 시험',
      en: 'Korea Polymer Testing & Research Institute (KOPTRI) — vapor pressure test',
      zh: '韩国高分子试验研究院（KOPTRI）— 蒸气压试验',
    },
    href: 'https://www.koptri.re.kr/',
  },
  {
    label: {
      ko: '한국생산기술연구원 (KITECH) — TGA 내열성 시험',
      en: 'Korea Institute of Industrial Technology (KITECH) — TGA heat-resistance test',
      zh: '韩国生产技术研究院（KITECH）— TGA 耐热试验',
    },
    href: 'https://www.kitech.re.kr/',
  },
]

