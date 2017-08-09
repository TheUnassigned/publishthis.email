import dynamo from '/aws/dynamo'
import SES from '/aws/ses'
import doT from 'dot'
import shortid from 'shortid'
import { config } from '/config/environment'
import { tplListNew, tplListSendComplete, tplListSendNoSubs } from '/templates/emails'

// send welcome email to new lists created with a page
const sendNewListReply = mailObj => {
  // if existing or new list
  if(!mailObj.newList){
    return mailObj
  }else{
    // new list
    var template = doT.template(tplListNew)
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
          Data: 'Your new list: ' + mailObj.subject,
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

    return SES.sendEmail(params).then(() => mailObj)
  }
}

// Reply when a user distributed a page
const sendListReply = mailObj => {
  var template = doT.template(tplListSendComplete)
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
        Data: 'Delivered: ' + mailObj.subject,
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

  return SES.sendEmail(params).then(() => mailObj)
}

const sendListReplyNoSubs = mailObj => {
  var template = doT.template(tplListSendNoSubs)
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
        Data: 'Send failed: No subscribers :(',
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

  return SES.sendEmail(params).then(() => mailObj)
}

export {
  sendNewListReply,
  sendListReply,
  sendListReplyNoSubs
}
