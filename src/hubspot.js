'use strict'

const axios = require('axios')
const { HUBSPOT } = require('./constants')

async function uploadContact(properties) {
    await axios.post(HUBSPOT, properties, {
        headers: {
            Authorization: `Bearer ${process.env.TOKEN}`
        }
    })
}

module.exports = uploadContact