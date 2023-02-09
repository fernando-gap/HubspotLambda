'use strict'

const router = require('express').Router()
const multer = require('multer')

const hubspot = require('./hubspot.js')
const csv = require('./spreadsheet.js')

const upload = multer()

router.post('/file', upload.single('file'), async (req, res) => {
  await csv(req.file.buffer, async line => {
    const json = hubspot.schema(line)
    await hubspot.uploadContact(json)
  })
})

module.exports = router
