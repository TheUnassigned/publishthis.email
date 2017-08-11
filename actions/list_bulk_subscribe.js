import dynamo from '/aws/dynamo'
// import SES from '/aws/ses'
// import doT from 'dot'
import shortid from 'shortid'
import { config } from '/config/environment'
// import { tplSubscribeVerify } from '/templates/emails'

const addBulkSubscribers = (list, newSubscribers) => {

  console.log(list)
  // map items
  var items = newSubscribers.map(subscriber => {
    var item = {
      subscriberId: shortid.generate(),
      editKey: shortid.generate() + shortid.generate(),
      listId: list.listId,
      subscriberEmail: subscriber,
      verified: true
    }
    return item
  })

  // map requests for adding items
  var requests = items.map(item => {
    var request = {
      PutRequest: {
        Item: item
      }
    }
    return request
  })

  // build params for dynamodb batch add
  var params = { RequestItems: {} }
  params.RequestItems[config.LIST_SUBSCRIBERS_TABLE] = requests

  return dynamo.batchWriteItem(params)//.then(() => subscriber)
}



export {
  addBulkSubscribers
}
