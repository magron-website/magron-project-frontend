export const PRODUCT_SORT_ORDER = {
  ferrofluid: 1,
  feedthrough: 2,
  magoil: 3,
  magnet: 4,
  education: 5,
  display: 6,
} as const

export type ProductPageKey = keyof typeof PRODUCT_SORT_ORDER

export const PRODUCT_PAGE_PATHS: Record<ProductPageKey, string> = {
  ferrofluid: '/ferrofluid',
  feedthrough: '/feedthrough',
  magoil: '/magoil',
  magnet: '/magnet',
  education: '/education',
  display: '/display',
}

const sortOrderToPath = new Map<number, string>(
  Object.entries(PRODUCT_SORT_ORDER).map(([key, sortOrder]) => [
    sortOrder,
    PRODUCT_PAGE_PATHS[key as ProductPageKey],
  ]),
)

export function getProductPathBySortOrder(sortOrder: number): string {
  return sortOrderToPath.get(sortOrder) ?? '/'
}
