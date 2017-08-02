import dynamo from '/aws/dynamo'
import SES from '/aws/ses'
import doT from 'dot'
import shortid from 'shortid'
import { config } from '/config/environment'
import { firstListEmails } from '/templates/email-first-list'

// send welcome email to new lists created with no page
const sendNewListWelcome = list => {
  // console.log(list)
  var template = doT.template(firstListEmails['en'])
  var emailBody = template(list)

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
        Data: 'Your new list! - publishthis.email',
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


// Checks if a list exists in the DB, if not, builds and returns new list.
const isNewList = mailObj => {
  var query = {
    TableName: config.LISTS_TABLE,
    IndexName: 'ownerEmail-collectionName-index',
    KeyConditionExpression: "ownerEmail = :ownerEmail and collectionName = :collectionName",
    // FilterExpression: "collectionName = :collectionName",
    ExpressionAttributeValues: {
      ":ownerEmail": mailObj.list.ownerEmail,
      ":collectionName": mailObj.list.collectionName
    },
    Limit: 1 }

  return dynamo.query(query).then(result =>{
    if(result.Count == 0){
      // build new list
      mailObj.list.listId = shortid.generate()
      mailObj.list.editKey = shortid.generate() + shortid.generate()
      mailObj.list.count_subscribers = 0
      mailObj.list.count_unsubscribers = 0
      mailObj.newList = true

    }else{
      mailObj.newList = false
      // if list exists, return return an error and the list
      // console.log('list exists:')
      // console.log(result)
      mailObj.list = result.Items[0]
      // return Promise.reject({ success: false, msg: 'List already exists', mailObj: mailObj})
    }
    return mailObj
  })
}

const addListToDB = mailObj => dynamo.putResource({
  TableName: config.LISTS_TABLE,
  Item: mailObj.list
}).then(() => mailObj)

export {
  isNewList,
  addListToDB,
  sendNewListWelcome
}
