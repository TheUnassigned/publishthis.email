import SES from '/aws/ses'
import doT from 'dot'
import {replyEmails} from '/templates/reply-email'

const sendReply = mailObj => {

  //join addresses and test for staging
  var addresses = mailObj.to
  if(mailObj.cc){ addresses = addresses.concat(mailObj.cc)}
  if(mailObj.bcc){ addresses = addresses.concat(mailObj.bcc)}
  var emailStr = addresses.map(r => {
    return r.address
  })
  .join(',')
  var stagingTest = /staging(\+[\w\-]+)?@publishthis\.email/

  mailObj.pteDomain = stagingTest.test(emailStr) ?
    'http://staging.publishthis.email' :
    'http://www.publishthis.email'

    // console.log(replyEmails)

    var replyTemplate = doT.template(replyEmails[mailObj.language])
    var emailBody = replyTemplate(mailObj)

  // var replyTemplates = require("dot").process({ path: "./templates/reply"});
  // var emailBody = replyTemplates.reply(mailObj)
  console.log(mailObj)
  console.log(emailBody)

  // if(mailObj.collectionId){
  //   emailBody = emailBody + '<p>This page is part of a collection: <a href="' + pteDomain + '/c/' + mailObj.collectionId + '">' + pteDomain + '/c/' + mailObj.collectionId+ '</a></p>'
  // }

  const params = {
    Destination: {
      ToAddresses: [
        mailObj.from[0].address
      ],
      BccAddresses: [
        'publishthisemail@gmail.com'
      ]
    },
    Message: {
      Subject: {
        Data: mailObj.subject + ' - publishthis.email',
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
  sendReply
}
