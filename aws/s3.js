import AWS from '/config/aws'

const S3 = new AWS.S3()

const get = (file, bucket) => new Promise((resolve, reject) => {
  S3.getObject({
    Bucket: bucket,
    Key: file
  }, (err, obj) => err ? reject(err) : resolve(obj.Body))
})

export default {
  get
}
