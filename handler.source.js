import {
  getRawEmail,
  processEmail,
  storeInDynamo,
  sendReply,
  getStoredEmail,
  collectionsProcess,
  isSubscribed,
  addSubscriber
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

const listSubscribe = (event, context, callback) => {
  const subscriber = {
    subscriberEmail: event.queryStringParameters.subscriberEmail,
    listId: event.queryStringParameters.listId,
    verified: false,
    subscriberId: shortid.generate(),
    editKey: shortid.generate() + shortid.generate()
  }


  // this is a double negative... Sort it out tomorrow
  isSubscribed(subscriber)
    .then(record => {
      console.log(record)
    })
    .catch(e => {
      console.log(e)
    })

  // addSubscriber(subscriber)
  //   .then(subscriber => {
  //     console.log(subscriber)
  //   })
  // .catch(e => {
  //   console.log(e)
  // })
  // check if subscriber exists
    // create subscriber

  // get list owner
    // send verification email


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
  view
}
