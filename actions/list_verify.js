import dynamo from '/aws/dynamo'
import SES from '/aws/ses'
import { config } from '/config/environment'
import doT from 'dot'
import { tplListSubscriberNew } from '/templates/emails'

const verifySubscriberId = subscriberId => {
  var params = {
    TableName: config.LIST_SUBSCRIBERS_TABLE,
    Key: {
      "subscriberId": subscriberId
    },
    UpdateExpression: "set verified = :v",
    ExpressionAttributeValues:{
      ":v":true
    },
    ReturnValues:"UPDATED_NEW"
  }
  return dynamo.updateResource(params)
}

const getSubscriberFromSubscriberId = subscriberId =>{
  var params = {
    TableName: config.LIST_SUBSCRIBERS_TABLE,
    Key: { subscriberId: subscriberId }
  }
  return dynamo.getResource(params)
}

const getListFromSubscriber = subscriber =>{
  var params = {
    TableName: config.LISTS_TABLE,
    Key: { listId: subscriber.listId }
  }
  return dynamo.getResource(params)
    .then(list =>{
      list.subscriber = subscriber
      return list
    })
}

const sendNewSubscriberNotification = list =>{
  var replyTemplate = doT.template(tplListSubscriberNew)
  var emailBody = replyTemplate(list)

  const params = {
    Destination: {
      ToAddresses: [
        list.ownerEmail
      ],
      BccAddresses: [
        'publishthisemail@gmail.com'
      ]
    },
    Message: {
      Subject: {
        Data: 'New subscriber: ' + list.title,
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

export {
  verifySubscriberId,
  getSubscriberFromSubscriberId,
  getListFromSubscriber,
  sendNewSubscriberNotification
}
