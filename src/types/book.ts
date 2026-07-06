export type BookRow = {
  id: string
  title: string
  subtitle: string | null
  image_url: string
  pdf_url: string
  sort_order: number
  is_active: boolean
}

export type Book = {
  id: string
  title: string
  subtitle: string
  imageUrl: string
  pdfUrl: string
  sortOrder: number
}
