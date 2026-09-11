import { useEffect } from 'react'
import type { Language } from '@/i18n'
import { buildStructuredData } from '@/seo/structuredData'

/** 화면이 바뀔 때마다 갈아끼우는 단 하나의 JSON-LD 블록. */
const NODE_ID = 'magron-route-jsonld'

/**
 * 화면별 구조화 데이터를 <head> 에 넣고, 화면이 바뀌면 그 자리에서 교체한다.
 *
 * id 를 고정해 두고 내용만 갈아끼우는 이유: 라우터로 화면을 옮길 때마다 새
 * <script> 를 추가하면 지난 화면의 Product·FAQ 가 계속 쌓여서, 한 문서 안에
 * 서로 다른 제품 스키마가 여러 개 남는다. 검색엔진은 이를 잘못된 마크업으로 본다.
 *
 * useSeoMeta 와 나란히 Layout 에서 한 번만 부르면 30개 화면 전부에 적용된다.
 */
export function useJsonLd(routePath: string, lang: Language) {
  useEffect(() => {
    const nodes = buildStructuredData(routePath, lang)
    const existing = document.getElementById(NODE_ID)

    if (nodes.length === 0) {
      existing?.remove()
      return
    }

    const el = existing ?? document.createElement('script')
    if (!existing) {
      el.id = NODE_ID
      el.setAttribute('type', 'application/ld+json')
      document.head.appendChild(el)
    }

    /* @graph 로 묶으면 여러 타입을 한 블록에 넣으면서도 서로 독립된 노드로 읽힌다. */
    el.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': nodes,
    })
  }, [routePath, lang])
}
