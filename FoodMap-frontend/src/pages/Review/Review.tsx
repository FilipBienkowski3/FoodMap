import { useEffect, useId, useRef, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { getRestaurant } from '../../api/foodmapApi'
import { Button } from '../../components/common/Button/Button'
import { getReviewDishes, type ReviewDishOption } from '../../constants/restaurant'
import { useAuth } from '../../context/useAuth'
import './Review.css'

export default function Review() {
  const { id } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const nav = useNavigate()
  const { user } = useAuth()
  const dishesRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const photoUrlsRef = useRef<string[]>([])
  const inputId = useId()
  const [dishes, setDishes] = useState<ReviewDishOption[]>([])
  const [photos, setPhotos] = useState<{ id: string; url: string; name: string }[]>([])
  const [loading, setLoading] = useState(true)
  const [rating, setRating] = useState(4)
  const [selectedDishKey, setSelectedDishKey] = useState<string | null>(null)
  const [reviewText, setReviewText] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const preselectedDishKey = searchParams.get('dish')
  const maxPhotos = 5

  useEffect(() => () => {
    photoUrlsRef.current.forEach(url => URL.revokeObjectURL(url))
  }, [])

  useEffect(() => {
    const restaurantId = Number(id)
    if (!id || Number.isNaN(restaurantId)) {
      setLoading(false)
      return
    }

    getRestaurant(restaurantId)
      .then(data => {
        const options = getReviewDishes(data)
        setDishes(options)
        const initial = preselectedDishKey
          ? options.find(d => d.key === preselectedDishKey)
          : options[0]
        if (initial) setSelectedDishKey(initial.key)
      })
      .catch(() => setDishes([]))
      .finally(() => setLoading(false))
  }, [id, preselectedDishKey])

  useEffect(() => {
    if (loading || !preselectedDishKey || !dishesRef.current) return
    const el = dishesRef.current.querySelector(`[data-dish-key="${preselectedDishKey}"]`)
    el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [loading, preselectedDishKey, dishes])

  const handlePhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return

    const slotsLeft = maxPhotos - photos.length
    const toAdd = files.slice(0, slotsLeft)

    const added = toAdd.map(file => {
      const url = URL.createObjectURL(file)
      photoUrlsRef.current.push(url)
      return { id: crypto.randomUUID(), url, name: file.name }
    })

    setPhotos(prev => [...prev, ...added])
    e.target.value = ''
  }

  const removePhoto = (id: string, url: string) => {
    URL.revokeObjectURL(url)
    photoUrlsRef.current = photoUrlsRef.current.filter(u => u !== url)
    setPhotos(prev => prev.filter(p => p.id !== id))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => nav(-1), 600)
  }

  const avatarSrc = `https://i.pravatar.cc/150?u=${encodeURIComponent(user?.id || user?.email || 'guest')}`

  return (
    <div className="review">
      <header className="review__topbar">
        <button
          type="button"
          className="review__icon-btn"
          onClick={() => nav(-1)}
          aria-label="Go back"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="review__topbar-title">Rate Your Experience</h1>
        <img src={avatarSrc} alt="" className="review__avatar" />
      </header>

      <form className="review__form" onSubmit={handleSubmit}>
        <section className="review__section">
          <h2 className="review__label">How was your meal?</h2>
          <div className="review__stars" role="group" aria-label="Rating">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                className={`review__star-btn${star <= rating ? ' review__star-btn--active' : ''}`}
                onClick={() => setRating(star)}
                aria-label={`${star} star${star !== 1 ? 's' : ''}`}
              >
                <span className="material-symbols-outlined review__star-icon">star</span>
              </button>
            ))}
          </div>
        </section>

        <section className="review__section">
          <h2 className="review__label">What did you order?</h2>
          {loading ? (
            <p className="review__hint">Loading dishes...</p>
          ) : dishes.length === 0 ? (
            <p className="review__hint">No dishes available.</p>
          ) : (
            <div className="review__dishes" ref={dishesRef}>
              {dishes.map(dish => {
                const selected = selectedDishKey === dish.key
                return (
                  <button
                    key={dish.key}
                    type="button"
                    data-dish-key={dish.key}
                    className={`review__dish${selected ? ' review__dish--selected' : ''}`}
                    onClick={() => setSelectedDishKey(dish.key)}
                  >
                    <div className="review__dish-img-wrap">
                      <img src={dish.image} alt={dish.name} className="review__dish-img" />
                      {selected && (
                        <span className="review__dish-check material-symbols-outlined">check</span>
                      )}
                    </div>
                    <span className="review__dish-name">{dish.name}</span>
                  </button>
                )
              })}
            </div>
          )}
        </section>

        <section className="review__section">
          <h2 className="review__label">Detailed Review</h2>
          <textarea
            className="review__textarea"
            placeholder="Tell us about your visit..."
            value={reviewText}
            onChange={e => setReviewText(e.target.value)}
            rows={5}
          />
        </section>

        <section className="review__section">
          <input
            ref={fileInputRef}
            id={inputId}
            type="file"
            accept="image/*"
            multiple
            className="review__photos-input"
            onChange={handlePhotosChange}
          />
          {photos.length < maxPhotos && (
            <button
              type="button"
              className="review__photos"
              onClick={() => fileInputRef.current?.click()}
              aria-label="Add photos"
            >
              <span className="material-symbols-outlined review__photos-icon">photo_camera</span>
              <span className="review__photos-label">ADD PHOTOS</span>
              <span className="review__photos-hint">Up to {maxPhotos} images</span>
            </button>
          )}
          {photos.length > 0 && (
            <ul className="review__photo-grid">
              {photos.map(photo => (
                <li key={photo.id} className="review__photo-item">
                  <img src={photo.url} alt={photo.name} className="review__photo-thumb" />
                  <button
                    type="button"
                    className="review__photo-remove"
                    onClick={() => removePhoto(photo.id, photo.url)}
                    aria-label={`Remove ${photo.name}`}
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          className="review__submit"
          disabled={submitted}
        >
          {submitted ? 'Submitted!' : 'Submit Review'}
        </Button>
      </form>
    </div>
  )
}
