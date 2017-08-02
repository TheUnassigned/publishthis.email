import dynamo from '/aws/dynamo'
import { config } from '/config/environment'

const addListIdToPage = (listId, messageId) => {
  var params = {
    TableName: config.EMAIL_TABLE,
    Key: {
      "messageId": messageId
    },
    UpdateExpression: "set listId = :lid",
    ExpressionAttributeValues:{
      ":lid": listId
    },
    ReturnValues:"UPDATED_NEW"
  }
  return dynamo.updateResource(params)
}
export {
  addListIdToPage
}
