import SES from '/aws/ses'
import doT from 'dot'
import {replyEmails} from '/templates/email-reply'

const sendListPreview = mailObj => {

  mailObj.pteDomain = 'https://www.publishthis.email'

  // set reply template for the appropriate language
  var replyTemplate = doT.template(replyEmails[mailObj.language])
  var emailBody = replyTemplate(mailObj)

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
  sendListPreview
}
