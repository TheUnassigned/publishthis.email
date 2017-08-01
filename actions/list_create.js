import dynamo from '/aws/dynamo'
import SES from '/aws/ses'
import doT from 'dot'
import shortid from 'shortid'
import { config } from '/config/environment'
import { firstListEmails } from '/templates/email-first-list'

// send welcome email to new lists
const sendNewListWelcome = list => {
  console.log(list)
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
const isNewList = list => {
  var query = {
    TableName: config.LISTS_TABLE,
    IndexName: 'ownerEmail-collectionName-index',
    KeyConditionExpression: "ownerEmail = :ownerEmail and collectionName = :collectionName",
    // FilterExpression: "collectionName = :collectionName",
    ExpressionAttributeValues: {
      ":ownerEmail": list.ownerEmail,
      ":collectionName": list.collectionName
    },
    Limit: 1 }

  return dynamo.query(query).then(result =>{
    if(result.Count == 0){
      // build new list
      list.listId = shortid.generate()
      list.editKey = shortid.generate() + shortid.generate()
      list.count_subscribers = 0
      list.count_unsubscribers = 0
      return list
    }else{
      // if list exists, return return an error and the list
      return Promise.reject({ success: false, msg: 'List already exists', list: list})
    }
  })
}

const addListToDB = list => dynamo.putResource({
  TableName: config.LISTS_TABLE,
  Item: list
}).then(() => list)

export {
  isNewList,
  addListToDB,
  sendNewListWelcome
}
