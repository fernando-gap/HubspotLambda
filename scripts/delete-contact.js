const axios = require('axios')
const fs = require('fs')

const baseURL = 'https://api.hubapi.com'
const CONTACT = `${baseURL}/crm/v3/objects/contacts`
const DELETE = `${CONTACT}/batch/archive`

async function deleteOne (id) {
  return await axios.delete(CONTACT + `/${id}`, {
    headers: {
      authorization: `Bearer ${process.env.TOKEN}`
    }
  })
}

async function deleteContacts (file, limit) {
  const data = fs.readFileSync(file).toString()
    .split('\n')
    .map(x => x.split(','))
    .map(x => {
      return x[2]
    })

  const response = await axios.get(CONTACT, {
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

if (process.argv.length > 3) {
  deleteContacts(process.argv[2], process.argv[3])
}

module.exports = {
  deleteContacts,
  deleteOne
}
