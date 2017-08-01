import {
  getRawEmail,
  processEmail,
  storeInDynamo,
  sendReply,
  getStoredEmail,
  collectionsProcess,
  isNotSubscribed,
  addSubscriber,
  sendSubscriberVerification,
  verifySubscriberId,
  unsubscribe
} from './actions'
import shortid from 'shortid'
import dot from 'dot'
import emailTpl from '/templates/email.dot'
import pageTpl from '/templates/page.dot'
import errorTpl from '/templates/404.dot'

// cached email dot template compiler
const emailCompiler = dot.template(emailTpl)
const pageCompiler = dot.template(pageTpl)
const compiler404 = dot.template(errorTpl)

// debugging
const util = require('util')

const receive = (event, context, callback) => {
  const messageId = event.Records[0].s3.object.key
  getRawEmail(messageId)
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

const view = (event, context, callback) => {
  // get the email id from the event
  const messageId = event.pathParameters.id

  getStoredEmail(messageId)
  .then(mailObj => {
    // render the dot email template with the mail obj
    const html = mailObj.to.startsWith('page') ?
    pageCompiler(mailObj) :
    emailCompiler(mailObj)

    const response = {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html'
      },
      body: html
    }
    callback(null, response)
  }).catch(e => {
    console.log(e)
    const response = {
      statusCode: 404,
      headers: {
        'Content-Type': 'text/html'
      },
      body: compiler404({ error: e })
    }
    callback(null, response)
  })
}

export {
  receive,
  listSubscribe,
  verifySubscriber,
  listUnsubscribe,
  view
}
