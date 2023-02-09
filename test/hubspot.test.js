const { schema, uploadContact } = require('../src/hubspot.js')
const { expect } = require('chai')
const { deleteOne } = require('../scripts/delete-contact')
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
    let id = null
    it('Create a contact in hubspot', async function () {
      const result = await uploadContact(file.hubspot.schema.json())
      id = result.data.id
      expect(result.status).to.equal(201)
    })
    after(async function () {
      await deleteOne(id)
    })
  })
})
