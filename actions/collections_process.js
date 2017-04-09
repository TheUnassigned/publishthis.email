/**
 * Check for collection requirements in email, and do appropraite work
 */
import dynamo from '/aws/dynamo'
import shortid from 'shortid'
import { config } from '/config/environment'

// find a collection from an email or create one if one doesn't exist
const getCollection = emailObj => {
  const item = {
    email: emailObj.from[0].address,
    collectionName: emailObj.label
  }

  return dynamo.getResource({
    TableName: config.COLLECTION_TABLE,
    Key: item
  }).then(({ collectionId }) => {
    emailObj.collectionId = collectionId
    return emailObj
  }).catch(err => {
    // assume error means the collection doesn't exist, and create one
    // use "~" instead of "-" for shortid (we use "-" as a delimiter for collection names)
    shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~_')
    emailObj.collectionId = item.collectionId = shortid.generate()
    return dynamo.putResource({
      TableName: config.COLLECTION_TABLE,
      Item: item,
      // only need to check email here as dynamo will treat the key as a compound
      ConditionExpression: 'attribute_not_exists(email)'
    }).then(() => emailObj)
  })
}

// save an email to a collection
// (expects the email to have the collection id as a key)
const saveToCollection = ({ collectionId, messageId, subject, timeAdded }) => {
  const Item = {
    collectionId,
    messageId,
    subject,
    timeAdded
  }

  return dynamo.putResource({
    Item,
    TableName: config.COLLECTION_ITEM_TABLE
  })
}

// if a label exists add to the right collection (create if necessary)
// and in either case return the original email object
const collectionsProcess = emailObj => emailObj.label ?
  getCollection(emailObj)
    .then(saveToCollection)
    .then(() => emailObj) :
  Promise.resolve(emailObj)

export {
  collectionsProcess
}
