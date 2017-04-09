var aws = require('aws-sdk')

aws.config.update({
  accessKeyId: process.env.PTE_AWS_ID,
  secretAccessKey: process.env.PTE_AWS_KEY,
  region: process.env.PTE_AWS_REGION || 'us-east-1'
})

var handler = require('./serverless/handler')

handler.view({
  pathParameters: {
    id: 'S1H7hxatg'
  }
}, null, (err, res) => console.log(res))
