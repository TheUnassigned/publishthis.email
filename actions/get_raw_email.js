import S3 from '/aws/s3'
import { config } from '/config/environment'

const getRawEmail = id => S3.get(id, config.S3_BUCKET)

export {
  getRawEmail
}
