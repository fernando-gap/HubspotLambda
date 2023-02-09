const axios = require('axios')
const fs = require('fs')

const baseURL = 'https://api.hubapi.com'
const LIST = `${baseURL}/crm/v3/objects/contacts`
const DELETE = `${LIST}/batch/archive`

module.exports = async function (file, limit) {
  const data = fs.readFileSync(file).toString()
    .split('\n')
    .map(x => x.split(','))
    .map(x => {
      return x[2]
    })

  const response = await axios.get(LIST, {
    headers: {
      authorization: `Bearer ${process.env.TOKEN}`
    },
    params: {
      limit: Math.ceil(limit * 1.25)
    }
  })

  const ids = {
    inputs: []
  }

  for (const contact of response.data.results) {
    if (~data.indexOf(contact.properties.email)) {
      ids.inputs.push({ id: contact.id })
    }
  }

  await axios.post(DELETE, ids, {
    headers: {
      authorization: `Bearer ${process.env.TOKEN}`
    }
  })
}
