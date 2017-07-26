import dynamo from '/aws/dynamo'
import { config } from '/config/environment'


const isSubscribed = subscriber => dynamo.query(
  { TableName: config.LIST_SUBSCRIBERS_TABLE,
    IndexName: 'subscriberEmail-listId-index',
    KeyConditionExpression: "#subscriberEmail = :subscriberEmail and #listId >= :listId",
    ExpressionAttributeNames:{
      "#subscriberEmail": "subscriberEmail",
      "#listId": "listId"
    },
    ExpressionAttributeValues: {
      ":subscriberEmail": subscriber.subscriberEmail,
      ":listId": subscriber.listId
    },
    Limit: 1 }
  )//.then(() => subscriber)

  const addSubscriber = subscriber => dynamo.putResource({
    TableName: config.LIST_SUBSCRIBERS_TABLE,
    Item: subscriber
  }).then(() => subscriber)

  export {
    isSubscribed,
    addSubscriber
  }
