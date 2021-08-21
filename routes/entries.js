const router = require('express').Router()
const entries = require('../controllers/entries')
const multer = require('multer')
const {storage} = require('../cloudinary')
const upload = multer( {storage} )
const { isLoggedIn, validateEntry, showTheThing } = require('../middleware')
const catchAsync = require('../utils/catchAsync')

router.get('/entries',isLoggedIn, catchAsync(entries.showEntries))
router.route('/new')
  .get(isLoggedIn, entries.newEntryForm)
  .post(upload.single('image'),validateEntry, catchAsync(entries.createEntry))

module.exports = router