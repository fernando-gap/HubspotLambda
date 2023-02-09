const { schema, uploadContact } = require('../src/hubspot.js')
const { expect } = require('chai')
const file = require('./data')

describe('Hubspot', function () {
  const inputSchema = [
    'Zoomzone',
    'Tallia Edy',
    'tedy1@zoomzone.com',
    '2661949541',
    'https://zoomzone.com'
  ]

  describe('#schema()', function () {
    it('Return hubspot contact schema', function () {
      const result = schema(inputSchema)
      expect(result).to.deep.equals(file.hubspot.schema.json())
    })
  })
  describe('#uploadContact()', function () {
    it('Create a contact in hubspot', async function () {
      const result = await uploadContact(file.hubspot.schema.json())
      expect(result).to.equal(201)
    })
  })
})
