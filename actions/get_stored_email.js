import dynamo from '/aws/dynamo'
import { config } from '/config/environment'

const getStoredEmail = id => dynamo.getResource({
  TableName: config.EMAIL_TABLE,
  Key: { messageId: id }
})

export {
  getStoredEmail
}
