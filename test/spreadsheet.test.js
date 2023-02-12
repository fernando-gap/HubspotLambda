const { expect } = require('chai')
const { DELIMITER } = require('../function/src/constants.js')
const file = require('./data')
const csv = require('../function/src/spreadsheet.js')

const getInput = (buff) => {
  return buff.toString()
    .split('\n').splice(1).map(x => x.split(DELIMITER))
}

describe('Spreadsheet', function () {
  describe('#csv()', function () {
    it('Read File line by line', async function () {
      let counter = 0
      const input = getInput(file.mock.right)

      await csv(file.mock.right, line => {
        expect(line).to.deep.equal(input[counter])
        counter++
      })
    })

    it('Throw invalid columns\'s ordering error', async function () {
      let error = null
      try {
        await csv(file.mock.columns, _ => {})
      } catch (e) {
        error = e
      }

      expect(error).to.be.an('Error')
      expect(error.message).to.equal('Invalid Columns')
    })

    it('Do not insert contacts with non-corporate emails', async function () {
      let counter = 0
      const correctValues = getInput(file.mock.mix).filter(x => {
        return x[2].split('@')[1] === new URL(x[4]).hostname
      })

      await csv(file.mock.mix, line => {
        expect(line).to.deep.equals(correctValues[counter])
        counter++
      })
    })
  })
})
