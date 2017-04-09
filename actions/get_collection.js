import dynamo from '/aws/dynamo'
import { config } from '/config/environment'

const getCollection = collectionParams => {
  var limit = 10
  var dynamoQuery = {
    TableName: config.COLLECTION_ITEM_TABLE,
    KeyConditionExpression: '#collectionId = :id',
    ExpressionAttributeNames:{
      '#collectionId': 'collectionId'
    },
    ExpressionAttributeValues: {
      ':id': collectionParams.id
    },
    ScanIndexForward: false,
    Limit: limit
  }

  // paging
  if(collectionParams.ExclusiveStartKey){
    dynamoQuery.ExclusiveStartKey = collectionParams.ExclusiveStartKey
  }

  return dynamo.query(dynamoQuery).then(collection => {
    collection.collectionId = collectionParams.id
    collection.title = collectionParams.title
    return collection
  })
}

export {
  getCollection
}
