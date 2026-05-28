// Dishes and restaurants must match FoodMap-backend/restaurants.js

export type ProfileDish = {
  id: number
  name: string
  restaurant: string
  restaurantId: number
  price: string
  rating: number
  image: string
}

export type UserProfile = {
  id: string
  name: string
  username: string
  bio: string
  role: string
  avatar: string
  badges: string[]
  visitedDishes: ProfileDish[]
  wantDishes: ProfileDish[]
  friendsActivity: {
    id: number
    avatar: string
    text: string
    rating: number
  }[]
}

export const MOCK_USERS: UserProfile[] = [
  {
    id: 'david-l',
    name: 'David L.',
    username: 'david_l',
    bio: 'Always chasing the perfect bowl of ramen. Noodle pilgrim.',
    role: 'Ramen Lover',
    avatar: 'https://i.pravatar.cc/150?img=11',
    badges: ['Ramen Master', 'Top Reviewer'],
    visitedDishes: [
      {
        id: 1,
        name: 'Tonkotsu Ramen',
        restaurant: 'Ramen Ichiraku',
        restaurantId: 1,
        price: '42 zł',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80',
      },
      {
        id: 2,
        name: 'Spicy Miso Ramen',
        restaurant: 'Ramen Ichiraku',
        restaurantId: 1,
        price: '44 zł',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1535140728325-a4d3707eee61?w=800&q=80',
      },
    ],
    wantDishes: [
      {
        id: 3,
        name: 'Shoyu Ramen',
        restaurant: 'Ramen Ichiraku',
        restaurantId: 1,
        price: '40 zł',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
      },
    ],
    friendsActivity: [
      { id: 1, avatar: 'https://i.pravatar.cc/40?img=5', text: 'Sarah M. reviewed Dragon Roll at Sushi Kyo', rating: 4.8 },
    ],
  },
  {
    id: 'sarah-m',
    name: 'Sarah M.',
    username: 'sarah_m',
    bio: 'Sushi is life. Raw fish enthusiast and rice perfectionist.',
    role: 'Sushi Enthusiast',
    avatar: 'https://i.pravatar.cc/150?img=5',
    badges: ['Sushi Expert', 'Early Adopter'],
    visitedDishes: [
      {
        id: 1,
        name: 'Dragon Roll',
        restaurant: 'Sushi Kyo',
        restaurantId: 3,
        price: '48 zł',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=800&q=80',
      },
      {
        id: 2,
        name: 'Chirashi Bowl',
        restaurant: 'Sushi Kyo',
        restaurantId: 3,
        price: '58 zł',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1535140728325-a4d3707eee61?w=800&q=80',
      },
    ],
    wantDishes: [],
    friendsActivity: [
      { id: 1, avatar: 'https://i.pravatar.cc/40?img=11', text: 'David L. tried Tonkotsu Ramen at Ramen Ichiraku', rating: 4.9 },
    ],
  },
  {
    id: 'alex-m',
    name: 'Alex Mercer',
    username: 'alex_m',
    bio: 'Exploring the city one noodle bowl at a time. Always on the hunt for the perfect sourdough.',
    role: 'Pastry Critic',
    avatar: 'https://i.pravatar.cc/150?img=3',
    badges: ['Ramen Master', 'Top Reviewer', 'Bread Enthusiast'],
    visitedDishes: [
      {
        id: 1,
        name: 'Tonkotsu Ramen',
        restaurant: 'Ramen Ichiraku',
        restaurantId: 1,
        price: '42 zł',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80',
      },
      {
        id: 2,
        name: 'Almond Croissant',
        restaurant: 'Café Szafe',
        restaurantId: 5,
        price: '12 zł',
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80',
      },
      {
        id: 3,
        name: 'Flat White',
        restaurant: 'Café Szafe',
        restaurantId: 5,
        price: '14 zł',
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
      },
    ],
    wantDishes: [
      {
        id: 4,
        name: 'Midnight Ganache',
        restaurant: 'Wierzynek',
        restaurantId: 4,
        price: '36 zł',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80',
      },
    ],
    friendsActivity: [
      { id: 1, avatar: 'https://i.pravatar.cc/40?img=11', text: 'David L. reviewed Dragon Roll at Sushi Kyo', rating: 4.8 },
    ],
  },
  {
    id: 'elena-r',
    name: 'Elena R.',
    username: 'elena_r',
    bio: 'Coffee snob, brunch queen, and taco aficionado.',
    role: 'Coffee Aficionado',
    avatar: 'https://i.pravatar.cc/150?img=9',
    badges: ['Coffee Connoisseur', 'Brunch Queen'],
    visitedDishes: [
      {
        id: 1,
        name: 'Flat White',
        restaurant: 'Café Szafe',
        restaurantId: 5,
        price: '14 zł',
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
      },
      {
        id: 2,
        name: 'Avocado Toast',
        restaurant: 'Café Szafe',
        restaurantId: 5,
        price: '28 zł',
        rating: 4.4,
        image: 'https://images.unsplash.com/photo-1772717737730-85eff61606c8?w=800&q=80',
      },
    ],
    wantDishes: [
      {
        id: 3,
        name: 'Margherita DOC',
        restaurant: 'Mamma Mia Pizza',
        restaurantId: 2,
        price: '32 zł',
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80',
      },
    ],
    friendsActivity: [
      { id: 1, avatar: 'https://i.pravatar.cc/40?img=5', text: 'Sarah M. tried Chirashi Bowl at Sushi Kyo', rating: 4.9 },
    ],
  },
]
