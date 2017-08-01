import dynamo from '/aws/dynamo'
import { config } from '/config/environment'

const unsubscribe = subscriberId => dynamo.deleteResource({
  TableName: config.LIST_SUBSCRIBERS_TABLE,
  Key: {
    subscriberId: subscriberId
  }
})

export {
  unsubscribe
}
