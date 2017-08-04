import dynamo from '/aws/dynamo'
import { config } from '/config/environment'

const getListSubscribers = mailPackage => {
  var limit = 250
  var dynamoQuery = {
    TableName: config.LIST_SUBSCRIBERS_TABLE,
    IndexName: 'listId-index',
    KeyConditionExpression: 'listId = :id',
    FilterExpression: 'verified = :v',
    ExpressionAttributeValues: {
      ':id': mailPackage.list.listId,
      ':v': true
    },
    Limit: limit
  }

  return dynamo.query(dynamoQuery).then(result => {
    mailPackage.subscribers = result.Items
    return mailPackage
  })
}

export {
  getListSubscribers
}
