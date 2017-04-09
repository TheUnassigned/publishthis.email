import dynamo from '/aws/dynamo'
import { config } from '/config/environment'

const storeInDynamo = emailObj => dynamo.putResource({
  TableName: config.EMAIL_TABLE,
  Item: emailObj,
  ConditionExpression: 'attribute_not_exists(messageId)'
}).then(() => emailObj)

export {
  storeInDynamo
}
