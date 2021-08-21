const User = require('../models/user');

// регистрация нового пользователя
module.exports.createUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body
    const user = new User({ email, username })
    const registeredUser = await User.register(user, password)
    req.login(registeredUser, err => {
      if (err) return next(err)
      req.flash('success', 'Добро пожаловать');
      res.redirect('/entries/entries')
    })
  } catch (e) {
    req.flash('error', e.message);
    res.redirect('/users/register')
  }
}

// Логаут
module.exports.logoutUser = (req, res) => {
  req.logout()
  // req.flash('success', 'Goodbye!')
  res.redirect('/users/login')
}

// Форма для регистрация
module.exports.registerForm = (req, res) => res.render('users/register')

// Форма для логина
module.exports.loginForm = (req, res) => res.render('users/login')