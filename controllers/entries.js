const Entry = require('../models/entry');

// Показ всех записей
module.exports.showEntries = async (req, res) => {
  const entries = await Entry.find({})
  .populate('owner')  
  res.render('entries/entries', {entries})
}

// Создание одной записи
module.exports.createEntry = async (req, res) => {
  const newEntry = new Entry(req.body.entry)
  newEntry.image = req.file ? req.file.path : 'https://res.cloudinary.com/di7gad4tl/image/upload/v1629573513/iTalk/rctnecxsydgax3ebhslf.jpg'
  newEntry.owner = req.user._id
  await newEntry.save()
  res.redirect('/entries/entries')
}
module.exports.newEntryForm =  (req, res) => res.render('entries/new')