import {
  getRawEmail,
  processEmail,
  processListEmail,
  storeInDynamo,
  sendReply,
  sendListPreview,
  collectionsProcess,
  isNotSubscribed,
  addSubscriber,
  sendSubscriberVerification,
  verifySubscriberId,
  unsubscribe,
  isNewList,
  addListToDB,
  sendNewListWelcome,
  sendListReply,
  addListIdToPage
} from './actions'
import { config } from '/config/environment'

// receive function for pages
const receive = (event, context, callback) => {
  const messageId = event.Records[0].s3.object.key
  getRawEmail(messageId, config.S3_BUCKET)
  .then(processEmail)
  .then(collectionsProcess)
  .then(storeInDynamo)
  .then(sendReply)
  .then(result => {
    console.log('successful receive:', messageId, result)
    callback(null, { "disposition" : "STOP_RULE_SET" })
  })
  .catch(err => console.log(err.stack))
}

// receive function for lists
const listReceive = (event, context, callback) => {
  const messageId = event.Records[0].s3.object.key

  getRawEmail(messageId, config.S3_BUCKET_LIST)
  .then(processListEmail)
  .then(collectionsProcess)
  .then(storeInDynamo)
  .then(mailObj => {
    mailObj.list = {
      ownerEmail: mailObj.from[0].address,
      collectionName: mailObj.label || 'defaultglobal'
    }
    return mailObj
  })
  .then(isNewList)
  .then(addListToDB) // add new list to DB
  .then(addListIdToPage) // add listId and sendKey to page
  .then(sendListReply) // send appropriate reply (new or existing list)
  .catch(e => {
    console.log(e)
  })

}


// subscription endpoint called directly from submission form returns { success: true/false, msg: 'error message' }
const listSubscribe = (event, context, callback) => {
  const subscriber = {
    subscriberEmail: event.queryStringParameters.subscriberEmail,
    listId: event.queryStringParameters.listId,
  }
  isNotSubscribed(subscriber)
  .then(addSubscriber)
  .then(sendSubscriberVerification)
  .then(result => {
    console.log(result)
    // user subscribed & verification sent
    const response = { statusCode: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : '*',  'Access-Control-Allow-Credentials' : 'true' }, body: JSON.stringify({ success: true }) }
    callback(null, response)
  })
  .catch(e => {
    // user already subscribed
    const response = { statusCode: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : '*',  'Access-Control-Allow-Credentials' : 'true' }, body: JSON.stringify({ success: false, msg: 'That email address is already subscribed.'}) }
    callback(null, response)
  })
}

// subscription endpoint called directly from submission form returns { success: true/false, msg: 'error message' }
const listUnsubscribe = (event, context, callback) => {
  const subscriberId = event.queryStringParameters.subscriberId

  unsubscribe(subscriberId)
  .then(result => {
    console.log('unsubscribed' + subscriberId)
    console.log(result)
    const response = { statusCode: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : '*',  'Access-Control-Allow-Credentials' : 'true' }, body: JSON.stringify({ success: true }) }
    callback(null, response)
  })
  .catch(e =>{
    console.log(e)
    const response = { statusCode: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : '*',  'Access-Control-Allow-Credentials' : 'true' }, body: JSON.stringify({ success: false, msg: e }) }
    callback(null, response)
  })
}

// Lambda endpoint to verify a subscriber (double opt-in)
// accepts /verify?subscriberId=_________
const verifySubscriber = (event, context, callback) => {
  if(event.queryStringParameters.subscriberId){
    const subscriberId = event.queryStringParameters.subscriberId

    verifySubscriberId(subscriberId)
    .then(result => {
      const response = { statusCode: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : '*',  'Access-Control-Allow-Credentials' : 'true' }, body: JSON.stringify({ success: true }) }
      callback(null, response)
    })
    .catch(e => {
      const response = { statusCode: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : '*',  'Access-Control-Allow-Credentials' : 'true' }, body: JSON.stringify({ success: false, msg: e }) }
      callback(null, response)
    })
  }else{
    const response = { statusCode: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : '*',  'Access-Control-Allow-Credentials' : 'true' }, body: JSON.stringify({ success: false, msg: 'no subscriberId provided' }) }
    callback(null, response)
  }
}

// List creation from API
// Checks if a list exists. If not, creates a new list and sends setup instructions.
// accepts ownerEmail and collectionName (optional)
// /list/create?ownerEmail=________&collectionName=________
const listCreateFromAPI = (event, context, callback) => {
  // to do:
  // pass a title from API
  //

  const list = {
    ownerEmail: event.queryStringParameters.ownerEmail
  }
  list.collectionName = event.queryStringParameters.collectionName ? event.queryStringParameters.collectionName : 'defaultglobal'

  isNewList(list) // check if list exists
  .then(addListToDB) // add new list to DB
  .then(sendNewListWelcome) // send new list instructions
  .then(result => {
    console.log(result)
    console.log('New list!')
    const response = { statusCode: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : '*',  'Access-Control-Allow-Credentials' : 'true' }, body: JSON.stringify({ success: true }) }
    callback(null, response)
  })
  .catch(e => {
    console.log(e)
    const response = { statusCode: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : '*',  'Access-Control-Allow-Credentials' : 'true' }, body: JSON.stringify(e) }
    callback(null, response)
  })
}

const listDeliver = (event, context, callback) => {
  const pkg = {
    messageId: event.queryStringParameters.mid,
    sendkey: event.queryStringParameters.sk
    // email: {}
    // subscribers: {}
  }

  // get message from emails table
  getStoredEmail(messageId)
  .then(emailObj => {
    console.log(messageId)
  })


  // confirm query sendKey matches email sendKey
  // and email hasn't already been sent
  // update sent status
  // get list of subscribers
  // email => template
  // send to subscribers
  // return confirm
  // ERRORS: Message already sent/send key doesn't match
}

export {
  receive,
  listSubscribe,
  verifySubscriber,
  listUnsubscribe,
  listCreateFromAPI,
  listReceive,
  listDeliver
}
