const express = require('express')
const cors    = require('cors')
const users   = require('./users')

const app = express()
app.use(cors())
app.use(express.json())

const restaurants = [
  { id: 1, name: 'Pizza Place', lat: 50.01, lng: 20.98 },
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