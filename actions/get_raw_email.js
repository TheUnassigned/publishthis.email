import S3 from '/aws/s3'
import { config } from '/config/environment'

const getRawEmail = (id, bucket) => S3.get(id, bucket)

export {
  getRawEmail
}
