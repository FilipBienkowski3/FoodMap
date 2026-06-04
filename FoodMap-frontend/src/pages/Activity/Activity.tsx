import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/common/Navbar/Navbar'
import { restaurantRoute, userRoute, ROUTES } from '../../constants/routes'
import './Activity.css'

type ActivityType = 'review' | 'follow' | 'vote' | 'badge' | 'like'

type ActivityItem = {
  id: number
  type: ActivityType
  avatar: string
  name: string
  text: string
  rating?: number
  time: string
  unread: boolean
  to?: string
}

const TYPE_META: Record<ActivityType, { icon: string; tint: string }> = {
  review: { icon: 'rate_review',     tint: '#8b5000' },
  follow: { icon: 'person_add',      tint: '#2e7d32' },
  vote:   { icon: 'how_to_vote',     tint: '#1565c0' },
  badge:  { icon: 'workspace_premium', tint: '#c77800' },
  like:   { icon: 'favorite',        tint: '#c62828' },
}

const TODAY: ActivityItem[] = [
  {
    id: 1,
    type: 'review',
    avatar: 'https://i.pravatar.cc/80?img=5',
    name: 'Sarah M.',
    text: 'reviewed Dragon Roll at Sushi Kyo',
    rating: 4.8,
    time: '12m ago',
    unread: true,
    to: restaurantRoute(3),
  },
  {
    id: 2,
    type: 'follow',
    avatar: 'https://i.pravatar.cc/80?img=9',
    name: 'Elena R.',
    text: 'started following you',
    time: '48m ago',
    unread: true,
    to: userRoute('elena-r'),
  },
  {
    id: 3,
    type: 'vote',
    avatar: 'https://i.pravatar.cc/80?img=11',
    name: 'David L.',
    text: 'invited you to a group vote: "Friday Lunch"',
    time: '2h ago',
    unread: true,
    to: ROUTES.VOTE,
  },
]

const EARLIER: ActivityItem[] = [
  {
    id: 4,
    type: 'badge',
    avatar: 'https://i.pravatar.cc/80?img=3',
    name: 'You',
    text: 'earned the "Top Reviewer" badge',
    time: 'Yesterday',
    unread: false,
  },
  {
    id: 5,
    type: 'like',
    avatar: 'https://i.pravatar.cc/80?img=11',
    name: 'David L.',
    text: 'liked your review of Tonkotsu Ramen',
    time: 'Yesterday',
    unread: false,
    to: restaurantRoute(1),
  },
  {
    id: 6,
    type: 'review',
    avatar: 'https://i.pravatar.cc/80?img=9',
    name: 'Elena R.',
    text: 'tried Avocado Toast at Café Szafe',
    rating: 4.4,
    time: '2 days ago',
    unread: false,
    to: restaurantRoute(5),
  },
  {
    id: 7,
    type: 'follow',
    avatar: 'https://i.pravatar.cc/80?img=5',
    name: 'Sarah M.',
    text: 'started following you',
    time: '3 days ago',
    unread: false,
    to: userRoute('sarah-m'),
  },
]

export default function Activity() {
  const nav = useNavigate()
  const [items, setItems] = useState({ today: TODAY, earlier: EARLIER })

  const unreadCount = items.today.concat(items.earlier).filter(i => i.unread).length

  const markAllRead = () =>
    setItems(prev => ({
      today: prev.today.map(i => ({ ...i, unread: false })),
      earlier: prev.earlier.map(i => ({ ...i, unread: false })),
    }))

  const openItem = (item: ActivityItem) => {
    setItems(prev => ({
      today: prev.today.map(i => (i.id === item.id ? { ...i, unread: false } : i)),
      earlier: prev.earlier.map(i => (i.id === item.id ? { ...i, unread: false } : i)),
    }))
    if (item.to) nav(item.to)
  }

  const renderItem = (item: ActivityItem) => {
    const meta = TYPE_META[item.type]
    return (
      <div
        key={item.id}
        className={`activity__card${item.unread ? ' activity__card--unread' : ''}${item.to ? ' activity__card--clickable' : ''}`}
        role={item.to ? 'button' : undefined}
        tabIndex={item.to ? 0 : undefined}
        onClick={() => openItem(item)}
        onKeyDown={e => {
          if (item.to && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault()
            openItem(item)
          }
        }}
      >
        <div className="activity__avatar-wrap">
          <img src={item.avatar} alt={item.name} className="activity__avatar" />
          <span
            className="activity__type-icon material-symbols-outlined"
            style={{ background: meta.tint }}
          >
            {meta.icon}
          </span>
        </div>

        <div className="activity__body">
          <p className="activity__text">
            <span className="activity__name">{item.name}</span> {item.text}
          </p>
          <div className="activity__sub">
            {item.rating != null && (
              <span className="activity__rating">
                <span className="material-symbols-outlined activity__star">star</span>
                {item.rating}
              </span>
            )}
            <span className="activity__time">{item.time}</span>
          </div>
        </div>

        {item.unread && <span className="activity__dot" />}
      </div>
    )
  }

  return (
    <div className="activity">
      <header className="activity__header">
        <button className="activity__back" onClick={() => nav(-1)}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <span className="activity__title">FoodMap</span>
      </header>

      <div className="activity__scroll">
        <h2 className="activity__section">Today</h2>
        <div className="activity__list">{items.today.map(renderItem)}</div>

        <h2 className="activity__section">Earlier</h2>
        <div className="activity__list">{items.earlier.map(renderItem)}</div>
      </div>

      <Navbar />
    </div>
  )
}
