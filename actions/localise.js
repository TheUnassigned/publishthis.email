import franc from 'franc-min'

const acceptLanguages = [
  'ar', 'ar-ae', 'ar-bh', 'ar-dz', 'ar-eg', 'ar-iq', 'ar-jo', 'ar-kw', 'ar-lb', 'ar-ly', 'ar-ma', 'ar-om', 'ar-qa', 'ar-sa', 'ar-sy', 'ar-tn', 'ar-ye', // arabic
  'en', 'en-gb', 'en-us', 'en-au', 'en-ca', 'en-ie', 'en-nz', 'en-za', // english
  'es', 'es-ar', 'es-bo', 'es-cl', 'es-co', 'es-cr', 'es-do', 'es-ec', 'es-gt', 'es-hn', 'es-mx', 'es-ni', 'es-pa', 'es-pe', 'es-pr', 'es-py', 'es-sv', 'es-uy', 'es-ve', // spanish
  'ru', 'ru-md', // russian
  'zh', 'zh-cn', // chinese simplified
  'zh-hk', 'zh-sg', 'zh-tw' // chinese traditional
]

// parses an express request and returns a language template folder
// falls-back to english
const useLanguage = req => {
  const acceptedLanguage = req.acceptsLanguages(acceptLanguages)
  if(acceptedLanguage){
    var lang = acceptedLanguage.substring(0,2) // take the first two characters only

    // traditional chinese
    if(['zh-hk', 'zh-sg', 'zh-tw'].includes(acceptedLanguage)){
      lang = acceptedLanguage
    }

    return(lang)
  }else{
    return('en')
  }
}

// language detection whitelist
const detectWhitelist = [
  'cmn', // Chinese Mandarin
  'spa', // Spanish
  'eng', // English
  'rus', // Russian
  'arb' // Standard Arabic
  // 'ukr' // Ukrainian
]

// to convert from 3 to 2 character language codes
const languageCodes = [
  ['cmn', 'zh'],
  ['spa', 'es'],
  ['eng', 'en'],
  ['rus', 'ru'],
  ['arb', 'ar']
  // ['urk', 'uk']
]

// convert a 3 character language code to 2 characters
const langCode3to2 = code3 => {
  for(var i = 0; i < languageCodes.length; i++){
    if(languageCodes[i][0] == code3){
      return languageCodes[i][1]
    }
  }
}

// detect content language
const detectLanguage = email => {
  const sample = email.subject + " - " + email.text
  const detectedLanguage = franc(sample, { whitelist: detectWhitelist })

  if(detectWhitelist.indexOf(detectedLanguage) > -1){
    return detectedLanguage
  }else{
    return 'eng' // fall back to english
  }
}

export {
  useLanguage,
  acceptLanguages,
  detectWhitelist,
  detectLanguage,
  langCode3to2
}
