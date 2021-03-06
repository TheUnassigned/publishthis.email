var aws = require('aws-sdk')

aws.config.update({
  accessKeyId: process.env.PTE_AWS_ID,
  secretAccessKey: process.env.PTE_AWS_KEY,
  region: process.env.PTE_AWS_REGION || 'us-east-1'
})

var handler = require('./handler.source')

handler.listBulkSubscribe({
  body: JSON.stringify({
    lid: 'ByMEz-G_w-',
    ek: 'B1mNzZMuw-HJVEG-G_Db',
    emailList: [
      'a@b.c',
      'nick.drewe@gmail.com'
    ]
  })
}, {}, function(something, result){
  console.log(something, result)
})

// handler.receive({
//   Records: [
//     {
//       s3: {
//         object: {
//           key: 't60sp5qof2v9dlahcg7p7e7rjpvhskae46jja2o1'
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

// handler.listReceive({
//   Records: [
//     {
//       s3: {
//         object: {
//           key: 't5vpd2lkauoibvffg45ccmg15j6qp6ce7jl7ghg1'
//         }
//       }
//     }
//   ]
// }, {}, function(result){
//   console.log(result)
// })

// first
// ef2hnf5s4q9i8ijt1utsqb3crku5qq3o2hoe5n01

// second
// t5vpd2lkauoibvffg45ccmg15j6qp6ce7jl7ghg1


// handler.listSubscribe({
//   queryStringParameters: {
//     subscriberEmail: 'nick.drewe@gmail.com',
//     listId: 'nWsgSknGJe'
//   }
// }, {}, function(result){
//   console.log(result)
// })


// handler.listSubscribe({
//   queryStringParameters: {
//     subscriberEmail: 'nick.drewe@gmail.com',
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
