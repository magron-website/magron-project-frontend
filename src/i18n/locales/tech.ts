/**
 * `documents` holds the technical-document copy, keyed by the Supabase
 * `tech_documents.sort_order`. Supabase supplies only the PDF file URL.
 */
const tech = {
  ko: {
    documents: {
      1: {
        title: 'MFF-M 종합자료',
        description:
          'MFF-M PFPE 자성유체의 3대 강점(내열성·증기압·진공 안정성)을 소개하는 종합 발표자료',
      },
      2: {
        title: '기술·제품 브로슈어',
        description:
          '6대 핵심 강점과 제품 라인업, 공인시험기관 검증 데이터를 담은 기술·마케팅 자료',
      },
      3: {
        title: '증기압 기술노트',
        description:
          '극저진공 환경에서 증기압 데이터가 중요한 이유와 TGA·Langmuir·Arrhenius 검증 방법을 설명하는 기술자료',
      },
      4: {
        title: 'KOPTRI 증기압 성적서',
        description:
          'KOPTRI(한국고분자시험연구소)에서 OECD TG 104(Effusion법)로 측정한 MFF-M4251 증기압 공인시험 성적서 (Torr/Pa)',
      },
      5: {
        title: 'TGA 데이터 — Active Gas',
        description: '부식성(활성) 가스용 MFF-M4251/M5070의 TGA 및 리크 테스트 전체 원자료',
      },
      6: {
        title: 'TGA 데이터 — Inert Gas',
        description: '불활성 가스용 MFS/MFH 시리즈의 TGA 전체 원자료',
      },
      7: {
        title: 'What is Ferrofluid?',
        description: '자성유체(Ferrofluid)의 원리와 특성을 쉽게 설명한 소개 자료',
      },
    },
    heading: '기술정보',
    lead: '공인시험기관 검증 데이터와 기술노트를 확인하실 수 있습니다.',
    bookHint: '클릭시 자료를 열람할수 있습니다.',
    viewPdfAria: '{{title}} PDF 보기',
    download: 'Download',
    viewMore: 'View More',
    viewMoreAria: '기술정보 전체 자료 보기',
    pageTitle: '기술정보',
    pageLead:
      'MFF-M 자성유체의 내열성·증기압·진공 안정성을 뒷받침하는 기술자료와 공인시험 성적서입니다.',
  },
  en: {
    documents: {
      1: {
        title: 'MFF-M Overview',
        description:
          'A comprehensive presentation introducing the three key strengths of MFF-M PFPE ferrofluid: heat resistance, vapor pressure, and vacuum stability.',
      },
      2: {
        title: 'Product Brochure',
        description:
          'A technical and marketing brochure covering six core strengths, the product lineup, and data verified by accredited testing institutes.',
      },
      3: {
        title: 'Vapor Pressure Note',
        description:
          'A technical note explaining why vapor pressure data matters in ultra-high vacuum, and the TGA / Langmuir / Arrhenius verification methods.',
      },
      4: {
        title: 'Vapor Pressure Report (KOPTRI)',
        description:
          'The official KOPTRI test report for MFF-M4251 vapor pressure, measured by OECD TG 104 (Effusion method), in Torr and Pa.',
      },
      5: {
        title: 'TGA Data — Active Gas',
        description:
          'Full TGA and leak-test raw data for MFF-M4251/M5070 used in corrosive (active) gas environments.',
      },
      6: {
        title: 'TGA Data — Inert Gas',
        description: 'Full TGA raw data for the MFS/MFH series used in inert gas environments.',
      },
      7: {
        title: 'What is Ferrofluid?',
        description: 'An introductory guide explaining the principles and properties of ferrofluid.',
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
        title: 'MFF-M 综合资料',
        description: '介绍 MFF-M PFPE 磁性流体三大优势（耐热性、蒸气压、真空稳定性）的综合演示资料。',
      },
      2: {
        title: '技术·产品手册',
        description: '包含六大核心优势、产品阵容及权威检测机构验证数据的技术营销资料。',
      },
      3: {
        title: '蒸气压技术说明',
        description:
          '说明在极高真空环境下蒸气压数据的重要性，以及 TGA、Langmuir、Arrhenius 验证方法的技术资料。',
      },
      4: {
        title: 'KOPTRI 蒸气压检测报告',
        description:
          '由 KOPTRI（韩国高分子测试研究所）依据 OECD TG 104（有效扩散法）测定的 MFF-M4251 蒸气压正式检测报告（Torr/Pa）。',
      },
      5: {
        title: 'TGA 数据 — 活性气体',
        description: '用于腐蚀性（活性）气体环境的 MFF-M4251/M5070 的 TGA 及泄漏测试完整原始数据。',
      },
      6: {
        title: 'TGA 数据 — 惰性气体',
        description: '用于惰性气体环境的 MFS/MFH 系列的 TGA 完整原始数据。',
      },
      7: {
        title: '什么是磁性流体?',
        description: '介绍磁性流体（Ferrofluid）原理与特性的入门资料。',
      },
    },
    heading: '技术信息',
    lead: '权威检测机构验证数据与技术说明资料。',
    bookHint: '点击即可阅览资料。',
    viewPdfAria: '查看 {{title}} PDF',
    download: '下载',
    viewMore: '查看更多',
    viewMoreAria: '查看全部技术资料',
    pageTitle: '技术信息',
    pageLead: '支持 MFF-M 磁性流体耐热性、蒸气压与真空稳定性的技术资料及权威检测报告。',
  },
}

export default tech
