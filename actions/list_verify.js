import dynamo from '/aws/dynamo'
import { config } from '/config/environment'

const verifySubscriberId = subscriberId => {
  var params = {
    TableName: config.LIST_SUBSCRIBERS_TABLE,
    Key: {
      "subscriberId": subscriberId
    },
    UpdateExpression: "set verified = :v",
    ExpressionAttributeValues:{
      ":v":true
    },
    ReturnValues:"UPDATED_NEW"
  }
  return dynamo.updateResource(params)
}
export {
  verifySubscriberId
}
