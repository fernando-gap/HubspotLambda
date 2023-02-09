const fs = require('fs')
const path = require('path')

function readMock (path, cb) {
  fs.readdirSync(path).forEach(file => {
    const data = fs.readFileSync(`${path}/${file}`)
    data.json = function () {
      return JSON.parse(this.toString())
    }
    cb(data, file)
  })
}

const mock = {}

readMock(path.resolve(__dirname, 'expect'), (data, file) => {
  const keys = file.split('.')
  mock[keys[0]] = mock[keys[0]] || {}
  mock[keys[0]][keys[1]] = data
})

readMock(path.resolve(__dirname, 'mock'), (data, file) => {
  const key = path.parse(file).name
  mock.mock = mock.mock || {}
  mock.mock[key] = data
})

module.exports = mock
