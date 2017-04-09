import aws from 'aws-sdk'
import { config } from './environment'

const updateConfig = () => {
  aws.config.update({
    accessKeyId: config.AWS_ID,
    secretAccessKey: config.AWS_KEY,
    region: config.AWS_REGION || 'us-east-1'
  })
}

export default aws

export {
  updateConfig
}
