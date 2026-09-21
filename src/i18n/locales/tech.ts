/**
 * `documents` holds the technical-document copy, keyed by the Supabase
 * `tech_documents.sort_order`. Supabase supplies only the PDF file URL.
 */
const tech = {
  ko: {
    documents: {
      1: {
        title: 'PFPE Ferrofluid\nMFF-M 종합자료',
        description: 'MFF-M PFPE 자성유체의 3대 강점을 정리한 종합 발표자료',
      },
      2: {
        title: 'PFPE Ferrofluid TDS',
        titleSub: '내열성, 증기압 요약 자료',
        description: '6대 핵심 강점과 제품 라인업, 시험 검증 데이터를 담은 기술 브로슈어',
      },
      3: {
        title: 'Ferrofluid\n증기압 기술노트',
        description: '증기압 데이터가 중요한 이유와 검증 방법을 설명한 기술노트',
      },
      4: {
        title: 'Ferrofluid KOPTRI\n증기압 성적서',
        description: '한국고분자시험연구원(KOPTRI)에서 OECD TG 104 유출법으로 측정한 증기압 시험 결과',
      },
      5: {
        title: 'Ferrofluid TGA 데이터\nActive Gas',
        description: '활성 가스용 MFF-M4251/M5070의 TGA 및 리크 테스트 전체 원자료',
      },
      6: {
        title: 'Ferrofluid TGA 데이터\nInert Gas',
        description: '불활성 가스용 MFS/MFH 시리즈의 TGA 시험 결과 전체 원자료 모음',
      },
      7: {
        title: 'What is Ferrofluid?',
        description: '자성유체(Ferrofluid)가 무엇인지 원리와 특성을 쉽게 설명한 소개 자료',
      },
    },
    heading: '기술정보',
    lead: '시험기관 측정 데이터와 기술노트를 확인하실 수 있습니다.',
    bookHint: '클릭시 자료를 열람할수 있습니다.',
    viewPdfAria: '{{title}} PDF 보기',
    download: 'Download',
    viewMore: 'View More',
    viewMoreAria: '기술정보 전체 자료 보기',
    pageTitle: '기술정보',
    pageLead:
      'MFF-M 자성유체의 내열성·증기압·진공 안정성을 뒷받침하는 기술자료와 시험 결과입니다.',
  },
  en: {
    documents: {
      1: {
        title: 'PFPE Ferrofluid\nMFF-M Overview',
        description: 'Presentation on the three key strengths of MFF-M PFPE ferrofluid.',
      },
      2: {
        title: 'PFPE Ferrofluid TDS',
        titleSub: 'Heat resistance & vapor pressure',
        description: 'Brochure covering six core strengths and the product lineup.',
      },
      3: {
        title: 'Ferrofluid\nVapor Pressure Note',
        description: 'Why vapor pressure data matters, and how it is verified in practice.',
      },
      4: {
        title: 'Ferrofluid KOPTRI\nVapor Pressure Report',
        description: 'Official KOPTRI report on MFF-M4251 vapor pressure (OECD TG 104).',
      },
      5: {
        title: 'Ferrofluid TGA Data\nActive Gas',
        description: 'TGA and leak-test raw data for MFF-M4251/M5070 in active gas.',
      },
      6: {
        title: 'Ferrofluid TGA Data\nInert Gas',
        description: 'TGA raw data for the MFS/MFH series in inert gas lines.',
      },
      7: {
        title: 'What is Ferrofluid?',
        description: 'An introductory guide to the principles and properties of ferrofluid.',
      },
    },
    heading: 'Technical Info',
    lead: 'Technical notes and data verified by accredited testing institutes.',
    bookHint: 'Click to open the document.',
    viewPdfAria: 'View {{title}} PDF',
    download: 'Download',
    viewMore: 'View More',
    viewMoreAria: 'View all technical documents',
    pageTitle: 'Technical Information',
    pageLead:
      'Technical documents and accredited test reports backing the heat resistance, vapor pressure, and vacuum stability of MFF-M ferrofluid.',
  },
  zh: {
    documents: {
      1: {
        title: 'PFPE Ferrofluid\nMFF-M 综合资料',
        description: '介绍 MFF-M PFPE 磁性流体耐热性、蒸气压与真空稳定性三大优势的资料。',
      },
      2: {
        title: 'PFPE Ferrofluid TDS',
        titleSub: '耐热性・蒸气压摘要资料',
        description: '包含六大核心优势、产品阵容与权威机构验证数据的技术营销手册。',
      },
      3: {
        title: 'Ferrofluid\n蒸气压技术说明',
        description: '说明真空环境下蒸气压数据的重要性与验证方法的技术资料。',
      },
      4: {
        title: 'Ferrofluid KOPTRI\n蒸气压检测报告',
        description: 'KOPTRI 依据 OECD TG 104（有效扩散法）测定的蒸气压正式检测报告。',
      },
      5: {
        title: 'Ferrofluid TGA 数据\n活性气体',
        description: '活性气体用 MFF-M4251/M5070 的 TGA 及泄漏测试完整原始数据。',
      },
      6: {
        title: 'Ferrofluid TGA 数据\n惰性气体',
        description: '惰性气体用 MFS/MFH 系列的 TGA 试验完整原始数据。',
      },
      7: {
        title: '什么是磁性流体?',
        description: '以图解方式介绍磁性流体（Ferrofluid）原理与特性的入门资料。',
      },
    },
    heading: '技术信息',
    lead: '检测机构测定数据与技术说明资料。',
    bookHint: '点击即可阅览资料。',
    viewPdfAria: '查看 {{title}} PDF',
    download: '下载',
    viewMore: '查看更多',
    viewMoreAria: '查看全部技术资料',
    pageTitle: '技术信息',
    pageLead: '支持 MFF-M 磁性流体耐热性、蒸气压与真空稳定性的技术资料及检测结果。',
  },
}

export default tech
