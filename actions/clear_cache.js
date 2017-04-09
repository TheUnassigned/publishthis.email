import CFClient from 'cloudflare'
import { config } from '/config/environment'

const cache = new CFClient({
    email: config.CF_EMAIL,
    key: config.CF_KEY
});

const clearCache = cacheParams => {
  cache.deleteCache(config.CF_ZONEID, cacheParams)
  .then(confirm => {
    console.log('CACHE CLEARED:', confirm)
  })
  .catch(e => {
    console.log(e)
  })
}

export {
  clearCache
}
