import SES from '/aws/ses'

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

  const pteDomain = stagingTest.test(emailStr) ?
    'http://staging.publishthis.email' :
    'http://www.publishthis.email'

  // var emailWarning = ''
  // if(mailObj.oversizeAttachments){
  //   emailWarning = `<p><strong>Your images were too large, so we haven't included them this time.</strong> <i>publishthis.email supports image attachments up to a total of 350kb per email. To include images in your email, please use smaller attachments.</i></p>`
  // }
  var emailBody =  `<p>Good news!</p>
                      <p>We’ve received your email <strong>${mailObj.subject}</strong>, converted it into a tidy little web page, and published it online here:</p>
                      <p><a href="${pteDomain}/${mailObj.messageId}">${pteDomain}/${mailObj.messageId}</a></p>
                      <p>For a brief moment there, you were the creator of the newest page on the internet. Congratulations.</p>
                      <p>Sadly, that moment has passed, but you can be the creator of the newest page on the internet at any time. Simply send another email to <a href="mailto:page@publishthis.email">page@publishthis.email</a> to publish a page, or <a href="mailto:email@publishthis.email">email@publishthis.email</a> to publish any email online instantly - we’ll reply with a link to your new page almost instantly.</p>
                      <p>Until then,</p>
                      <p><strong>Thanks from <a href="https://www.publishthis.email">publishthis.email</a></strong></p>
                      <p>Delete your page: <a href="${pteDomain}/${mailObj.messageId}/delete/${mailObj.editKey}">${pteDomain}/${mailObj.messageId}/delete/${mailObj.editKey}</a></p>
                      `
  if(mailObj.collectionId){
    emailBody = emailBody + '<p>This page is part of a collection: <a href="' + pteDomain + '/c/' + mailObj.collectionId + '">' + pteDomain + '/c/' + mailObj.collectionId+ '</a></p>'
  }

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
        Data: mailObj.subject + ' - published on publishthis.email',
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
