import dynamo from '/aws/dynamo'
import { config } from '/config/environment'

const getList = listId => dynamo.getResource({
  TableName: config.LISTS_TABLE,
  Key: { listId: listId }
})

export {
  getList
}
