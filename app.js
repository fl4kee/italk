const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const path = require('path')
const engine = require('ejs-mate')
const usersRoutes = require('./routes/users')
const entriesRoutes = require('./routes/entries')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const MongoStore = require('connect-mongo');
const User = require('./models/user')
const flash = require('connect-flash')
const ExpressError = require('./utils/ExpressError')

// База данных
const dbUrl = process.env.DB_URL

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => (console.log('Database is connected')))

const store = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 60 * 60,
  crypto: {
    secret: 'squirrel'
  }
});

// Сессия
const secret = process.env.SECRET
const sessionConfig = {
  store,
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
  },
}

app.use(session(sessionConfig))

// Пасспорт

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// Flash сообщения
app.use(flash())

app.use((req, res, next) => {
  res.locals.success = req.flash('success')
  res.locals.error = req.flash('error')
  res.locals.currentUser = req.user
  next()
})

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.engine('ejs', engine)


app.use('/users', usersRoutes)
app.use('/entries', entriesRoutes)
app.get('/', (req, res) => res.redirect('/users/login'))

app.all('*', (req, res, next) => {
  next(new ExpressError('Page not found', 404))
})

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Что-то пошло не так!'
  res.status(statusCode).render('error', { error: err })

})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})