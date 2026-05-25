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
        price: '$16.00',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 2,
        name: 'Spicy Miso Ramen',
        restaurant: 'Ramen Ichiraku',
        restaurantId: 1,
        price: '$14.00',
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?auto=format&fit=crop&w=800&q=80',
      },
    ],
    wantDishes: [
      {
        id: 3,
        name: 'Tsukemen',
        restaurant: 'Ramen Ichiraku',
        restaurantId: 1,
        price: '$18.00',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1623341214825-9f4f963727da?auto=format&fit=crop&w=800&q=80',
      },
    ],
    friendsActivity: [
      { id: 1, avatar: 'https://i.pravatar.cc/40?img=5', text: 'Sarah M. reviewed Spicy Tuna Roll at Sushi Spot', rating: 4.2 },
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
        name: 'Spicy Tuna Roll',
        restaurant: 'Sushi Kyo',
        restaurantId: 3,
        price: '$14.00',
        rating: 4.2,
        image: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 2,
        name: 'Salmon Sashimi',
        restaurant: 'Sushi Kyo',
        restaurantId: 3,
        price: '$22.00',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1535140728325-a4d3707eee61?auto=format&fit=crop&w=800&q=80',
      },
    ],
    wantDishes: [],
    friendsActivity: [
      { id: 1, avatar: 'https://i.pravatar.cc/40?img=11', text: 'David L. tried Tonkotsu Ramen at Ramen Ichiraku', rating: 4.8 },
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
        price: '$16.00',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 2,
        name: 'Artisan Sourdough',
        restaurant: 'Café Szafe',
        restaurantId: 5,
        price: '$3.50',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1585478259715-876acc5be8eb?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 3,
        name: 'Matcha Latte',
        restaurant: 'Café Szafe',
        restaurantId: 5,
        price: '$6.00',
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
      },
    ],
    wantDishes: [
      {
        id: 4,
        name: 'Kouign-Amann',
        restaurant: 'Wierzynek',
        restaurantId: 4,
        price: '$5.50',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?auto=format&fit=crop&w=800&q=80',
      },
    ],
    friendsActivity: [
      { id: 1, avatar: 'https://i.pravatar.cc/40?img=11', text: 'David L. reviewed Spicy Tuna Roll at Sushi Spot', rating: 4.2 },
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
        price: '$5.00',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 2,
        name: 'Avocado Toast',
        restaurant: 'Café Szafe',
        restaurantId: 5,
        price: '$12.00',
        rating: 4.4,
        image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?auto=format&fit=crop&w=800&q=80',
      },
    ],
    wantDishes: [
      {
        id: 3,
        name: 'Birria Tacos',
        restaurant: 'Mamma Mia Pizza',
        restaurantId: 2,
        price: '$11.00',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1613514785940-daed07799d9b?auto=format&fit=crop&w=800&q=80',
      },
    ],
    friendsActivity: [
      { id: 1, avatar: 'https://i.pravatar.cc/40?img=5', text: 'Sarah M. tried Salmon Sashimi at Omakase', rating: 4.9 },
    ],
  },
]