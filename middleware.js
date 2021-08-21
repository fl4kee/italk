const { entrySchema, credentialsSchema }  = require('./schemas')


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
      req.flash('error', error.message)
      res.redirect('/entries/new')
  } else {
      next();
}}

module.exports.validateCredentials = (req, res, next) => {
  const {error} = credentialsSchema.validate(req.body)
  if(error){
    req.flash('error', error.message)
    res.redirect('/users/register')
  } else {
    next();
  }
}
