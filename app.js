require('dotenv').config()
const express = require('express')
const routes = require('./src/main.js')

const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || 8080
const app = express()

app.use('/api', routes)

app.listen(PORT, HOST, () => {
  console.log(`Server started at http://${HOST}:${PORT}`)
})
