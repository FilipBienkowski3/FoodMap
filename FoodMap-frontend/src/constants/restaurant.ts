export type MenuCategory = 'starters' | 'mains' | 'desserts' | 'drinks'

export type MenuItem = {
  id: number
  name: string
  price: number
  description: string
  image: string
  tags?: string[]
}

export type TopDish = {
  id: number
  name: string
  price: number
  rating: number
  image: string
}

export type Restaurant = {
  id: number
  lat: number
  lng: number
  icon: string
  name: string
  price: number
  rating: number
  hours: string
  img: string
  reviewCount: number
  topDishes: TopDish[]
  menu: Record<MenuCategory, MenuItem[]>
}

export const MENU_TABS: { key: MenuCategory; label: string }[] = [
  { key: 'starters', label: 'STARTERS' },
  { key: 'mains', label: 'MAINS' },
  { key: 'desserts', label: 'DESSERTS' },
  { key: 'drinks', label: 'DRINKS' },
]
