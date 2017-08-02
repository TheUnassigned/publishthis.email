import dynamo from '/aws/dynamo'
import SES from '/aws/ses'
import doT from 'dot'
import shortid from 'shortid'
import { config } from '/config/environment'
import { listReply } from '/templates/email-reply-list'

// send welcome email to new lists created with no page
const sendListReply = replyContext => {
  // console.log(list)
  var template = doT.template(listReply['en'])
  var emailBody = template(replyContext)

  const params = {
    Destination: {
      ToAddresses: [
        replyContext.list.ownerEmail
      ],
      BccAddresses: [
        'publishthisemail@gmail.com'
      ]
    },
    Message: {
      Subject: {
        Data: 'Your new post! - publishthis.email',
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

  console.log(params)

  return SES.sendEmail(params)
}
export {
  sendListReply
}
