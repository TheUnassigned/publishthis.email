import AWS from '/config/aws'
import { config } from '/config/environment'

const docClient = new AWS.DynamoDB.DocumentClient({
  convertEmptyValues: true,
  accessKeyId: config.AWS_ID,
  secretAccessKey: config.AWS_KEY,
  region: config.AWS_REGION
})

/**
 * Get a resource from the DB
 * The params provided match graphql's param object layout and context
 */
const getResource = params => {
  return docClient.get(params).promise().then(result => {
    return result.Item ?
      result.Item :
      Promise.reject(new Error('(getResource): Resource could not be found'))
  })
}

/**
 * Query dynamodb for one or more resources
 */
const query = params => {
  return docClient.query(params).promise().then(result => {
    return result ?
      result :
      Promise.reject(new Error('(getResource): Resource could not be found'))
  })
}

/**
 * Put a resource in the DB
 * The params given match graphql's param object layout and context
 */
const putResource = params => {
  return docClient.put(params).promise()
}

// Delete a resource from the DB
const deleteResource = params => {
  return docClient.delete(params).promise()
}

// Update a resource in the DB
const updateResource = params => {
  return docClient.update(params).promise()
}

// batch write item
const batchWriteItem = params => {
  return docClient.batchWrite(params).promise()
}

export default {
  getResource,
  putResource,
  deleteResource,
  updateResource,
  query,
  batchWriteItem
}
