const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

const restaurants = [
  { id: 1, name: 'Pizza Place' },
]

app.get('/restaurants', (req, res) => {
  res.json(restaurants)
})

app.listen(3000, () => {
  console.log('Server running')
})