import dynamo from '/aws/dynamo'
import SES from '/aws/ses'
import doT from 'dot'
import shortid from 'shortid'
import { config } from '/config/environment'
import { tplSubscribeVerify } from '/templates/emails'

const sendSubscriberVerification = subscriber => {
  var template = doT.template(tplSubscribeVerify)
  var emailBody = template(subscriber)

  const params = {
    Destination: {
      ToAddresses: [
        subscriber.subscriberEmail
      ],
      BccAddresses: [
        'publishthisemail@gmail.com'
      ]
    },
    Message: {
      Subject: {
        Data: 'Verify your email address - publishthis.email',
        Charset: 'UTF-8'
      },
      Body: {
        Html: {
          Data: emailBody,
          Charset: 'UTF-8'
        }
      }
    },
    Source: '"Publish This Email" <noreply@publishthis.email>',
    ReplyToAddresses: [
      '"Publish This Email" <hello@publishthis.email>'
    ],
    ReturnPath: 'return@publishthis.email'
  }

  return SES.sendEmail(params)
}

const isNotSubscribed = subscriber => {
  var query = {
    TableName: config.LIST_SUBSCRIBERS_TABLE,
    IndexName: 'subscriberEmail-listId-index',
    KeyConditionExpression: 'subscriberEmail = :subscriberEmail and listId = :listId',
    ExpressionAttributeValues: {
      ":subscriberEmail": subscriber.subscriberEmail,
      ":listId": subscriber.listId
    },
    Limit: 1
  }
  return dynamo.query(query)
  .then(result =>{
    if(result.Count == 0){
      // build new subscriber
      subscriber.verified = false
      subscriber.subscriberId = shortid.generate()
      subscriber.editKey = shortid.generate() + shortid.generate()
      return subscriber
    }else{
      return Promise.reject(new Error('(isNotSubscribed): User already subscribed'))
    }
  })
}

const addSubscriber = subscriber => dynamo.putResource({
  TableName: config.LIST_SUBSCRIBERS_TABLE,
  Item: subscriber
}).then(() => subscriber)

export {
  isNotSubscribed,
  addSubscriber,
  sendSubscriberVerification
}
