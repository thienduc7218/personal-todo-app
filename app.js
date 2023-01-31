const express = require('express')
const mongoose = require('mongoose')
const app = express()
const taskRoutes = require('./routes/taskRoutes')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
require('dotenv').config()

const dbURI = process.env.MONGODB_URI
const store = new MongoDBStore({
  uri: dbURI,
  collection: 'sessions',
})

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    const port = process.env.PORT || 3000
    app.listen(port)
    console.log(`server is now online at http://localhost:${port}`)
  })
  .catch(err => {
    console.log(err)
  })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
)

app.use('/', taskRoutes)
