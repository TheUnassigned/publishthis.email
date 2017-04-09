import imgur from 'imgur'
import { config } from '/config/environment'

imgur.setClientId(config.IMGUR_ID);
imgur.setAPIUrl('https://api.imgur.com/3/')

const upload = img => imgur.uploadBase64(img)

export default {
  upload
}
