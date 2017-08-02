import dynamo from '/aws/dynamo'
import shortid from 'shortid'
import { config } from '/config/environment'

const addListIdToPage = mailObj => {
  // generate sendKey
  mailObj.sendKey = shortid.generate() + shortid.generate()

  var params = {
    TableName: config.EMAIL_TABLE,
    Key: {
      "messageId": mailObj.messageId
    },
    UpdateExpression: "set listId = :lid, sendKey = :sk",
    ExpressionAttributeValues:{
      ":lid": mailObj.list.listId,
      ":sk": mailObj.sendKey
    },
    ReturnValues:"UPDATED_NEW"
  }
  return dynamo.updateResource(params).then(() => mailObj)
}
export {
  addListIdToPage
}
