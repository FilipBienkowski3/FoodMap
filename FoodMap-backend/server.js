const express = require('express')
const cors    = require('cors')
const users   = require('./users')
const { restaurants, toMapSpot } = require('./restaurants')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/restaurants', (req, res) => {
  res.json(restaurants.map(toMapSpot))
})

app.get('/restaurants/:id', (req, res) => {
  const id = Number(req.params.id)
  const restaurant = restaurants.find(r => r.id === id)
  if (!restaurant) {
    return res.status(404).json({ error: 'Restaurant not found' })
  }
  res.json(restaurant)
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
