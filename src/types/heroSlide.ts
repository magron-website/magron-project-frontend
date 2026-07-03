export type HeroSlideRow = {
  id: string
  title: string
  subtitle: string | null
  description: string | null
  image_url: string
  button_text: string | null
  button_link: string | null
  sort_order: number
  is_active: boolean
}

export type HeroSlide = {
  id: string
  title: string
  subtitle: string
  description: string
  imageUrl: string
  buttonText: string | null
  buttonLink: string | null
  sortOrder: number
}
