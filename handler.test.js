var aws = require('aws-sdk')

aws.config.update({
  accessKeyId: process.env.PTE_AWS_ID,
  secretAccessKey: process.env.PTE_AWS_KEY,
  region: process.env.PTE_AWS_REGION || 'us-east-1'
})

var handler = require('./serverless/handler')

handler.listUnsubscribe({
  queryStringParameters: {
    subscriberId: 'BkEXRrhIW'
  }
}, {}, function(result){
  console.log(result)
})
