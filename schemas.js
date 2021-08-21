const Joi = require('joi')

module.exports.entrySchema = Joi.object({
  entry: Joi.object({
      title: Joi.string().required(),
      text: Joi.string().max(512),
  }).required(),
});