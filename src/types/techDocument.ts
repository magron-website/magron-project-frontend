export type TechDocumentRow = {
  id: string
  title: string
  description: string | null
  title_en: string | null
  description_en: string | null
  title_zh: string | null
  description_zh: string | null
  file_url: string
  sort_order: number
  is_active: boolean
}

export type TechDocument = {
  id: string
  title: string
  description: string
  fileUrl: string
  sortOrder: number
}
