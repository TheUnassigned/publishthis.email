import dynamo from '/aws/dynamo'
import { config } from '/config/environment'

const deleteEmailFromDynamo = deleteParams => dynamo.deleteResource({
  TableName: config.EMAIL_TABLE,
  Key: {
    messageId: deleteParams.messageId
  }
}).then(() => deleteParams)

const deleteCollectionItemFromDynamo = deleteParams => dynamo.deleteResource({
  TableName: config.COLLECTION_ITEM_TABLE,
  Key: {
    collectionId: deleteParams.collectionId,
    timeAdded: deleteParams.timeAdded
  },
  ConditionExpression: 'messageId = :mid',
  ExpressionAttributeValues: {
    ':mid': deleteParams.messageId
  }
}).then(() => deleteParams)
//


export {
  deleteEmailFromDynamo,
  deleteCollectionItemFromDynamo
}
