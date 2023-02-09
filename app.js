require('dotenv').config()
const express = require('express')
const routes = require('./src/main.js')

const HOST = process.env.HOST
const PORT = process.env.PORT
const app = express()

app.use('/api', routes)

app.listen(PORT, HOST, () => {
  console.log(`Server started at http://${HOST}:${PORT}`)
})
