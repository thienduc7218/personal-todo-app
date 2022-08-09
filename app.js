const express = require('express')
const mongoose = require('mongoose')
const app = express()
const taskRoutes = require('./routes/taskRoutes')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)

let dbURI = 'mongodb://localhost:8080/todo-app'
const store = new MongoDBStore({
  uri: dbURI,
  collection: 'sessions',
})

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    let port = process.env.PORT
    if (port == null || port == '') {
      port = 3000
    }
    app.listen(port)
    console.log('server is now online at http://localhost:3000')
  })
  .catch(err => {
    console.log(err)
  })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(
  session({
    secret: 'Little secret',
    resave: false,
    saveUninitialized: false,
    store: store,
  })
)

app.use('/', taskRoutes)
