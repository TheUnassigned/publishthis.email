var aws = require('aws-sdk')

aws.config.update({
  accessKeyId: process.env.PTE_AWS_ID,
  secretAccessKey: process.env.PTE_AWS_KEY,
  region: process.env.PTE_AWS_REGION || 'us-east-1'
})

var handler = require('./handler.source')

// handler.receive({
//   Records: [
//     {
//       s3: {
//         object: {
//           key: 'g9l4molrbemq0ee46cpp4q2ii9ph49ughiije281'
//         }
//       }
//     }
//   ]
// }, {}, function(result){
//   console.log(result)
// })

// listId: B1GvXjzyDb

// handler.listDeliver({
//   queryStringParameters: {
//     mid: 'BJwXsz1wZ',
//     sk: 'r1SwmozkPZBkIDmoM1wZ'
//   }
// }, {}, function(err, response){
//   console.log(err, response)
// })

handler.listReceive({
  Records: [
    {
      s3: {
        object: {
          key: 'ib8f9d0db90llkk5prsa0a163vv9vahajai3c201'
        }
      }
    }
  ]
}, {}, function(result){
  console.log(result)
})


// handler.listSubscribe({
//   queryStringParameters: {
//     subscriberEmail: 'nick.drewe+matt@gmail.com',
//     listId: 'nWsgSknGJe'
//   }
// }, {}, function(result){
//   console.log(result)
// })

// handler.listCreateFromAPI({
//   queryStringParameters: {
//     ownerEmail: 'nick.drewe@gmail.com'
//     // collectionName: 'matestart'
//   }
// }, {}, function(result){
//   console.log(result)
// })
