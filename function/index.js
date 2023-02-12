const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3')
const hubspot = require('./src/hubspot.js')
const csv = require('./src/spreadsheet.js')

const s3 = new S3Client({})

async function getObject (stream) {
  return await new Promise((resolve, reject) => {
    const chunks = []
    stream.on('data', chunk => chunks.push(chunk))
    stream.on('error', reject)
    stream.on('end', () => resolve(Buffer.concat(chunks)))
  })
}

exports.handler = async event => {
  const bucket = event.Records[0].s3.bucket.name
  const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '))
  const params = { Bucket: bucket, Key: key }
  const { ContentType, Body } = await s3.send(new GetObjectCommand(params))
  if (ContentType !== 'text/csv') {
    return { message: 'File is not a CSV' }
  }

  const buffer = await getObject(Body)
  const created = await csv(buffer, async line => {
    try {
      const json = hubspot.schema(line)
      await hubspot.uploadContact(json)
    } catch (e) {
      console.log(e)
    }
  })

  return { message: 'done', created }
}
