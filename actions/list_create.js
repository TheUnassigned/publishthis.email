import dynamo from '/aws/dynamo'
import SES from '/aws/ses'
import doT from 'dot'
import shortid from 'shortid'
import { config } from '/config/environment'

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
      mailObj.list.title = mailObj.subject
      mailObj.newList = true

    }else{
      mailObj.newList = false
      // if list exists, return return an error and the list
      mailObj.list = result.Items[0]
    }
    return mailObj
  })
}

const addListToDB = mailObj => {
  if(mailObj.newList){
    return dynamo.putResource({
      TableName: config.LISTS_TABLE,
      Item: mailObj.list
    }).then(() => mailObj)
  }else{
    return mailObj
  }
}

export {
  isNewList,
  addListToDB
}
