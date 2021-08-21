const User = require('../models/user');

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

module.exports.logoutUser = (req, res) => {
  req.logout()
  // req.flash('success', 'Goodbye!')
  res.redirect('/users/login')
}


module.exports.registerForm = (req, res) => res.render('users/register')

module.exports.loginForm = (req, res) => res.render('users/login')