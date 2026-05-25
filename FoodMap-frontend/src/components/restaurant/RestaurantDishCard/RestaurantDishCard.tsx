import { useNavigate } from 'react-router-dom'
import { Button } from '../../common/Button/Button'
import { restaurantReviewRoute } from '../../../constants/routes'
import type { TopDish } from '../../../constants/restaurant'
import './RestaurantDishCard.css'

interface RestaurantDishCardProps {
  dish: TopDish
  restaurantId: number
}

export function RestaurantDishCard({ dish, restaurantId }: RestaurantDishCardProps) {
  const nav = useNavigate()

  return (
    <article className="rd-dish">
      <div className="rd-dish__image-wrap">
        <img src={dish.image} alt={dish.name} className="rd-dish__image" />
      </div>
      <div className="rd-dish__body">
        <div className="rd-dish__header">
          <h3 className="rd-dish__name">{dish.name}</h3>
          <span className="rd-dish__price">{dish.price} zł</span>
        </div>
        <div className="rd-dish__rating">
          <span className="material-symbols-outlined rd-dish__star">star</span>
          <span>{dish.rating}</span>
        </div>
        <Button
          variant="outline"
          fullWidth
          className="rd-dish__review-btn"
          onClick={() => nav(restaurantReviewRoute(restaurantId, `top-${dish.id}`))}
        >
          REVIEW
        </Button>
      </div>
    </article>
  )
}
