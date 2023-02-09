'use strict'

const { Readable } = require('stream')
const readline = require('readline')

const { VALID_COLUMNS, DELIMITER } = require('./constants.js')

function arrayEquals (a, b) {
  const lower = x => x.toLowerCase(x)

  return a.length === b.length &&
  a.every((val, index) =>
    lower(val) === lower(b[index]))
}

function streamFromBuffer (buffer) {
  const readable = new Readable()
  readable.push(buffer)
  readable.push(null)
  return readable
}

async function csv (buffer, cb) {
  let isFirstLine = true
  const file = readline.createInterface({
    input: streamFromBuffer(buffer),
    terminal: false
  })
  for await (let line of file) {
    line = line.split(DELIMITER)
    if (isFirstLine) {
      if (!arrayEquals(VALID_COLUMNS, line)) {
        throw new Error('Invalid Columns')
      }
      /** skip header */
      isFirstLine = false
      continue
    }
    cb(line)
  }
}

module.exports = csv
