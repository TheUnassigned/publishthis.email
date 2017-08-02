import dynamo from '/aws/dynamo'
import SES from '/aws/ses'
import doT from 'dot'
import shortid from 'shortid'
import { config } from '/config/environment'
import { listReply } from '/templates/email-reply-list'
import { firstListEmailsWithPage } from '/templates/email-first-list'

// send welcome email to new lists created with no page
const sendListReply = mailObj => {
  // if existing or new list
  console.log(mailObj)
  if(!mailObj.newList){
    // existing list
    var template = doT.template(listReply['en'])
    var emailBody = template(mailObj)

    var params = {
      Destination: {
        ToAddresses: [
          mailObj.list.ownerEmail
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
  }else{
    // new list
    var template = doT.template(firstListEmailsWithPage['en'])
    var emailBody = template(mailObj)

    var params = {
      Destination: {
        ToAddresses: [
          mailObj.list.ownerEmail
        ],
        BccAddresses: [
          'publishthisemail@gmail.com'
        ]
      },
      Message: {
        Subject: {
          Data: 'Your new list: ' + mailObj.subject + ' - publishthis.email',
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
  }

  return SES.sendEmail(params)
}
export {
  sendListReply
}
