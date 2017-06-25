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
  console.log('browser language: ', acceptedLanguage)
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

export {
  useLanguage,
  acceptLanguages
}
