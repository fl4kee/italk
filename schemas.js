const Joi = require('joi')

module.exports.entrySchema = Joi.object({
  entry: Joi.object({
      title: Joi.string()
              .required()
              .max(100)
              .error(errors => {
                errors.forEach(err => {
                  switch (err.code){
                    case "any.empty":
                      err.message = "Заголовок обязателен для заполнения"
                      break
                    case "string.max":
                      err.message = "Длина строки не может превышать 100 знаков"
                      break
                    default:
                      break
                  }
                })
                return errors
              }),
      text: Joi.string()
                .max(512)
                .required()
                .error(errors => {
                  errors.forEach(err => {
                    switch (err.code){
                      case "any.empty":
                        err.message = "Текст обязателен для заполнения"
                        break
                      case "string.max":
                        err.message = "Длина строки не может превышать 500 знаков"
                        break
                      default:
                        break
                    }
                  })
                  return errors
                  }),
  }).required(),
});


module.exports.credentialsSchema = Joi.object({
  username: Joi.string().required().max(20).error(new Error('Имя пользователя не может быть длиннее 20 символов')),
  password: Joi.string().pattern(/^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!&$%&?]).*$/).max(20).error(new Error('Пароль должен быть от 6 до 20 символов. Должен содержать минимум одну заглавную, одну строчную букву, цифру и любой из символов !&$%&?')),
  email: Joi.string().required().error(new Error('email обязателен для заполнения'))
})