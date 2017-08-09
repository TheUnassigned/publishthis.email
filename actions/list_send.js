import SES from '/aws/ses'
import dynamo from '/aws/dynamo'
import doT from 'dot'
import { config } from '/config/environment'
import { tplDelivery } from '/templates/emails'

const listSend = mailPackage => {

  if(mailPackage.subscribers && mailPackage.subscribers.length){
    var template = doT.template(tplDelivery)


    // Build email for each subscriber, prepare to send.
    var distribution = mailPackage.subscribers.map(subscriber => {
      mailPackage.subscriber = subscriber
      var emailBody = template(mailPackage)
      var params = {
        Destination: {
          ToAddresses: [ subscriber.subscriberEmail ],
          BccAddresses: [ 'publishthisemail@gmail.com' ]
        },
        Message: {
          Subject: {
            Data: mailPackage.subject,
            Charset: 'UTF-8'
          },
          Body: {
            Html: { Data: emailBody, Charset: 'UTF-8' }
          }
        },
        Source: `"${mailPackage.list.title}" <noreply@publishthis.email>`,
        ReplyToAddresses: [ `"${mailPackage.list.title}" <${mailPackage.from[0].address}>` ],
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
