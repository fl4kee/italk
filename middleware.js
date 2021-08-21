const { entrySchema }  = require('./schemas')


module.exports.isLoggedIn = (req, res, next) => {
  if(!req.isAuthenticated()){
    req.session.returnTo = req.originalUrl
    req.flash('error', 'Требуется вход')
    return res.redirect('/users/login')
  }
  next()
}

module.exports.validateEntry = (req, res, next) => {
  const { error } = entrySchema.validate(req.body)
  if (error) {
      req.flash('error', 'Текст не может быть больше 512 символов')
      res.redirect('/entries/new')
  } else {
      next();
}}
