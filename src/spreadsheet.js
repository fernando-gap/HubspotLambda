'use strict'

const fs = require('fs')
const readline = require('readline')
const { VALID_COLUMNS, DELIMITER } = require('./constants.js')


function arrayEquals(a, b) {
    const lower = x => x.toLowerCase(x)

    return a.length === b.length &&
        a.every((val, index) => 
            lower(val) === lower(b[index]))
}


function csv(filename, cb) {
    let isFirstLine = true
    const file = readline.createInterface({
        input: fs.createReadStream(filename),
        terminal: false
    })

    file.on('line', (line) => {
        line = line.split(DELIMITER)
        if (isFirstLine) {
            if (!arrayEquals(VALID_COLUMNS, line))
                throw new Error('Invalid Columns');
            isFirstLine = false
        }
        cb(line)
    })
}

module.exports = csv