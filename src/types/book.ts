export type BookRow = {
  id: string
  title: string
  subtitle: string | null
  image_url: string
  pdf_url: string
  sort_order: number
  is_active: boolean
}

/** Only the files come from Supabase — the caption is authored in `locales/home.ts`. */
export type Book = {
  id: string
  imageUrl: string
  pdfUrl: string
  sortOrder: number
}
