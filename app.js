const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3')
const hubspot = require('./src/hubspot.js')
const csv = require('./src/spreadsheet.js')

const s3 = new S3Client({})

exports.handler = async event => {
  const bucket = event.Records[0].s3.bucket.name
  const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '))
  const params = { Bucket: bucket, Key: key }
  const { ContentType, Body } = await s3.send(new GetObjectCommand(params))

  if (ContentType !== 'Buffer') {
    return { message: 'File is not a CSV' }
  }

  const buffer = Buffer.from(Body.data)
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
