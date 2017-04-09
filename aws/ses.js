import AWS from '/config/aws'

const ses = new AWS.SES();

const sendEmail = params => new Promise((resolve, reject) => {
  ses.sendEmail(params, (err, data) => err ? reject(err) : resolve(data))
})

export default {
  sendEmail
}
