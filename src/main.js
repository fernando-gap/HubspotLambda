'use strict'

const router = require('express').Router()
const multer = require('multer')

const hubspot = require('./hubspot.js')
const csv = require('./spreadsheet.js')

const upload = multer({
  limits: {
    fileSize: 50 * 1024 * 1024
  }
})

router.post('/file', upload.single('file'), async (req, res) => {
  const amount = await csv(req.file.buffer, async line => {
    const json = hubspot.schema(line)
    try {
      await hubspot.uploadContact(json)
    } catch (e) {
      console.log(e)
    }
  })
  res.status(200).send({ message: 'done', amount })
})

module.exports = router
