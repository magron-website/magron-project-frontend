export const PRODUCT_SORT_ORDER = {
  ferrofluid: 1,
  feedthrough: 2,
  magoil: 3,
  magnet: 4,
  education: 5,
  // The Supabase `product_explanations` row at sort_order 5 was renamed to
  // PIEZO Ink, so the 5th home tile must open the new page. `education`
  // above is kept so /education and its catalog button still work for
  // anyone with the old link — `piezoInk` is declared after it so it wins
  // the sort_order -> path lookup below.
  piezoInk: 5,
  display: 6,
} as const

export type ProductPageKey = keyof typeof PRODUCT_SORT_ORDER

export const PRODUCT_PAGE_PATHS: Record<ProductPageKey, string> = {
  ferrofluid: '/ferrofluid',
  feedthrough: '/feedthrough',
  magoil: '/magoil',
  magnet: '/magnet',
  education: '/education',
  piezoInk: '/piezo-ink',
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
