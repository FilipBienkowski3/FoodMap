const express = require('express')
const cors    = require('cors')
const users   = require('./users')

const app = express()
app.use(cors())
app.use(express.json())

const restaurants = [
  { id: 1, lat: 50.0619, lng: 19.9372, icon: 'ramen_dining', name: 'Ramen Ichiraku',  price: 42, rating: 4.9, hours: '12:00–22:00', img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80' },
  { id: 2, lat: 50.0509, lng: 19.9448, icon: 'local_pizza',  name: 'Mamma Mia Pizza', price: 28, rating: 2.9, hours: '11:00–23:00', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80' },
  { id: 3, lat: 50.0547, lng: 19.9289, icon: 'set_meal',     name: 'Sushi Kyo',        price: 65, rating: 4.9, hours: '13:00–21:00', img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&q=80' },
  { id: 4, lat: 50.0584, lng: 19.9450, icon: 'restaurant',   name: 'Wierzynek',         price: 95, rating: 2.2, hours: '12:00–23:00', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80' },
  { id: 5, lat: 50.0530, lng: 19.9340, icon: 'local_cafe',   name: 'Café Szafe',        price: 18, rating: 3.6, hours: '08:00–20:00', img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80' },
]

app.get('/restaurants', (req, res) => {
  res.json(restaurants)
})

app.post('/login', (req, res) => {
  const { email, password } = req.body
  const user = users.find(u => u.email === email && u.password === password)
  if (user) {
    res.json({ ok: true, user: { id: user.id, name: user.name, email: user.email } })
  } else {
    res.status(401).json({ ok: false, message: 'Zły email lub hasło' })
  }
})

app.post('/register', (req, res) => {
  res.json({ ok: true, message: 'Konto założone' })
})

app.listen(3000, () => console.log('Server running on :3000'))