export type FerrofluidInfoRow = {
  id: string
  title: string
  subtitle: string | null
  description: string | null
  image_url: string
  category: string | null
  sort_order: number
  is_active: boolean
}

export type FerrofluidInfo = {
  id: string
  title: string
  subtitle: string
  description: string
  imageUrl: string
  category: string
  sortOrder: number
}
