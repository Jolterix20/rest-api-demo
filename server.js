require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
// Middlewares
app.use(express.json())
app.use(cors())

// Import Routes
const postsRoute = require('./routes/posts')

app.use('/posts', postsRoute)

// ROUTES

app.get('/', (req, res) => {
	res.send('Welcome to the homepage')
})

// Connecting to DB
mongoose.connect(process.env.DB_CONNECTION_URL, { useNewUrlParser: true }, () =>
	console.log('Connected to DB')
)

// Listening

app.listen(3000, () => {
	console.log('Listening on port 3000')
})
