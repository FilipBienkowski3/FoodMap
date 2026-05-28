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

export type ReviewDishOption = {
  key: string
  name: string
  price: number
  rating: number
  image: string
}

export function getReviewDishes(restaurant: Restaurant): ReviewDishOption[] {
  const byKey = new Map<string, ReviewDishOption>()

  for (const dish of restaurant.topDishes) {
    byKey.set(`top-${dish.id}`, {
      key: `top-${dish.id}`,
      name: dish.name,
      price: dish.price,
      rating: dish.rating,
      image: dish.image,
    })
  }

  for (const [category, items] of Object.entries(restaurant.menu) as [MenuCategory, MenuItem[]][]) {
    for (const item of items) {
      const key = `${category}-${item.id}`
      if (!byKey.has(key)) {
        byKey.set(key, {
          key,
          name: item.name,
          price: item.price,
          rating: Math.min(5, Math.max(1, Math.round(restaurant.rating))),
          image: item.image,
        })
      }
    }
  }

  return [...byKey.values()]
}

export const menuItemReviewKey = (category: MenuCategory, itemId: number) =>
  `${category}-${itemId}`
