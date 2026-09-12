import type { Language } from '@/i18n'
import { toCanonicalPath } from '@/i18n/routing'
import { ROUTE_META, SITE_URL } from '@/seo/routeMeta'
import { PAGE_ANSWERS } from '@/seo/answers'
import { getProductImage } from '@/seo/productImages'
import { PRODUCT_PAGE_PATHS } from '@/pages/products/productRoutes'

/**
 * 화면별 구조화 데이터(JSON-LD).
 *
 * index.html 에 있는 Organization·WebSite·ItemList 는 **모든 화면에 똑같이** 실린다.
 * 사이트 전체를 설명하는 정보라 그게 맞다. 반대로 "이 화면이 무엇인가"를 말해주는
 * Product·FAQPage·BreadcrumbList 는 화면마다 달라야 하는데 지금까지 없었다.
 * 이 파일이 그 부분을 만들고, useJsonLd 가 <head> 에 넣는다.
 *
 * 프리렌더(scripts/prerender.mjs)는 실제 브라우저로 화면을 그린 뒤 page.content()
 * 로 HTML을 통째로 저장한다. 런타임에 <head> 에 넣은 태그도 그대로 저장되므로,
 * JS를 실행하지 않는 크롤러와 AI 봇도 이 구조화 데이터를 그대로 받는다.
 */

const PRODUCT_PATHS = new Set<string>(Object.values(PRODUCT_PAGE_PATHS))

const HOME_LABEL: Record<Language, string> = {
  ko: '홈',
  en: 'Home',
  zh: '首页',
}

/** 구조화 데이터에서 회사를 가리킬 때 쓰는 최소 표현. */
const ORGANIZATION = {
  '@type': 'Organization',
  name: 'MAGRON Co., Ltd.',
  alternateName: ['(주)마그론', 'MAGRON'],
  url: `${SITE_URL}/`,
} as const

/**
 * ROUTE_META 의 <title> 은 `제품명 | MAGRON (주)마그론` 형태다. 스키마의 name 에는
 * 브랜드 꼬리표가 없는 제품명만 들어가야 하므로 첫 구분자 앞까지만 쓴다.
 */
function productName(routePath: string, lang: Language): string {
  const title = ROUTE_META[routePath]?.title[lang] ?? ''
  return title.split('|')[0].trim()
}

function absolute(lang: Language, routePath: string): string {
  return `${SITE_URL}${toCanonicalPath(lang, routePath)}`
}

function buildBreadcrumb(routePath: string, lang: Language) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: HOME_LABEL[lang],
        item: absolute(lang, '/'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: productName(routePath, lang),
        item: absolute(lang, routePath),
      },
    ],
  }
}

function buildProduct(routePath: string, lang: Language) {
  const url = absolute(lang, routePath)
  const image = getProductImage(routePath, SITE_URL)

  return {
    '@type': 'Product',
    name: productName(routePath, lang),
    description: ROUTE_META[routePath]?.description[lang] ?? '',
    url,
    // 대표 이미지가 있어야 검색 결과와 AI 답변에 썸네일이 함께 잡힌다.
    // 값이 없으면 빈 문자열을 넣지 말고 필드째 빼야 한다 — 빈 image 는 오류로 읽힌다.
    ...(image ? { image } : {}),
    brand: { '@type': 'Brand', name: 'MAGRON' },
    manufacturer: ORGANIZATION,
    // 가격을 공개하지 않는 B2B 품목이라 offers 는 넣지 않는다. offers 없이도
    // Product 는 유효하며, AI 검색은 사양·용도 설명을 읽는다.
  }
}

function buildFaqPage(routePath: string, lang: Language) {
  const answers = PAGE_ANSWERS[routePath]
  if (!answers) return null

  /* 화면에 보이는 질문과 스키마의 질문이 같아야 한다. summary(직답)까지 첫 질문으로
     넣는 이유 — 그게 이 화면의 대표 질문이고, AI 답변이 가장 많이 인용하는 문단이다. */
  const entries = [answers.summary, ...answers.faqs]

  return {
    '@type': 'FAQPage',
    mainEntity: entries.map((qa) => ({
      '@type': 'Question',
      name: qa.question[lang],
      acceptedAnswer: { '@type': 'Answer', text: qa.answer[lang] },
    })),
  }
}

/**
 * 이 화면에 실을 구조화 데이터 묶음. 넣을 게 없으면 빈 배열을 돌려준다.
 */
export function buildStructuredData(routePath: string, lang: Language): object[] {
  const nodes: object[] = []

  if (routePath !== '/') {
    nodes.push(buildBreadcrumb(routePath, lang))
  }

  if (PRODUCT_PATHS.has(routePath)) {
    nodes.push(buildProduct(routePath, lang))
  }

  const faq = buildFaqPage(routePath, lang)
  if (faq) nodes.push(faq)

  return nodes
}
