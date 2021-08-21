const router = require('express').Router()
const users = require('../controllers/users')
const passport = require('passport')
const catchAsync = require('../utils/catchAsync')
const { validateCredentials } = require('../middleware')


router.route('/register')
  .get(users.registerForm)
  .post(validateCredentials, catchAsync(users.createUser))

router.route('/login')
  .get(users.loginForm)
  .post(passport.authenticate('local', { failureFlash: true, successRedirect: '/entries/entries', failureRedirect: '/users/login' }))

router.get('/logout', users.logoutUser)

module.exports = router