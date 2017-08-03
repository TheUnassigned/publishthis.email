import SES from '/aws/ses'
import dynamo from '/aws/dynamo'
import doT from 'dot'
import { config } from '/config/environment'
import { emailTemplateDelivery } from '/templates/email-template-delivery'

const listSend = mailPackage => {

  if(mailPackage.subscribers && mailPackage.subscribers.length){
    var template = doT.template(emailTemplateDelivery['en'])
    var emailBody = template(mailPackage)

    // Build email for each subscriber, prepare to send.
    var distribution = mailPackage.subscribers.map(subscriber => {
      var params = {
        Destination: {
          ToAddresses: [ subscriber.subscriberEmail ],
          BccAddresses: [ 'publishthisemail@gmail.com' ]
        },
        Message: {
          Subject: {
            Data: mailPackage.subject + ' - LIST NAME',
            Charset: 'UTF-8'
          },
          Body: {
            Html: { Data: emailBody, Charset: 'UTF-8' }
          }
        },
        Source: '"Publish This Email" <noreply@publishthis.email>',
        ReplyToAddresses: [ `"LIST NAME" <${mailPackage.from[0].address}>` ],
        ReturnPath: 'return@publishthis.email'
      }
      return SES.sendEmail(params)
    })

    return Promise.all(distribution.map(p => p.catch(e => e)))
    .then(results => {
      mailPackage.results = results
      return mailPackage
    })

  }else{
    return Promise.reject({e: new Error('No subscribers'), msg: 'This list has no subscribers'})

  }
}

const markPostSent = mailPackage =>{
  var params = {
    TableName: config.EMAIL_TABLE,
    Key: {
      "messageId": mailPackage.messageId
    },
    UpdateExpression: "set delivered = :d",
    ExpressionAttributeValues:{
      ":d":true
    },
    ReturnValues:"UPDATED_NEW"
  }
  return dynamo.updateResource(params).then(() => mailPackage)
}

export {
  listSend,
  markPostSent
}
