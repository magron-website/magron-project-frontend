export type DisplayVideoRow = {
  id: string
  title: string
  subtitle: string | null
  description: string | null
  video_url: string
  category: string | null
  sort_order: number
  is_active: boolean
}

export type DisplayVideo = {
  id: string
  title: string
  videoUrl: string
  sortOrder: number
}
