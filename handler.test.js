var aws = require('aws-sdk')

aws.config.update({
  accessKeyId: process.env.PTE_AWS_ID,
  secretAccessKey: process.env.PTE_AWS_KEY,
  region: process.env.PTE_AWS_REGION || 'us-east-1'
})

var handler = require('./handler.source')

// listId: B1GvXjzyDb

handler.listDeliver({
  queryStringParameters: {
    mid: 'BJwXsz1wZ',
    sk: 'r1SwmozkPZBkIDmoM1wZ'
  }
}, {}, function(err, response){
  console.log(err, response)
})

// handler.listReceive({
//   Records: [
//     {
//       s3: {
//         object: {
//           key: '979jj082r465msi9qsdd5o1fea9v5o8fhr6luo81'
//         }
//       }
//     }
//   ]
// }, {}, function(result){
//   console.log(result)
// })


// handler.listUnsubscribe({
//   queryStringParameters: {
//     subscriberId: 'BkEXRrhIW'
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
