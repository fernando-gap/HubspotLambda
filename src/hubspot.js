'use strict'

const axios = require('axios')
const { HUBSPOT } = require('./constants')

function schema (contact) {
  const [
    company,
    name,
    email,
    phone,
    website
  ] = contact

  const [firstname, lastname] = name.split(' ')

  return {
    properties: {
      firstname,
      lastname,
      email,
      phone,
      company,
      website
    }
  }
}

async function uploadContact (properties) {
  return await axios.post(HUBSPOT, properties, {
    headers: {
      authorization: `Bearer ${process.env.TOKEN}`
    }
  })
}

module.exports = {
  uploadContact,
  schema
}
