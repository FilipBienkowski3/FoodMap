import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'
import Button from '../../components/Button/Button'
import { ROUTES } from '../../constants/routes'
import './Home.css'

export default function Home() {
  const { user } = useAuth()
  const nav = useNavigate()

  return (
    <div className="home">
      <div className="home__hero">
        <h1 className="home__title">Odkryj restauracje<br/>w swojej okolicy</h1>
        <p className="home__sub">FoodMap pomaga Ci znaleźć najlepsze miejsca blisko Ciebie.</p>
        {user ? (
          <Button onClick={() => nav(ROUTES.MAP)}>Start — pokaż mapę</Button>
        ) : (
          <div className="home__cta">
            <Button onClick={() => nav(ROUTES.LOGIN)}>Zaloguj się</Button>
            <Button variant="secondary" onClick={() => nav(ROUTES.REGISTER)}>Utwórz konto</Button>
          </div>
        )}
      </div>
    </div>
  )
}