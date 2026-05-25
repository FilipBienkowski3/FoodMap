import { useNavigate } from 'react-router-dom'
import { restaurantRoute } from '../../../constants/routes'
import './DishCard.css'

interface DishCardProps {
  image: string
  name: string
  restaurant: string
  price: string
  rating: number
  restaurantId?: number
}

export function DishCard({ image, name, restaurant, price, rating, restaurantId }: DishCardProps) {
  const nav = useNavigate()

  const goToRestaurant = () => {
    if (restaurantId != null) nav(restaurantRoute(restaurantId))
  }

  return (
    <div className="dish-card">
      <div className="dish-card__image-container">
        <img src={image} alt={name} className="dish-card__image" />
      </div>
      <div className="dish-card__content">
        <div className="dish-card__header">
          <h3 className="dish-card__name">{name}</h3>
          <span className="dish-card__price">{price}</span>
        </div>
        {restaurantId != null ? (
          <button
            type="button"
            className="dish-card__restaurant dish-card__restaurant--link"
            onClick={goToRestaurant}
          >
            {restaurant}
          </button>
        ) : (
          <p className="dish-card__restaurant">{restaurant}</p>
        )}
        <div className="dish-card__rating">
          <span className="dish-card__rating-value">{rating}</span>
          <span className="material-symbols-outlined dish-card__star">star</span>
        </div>
      </div>
    </div>
  )
}
