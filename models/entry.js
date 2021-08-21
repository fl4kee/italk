const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  title:{
    type:String,
    required: true
  },
  text:{
    type: String, 
    required: true
  },
  image:{
    type: String
  },
  owner:{
    type: mongoose.Schema.Types.ObjectID,
    ref: 'User'
  }
})

module.exports = mongoose.model('Entry', entrySchema)