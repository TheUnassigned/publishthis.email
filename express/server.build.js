(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 38);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var env = process.env;

var config = {
  AWS_ID: env.PTE_AWS_ID,
  AWS_KEY: env.PTE_AWS_KEY,
  AWS_REGION: env.PTE_AWS_REGION || 'us-east-1',
  S3_BUCKET: env.PTE_S3_BUCKET,
  EMAIL_TABLE: env.PTE_EMAIL_TABLE,
  COLLECTION_TABLE: env.PTE_COLLECTION_TABLE,
  COLLECTION_ITEM_TABLE: env.PTE_COLLECTION_ITEM_TABLE,
  LISTS_TABLE: env.PTE_LISTS_TABLE,
  LIST_SUBSCRIBERS_TABLE: env.PTE_LIST_SUBSCRIBERS_TABLE,
  CF_KEY: env.PTE_CF_KEY,
  CF_EMAIL: env.PTE_CF_EMAIL,
  CF_ZONEID: env.PTE_CF_ZONEID,
  IMGUR_ID: env.PTE_IMGUR_ID,
  IMGUR_SECRET: env.PTE_IMGUR_SECRET,
  API_URL: env.PTE_API_URL,
  S3_BUCKET_LIST: env.PTE_S3_BUCKET_LIST,
  PORT: env.PORT || 3000
};

exports.config = config;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _aws = __webpack_require__(5);

var _aws2 = _interopRequireDefault(_aws);

var _environment = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var docClient = new _aws2.default.DynamoDB.DocumentClient({
  convertEmptyValues: true,
  accessKeyId: _environment.config.AWS_ID,
  secretAccessKey: _environment.config.AWS_KEY,
  region: _environment.config.AWS_REGION
});

/**
 * Get a resource from the DB
 * The params provided match graphql's param object layout and context
 */
var getResource = function getResource(params) {
  return docClient.get(params).promise().then(function (result) {
    return result.Item ? result.Item : Promise.reject(new Error('(getResource): Resource could not be found'));
  });
};

/**
 * Query dynamodb for one or more resources
 */
var query = function query(params) {
  return docClient.query(params).promise().then(function (result) {
    return result ? result : Promise.reject(new Error('(getResource): Resource could not be found'));
  });
};

/**
 * Put a resource in the DB
 * The params given match graphql's param object layout and context
 */
var putResource = function putResource(params) {
  return docClient.put(params).promise();
};

// Delete a resource from the DB
var deleteResource = function deleteResource(params) {
  return docClient.delete(params).promise();
};

// Update a resource in the DB
var updateResource = function updateResource(params) {
  return docClient.update(params).promise();
};

// batch write item
var batchWriteItem = function batchWriteItem(params) {
  return docClient.batchWrite(params).promise();
};

exports.default = {
  getResource: getResource,
  putResource: putResource,
  deleteResource: deleteResource,
  updateResource: updateResource,
  query: query,
  batchWriteItem: batchWriteItem
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _aws = __webpack_require__(5);

var _aws2 = _interopRequireDefault(_aws);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ses = new _aws2.default.SES();

var sendEmail = function sendEmail(params) {
  return new Promise(function (resolve, reject) {
    ses.sendEmail(params, function (err, data) {
      return err ? reject(err) : resolve(data);
    });
  });
};

exports.default = {
  sendEmail: sendEmail
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("dot");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("shortid");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateConfig = undefined;

var _awsSdk = __webpack_require__(47);

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _environment = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var updateConfig = function updateConfig() {
  _awsSdk2.default.config.update({
    accessKeyId: _environment.config.AWS_ID,
    secretAccessKey: _environment.config.AWS_KEY,
    region: _environment.config.AWS_REGION || 'us-east-1'
  });
};

exports.default = _awsSdk2.default;
exports.updateConfig = updateConfig;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tplListSubscriberNew = exports.tplSubscribeVerify = exports.tplDelivery = exports.tplListSendNoSubs = exports.tplListSendComplete = exports.tplListNew = exports.tplPageReply = undefined;

var _pageReply = __webpack_require__(45);

var _listNew = __webpack_require__(41);

var _listSendComplete = __webpack_require__(42);

var _listSendNoSubs = __webpack_require__(43);

var _delivery = __webpack_require__(40);

var _subscribeVerify = __webpack_require__(46);

var _listSubscriberNew = __webpack_require__(44);

// var tplPageReply = fs.readFileSync('/templates/emails/source/page-reply.html', 'utf8');
// var tplListNew = fs.readFileSync('/templates/emails/source/list-new.html', 'utf8');
// var tplListSendComplete = fs.readFileSync('/templates/emails/source/list-send-complete.html', 'utf8');
// var tplListSendNoSubs = fs.readFileSync('/templates/emails/source/list-send-no-subs.html', 'utf8');
// var tplDelivery = fs.readFileSync('/templates/emails/source/delivery.html', 'utf8');
// var tplSubscribeVerify = fs.readFileSync('/templates/emails/source/subscribe-verify.html', 'utf8');

exports.tplPageReply = _pageReply.tplPageReply;
exports.tplListNew = _listNew.tplListNew;
exports.tplListSendComplete = _listSendComplete.tplListSendComplete;
exports.tplListSendNoSubs = _listSendNoSubs.tplListSendNoSubs;
exports.tplDelivery = _delivery.tplDelivery;
exports.tplSubscribeVerify = _subscribeVerify.tplSubscribeVerify;
exports.tplListSubscriberNew = _listSubscriberNew.tplListSubscriberNew; // import * as fs from 'fs'

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("sanitize-html");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.langCode3to2 = exports.detectLanguage = exports.detectWhitelist = exports.acceptLanguages = exports.useLanguage = undefined;

var _francMin = __webpack_require__(50);

var _francMin2 = _interopRequireDefault(_francMin);

var _traditionalOrSimplified = __webpack_require__(53);

var _traditionalOrSimplified2 = _interopRequireDefault(_traditionalOrSimplified);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var acceptLanguages = ['en', 'en-gb', 'en-us', 'en-au', 'en-ca', 'en-ie', 'en-nz', 'en-za', // english
'es', 'es-ar', 'es-bo', 'es-cl', 'es-co', 'es-cr', 'es-do', 'es-ec', 'es-gt', 'es-hn', 'es-mx', 'es-ni', 'es-pa', 'es-pe', 'es-pr', 'es-py', 'es-sv', 'es-uy', 'es-ve', // spanish
'ar', 'ar-ae', 'ar-bh', 'ar-dz', 'ar-eg', 'ar-iq', 'ar-jo', 'ar-kw', 'ar-lb', 'ar-ly', 'ar-ma', 'ar-om', 'ar-qa', 'ar-sa', 'ar-sy', 'ar-tn', 'ar-ye', // arabic
'ru', 'ru-md', // russian
'zh', 'zh-cn', // chinese simplified
'zh-hk', 'zh-sg', 'zh-tw' // chinese traditional
];

// parses an express request and returns a language template folder
// falls-back to english
var useLanguage = function useLanguage(req) {
  var acceptedLanguage = req.acceptsLanguages(acceptLanguages);
  console.log(acceptedLanguage);
  if (acceptedLanguage && !acceptedLanguage.isArray) {

    var lang = acceptedLanguage.substring(0, 2); // take the first two characters only

    // traditional chinese
    if (['zh-hk', 'zh-sg', 'zh-tw'].includes(acceptedLanguage)) {
      lang = acceptedLanguage;
    }
    return lang;
  } else if (acceptedLanguage && acceptedLanguage.isArray) {
    // prioritise EN if multiple languages are accepted
    if (acceptedLanguage.includes('en')) {
      lang = 'en';
    } else {
      lang = acceptedLanguage[0];
    }
    return lang;
  } else {
    return 'en';
  }
};

// language detection whitelist
var detectWhitelist = ['cmn', // Chinese Mandarin
'spa', // Spanish
'eng', // English
'rus', // Russian
'arb', // Standard Arabic
'por', 'fra', 'ita', 'deu', 'pol'
// 'ukr' // Ukrainian
];

var allowedLanguages = ['cmn', // Chinese Mandarin
'spa', // Spanish
'eng', // English
'rus', // Russian
'arb' // Standard Arabic
// 'ukr' // Ukrainian
];

// to convert from 3 to 2 character language codes
var languageCodes = [['cmn', 'zh'], ['spa', 'es'], ['eng', 'en'], ['rus', 'ru'], ['arb', 'ar']
// ['urk', 'uk']
];

// convert a 3 character language code to 2 characters
var langCode3to2 = function langCode3to2(code3) {
  for (var i = 0; i < languageCodes.length; i++) {
    if (languageCodes[i][0] == code3) {
      return languageCodes[i][1];
    }
  }
};

// detect content language
var detectLanguage = function detectLanguage(email) {
  var sample = email.subject + " - " + email.text;
  var detectedLanguage = (0, _francMin2.default)(sample, { whitelist: detectWhitelist });

  if (allowedLanguages.indexOf(detectedLanguage) > -1) {
    console.log(detectedLanguage);
    if (detectedLanguage == 'cmn' && _traditionalOrSimplified2.default.isTraditional(sample)) {
      return 'zh-t';
    } else if (detectedLanguage == 'cmn' && _traditionalOrSimplified2.default.isSimplified(sample)) {
      return 'zh';
    } else {
      return langCode3to2(detectedLanguage);
    }
  } else {
    return 'en'; // fall back to english
  }
};

exports.useLanguage = useLanguage;
exports.acceptLanguages = acceptLanguages;
exports.detectWhitelist = detectWhitelist;
exports.detectLanguage = detectLanguage;
exports.langCode3to2 = langCode3to2;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// falls-back to english
var slugify = function slugify(text) {
  return text.toString().toLowerCase().replace(/\s+/g, '-') // Replace spaces with -
  .replace(/[“”"?():;\/\\@=&`[\]\|<>^~`#%]/g, '') // Remove non-safe characters
  .replace(/\-\-+/g, '-') // Replace multiple - with single -
  .replace(/^-+/, '') // Trim - from start of text
  .replace(/-+$/, '') // Trim - from end of text
  .toLowerCase().slice(0, 90);
};

exports.slugify = slugify;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var replyEmails = {
  'ar': '<div dir="rtl">\n<p>\u0645\u0631\u062D\u0628\u0627,</p>\n<p>\u0644\u0642\u062F \u062A\u0644\u0642\u064A\u0646\u0627 \u0628\u0631\u064A\u062F\u0643 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A <strong>{{=it.subject}}</strong>,  , \u062B\u0645 \u0642\u0645\u0646\u0627 \u0628\u062A\u062D\u0648\u064A\u0644\u0647 \u0627\u0644\u064A \u0635\u0641\u062D\u0629 \u0648\u064A\u0628 \u0648\u0646\u0634\u0631\u0646\u0627\u0647 \u0639\u0644\u064A \u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A \u0647\u0646\u0627:</p>\n<p><a href="https://publishth.is/{{=it.messageId}}">https://publishth.is/{{=it.messageId}}</a></p>\n{{? it.slug}}<p><a href="{{=it.pteDomain}}/{{=it.slug}}-{{=it.messageId}}">{{=it.pteDomain}}/{{=it.slug}}-{{=it.messageId}}</a></p>{{?}}\n<p><strong>\u0634\u0643\u0631\u0627 \u0644\u0643\u060C<a href="https://www.publishthis.email">publishthis.email</a></strong></p>\n<p>\u0627\u062D\u0630\u0641 \u0635\u0641\u062D\u062A\u0643: <a href="{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}">{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}</a></p>\n{{? it.collectionId}}\n<p>\u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062D\u0629 \u062C\u0632\u0621 \u0645\u0646 \u0645\u062C\u0645\u0648\u0639\u0629: <a href="{{=it.pteDomain}}/c/{{=it.collectionId}}">{{=it.pteDomain}}/c/{{=it.collectionId}}</a></p>\n{{?}}\n</div>\n',
  'es': '<p>Hola!</p>\n<p>Hemos recibido tu email <strong>{{=it.subject}}</strong>, lo convertimos en una p\xE1gina web y la publicamos online en este enlace::</p>\n<p><a href="https://publishth.is/{{=it.messageId}}">https://publishth.is/{{=it.messageId}}</a></p>\n{{? it.slug}}<p><a href="{{=it.pteDomain}}/{{=it.slug}}-{{=it.messageId}}">{{=it.pteDomain}}/{{=it.slug}}-{{=it.messageId}}</a></p>{{?}}\n<p>Gracias de parte de <strong><a href="https://www.publishthis.email">publishthis.email</a></strong></p>\n<p>Borra tu p\xE1gina: <a href="{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}">{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}</a></p>\n{{? it.collectionId}}\n<p>Esta p\xE1gina es parte de una colecci\xF3n: <a href="{{=it.pteDomain}}/c/{{=it.collectionId}}">{{=it.pteDomain}}/c/{{=it.collectionId}}</a></p>\n{{?}}\n',
  'en': '\n<!DOCTYPE html><html> <head> <meta name="viewport" content="width=device-width"> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <title>{{=it.subject}}</title> <style type="text/css"> /* ------------------------------------- RESPONSIVE AND MOBILE FRIENDLY STYLES ------------------------------------- */ @media only screen and (max-width: 620px){table[class=body] h1{font-size: 28px !important; margin-bottom: 10px !important;}table[class=body] p, table[class=body] ul, table[class=body] ol, table[class=body] td, table[class=body] span, table[class=body] a{font-size: 16px !important;}table[class=body] .wrapper, table[class=body] .article{padding: 10px !important;}table[class=body] .content{padding: 0 !important;}table[class=body] .container{padding: 0 !important; width: 100% !important;}table[class=body] .main{border-left-width: 0 !important; border-radius: 0 !important; border-right-width: 0 !important;}table[class=body] .btn table{width: 100% !important;}table[class=body] .btn a{width: 100% !important;}table[class=body] .img-responsive{height: auto !important; max-width: 100% !important; width: auto !important;}}/* ------------------------------------- PRESERVE THESE STYLES IN THE HEAD ------------------------------------- */ @media all{.ExternalClass{width: 100%;}.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div{line-height: 100%;}.apple-link a{color: inherit !important; font-family: inherit !important; font-size: inherit !important; font-weight: inherit !important; line-height: inherit !important; text-decoration: none !important;}.btn-primary table td:hover{background-color: #34495e !important;}.btn-primary a:hover{background-color: #34495e !important; border-color: #34495e !important;}}</style> </head> <body class="" style="background-color:#f6f6f6;font-family:sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;line-height:1.4;margin:0;padding:0;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;"> <table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#f6f6f6;width:100%;"> <tr> <td style="font-family:sans-serif;font-size:14px;vertical-align:top;">&nbsp;</td><td class="container" style="font-family:sans-serif;font-size:14px;vertical-align:top;display:block;max-width:580px;padding:10px;width:580px;Margin:0 auto !important;"> <div class="content" style="box-sizing:border-box;display:block;Margin:0 auto;max-width:580px;padding:10px;"> <span class="preheader" style="color:transparent;display:none;height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;visibility:hidden;width:0;">Success! Your page has been published.</span> <table class="main" style="border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;background:#fff;border-radius:3px;width:100%;"> <tr> <td class="wrapper" style="font-family:sans-serif;font-size:14px;vertical-align:top;box-sizing:border-box;padding:20px;"> <table border="0" cellpadding="0" cellspacing="0" style="border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;"> <tr> <td style="font-family:sans-serif;font-size:14px;vertical-align:top;"> <p style="font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;">Good news!</p><p style="font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;">We\u2019ve received your email <strong>{{=it.subject}}</strong>, converted it into a tidy little web page and published it online:</p><p style="font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;"><a href="https://publishth.is/{{=it.messageId}}" style="color:#FF5468;text-decoration:underline;">https://publishth.is/{{=it.messageId}}</a></p>{{? it.slug}}<p style="font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;"><a href="{{=it.pteDomain}}/{{=it.slug}}-{{=it.messageId}}" style="color:#FF5468;text-decoration:underline;">{{=it.pteDomain}}/{{=it.slug}}-{{=it.messageId}}</a></p>{{?}}<p style="font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;">For a brief moment you were the creator of the newest page on the internet. Congratulations.</p><p style="font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;">Sadly, that moment has passed. But you can be the creator of the newest page on the internet at any time. Simply send another email to <a href="mailto:page@publishthis.email" style="color:#FF5468;text-decoration:underline;">page@publishthis.email</a> to publish a page - we\u2019ll reply with a link to your new page in seconds.</p><p style="font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;">Delete your page: <a href="{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}" style="color:#FF5468;text-decoration:underline;">{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}</a></p>{{? it.collectionId}}<p style="font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;">This page is part of your <strong>{{=it.label}}</strong> collection. Any pages you send to <strong>page+{{=it.label}}@publishthis.email</strong> will be added to this collection: <a href="{{=it.pteDomain}}/c/{{=it.collectionId}}" style="color:#FF5468;text-decoration:underline;">{{=it.pteDomain}}/c/{{=it.collectionId}}</a></p>{{?}}<p style="font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;">Thanks,</p><a href="https://www.publishthis.email" style="color:#FF5468;text-decoration:underline;"><img src="http://i.imgur.com/QoCKNTi.png" width="262px" style="border:none;-ms-interpolation-mode:bicubic;max-width:100%;"/></a> </td></tr></table> </td></tr></table> <div class="footer" style="clear:both;padding-top:10px;text-align:center;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" style="border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;"> <tr> <td class="content-block" style="font-family:sans-serif;font-size:14px;vertical-align:top;color:#999999;font-size:12px;text-align:center;"> <span class="apple-link" style="color:#999999;font-size:12px;text-align:center;">Publish This Email Pty Ltd, 6/63 Elizabeth St, Richmond, VIC 3121, Australia</span> <br>Don\'t like these emails? <a href="http://i.imgur.com/CScmqnj.gif" style="color:#FF5468;text-decoration:underline;color:#999999;font-size:12px;text-align:center;">Unsubscribe</a>. </td></tr><!-- <tr> <td class="content-block powered-by"> Powered by <a href="http://htmlemail.io">HTMLemail</a>. </td></tr>--> </table> </div></div></td><td style="font-family:sans-serif;font-size:14px;vertical-align:top;">&nbsp;</td></tr></table> </body></html>\n',
  'ru': '<p>\u041F\u0440\u0438\u0432\u0435\u0442!</p>\n<p>\u041C\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u0438 \u0432\u0430\u0448\u0435 \u043F\u0438\u0441\u044C\u043C\u043E <strong>{{=it.subject}}</strong>, \u043F\u0440\u0435\u0432\u0440\u0430\u0442\u0438\u043B\u0438 \u0435\u0433\u043E \u0432 \u0432\u0435\u0431-\u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0438 \u043E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043B\u0438 \u0435\u0433\u043E \u043F\u043E \u044D\u0442\u043E\u0439 \u0441\u0441\u044B\u043B\u043A\u0435:</p>\n<p><a href="https://publishth.is/{{=it.messageId}}">https://publishth.is/{{=it.messageId}}</a></p>\n{{? it.slug}}<p><a href="{{=it.pteDomain}}/{{=it.slug}}-{{=it.messageId}}">{{=it.pteDomain}}/{{=it.slug}}-{{=it.messageId}}</a></p>{{?}}\n<p><strong>\u0421\u043F\u0430\u0441\u0438\u0431\u043E \u0437\u0430 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 <a href="https://www.publishthis.email">publishthis.email</a></strong></p>\n<p>\u0427\u0442\u043E\u0431\u044B \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0432\u0430\u0448\u0443 \u0432\u0435\u0431-\u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443, \u043F\u0435\u0440\u0435\u0439\u0434\u0438\u0442\u0435 \u043F\u043E \u0441\u0441\u044B\u043B\u043A\u0435: <a href="{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}">{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}</a></p>\n{{? it.collectionId}}\n<p>\u042D\u0442\u0430 \u0432\u0435\u0431-\u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0447\u0430\u0441\u0442\u044C\u044E \u043A\u043E\u043B\u043B\u0435\u043A\u0446\u0438\u0438: <a href="{{=it.pteDomain}}/c/{{=it.collectionId}}">{{=it.pteDomain}}/c/{{=it.collectionId}}</a></p>\n{{?}}\n',
  'zh': '<p>\u60A8\u597D\uFF0C</p>\n<p>\u6211\u4EEC\u5DF2\u6536\u5230\u60A8\u7684\u7535\u5B50\u90AE\u4EF6 <strong>{{=it.subject}}</strong>, \u5C06\u5176\u8F6C\u6362\u4E3A\u7F51\u9875\uFF0C\u5E76\u5728\u7EBF\u53D1\u5E03\uFF1A</p>\n<p><a href="https://publishth.is/{{=it.messageId}}">https://publishth.is/{{=it.messageId}}</a></p>\n{{? it.slug}}<p><a href="{{=it.pteDomain}}/{{=it.slug}}-{{=it.messageId}}">{{=it.pteDomain}}/{{=it.slug}}-{{=it.messageId}}</a></p>{{?}}\n<p><strong><a href="https://www.publishthis.email">publishthis.email</a></strong>\u611F\u8C22\u60A8</p>\n<p>\u5220\u9664\u60A8\u7684\u9875\u9762\uFF1A <a href="{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}">{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}</a></p>\n{{? it.collectionId}}\n<p>\u6B64\u9875\u9762\u662F\u6C47\u96C6\u7684\u4E00\u90E8\u5206\uFF1A <a href="{{=it.pteDomain}}/c/{{=it.collectionId}}">{{=it.pteDomain}}/c/{{=it.collectionId}}</a></p>\n{{?}}\n',
  'zh-t': '<p>\u60A8\u597D\uFF0C</p>\n<p>\u6211\u5011\u5DF2\u6536\u5230\u60A8\u7684\u96FB\u5B50\u90F5\u4EF6l <strong>{{=it.subject}}</strong>\uFF0C\u5C07\u5176\u8F49\u63DB\u70BA\u7DB2\u9801\uFF0C\u4E26\u5728\u7DDA\u767C\u5E03\uFF1A</p>\n<p><a href="https://publishth.is/{{=it.messageId}}">https://publishth.is/{{=it.messageId}}</a></p>\n{{? it.slug}}<p><a href="{{=it.pteDomain}}/{{=it.slug}}-{{=it.messageId}}">{{=it.pteDomain}}/{{=it.slug}}-{{=it.messageId}}</a></p>{{?}}\n<p><strong><a href="https://www.publishthis.email">publishthis.email</a></strong>\u611F\u8B1D\u60A8</p>\n<p>\u522A\u9664\u60A8\u7684\u9801\u9762\uFF1A<a href="{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}">{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}</a></p>\n{{? it.collectionId}}\n<p>\u6B64\u9801\u9762\u662F\u532F\u96C6\u7684\u4E00\u90E8\u5206\uFF1A<a href="{{=it.pteDomain}}/c/{{=it.collectionId}}">{{=it.pteDomain}}/c/{{=it.collectionId}}</a></p>\n{{?}}\n'
};

exports.replyEmails = replyEmails;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addBulkSubscribers = exports.getList = exports.sendNewSubscriberNotification = exports.getSubscriberFromSubscriberId = exports.getListFromSubscriber = exports.markPostSent = exports.listSend = exports.getListSubscribers = exports.addListIdToPage = exports.sendListReplyNoSubs = exports.sendNewListReply = exports.sendListReply = exports.sendNewListWelcomeWithPage = exports.sendNewListWelcome = exports.addListToDB = exports.isNewList = exports.unsubscribe = exports.verifySubscriberId = exports.sendSubscriberVerification = exports.isNotSubscribed = exports.addSubscriber = exports.slugify = exports.acceptLanguages = exports.useLanguage = exports.clearCache = exports.collectionsProcess = exports.getCollection = exports.addTimeSince = exports.preRender = exports.deleteCollectionItemFromDynamo = exports.deleteEmailFromDynamo = exports.getStoredEmail = exports.storeInDynamo = exports.sendListPreview = exports.sendReply = exports.processListEmail = exports.processEmail = exports.getRawEmail = undefined;

var _get_raw_email = __webpack_require__(24);

var _process_email = __webpack_require__(34);

var _send_reply = __webpack_require__(35);

var _list_preview = __webpack_require__(28);

var _store_in_dynamo = __webpack_require__(36);

var _get_stored_email = __webpack_require__(25);

var _get_collection = __webpack_require__(21);

var _delete_from_dynamo = __webpack_require__(20);

var _collections_process = __webpack_require__(19);

var _clear_cache = __webpack_require__(18);

var _localise = __webpack_require__(8);

var _titleToSlug = __webpack_require__(9);

var _list_subscribe = __webpack_require__(31);

var _list_verify = __webpack_require__(33);

var _list_unsubscribe = __webpack_require__(32);

var _list_create = __webpack_require__(27);

var _list_reply = __webpack_require__(29);

var _add_listid_to_page = __webpack_require__(17);

var _get_list_subscribers = __webpack_require__(23);

var _list_send = __webpack_require__(30);

var _get_list = __webpack_require__(22);

var _list_bulk_subscribe = __webpack_require__(26);

exports.getRawEmail = _get_raw_email.getRawEmail;
exports.processEmail = _process_email.processEmail;
exports.processListEmail = _process_email.processListEmail;
exports.sendReply = _send_reply.sendReply;
exports.sendListPreview = _list_preview.sendListPreview;
exports.storeInDynamo = _store_in_dynamo.storeInDynamo;
exports.getStoredEmail = _get_stored_email.getStoredEmail;
exports.deleteEmailFromDynamo = _delete_from_dynamo.deleteEmailFromDynamo;
exports.deleteCollectionItemFromDynamo = _delete_from_dynamo.deleteCollectionItemFromDynamo;
exports.preRender = _process_email.preRender;
exports.addTimeSince = _process_email.addTimeSince;
exports.getCollection = _get_collection.getCollection;
exports.collectionsProcess = _collections_process.collectionsProcess;
exports.clearCache = _clear_cache.clearCache;
exports.useLanguage = _localise.useLanguage;
exports.acceptLanguages = _localise.acceptLanguages;
exports.slugify = _titleToSlug.slugify;
exports.addSubscriber = _list_subscribe.addSubscriber;
exports.isNotSubscribed = _list_subscribe.isNotSubscribed;
exports.sendSubscriberVerification = _list_subscribe.sendSubscriberVerification;
exports.verifySubscriberId = _list_verify.verifySubscriberId;
exports.unsubscribe = _list_unsubscribe.unsubscribe;
exports.isNewList = _list_create.isNewList;
exports.addListToDB = _list_create.addListToDB;
exports.sendNewListWelcome = _list_create.sendNewListWelcome;
exports.sendNewListWelcomeWithPage = _list_create.sendNewListWelcomeWithPage;
exports.sendListReply = _list_reply.sendListReply;
exports.sendNewListReply = _list_reply.sendNewListReply;
exports.sendListReplyNoSubs = _list_reply.sendListReplyNoSubs;
exports.addListIdToPage = _add_listid_to_page.addListIdToPage;
exports.getListSubscribers = _get_list_subscribers.getListSubscribers;
exports.listSend = _list_send.listSend;
exports.markPostSent = _list_send.markPostSent;
exports.getListFromSubscriber = _list_verify.getListFromSubscriber;
exports.getSubscriberFromSubscriberId = _list_verify.getSubscriberFromSubscriberId;
exports.sendNewSubscriberNotification = _list_verify.sendNewSubscriberNotification;
exports.getList = _get_list.getList;
exports.addBulkSubscribers = _list_bulk_subscribe.addBulkSubscribers;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("express-dot-engine");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("request");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("serve-favicon");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addListIdToPage = undefined;

var _dynamo = __webpack_require__(1);

var _dynamo2 = _interopRequireDefault(_dynamo);

var _shortid = __webpack_require__(4);

var _shortid2 = _interopRequireDefault(_shortid);

var _environment = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addListIdToPage = function addListIdToPage(mailObj) {
  console.log('breaking here?:');
  console.log(mailObj);
  // generate sendKey
  mailObj.sendKey = _shortid2.default.generate() + _shortid2.default.generate();

  var params = {
    TableName: _environment.config.EMAIL_TABLE,
    Key: {
      "messageId": mailObj.messageId
    },
    UpdateExpression: "set listId = :lid, sendKey = :sk",
    ExpressionAttributeValues: {
      ":lid": mailObj.list.listId,
      ":sk": mailObj.sendKey
    },
    ReturnValues: "UPDATED_NEW"
  };
  return _dynamo2.default.updateResource(params).then(function () {
    return mailObj;
  });
};
exports.addListIdToPage = addListIdToPage;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearCache = undefined;

var _cloudflare = __webpack_require__(49);

var _cloudflare2 = _interopRequireDefault(_cloudflare);

var _environment = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cache = new _cloudflare2.default({
  email: _environment.config.CF_EMAIL,
  key: _environment.config.CF_KEY
});

var clearCache = function clearCache(cacheParams) {
  cache.deleteCache(_environment.config.CF_ZONEID, cacheParams).then(function (confirm) {
    console.log('CACHE CLEARED:', confirm);
  }).catch(function (e) {
    console.log(e);
  });
};

exports.clearCache = clearCache;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collectionsProcess = undefined;

var _dynamo = __webpack_require__(1);

var _dynamo2 = _interopRequireDefault(_dynamo);

var _shortid = __webpack_require__(4);

var _shortid2 = _interopRequireDefault(_shortid);

var _environment = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// find a collection from an email or create one if one doesn't exist
var getCollection = function getCollection(emailObj) {
  var item = {
    email: emailObj.from[0].address,
    collectionName: emailObj.label
  };

  return _dynamo2.default.getResource({
    TableName: _environment.config.COLLECTION_TABLE,
    Key: item
  }).then(function (_ref) {
    var collectionId = _ref.collectionId;

    emailObj.collectionId = collectionId;
    return emailObj;
  }).catch(function (err) {
    // assume error means the collection doesn't exist, and create one
    // use "~" instead of "-" for shortid (we use "-" as a delimiter for collection names)
    _shortid2.default.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~_');
    emailObj.collectionId = item.collectionId = _shortid2.default.generate();
    return _dynamo2.default.putResource({
      TableName: _environment.config.COLLECTION_TABLE,
      Item: item,
      // only need to check email here as dynamo will treat the key as a compound
      ConditionExpression: 'attribute_not_exists(email)'
    }).then(function () {
      return emailObj;
    });
  });
};

// save an email to a collection
// (expects the email to have the collection id as a key)
/**
 * Check for collection requirements in email, and do appropraite work
 */
var saveToCollection = function saveToCollection(_ref2) {
  var collectionId = _ref2.collectionId,
      messageId = _ref2.messageId,
      subject = _ref2.subject,
      timeAdded = _ref2.timeAdded;

  var Item = {
    collectionId: collectionId,
    messageId: messageId,
    subject: subject,
    timeAdded: timeAdded
  };

  return _dynamo2.default.putResource({
    Item: Item,
    TableName: _environment.config.COLLECTION_ITEM_TABLE
  });
};

// if a label exists add to the right collection (create if necessary)
// and in either case return the original email object
var collectionsProcess = function collectionsProcess(emailObj) {
  return emailObj.label ? getCollection(emailObj).then(saveToCollection).then(function () {
    return emailObj;
  }) : Promise.resolve(emailObj);
};

exports.collectionsProcess = collectionsProcess;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteCollectionItemFromDynamo = exports.deleteEmailFromDynamo = undefined;

var _dynamo = __webpack_require__(1);

var _dynamo2 = _interopRequireDefault(_dynamo);

var _environment = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var deleteEmailFromDynamo = function deleteEmailFromDynamo(deleteParams) {
  return _dynamo2.default.deleteResource({
    TableName: _environment.config.EMAIL_TABLE,
    Key: {
      messageId: deleteParams.messageId
    }
  }).then(function () {
    return deleteParams;
  });
};

var deleteCollectionItemFromDynamo = function deleteCollectionItemFromDynamo(deleteParams) {
  return _dynamo2.default.deleteResource({
    TableName: _environment.config.COLLECTION_ITEM_TABLE,
    Key: {
      collectionId: deleteParams.collectionId,
      timeAdded: deleteParams.timeAdded
    },
    ConditionExpression: 'messageId = :mid',
    ExpressionAttributeValues: {
      ':mid': deleteParams.messageId
    }
  }).then(function () {
    return deleteParams;
  });
};
//


exports.deleteEmailFromDynamo = deleteEmailFromDynamo;
exports.deleteCollectionItemFromDynamo = deleteCollectionItemFromDynamo;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCollection = undefined;

var _dynamo = __webpack_require__(1);

var _dynamo2 = _interopRequireDefault(_dynamo);

var _environment = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getCollection = function getCollection(collectionParams) {
  var limit = 10;
  var dynamoQuery = {
    TableName: _environment.config.COLLECTION_ITEM_TABLE,
    KeyConditionExpression: '#collectionId = :id',
    ExpressionAttributeNames: {
      '#collectionId': 'collectionId'
    },
    ExpressionAttributeValues: {
      ':id': collectionParams.id
    },
    ScanIndexForward: false,
    Limit: limit

    // paging
  };if (collectionParams.ExclusiveStartKey) {
    dynamoQuery.ExclusiveStartKey = collectionParams.ExclusiveStartKey;
  }

  return _dynamo2.default.query(dynamoQuery).then(function (collection) {
    collection.collectionId = collectionParams.id;
    collection.title = collectionParams.title;
    return collection;
  });
};

exports.getCollection = getCollection;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getList = undefined;

var _dynamo = __webpack_require__(1);

var _dynamo2 = _interopRequireDefault(_dynamo);

var _environment = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getList = function getList(listId) {
  return _dynamo2.default.getResource({
    TableName: _environment.config.LISTS_TABLE,
    Key: { listId: listId }
  });
};

exports.getList = getList;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getListSubscribers = undefined;

var _dynamo = __webpack_require__(1);

var _dynamo2 = _interopRequireDefault(_dynamo);

var _environment = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getListSubscribers = function getListSubscribers(mailPackage) {
  var limit = 250;
  var dynamoQuery = {
    TableName: _environment.config.LIST_SUBSCRIBERS_TABLE,
    IndexName: 'listId-index',
    KeyConditionExpression: 'listId = :id',
    FilterExpression: 'verified = :v',
    ExpressionAttributeValues: {
      ':id': mailPackage.list.listId,
      ':v': true
    },
    Limit: limit
  };

  return _dynamo2.default.query(dynamoQuery).then(function (result) {
    mailPackage.subscribers = result.Items;
    return mailPackage;
  });
};

exports.getListSubscribers = getListSubscribers;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRawEmail = undefined;

var _s = __webpack_require__(37);

var _s2 = _interopRequireDefault(_s);

var _environment = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getRawEmail = function getRawEmail(id, bucket) {
  return _s2.default.get(id, bucket);
};

exports.getRawEmail = getRawEmail;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStoredEmail = undefined;

var _dynamo = __webpack_require__(1);

var _dynamo2 = _interopRequireDefault(_dynamo);

var _environment = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getStoredEmail = function getStoredEmail(id) {
  return _dynamo2.default.getResource({
    TableName: _environment.config.EMAIL_TABLE,
    Key: { messageId: id }
  });
};

exports.getStoredEmail = getStoredEmail;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addBulkSubscribers = undefined;

var _dynamo = __webpack_require__(1);

var _dynamo2 = _interopRequireDefault(_dynamo);

var _shortid = __webpack_require__(4);

var _shortid2 = _interopRequireDefault(_shortid);

var _environment = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { tplSubscribeVerify } from '/templates/emails'

// import SES from '/aws/ses'
// import doT from 'dot'
var addBulkSubscribers = function addBulkSubscribers(list, newSubscribers) {

  console.log(list);
  // map items
  var items = newSubscribers.map(function (subscriber) {
    var item = {
      subscriberId: _shortid2.default.generate(),
      editKey: _shortid2.default.generate() + _shortid2.default.generate(),
      listId: list.listId,
      subscriberEmail: subscriber,
      verified: true
    };
    return item;
  });

  // map requests for adding items
  var requests = items.map(function (item) {
    var request = {
      PutRequest: {
        Item: item
      }
    };
    return request;
  });

  // build params for dynamodb batch add
  var params = { RequestItems: {} };
  params.RequestItems[_environment.config.LIST_SUBSCRIBERS_TABLE] = requests;

  return _dynamo2.default.batchWriteItem(params); //.then(() => subscriber)
};

exports.addBulkSubscribers = addBulkSubscribers;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addListToDB = exports.isNewList = undefined;

var _dynamo = __webpack_require__(1);

var _dynamo2 = _interopRequireDefault(_dynamo);

var _ses = __webpack_require__(2);

var _ses2 = _interopRequireDefault(_ses);

var _dot = __webpack_require__(3);

var _dot2 = _interopRequireDefault(_dot);

var _shortid = __webpack_require__(4);

var _shortid2 = _interopRequireDefault(_shortid);

var _environment = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Checks if a list exists in the DB, if not, builds and returns new list.
var isNewList = function isNewList(mailObj) {
  var query = {
    TableName: _environment.config.LISTS_TABLE,
    IndexName: 'ownerEmail-collectionName-index',
    KeyConditionExpression: "ownerEmail = :ownerEmail and collectionName = :collectionName",
    // FilterExpression: "collectionName = :collectionName",
    ExpressionAttributeValues: {
      ":ownerEmail": mailObj.list.ownerEmail,
      ":collectionName": mailObj.list.collectionName
    },
    Limit: 1 };

  return _dynamo2.default.query(query).then(function (result) {
    if (result.Count == 0) {
      // build new list
      mailObj.list.listId = _shortid2.default.generate();
      mailObj.list.editKey = _shortid2.default.generate() + _shortid2.default.generate();
      mailObj.list.count_subscribers = 0;
      mailObj.list.count_unsubscribers = 0;
      mailObj.list.title = mailObj.subject;
      mailObj.newList = true;
    } else {
      mailObj.newList = false;
      // if list exists, return return an error and the list
      mailObj.list = result.Items[0];
    }
    return mailObj;
  });
};

var addListToDB = function addListToDB(mailObj) {
  if (mailObj.newList) {
    return _dynamo2.default.putResource({
      TableName: _environment.config.LISTS_TABLE,
      Item: mailObj.list
    }).then(function () {
      return mailObj;
    });
  } else {
    return mailObj;
  }
};

exports.isNewList = isNewList;
exports.addListToDB = addListToDB;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendListPreview = undefined;

var _ses = __webpack_require__(2);

var _ses2 = _interopRequireDefault(_ses);

var _dot = __webpack_require__(3);

var _dot2 = _interopRequireDefault(_dot);

var _emailReply = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sendListPreview = function sendListPreview(mailObj) {

  mailObj.pteDomain = 'https://www.publishthis.email';

  // set reply template for the appropriate language
  var replyTemplate = _dot2.default.template(_emailReply.replyEmails[mailObj.language]);
  var emailBody = replyTemplate(mailObj);

  var params = {
    Destination: {
      ToAddresses: [mailObj.from[0].address],
      BccAddresses: ['publishthisemail@gmail.com']
    },
    Message: {
      Subject: {
        Data: mailObj.subject + ' - publishthis.email',
        Charset: 'UTF-8'
      },
      Body: {
        Html: {
          Data: emailBody,
          Charset: 'UTF-8'
        }
      }
    },
    Source: '"Publish This Email" <noreply@publishthis.email>',
    ReplyToAddresses: ['"Publish This Email" <hello@publishthis.email>'],
    ReturnPath: 'return@publishthis.email'
  };

  return _ses2.default.sendEmail(params);
};

exports.sendListPreview = sendListPreview;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendListReplyNoSubs = exports.sendListReply = exports.sendNewListReply = undefined;

var _dynamo = __webpack_require__(1);

var _dynamo2 = _interopRequireDefault(_dynamo);

var _ses = __webpack_require__(2);

var _ses2 = _interopRequireDefault(_ses);

var _dot = __webpack_require__(3);

var _dot2 = _interopRequireDefault(_dot);

var _shortid = __webpack_require__(4);

var _shortid2 = _interopRequireDefault(_shortid);

var _environment = __webpack_require__(0);

var _emails = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// send welcome email to new lists created with a page
var sendNewListReply = function sendNewListReply(mailObj) {
  // if existing or new list
  if (!mailObj.newList) {
    return mailObj;
  } else {
    // new list
    var template = _dot2.default.template(_emails.tplListNew);
    var emailBody = template(mailObj);

    var params = {
      Destination: {
        ToAddresses: [mailObj.list.ownerEmail],
        BccAddresses: ['publishthisemail@gmail.com']
      },
      Message: {
        Subject: {
          Data: 'Your new list: ' + mailObj.subject,
          Charset: 'UTF-8'
        },
        Body: {
          Html: {
            Data: emailBody,
            Charset: 'UTF-8'
          }
        }
      },
      Source: '"Publish This Email" <noreply@publishthis.email>',
      ReplyToAddresses: ['"Publish This Email" <hello@publishthis.email>'],
      ReturnPath: 'return@publishthis.email'
    };

    return _ses2.default.sendEmail(params).then(function () {
      return mailObj;
    });
  }
};

// Reply when a user distributed a page
var sendListReply = function sendListReply(mailObj) {
  var template = _dot2.default.template(_emails.tplListSendComplete);
  var emailBody = template(mailObj);

  var params = {
    Destination: {
      ToAddresses: [mailObj.list.ownerEmail],
      BccAddresses: ['publishthisemail@gmail.com']
    },
    Message: {
      Subject: {
        Data: 'Delivered: ' + mailObj.subject,
        Charset: 'UTF-8'
      },
      Body: {
        Html: {
          Data: emailBody,
          Charset: 'UTF-8'
        }
      }
    },
    Source: '"Publish This Email" <noreply@publishthis.email>',
    ReplyToAddresses: ['"Publish This Email" <hello@publishthis.email>'],
    ReturnPath: 'return@publishthis.email'
  };

  return _ses2.default.sendEmail(params).then(function () {
    return mailObj;
  });
};

var sendListReplyNoSubs = function sendListReplyNoSubs(mailObj) {
  var template = _dot2.default.template(_emails.tplListSendNoSubs);
  var emailBody = template(mailObj);

  var params = {
    Destination: {
      ToAddresses: [mailObj.list.ownerEmail],
      BccAddresses: ['publishthisemail@gmail.com']
    },
    Message: {
      Subject: {
        Data: 'Send failed: No subscribers :(',
        Charset: 'UTF-8'
      },
      Body: {
        Html: {
          Data: emailBody,
          Charset: 'UTF-8'
        }
      }
    },
    Source: '"Publish This Email" <noreply@publishthis.email>',
    ReplyToAddresses: ['"Publish This Email" <hello@publishthis.email>'],
    ReturnPath: 'return@publishthis.email'
  };

  return _ses2.default.sendEmail(params).then(function () {
    return mailObj;
  });
};

exports.sendNewListReply = sendNewListReply;
exports.sendListReply = sendListReply;
exports.sendListReplyNoSubs = sendListReplyNoSubs;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.markPostSent = exports.listSend = undefined;

var _ses = __webpack_require__(2);

var _ses2 = _interopRequireDefault(_ses);

var _dynamo = __webpack_require__(1);

var _dynamo2 = _interopRequireDefault(_dynamo);

var _dot = __webpack_require__(3);

var _dot2 = _interopRequireDefault(_dot);

var _environment = __webpack_require__(0);

var _emails = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var listSend = function listSend(mailPackage) {

  if (mailPackage.subscribers && mailPackage.subscribers.length) {
    var template = _dot2.default.template(_emails.tplDelivery);

    // Build email for each subscriber, prepare to send.
    var distribution = mailPackage.subscribers.map(function (subscriber) {
      mailPackage.subscriber = subscriber;
      var emailBody = template(mailPackage);
      var params = {
        Destination: {
          ToAddresses: [subscriber.subscriberEmail],
          BccAddresses: ['publishthisemail@gmail.com']
        },
        Message: {
          Subject: {
            Data: mailPackage.subject,
            Charset: 'UTF-8'
          },
          Body: {
            Html: { Data: emailBody, Charset: 'UTF-8' }
          }
        },
        Source: '"' + mailPackage.list.title + '" <noreply@publishthis.email>',
        ReplyToAddresses: ['"' + mailPackage.list.title + '" <' + mailPackage.from[0].address + '>'],
        ReturnPath: 'return@publishthis.email'
      };
      return _ses2.default.sendEmail(params);
    });

    return Promise.all(distribution.map(function (p) {
      return p.catch(function (e) {
        return e;
      });
    })).then(function (results) {
      mailPackage.results = results;
      return mailPackage;
    });
  } else {
    return Promise.reject({ e: new Error('No subscribers'), msg: 'This list has no subscribers' });
  }
};

var markPostSent = function markPostSent(mailPackage) {
  var params = {
    TableName: _environment.config.EMAIL_TABLE,
    Key: {
      "messageId": mailPackage.messageId
    },
    UpdateExpression: "set delivered = :d",
    ExpressionAttributeValues: {
      ":d": true
    },
    ReturnValues: "UPDATED_NEW"
  };
  return _dynamo2.default.updateResource(params).then(function () {
    return mailPackage;
  });
};

exports.listSend = listSend;
exports.markPostSent = markPostSent;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendSubscriberVerification = exports.addSubscriber = exports.isNotSubscribed = undefined;

var _dynamo = __webpack_require__(1);

var _dynamo2 = _interopRequireDefault(_dynamo);

var _ses = __webpack_require__(2);

var _ses2 = _interopRequireDefault(_ses);

var _dot = __webpack_require__(3);

var _dot2 = _interopRequireDefault(_dot);

var _shortid = __webpack_require__(4);

var _shortid2 = _interopRequireDefault(_shortid);

var _environment = __webpack_require__(0);

var _emails = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sendSubscriberVerification = function sendSubscriberVerification(subscriber) {
  var template = _dot2.default.template(_emails.tplSubscribeVerify);
  var emailBody = template(subscriber);

  var params = {
    Destination: {
      ToAddresses: [subscriber.subscriberEmail],
      BccAddresses: ['publishthisemail@gmail.com']
    },
    Message: {
      Subject: {
        Data: 'Verify your email address - publishthis.email',
        Charset: 'UTF-8'
      },
      Body: {
        Html: {
          Data: emailBody,
          Charset: 'UTF-8'
        }
      }
    },
    Source: '"Publish This Email" <noreply@publishthis.email>',
    ReplyToAddresses: ['"Publish This Email" <hello@publishthis.email>'],
    ReturnPath: 'return@publishthis.email'
  };

  return _ses2.default.sendEmail(params);
};

var isNotSubscribed = function isNotSubscribed(subscriber) {
  var query = {
    TableName: _environment.config.LIST_SUBSCRIBERS_TABLE,
    IndexName: 'subscriberEmail-listId-index',
    KeyConditionExpression: 'subscriberEmail = :subscriberEmail and listId = :listId',
    ExpressionAttributeValues: {
      ":subscriberEmail": subscriber.subscriberEmail,
      ":listId": subscriber.listId
    },
    Limit: 1
  };
  return _dynamo2.default.query(query).then(function (result) {
    if (result.Count == 0) {
      // build new subscriber
      subscriber.verified = false;
      subscriber.subscriberId = _shortid2.default.generate();
      subscriber.editKey = _shortid2.default.generate() + _shortid2.default.generate();
      return subscriber;
    } else {
      return Promise.reject(new Error('(isNotSubscribed): User already subscribed'));
    }
  });
};

var addSubscriber = function addSubscriber(subscriber) {
  return _dynamo2.default.putResource({
    TableName: _environment.config.LIST_SUBSCRIBERS_TABLE,
    Item: subscriber
  }).then(function () {
    return subscriber;
  });
};

exports.isNotSubscribed = isNotSubscribed;
exports.addSubscriber = addSubscriber;
exports.sendSubscriberVerification = sendSubscriberVerification;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unsubscribe = undefined;

var _dynamo = __webpack_require__(1);

var _dynamo2 = _interopRequireDefault(_dynamo);

var _environment = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var unsubscribe = function unsubscribe(subscriberId) {
  return _dynamo2.default.deleteResource({
    TableName: _environment.config.LIST_SUBSCRIBERS_TABLE,
    Key: {
      subscriberId: subscriberId
    }
  });
};

exports.unsubscribe = unsubscribe;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendNewSubscriberNotification = exports.getListFromSubscriber = exports.getSubscriberFromSubscriberId = exports.verifySubscriberId = undefined;

var _dynamo = __webpack_require__(1);

var _dynamo2 = _interopRequireDefault(_dynamo);

var _ses = __webpack_require__(2);

var _ses2 = _interopRequireDefault(_ses);

var _environment = __webpack_require__(0);

var _dot = __webpack_require__(3);

var _dot2 = _interopRequireDefault(_dot);

var _emails = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var verifySubscriberId = function verifySubscriberId(subscriberId) {
  var params = {
    TableName: _environment.config.LIST_SUBSCRIBERS_TABLE,
    Key: {
      "subscriberId": subscriberId
    },
    UpdateExpression: "set verified = :v",
    ExpressionAttributeValues: {
      ":v": true
    },
    ReturnValues: "UPDATED_NEW"
  };
  return _dynamo2.default.updateResource(params);
};

var getSubscriberFromSubscriberId = function getSubscriberFromSubscriberId(subscriberId) {
  var params = {
    TableName: _environment.config.LIST_SUBSCRIBERS_TABLE,
    Key: { subscriberId: subscriberId }
  };
  return _dynamo2.default.getResource(params);
};

var getListFromSubscriber = function getListFromSubscriber(subscriber) {
  var params = {
    TableName: _environment.config.LISTS_TABLE,
    Key: { listId: subscriber.listId }
  };
  return _dynamo2.default.getResource(params).then(function (list) {
    list.subscriber = subscriber;
    return list;
  });
};

var sendNewSubscriberNotification = function sendNewSubscriberNotification(list) {
  var replyTemplate = _dot2.default.template(_emails.tplListSubscriberNew);
  var emailBody = replyTemplate(list);

  var params = {
    Destination: {
      ToAddresses: [list.ownerEmail],
      BccAddresses: ['publishthisemail@gmail.com']
    },
    Message: {
      Subject: {
        Data: 'New subscriber: ' + list.title,
        Charset: 'UTF-8'
      },
      Body: {
        Html: {
          Data: emailBody,
          Charset: 'UTF-8'
        }
      }
    },
    Source: '"Publish This Email" <noreply@publishthis.email>',
    ReplyToAddresses: ['"Publish This Email" <hello@publishthis.email>'],
    ReturnPath: 'return@publishthis.email'
  };

  return _ses2.default.sendEmail(params);
};

exports.verifySubscriberId = verifySubscriberId;
exports.getSubscriberFromSubscriberId = getSubscriberFromSubscriberId;
exports.getListFromSubscriber = getListFromSubscriber;
exports.sendNewSubscriberNotification = sendNewSubscriberNotification;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addTimeSince = exports.preRender = exports.processListEmail = exports.processEmail = undefined;

var _mailparser = __webpack_require__(52);

var _mailparser2 = _interopRequireDefault(_mailparser);

var _sanitizeHtml = __webpack_require__(7);

var _sanitizeHtml2 = _interopRequireDefault(_sanitizeHtml);

var _shortid = __webpack_require__(4);

var _shortid2 = _interopRequireDefault(_shortid);

var _imgur = __webpack_require__(39);

var _imgur2 = _interopRequireDefault(_imgur);

var _cheerio = __webpack_require__(48);

var _cheerio2 = _interopRequireDefault(_cheerio);

var _localise = __webpack_require__(8);

var _titleToSlug = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sanitizeOptions = {
  // allowedTags: [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
  // 'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
  // 'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'img' ],
  allowedTags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol', 'nl', 'li', 'b', 'i', 'u', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div', 'thead', 'caption', 'img', 'dir', 'marquee', 'font', 'table', 'tbody', 'tr', 'td', 'th', 'col', 'colgroup'],
  allowedAttributes: {
    table: ['cellspacing', 'cellpadding', 'border', 'width', 'height', 'dir', 'align', 'size', 'color', 'face'],
    tbody: ['cellspacing', 'cellpadding', 'border', 'width', 'height', 'dir', 'align', 'size', 'color', 'face'],
    tr: ['cellspacing', 'cellpadding', 'border', 'width', 'height', 'dir', 'align', 'size', 'color', 'face'],
    td: ['cellspacing', 'cellpadding', 'border', 'width', 'height', 'dir', 'align', 'size', 'color', 'face'],
    th: ['cellspacing', 'cellpadding', 'border', 'width', 'height', 'dir', 'align', 'size', 'color', 'face'],
    col: ['cellspacing', 'cellpadding', 'border', 'width', 'height', 'dir', 'align', 'size', 'color', 'face'],
    colgroup: ['cellspacing', 'cellpadding', 'border', 'width', 'height', 'dir', 'align', 'size', 'color', 'face'],
    a: ['href', 'name', 'target', 'rel'],
    // We don't currently allow img itself by default, but this
    // would make sense if we did
    img: ['src', 'width'],
    p: ['dir', 'size', 'color', 'face'],
    div: ['dir', 'size', 'color', 'face'],
    font: ['size', 'color', 'face']
  },
  // Lots of these won't come up by default because we don't allow them
  selfClosing: ['img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta'],
  // URL schemes we permit
  allowedSchemes: ['http', 'https', 'ftp', 'mailto'],
  allowedSchemesByTag: {
    img: ['data', 'http', 'https']
  },
  allowProtocolRelative: true,
  transformTags: {
    'a': function a(tagName, attribs) {
      //if youtube
      var newAttribs = attribs;
      newAttribs.rel = 'nofollow';
      newAttribs.target = '_blank';
      var tag = { tagName: tagName, attribs: newAttribs };
      return tag;
    }
  }
};

var parseMail = function parseMail(raw) {
  return new Promise(function (resolve, reject) {
    var mailparser = new _mailparser2.default.MailParser();
    mailparser.on('end', function (mail) {
      return resolve(mail);
    });
    mailparser.on('error', function (err) {
      return reject(err);
    });
    mailparser.write(raw);
    mailparser.end();
  });
};

var uploadImage = function uploadImage(image) {
  var imgBase64 = image.content.toString('base64');
  return _imgur2.default.upload(imgBase64).then(function (response) {
    return {
      contentId: image.contentId,
      imgURL: response.data.link
    };
  });
};

var processImages = function processImages(email) {
  var attachments = email.attachments || [];
  return Promise.all(attachments.filter(function (a) {
    return a.contentType.includes('image');
  }).map(uploadImage)).then(function (images) {
    images.forEach(function (image) {
      var cid = 'cid:' + image.contentId;
      if (email.html.indexOf(cid) >= 0) {
        var match = new RegExp(cid, 'g');
        email.html = email.html.replace(match, image.imgURL);
      } else {
        email.html += '<img src="' + image.imgURL + '"/>';
      }
    });
  }).then(function () {
    return email;
  });
};

var sanitize = function sanitize(email) {
  email.html = (0, _sanitizeHtml2.default)(email.html, sanitizeOptions).replace(/<p> <\/p>/g, '');
  email.subject = (0, _sanitizeHtml2.default)(email.subject, { allowedTags: ['marquee'] });
  return email;
};

// Convert plain text emails to html
// remove line break overkill
// Replace undefined subject/body with empty strings.
var tidyEmail = function tidyEmail(email) {
  // convert plain text emails to basic html
  if (!email.html && email.text) {
    email.html = '<p>' + email.text.replace(/[\n]+/g, '</p><p>') + '</p>';
  }

  // replace undefined subject and body with empty strings
  if (!email.subject) {
    email.subject = ' ';
  }

  return email;
};

// detect email content language and set a language code on the email object
var setLanguage = function setLanguage(email) {
  email.language = (0, _localise.detectLanguage)(email);
  return email;
};

// generate slug
var generateSlug = function generateSlug(email) {
  var slug = (0, _titleToSlug.slugify)(email.subject);
  // console.log(slug)
  email.slug = slug;
  // console.log(email)
  return email;
};

// strip common signatures from email HTML
var stripSignatures = function stripSignatures(email) {
  // text only emails
  if (!email.html && email.text) {
    // default iPhone signature
    email.text.replace(/\n\nSent\sfrom\smy\siPhone/, '');
  } else {
    // load html to cheerio
    var $ = _cheerio2.default.load(email.html);
    // default iPhone signature
    email.text.replace('<br><br>Sent from my iPhone', '');

    // Gmail
    $('.gmail_signature').remove();

    // Gmail backup
    $('[data-smartmail=gmail_signature]').remove();

    email.html = $.html();
  }
  // console.log(email.html)
  return email;
};

// Convert YouTube links into embeds
var filterLinks = function filterLinks(email) {
  // find links
  var links = email.html.match(/<a.+?(<\/a>)/g);
  if (links) {
    links = links.map(function (link) {

      if (link.match(/>(.+?)(?=<\/a>)/) && link.match(/>(.+?)(?=<\/a>)/)[1]) {
        var link_text = link.match(/>(.+?)(?=<\/a>)/)[1];
      } else {
        var link_text = null;
      }

      if (link.match(/href\="(.+?)(?=")/) && link.match(/href\="(.+?)(?=")/)[1]) {
        var link_href = link.match(/href\="(.+?)(?=")/)[1];
      } else {
        var link_href = null;
      }

      var isYouTube = /https?:\/\/(?:www\.)?youtu(?:be)?(\.com|\.be)\/(?:watch\?v=)?[a-zA-Z0-9-_]{11}/.test(link_href);

      // emails may contain links links to YouTube domains that aren't videos?
      if (link_href && link_href.match(/[a-zA-Z0-9-_]{11}/)) {
        var YouTubeID = link_href.match(/[a-zA-Z0-9-_]{11}/)[0];
      } else {
        var YouTubeID = false;
      }

      var processed_link = {
        raw: link,
        text: link_text,
        href: link_href,
        isYouTube: isYouTube,
        YouTubeID: YouTubeID
      };

      return processed_link;
    });

    links.forEach(function (link) {
      // if the link text matches the href
      if (link.isYouTube && link.YouTubeID && link.text == link.href) {
        var embedCode = '<div class="youtube-wrapper"><iframe class="youtube-embed" src="https://www.youtube.com/embed/' + link.YouTubeID + '" frameborder="0" allowfullscreen></iframe></div>';
        email.html = email.html.replace(link.raw, embedCode);
      }
    });
  }

  return email;
};

var buildEmailObj = function buildEmailObj(rawEmail) {
  var messageId = rawEmail.messageId;
  var to = rawEmail.to;
  var from = rawEmail.from;
  var cc = rawEmail.cc;
  var bcc = rawEmail.bcc;
  var subject = rawEmail.subject;
  var html = rawEmail.html;
  var date = rawEmail.date;
  var language = rawEmail.language;
  var slug = rawEmail.slug;
  // join to, cc, bcc
  // match for staging/page/email and label
  var recipients = to;
  if (cc) {
    recipients = recipients.concat(cc);
  }
  if (bcc) {
    recipients = recipients.concat(bcc);
  }
  var labelMatch = recipients.map(function (r) {
    return r.address;
  }).join(',').match(/(staging-list|staging|page|email|list)(?:\+)([\w]+)(?:@publishthis.email)/);

  var output = {
    to: to,
    from: from,
    subject: subject,
    html: html,
    messageId: _shortid2.default.generate(),
    headerMessageId: messageId,
    timeAdded: new Date().getTime(),
    language: language,
    editKey: _shortid2.default.generate() + _shortid2.default.generate(),
    slug: slug
  };
  if (cc) {
    output.cc = cc;
  }
  if (bcc) {
    output.bcc = bcc;
  }
  if (labelMatch) {
    output.label = labelMatch[2];
  }

  return output;
};

var processEmail = function processEmail(rawEmail) {
  return parseMail(rawEmail).then(stripSignatures).then(tidyEmail).then(setLanguage).then(generateSlug).then(processImages).then(sanitize).then(filterLinks).then(buildEmailObj);
};

var processListEmail = function processListEmail(rawEmail) {
  return parseMail(rawEmail).then(stripSignatures).then(tidyEmail).then(setLanguage).then(generateSlug).then(processImages).then(sanitize).then(buildEmailObj);
};

// any modifications before rendering to templates
var preRender = function preRender(mailObj) {
  //check for arabic text
  var arabic = /[\u0600-\u06FF]/.test(mailObj.html);
  arabic ? mailObj.dir = "rtl" : mailObj.dir = "ltr";

  return mailObj;
};

var addTimeSince = function addTimeSince(items) {
  var now = new Date();

  if (items.length) {
    items.forEach(function (item, index, arr) {
      var since = now - arr[index].timeAdded;
      if (since < 1000 * 60 * 60) {
        arr[index].timeSince = 'Just now';
      } // Less than 1 hour
      if (since >= 1000 * 60 * 60 && since < 1000 * 60 * 60 * 2) {
        arr[index].timeSince = '1 hour ago';
      } // 1 hour
      if (since >= 1000 * 60 * 60 * 2 && since < 1000 * 60 * 60 * 24) {
        arr[index].timeSince = Math.round(since / (1000 * 60 * 60)) + ' hours ago';
      } // 2-24 hours
      if (since >= 1000 * 60 * 60 * 24 && since < 1000 * 60 * 60 * 36) {
        arr[index].timeSince = '1 day ago';
      } // 1-7 days
      if (since >= 1000 * 60 * 60 * 36 && since < 1000 * 60 * 60 * 24 * 14) {
        arr[index].timeSince = Math.round(since / (1000 * 60 * 60 * 24)) + ' days ago';
      } // 2-7 days
      if (since >= 1000 * 60 * 60 * 24 * 14 && since < 1000 * 60 * 60 * 24 * 30) {
        arr[index].timeSince = Math.round(since / (1000 * 60 * 60 * 24 * 7)) + ' weeks ago';
      } // 2-4 weeks
      if (since >= 1000 * 60 * 60 * 24 * 30 && since < 1000 * 60 * 60 * 24 * 46) {
        arr[index].timeSince = '1 month ago';
      } // 1 month
      if (since >= 1000 * 60 * 60 * 24 * 46 && since < 1000 * 60 * 60 * 24 * 365) {
        arr[index].timeSince = Math.round(since / (1000 * 60 * 60 * 24 * 30)) + ' months ago';
      } // 2-12 months
      if (since >= 1000 * 60 * 60 * 24 * 365 && since < 1000 * 60 * 60 * 24 * 548) {
        arr[index].timeSince = '1 year ago';
      } // 1 year
      if (since >= 1000 * 60 * 60 * 24 * 548) {
        arr[index].timeSince = Math.round(since / (1000 * 60 * 60 * 24 * 365)) + ' years ago';
      } // 2+ years
    });
  }
  return items;
};

exports.processEmail = processEmail;
exports.processListEmail = processListEmail;
exports.preRender = preRender;
exports.addTimeSince = addTimeSince;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendReply = undefined;

var _ses = __webpack_require__(2);

var _ses2 = _interopRequireDefault(_ses);

var _dot = __webpack_require__(3);

var _dot2 = _interopRequireDefault(_dot);

var _emailReply = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sendReply = function sendReply(mailObj) {

  //join addresses and test for staging
  var addresses = mailObj.to;
  if (mailObj.cc) {
    addresses = addresses.concat(mailObj.cc);
  }
  if (mailObj.bcc) {
    addresses = addresses.concat(mailObj.bcc);
  }
  var emailStr = addresses.map(function (r) {
    return r.address;
  }).join(',');
  var stagingTest = /staging(\+[\w\-]+)?@publishthis\.email/;

  mailObj.pteDomain = stagingTest.test(emailStr) ? 'https://staging.publishthis.email' : 'https://www.publishthis.email';

  // set reply template for the appropriate language
  var replyTemplate = _dot2.default.template(_emailReply.replyEmails[mailObj.language]);
  var emailBody = replyTemplate(mailObj);

  var params = {
    Destination: {
      ToAddresses: [mailObj.from[0].address],
      BccAddresses: ['publishthisemail@gmail.com']
    },
    Message: {
      Subject: {
        Data: mailObj.subject + ' - publishthis.email',
        Charset: 'UTF-8'
      },
      Body: {
        Html: {
          Data: emailBody,
          Charset: 'UTF-8'
        }
      }
    },
    Source: '"Publish This Email" <noreply@publishthis.email>',
    ReplyToAddresses: ['"Publish This Email" <hello@publishthis.email>'],
    ReturnPath: 'return@publishthis.email'
  };

  return _ses2.default.sendEmail(params);
};

exports.sendReply = sendReply;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storeInDynamo = undefined;

var _dynamo = __webpack_require__(1);

var _dynamo2 = _interopRequireDefault(_dynamo);

var _environment = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storeInDynamo = function storeInDynamo(emailObj) {
  return _dynamo2.default.putResource({
    TableName: _environment.config.EMAIL_TABLE,
    Item: emailObj,
    ConditionExpression: 'attribute_not_exists(messageId)'
  }).then(function () {
    return emailObj;
  });
};

exports.storeInDynamo = storeInDynamo;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _aws = __webpack_require__(5);

var _aws2 = _interopRequireDefault(_aws);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S3 = new _aws2.default.S3();

var get = function get(file, bucket) {
  return new Promise(function (resolve, reject) {
    S3.getObject({
      Bucket: bucket,
      Key: file
    }, function (err, obj) {
      return err ? reject(err) : resolve(obj.Body);
    });
  });
};

exports.default = {
  get: get
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _aws = __webpack_require__(5);

var _aws2 = _interopRequireDefault(_aws);

var _environment = __webpack_require__(0);

var _express = __webpack_require__(12);

var _express2 = _interopRequireDefault(_express);

var _request = __webpack_require__(15);

var _request2 = _interopRequireDefault(_request);

var _expressDotEngine = __webpack_require__(13);

var _expressDotEngine2 = _interopRequireDefault(_expressDotEngine);

var _serveFavicon = __webpack_require__(16);

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _sanitizeHtml = __webpack_require__(7);

var _sanitizeHtml2 = _interopRequireDefault(_sanitizeHtml);

var _actions = __webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var path = __webpack_require__(14);

(0, _aws.updateConfig)();

app.engine('dot', _expressDotEngine2.default.__express);
app.set('views', './templates');
app.set('view engine', 'dot');

app.use(_express2.default.static(path.resolve(__dirname, 'public')));
app.use((0, _serveFavicon2.default)(path.join(__dirname, 'public', 'favicon.ico')));

app.get('/', function (req, res) {
  var lang = (0, _actions.useLanguage)(req); // get browser language
  if (lang == 'en') {
    res.render('en' + '/index');
  } else {
    res.redirect(301, '/' + lang + '/'); // redirect to other languages
  }
});

app.get('/en/', function (req, res) {
  res.render('en' + '/index');
});
app.get('/es/', function (req, res) {
  res.render('es' + '/index');
});
app.get('/ru/', function (req, res) {
  res.render('ru' + '/index');
});
app.get('/zh/', function (req, res) {
  res.render('zh' + '/index');
});
app.get('/zh-sg/', function (req, res) {
  res.render('zh-t' + '/index');
});
app.get('/zh-hk/', function (req, res) {
  res.render('zh-t' + '/index');
});
app.get('/zh-tw/', function (req, res) {
  res.render('zh-t' + '/index');
});
app.get('/ar/', function (req, res) {
  res.render('ar' + '/index');
});

app.get('/name-your-list', function (req, res) {
  res.render('name-your-list');
});

app.get('/page-sent', function (req, res) {
  res.render('page-sent');
});

// bulk importer
// Unsubscribe endpoint
app.get('/bulk-import', function (req, res) {
  var lid = req.query.lid || '';
  var ek = req.query.ek || '';

  var context = {
    API_URL: _environment.config.API_URL,
    lid: lid,
    ek: ek
  };
  res.render('bulk-import', context);
});

// Verify endpoint for double opt-in, passes subscriberId to Lambda endpoint and returns success page or 404
app.get('/verify', function (req, res) {
  if (req.query.sid) {
    var subscriberId = req.query.sid;
    var url = _environment.config.API_URL + 'list/verify?subscriberId=' + subscriberId;
    (0, _request2.default)(url, function (error, response, body) {
      res.render('email-verified');
    });
  } else {
    res.status(404);
    res.render('404');
  }
});

// Unsubscribe endpoint
app.get('/unsubscribe', function (req, res) {
  if (req.query.sid) {
    var subscriberId = req.query.sid;
    console.log(subscriberId);
    var url = _environment.config.API_URL + 'list/unsubscribe?subscriberId=' + subscriberId;
    (0, _request2.default)(url, function (error, response, body) {
      console.log(error);
      console.log(body);
      res.render('unsubscribe-confirmed');
    });
  } else {
    res.status(404);
    res.render('404');
  }
});

// deliver endpoint
app.get('/deliver', function (req, res) {
  if (req.query.mid && req.query.sk) {

    var url = _environment.config.API_URL + 'list/deliver?mid=' + req.query.mid + '&sk=' + req.query.sk;
    (0, _request2.default)(url, function (error, response, body) {
      // console.log(error)
      // console.log(body)
      console.log(body);
      var result = JSON.parse(body);
      console.log(result);
      if (result.success) {
        var alert = { title: 'Send success', message: 'Your message was delivered to your subscribers (' + result.subscriber_count + ')' };
      } else {
        var alert = { title: 'Send failed', message: result.msg };
      }

      res.render('alert', alert);
    });
  } else {
    res.status(404);
    res.render('404');
  }
});

app.get('/create/:messageId', function (req, res) {
  // var messageId = '2ljatek3dgs5gthccq91ra632vr9epfc35re9mg1' // zh
  var messageId = '979jj082r465msi9qsdd5o1fea9v5o8fhr6luo81'; // zh-t

  // list receive
  (0, _actions.getRawEmail)(messageId, _environment.config.S3_BUCKET_LIST).then(_actions.processListEmail).then(_actions.collectionsProcess).then(_actions.storeInDynamo).then(_actions.sendListPreview).then(function (result) {
    console.log('successful receive:', messageId, result);
    callback(null, { "disposition": "STOP_RULE_SET" });
  }).catch(function (err) {
    return console.log(err.stack);
  });

  // email receive
  // getRawEmail(messageId)
  // .then(processEmail)
  // .then(collectionsProcess)
  // .then(storeInDynamo)
  // .then(sendReply)
  // .then(result => {
  //   console.log('stored email:')
  //   console.log(result)
  //   res.send(true)
  // })
  // .catch(e => console.log(e))
});

app.get('/:slug/delete/:editKey', function (req, res) {
  //extract messageId from slug
  var slug = req.params.slug;
  var messageId = slug.slice(slug.length - 9, slug.length);

  // check for collection
  (0, _actions.getStoredEmail)(messageId).then(function (mailObj) {
    // check for match of edit key
    if (mailObj.editKey == req.params.editKey) {
      var deleteParams = {
        messageId: messageId,
        editKey: req.params.editKey

        // delete email from main table
      };(0, _actions.deleteEmailFromDynamo)(deleteParams).then(function (result) {
        var alert = {
          title: 'Page deleted',
          message: 'Please note that the page may still be cached in your browser.'
        };
        res.render('alert', alert);
        // clear cache
        var cfParams = {
          files: ['http://www.publishthis.email/' + result.messageId, 'https://www.publishthis.email/' + result.messageId]
        };
        (0, _actions.clearCache)(cfParams);
      }).catch(function (e) {
        console.log(e);
      });

      // check for collection
      if (mailObj.collectionId) {
        var deleteCollectionParams = {
          collectionId: mailObj.collectionId,
          messageId: mailObj.messageId,
          timeAdded: mailObj.timeAdded
          // console.log(deleteCollectionParams)
          // delete from collection
        };(0, _actions.deleteCollectionItemFromDynamo)(deleteCollectionParams).then(function (result) {
          // console.log('DELETED:', result)
        }).catch(function (e) {
          console.log(e);
        });
      }
    } else {
      var alert = {
        title: 'Invalid delete link',
        message: 'It looks like you are trying to delete an email, but the link you have clicked appears to be invalid, or the page no longer exists.'
      };
      res.render('alert', alert);
    }
  }).catch(function (e) {
    console.log(e);
  });
});

app.get('/:slug', function (req, res) {
  //extract messageId from slug
  var slug = req.params.slug;
  var messageId = slug.slice(slug.length - 9, slug.length);

  (0, _actions.getStoredEmail)(messageId).then(_actions.preRender).then(function (mailObj) {

    mailObj.html = mailObj.html.replace(/<p><br \/>\n<\/p>/g, ''); //attempting to tidy breaks
    // set footer language
    if (!mailObj.language) {
      mailObj.language = 'en';
    }
    // add API url
    mailObj.API_URL = _environment.config.API_URL;
    // page or email
    if (mailObj.to[0].address.startsWith('email')) {
      mailObj.timestamp = new Date(mailObj.timeAdded).toString();
      res.render('email', mailObj);
    } else {
      res.render('page', mailObj);
    }
  }).catch(function (e) {
    // console.log(e)
    res.status(404);
    res.render('404');
  });
});

app.get('/c/:collectionId/more/:timeAdded', function (req, res) {
  console.log(req.params);

  var collectionParams = {
    id: req.params.collectionId,
    ExclusiveStartKey: { timeAdded: Number(req.params.timeAdded), collectionId: req.params.collectionId }
  };

  (0, _actions.getCollection)(collectionParams).then(function (collection) {
    res.render('partials/collection-items', collection);
  }).catch(function (e) {
    // console.log(e)
    res.status(404);
    res.render('404');
  });
});

app.get('/c/:collectionSlug', function (req, res) {
  // console.log(req.params)

  var slug = req.params.collectionSlug;
  var slugArr = slug.split('-');
  var collectionId = slugArr[0];

  var collectionParams = {
    id: collectionId
  };

  if (slugArr.length > 1) {
    collectionParams.title = (0, _sanitizeHtml2.default)(slugArr.slice(1).join(' '), {});
  } else {
    collectionParams.title = ' ';
  }

  (0, _actions.getCollection)(collectionParams).then(function (collection) {
    collection.Items = (0, _actions.addTimeSince)(collection.Items);
    // console.log(collection)
    res.render('collection', collection);
  });
});

app.listen(_environment.config.PORT, function () {
  console.log('Publish this email express app listening on port ' + _environment.config.PORT + '!');
});

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _imgur = __webpack_require__(51);

var _imgur2 = _interopRequireDefault(_imgur);

var _environment = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_imgur2.default.setClientId(_environment.config.IMGUR_ID);
_imgur2.default.setAPIUrl('https://api.imgur.com/3/');

var upload = function upload(img) {
  return _imgur2.default.uploadBase64(img);
};

exports.default = {
  upload: upload
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var tplDelivery = "<!DOCTYPE html>\n<html lang=\"en\" xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\">\n<head>\n    <meta charset=\"utf-8\"> <!-- utf-8 works for most cases -->\n    <meta name=\"viewport\" content=\"width=device-width\"> <!-- Forcing initial-scale shouldn't be necessary -->\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"> <!-- Use the latest (edge) version of IE rendering engine -->\n    <meta name=\"x-apple-disable-message-reformatting\">  <!-- Disable auto-scale in iOS 10 Mail entirely -->\n    <title>{{=it.subject}}</title> <!-- The title tag shows in email notifications, like Android 4.4. -->\n\n\t<!-- CSS Reset -->\n    <style>\n\n        /* What it does: Remove spaces around the email design added by some email clients. */\n        /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */\n        html,\n        body {\n            margin: 0 auto !important;\n            padding: 0 !important;\n            height: 100% !important;\n            width: 100% !important;\n        }\n\n        /* What it does: Stops email clients resizing small text. */\n        * {\n            -ms-text-size-adjust: 100%;\n            -webkit-text-size-adjust: 100%;\n        }\n\n        /* What it does: Centers email on Android 4.4 */\n        div[style*=\"margin: 16px 0\"] {\n            margin:0 !important;\n        }\n\n        /* What it does: Stops Outlook from adding extra spacing to tables. */\n        table,\n        td {\n            mso-table-lspace: 0pt !important;\n            mso-table-rspace: 0pt !important;\n        }\n\n        /* What it does: Fixes webkit padding issue. Fix for Yahoo mail table alignment bug. Applies table-layout to the first 2 tables then removes for anything nested deeper. */\n        table {\n            border-spacing: 0 !important;\n            border-collapse: collapse !important;\n            table-layout: fixed !important;\n            margin: 0 auto !important;\n        }\n        table table table {\n            table-layout: auto;\n        }\n\n        /* What it does: Uses a better rendering method when resizing images in IE. */\n        img {\n            -ms-interpolation-mode:bicubic;\n            max-width: 100%;\n        }\n\n        /* What it does: A work-around for email clients meddling in triggered links. */\n        *[x-apple-data-detectors],\t/* iOS */\n        .x-gmail-data-detectors, \t/* Gmail */\n        .x-gmail-data-detectors *,\n        .aBn {\n            border-bottom: 0 !important;\n            cursor: default !important;\n            color: inherit !important;\n            text-decoration: none !important;\n            font-size: inherit !important;\n            font-family: inherit !important;\n            font-weight: inherit !important;\n            line-height: inherit !important;\n        }\n\n        /* What it does: Prevents Gmail from displaying an download button on large, non-linked images. */\n        .a6S {\n\t        display: none !important;\n\t        opacity: 0.01 !important;\n        }\n        /* If the above doesn't work, add a .g-img class to any image in question. */\n        img.g-img + div {\n\t        display:none !important;\n\t   \t}\n\n        /* What it does: Prevents underlining the button text in Windows 10 */\n        .button-link {\n            text-decoration: none !important;\n        }\n\n        /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */\n        /* Create one of these media queries for each additional viewport size you'd like to fix */\n        /* Thanks to Eric Lepetit (@ericlepetitsf) for help troubleshooting */\n        @media only screen and (min-device-width: 375px) and (max-device-width: 413px) { /* iPhone 6 and 6+ */\n            .email-container {\n                min-width: 375px !important;\n            }\n        }\n\n    </style>\n\n    <!-- Progressive Enhancements -->\n    <style>\n\n        /* What it does: Hover styles for buttons */\n        .button-td,\n        .button-a {\n            transition: all 100ms ease-in;\n        }\n        .button-td:hover,\n        .button-a:hover {\n            background: #555555 !important;\n            border-color: #555555 !important;\n        }\n\n        /* Media Queries */\n        @media screen and (max-width: 600px) {\n\n            /* What it does: Adjust typography on small screens to improve readability */\n\t\t\t.email-container p {\n\t\t\t\tfont-size: 17px !important;\n\t\t\t\tline-height: 22px !important;\n\t\t\t}\n\n\t\t}\n\n\t</style>\n\n\t<!-- What it does: Makes background images in 72ppi Outlook render at correct size. -->\n\t<!--[if gte mso 9]>\n\t<xml>\n\t\t<o:OfficeDocumentSettings>\n\t\t\t<o:AllowPNG/>\n\t\t\t<o:PixelsPerInch>96</o:PixelsPerInch>\n\t\t</o:OfficeDocumentSettings>\n\t</xml>\n\t<![endif]-->\n\n</head>\n<body width=\"100%\" bgcolor=\"#f7f7f7\" style=\"margin: 0; mso-line-height-rule: exactly;\">\n\t<center style=\"width: 100%; background: #f7f7f7; text-align: left;\">\n\n\t\t<!-- Visually Hidden Preheader Text : BEGIN -->\n\t\t<div style=\"display:none;font-size:1px;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;mso-hide:all;font-family: sans-serif;\">\n\t\t\t{{=it.subject}}\n\t\t</div>\n\t\t<!-- Visually Hidden Preheader Text : END -->\n\n\t\t<!--\n\t\t\tSet the email width. Defined in two places:\n\t\t\t1. max-width for all clients except Desktop Windows Outlook, allowing the email to squish on narrow but never go wider than 600px.\n\t\t\t2. MSO tags for Desktop Windows Outlook enforce a 600px width.\n\t\t-->\n\t\t<div style=\"max-width: 600px; margin: auto;\" class=\"email-container\">\n\t\t\t<!--[if mso]>\n\t\t\t<table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"600\" align=\"center\">\n\t\t\t<tr>\n\t\t\t<td>\n\t\t\t<![endif]-->\n\n      <!-- Clear Spacer : BEGIN -->\n      <table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"100%\">\n        <tr>\n          <td aria-hidden=\"true\" height=\"40\" style=\"font-size: 0; line-height: 0;\">\n            &nbsp;\n          </td>\n        </tr>\n      </table>\n      <!-- Clear Spacer : END -->\n\n\t\t\t<!-- Email Body : BEGIN -->\n\t\t\t<table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" align=\"center\" width=\"100%\" style=\"max-width: 600px;\">\n\n\t\t\t\t<!-- 1 Column Text + Button : BEGIN -->\n\t\t\t\t<tr>\n\t\t\t\t\t<td bgcolor=\"#ffffff\">\n\t\t\t\t\t\t<table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"100%\">\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<td style=\"padding: 40px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;\">\n\t\t\t\t\t\t\t\t\t<h1 style=\"margin: 0 0 10px 0; font-family: sans-serif; font-size: 24px; line-height: 27px; color: #333333; font-weight: normal;\">{{=it.subject}}</h1>\n                  {{=it.html}}\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t<!-- <tr>\n\t\t\t\t\t\t\t\t<td style=\"padding: 40px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;\">\n\t\t\t\t\t\t\t\t\t<h2 style=\"margin: 0 0 10px 0; font-family: sans-serif; font-size: 18px; line-height: 21px; color: #333333; font-weight: bold;\">Praesent in felis ut velit pretium lobortis rhoncus ut&nbsp;erat.</h2>\n\t\t\t\t\t\t\t\t\t<p style=\"margin: 0;\">Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent laoreet malesuada cursus. Maecenas scelerisque congue eros eu posuere. Praesent in felis ut velit pretium lobortis rhoncus ut&nbsp;erat.</p>\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t</tr> -->\n\t\t\t\t\t\t</table>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<!-- 1 Column Text + Button : END -->\n\n\t\t\t\t<!-- Clear Spacer : BEGIN -->\n\t\t\t\t<tr>\n\t\t\t\t\t<td aria-hidden=\"true\" height=\"40\" style=\"font-size: 0; line-height: 0;\">\n\t\t\t\t\t\t&nbsp;\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<!-- Clear Spacer : END -->\n\n\t\t\t</table>\n\t\t\t<!-- Email Body : END -->\n\n\t\t\t<!-- Email Footer : BEGIN -->\n\t\t\t<table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" align=\"center\" width=\"100%\" style=\"max-width: 680px;\">\n\t\t\t\t<tr>\n\t\t\t\t\t<td style=\"padding: 20px 10px;width: 100%;font-size: 12px; font-family: sans-serif; line-height:18px; text-align: center; color: #888888;\" class=\"x-gmail-data-detectors\">\n\t\t\t\t\t\t<webversion style=\"color:#cccccc; text-decoration:underline; font-weight: bold;\"><a href=\"http://www.publishthis.email/{{=it.messageId}}\">View as a Web Page</a></webversion>\n\t\t\t\t\t\t<br>\n\t\t\t\t\t\tPublish This Email Pty Ltd<br>Unit 6, 63 Elizabeth St, Richmond, VIC 3121, Australia\n\t\t\t\t\t\t<br>\n\t\t\t\t\t\t<unsubscribe style=\"color:#888888; text-decoration:underline;\"><a href=\"https://www.publishthis.email/unsubscribe?sid={{=it.subscriber.subscriberId}}\">Unsubscribe</a></unsubscribe>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t</table>\n\t\t\t<!-- Email Footer : END -->\n\n\t\t\t<!--[if mso]>\n\t\t\t</td>\n\t\t\t</tr>\n\t\t\t</table>\n\t\t\t<![endif]-->\n\t\t</div>\n\n    </center>\n</body>\n</html>\n";

exports.tplDelivery = tplDelivery;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var tplListNew = "<!DOCTYPE html>\n<html lang=\"en\" xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\">\n<head>\n    <meta charset=\"utf-8\"> <!-- utf-8 works for most cases -->\n    <meta name=\"viewport\" content=\"width=device-width\"> <!-- Forcing initial-scale shouldn't be necessary -->\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"> <!-- Use the latest (edge) version of IE rendering engine -->\n    <meta name=\"x-apple-disable-message-reformatting\">  <!-- Disable auto-scale in iOS 10 Mail entirely -->\n    <title>Your new list - {{=it.subject}}</title> <!-- The title tag shows in email notifications, like Android 4.4. -->\n\n\t<!-- CSS Reset -->\n    <style>\n\n        /* What it does: Remove spaces around the email design added by some email clients. */\n        /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */\n        html,\n        body {\n            margin: 0 auto !important;\n            padding: 0 !important;\n            height: 100% !important;\n            width: 100% !important;\n        }\n\n        /* What it does: Stops email clients resizing small text. */\n        * {\n            -ms-text-size-adjust: 100%;\n            -webkit-text-size-adjust: 100%;\n        }\n\n        /* What it does: Centers email on Android 4.4 */\n        div[style*=\"margin: 16px 0\"] {\n            margin:0 !important;\n        }\n\n        /* What it does: Stops Outlook from adding extra spacing to tables. */\n        table,\n        td {\n            mso-table-lspace: 0pt !important;\n            mso-table-rspace: 0pt !important;\n        }\n\n        /* What it does: Fixes webkit padding issue. Fix for Yahoo mail table alignment bug. Applies table-layout to the first 2 tables then removes for anything nested deeper. */\n        table {\n            border-spacing: 0 !important;\n            border-collapse: collapse !important;\n            table-layout: fixed !important;\n            margin: 0 auto !important;\n        }\n        table table table {\n            table-layout: auto;\n        }\n\n        /* What it does: Uses a better rendering method when resizing images in IE. */\n        img {\n            -ms-interpolation-mode:bicubic;\n        }\n\n        /* What it does: A work-around for email clients meddling in triggered links. */\n        *[x-apple-data-detectors],\t/* iOS */\n        .x-gmail-data-detectors, \t/* Gmail */\n        .x-gmail-data-detectors *,\n        .aBn {\n            border-bottom: 0 !important;\n            cursor: default !important;\n            color: inherit !important;\n            text-decoration: none !important;\n            font-size: inherit !important;\n            font-family: inherit !important;\n            font-weight: inherit !important;\n            line-height: inherit !important;\n        }\n\n        /* What it does: Prevents Gmail from displaying an download button on large, non-linked images. */\n        .a6S {\n\t        display: none !important;\n\t        opacity: 0.01 !important;\n        }\n        /* If the above doesn't work, add a .g-img class to any image in question. */\n        img.g-img + div {\n\t        display:none !important;\n\t   \t}\n\n        /* What it does: Prevents underlining the button text in Windows 10 */\n        .button-link {\n            text-decoration: none !important;\n        }\n\n        /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */\n        /* Create one of these media queries for each additional viewport size you'd like to fix */\n        /* Thanks to Eric Lepetit (@ericlepetitsf) for help troubleshooting */\n        @media only screen and (min-device-width: 375px) and (max-device-width: 413px) { /* iPhone 6 and 6+ */\n            .email-container {\n                min-width: 375px !important;\n            }\n        }\n\n    </style>\n\n    <!-- Progressive Enhancements -->\n    <style>\n\n        /* What it does: Hover styles for buttons */\n        .button-td,\n        .button-a {\n            transition: all 100ms ease-in;\n        }\n        .button-td:hover,\n        .button-a:hover {\n            background: #555555 !important;\n            border-color: #555555 !important;\n        }\n\n        /* Media Queries */\n        @media screen and (max-width: 600px) {\n\n            /* What it does: Adjust typography on small screens to improve readability */\n\t\t\t.email-container p {\n\t\t\t\tfont-size: 17px !important;\n\t\t\t\tline-height: 22px !important;\n\t\t\t}\n\n\t\t}\n\n\t</style>\n\n\t<!-- What it does: Makes background images in 72ppi Outlook render at correct size. -->\n\t<!--[if gte mso 9]>\n\t<xml>\n\t\t<o:OfficeDocumentSettings>\n\t\t\t<o:AllowPNG/>\n\t\t\t<o:PixelsPerInch>96</o:PixelsPerInch>\n\t\t</o:OfficeDocumentSettings>\n\t</xml>\n\t<![endif]-->\n\n</head>\n<body width=\"100%\" bgcolor=\"#f7f7f7\" style=\"margin: 0; mso-line-height-rule: exactly;\">\n\t<center style=\"width: 100%; background: #f7f7f7; text-align: left;\">\n\n\t\t<!-- Visually Hidden Preheader Text : BEGIN -->\n\t\t<div style=\"display:none;font-size:1px;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;mso-hide:all;font-family: sans-serif;\">\n\t\t\tYou've just created a new email list using Publishthis.email.\n\t\t</div>\n\t\t<!-- Visually Hidden Preheader Text : END -->\n\n\t\t<!--\n\t\t\tSet the email width. Defined in two places:\n\t\t\t1. max-width for all clients except Desktop Windows Outlook, allowing the email to squish on narrow but never go wider than 600px.\n\t\t\t2. MSO tags for Desktop Windows Outlook enforce a 600px width.\n\t\t-->\n\t\t<div style=\"max-width: 600px; margin: auto;\" class=\"email-container\">\n\t\t\t<!--[if mso]>\n\t\t\t<table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"600\" align=\"center\">\n\t\t\t<tr>\n\t\t\t<td>\n\t\t\t<![endif]-->\n\n      <!-- Clear Spacer : BEGIN -->\n      <table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"100%\">\n        <tr>\n          <td aria-hidden=\"true\" height=\"40\" style=\"font-size: 0; line-height: 0;\">\n            &nbsp;\n          </td>\n        </tr>\n      </table>\n      <!-- Clear Spacer : END -->\n\n\t\t\t<!-- Email Body : BEGIN -->\n\t\t\t<table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" align=\"center\" width=\"100%\" style=\"max-width: 600px;\">\n\n\t\t\t\t<!-- 1 Column Text + Button : BEGIN -->\n\t\t\t\t<tr>\n\t\t\t\t\t<td bgcolor=\"#ffffff\">\n\t\t\t\t\t\t<table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"100%\">\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<td style=\"padding: 40px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;\">\n\t\t\t\t\t\t\t\t\t<h1 style=\"margin: 0 0 10px 0; font-family: sans-serif; font-size: 24px; line-height: 27px; color: #333333; font-weight: normal;\">Your new email list!</h1>\n                  <p>Congratulations on starting your new email list: <strong>{{=it.subject}}</strong></p>\n                  <p>Share this page to start growing your subscribers:</p>\n                  <p><a href=\"https://www.publishthis.email/{{=it.messageId}}\">https://www.publishthis.email/{{=it.messageId}}</a></p>\n                  <h2 style=\"margin: 0 0 10px 0; font-family: sans-serif; font-size: 18px; line-height: 21px; color: #333333; font-weight: bold;\">How to send to your email list</h2>\n                  <p>Simply email <a href=\"mailto:list{{?it.label}}+{{=it.label}}{{?}}@publishthis.email\">list{{?it.label}}+{{=it.label}}{{?}}@publishthis.email</a> and we will automatically send it to your subscribers.</a>\n                  <p>Thanks,</p>\n                  <a href=\"https://www.publishthis.email\"><img src=\"http://i.imgur.com/QoCKNTi.png\" width=\"262px\"/></a>\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t<!-- <tr>\n\t\t\t\t\t\t\t\t<td style=\"padding: 40px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;\">\n\t\t\t\t\t\t\t\t\t<h2 style=\"margin: 0 0 10px 0; font-family: sans-serif; font-size: 18px; line-height: 21px; color: #333333; font-weight: bold;\">Praesent in felis ut velit pretium lobortis rhoncus ut&nbsp;erat.</h2>\n\t\t\t\t\t\t\t\t\t<p style=\"margin: 0;\">Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent laoreet malesuada cursus. Maecenas scelerisque congue eros eu posuere. Praesent in felis ut velit pretium lobortis rhoncus ut&nbsp;erat.</p>\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t</tr> -->\n\t\t\t\t\t\t</table>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<!-- 1 Column Text + Button : END -->\n\n\t\t\t\t<!-- Clear Spacer : BEGIN -->\n\t\t\t\t<tr>\n\t\t\t\t\t<td aria-hidden=\"true\" height=\"40\" style=\"font-size: 0; line-height: 0;\">\n\t\t\t\t\t\t&nbsp;\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<!-- Clear Spacer : END -->\n\n\t\t\t</table>\n\t\t\t<!-- Email Body : END -->\n\n\t\t\t<!-- Email Footer : BEGIN -->\n\t\t\t<table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" align=\"center\" width=\"100%\" style=\"max-width: 680px;\">\n\t\t\t\t<tr>\n\t\t\t\t\t<td style=\"padding: 20px 10px;width: 100%;font-size: 12px; font-family: sans-serif; line-height:18px; text-align: center; color: #888888;\" class=\"x-gmail-data-detectors\">\n\t\t\t\t\t\t<!-- <webversion style=\"color:#cccccc; text-decoration:underline; font-weight: bold;\">View as a Web Page</webversion> -->\n\t\t\t\t\t\t<br>\n\t\t\t\t\t\tPublish This Email Pty Ltd<br>Unit 6, 63 Elizabeth St, Richmond, VIC 3121, Australia\n\t\t\t\t\t\t<br>\n\t\t\t\t\t\t<!-- <unsubscribe style=\"color:#888888; text-decoration:underline;\">unsubscribe</unsubscribe> -->\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t</table>\n\t\t\t<!-- Email Footer : END -->\n\n\t\t\t<!--[if mso]>\n\t\t\t</td>\n\t\t\t</tr>\n\t\t\t</table>\n\t\t\t<![endif]-->\n\t\t</div>\n\n    </center>\n</body>\n</html>\n";
exports.tplListNew = tplListNew;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var tplListSendComplete = "<!DOCTYPE html>\n<html lang=\"en\" xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\">\n<head>\n    <meta charset=\"utf-8\"> <!-- utf-8 works for most cases -->\n    <meta name=\"viewport\" content=\"width=device-width\"> <!-- Forcing initial-scale shouldn't be necessary -->\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"> <!-- Use the latest (edge) version of IE rendering engine -->\n    <meta name=\"x-apple-disable-message-reformatting\">  <!-- Disable auto-scale in iOS 10 Mail entirely -->\n    <title>Delivered: {{=it.subject}}</title> <!-- The title tag shows in email notifications, like Android 4.4. -->\n\n\t<!-- CSS Reset -->\n    <style>\n\n        /* What it does: Remove spaces around the email design added by some email clients. */\n        /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */\n        html,\n        body {\n            margin: 0 auto !important;\n            padding: 0 !important;\n            height: 100% !important;\n            width: 100% !important;\n        }\n\n        /* What it does: Stops email clients resizing small text. */\n        * {\n            -ms-text-size-adjust: 100%;\n            -webkit-text-size-adjust: 100%;\n        }\n\n        /* What it does: Centers email on Android 4.4 */\n        div[style*=\"margin: 16px 0\"] {\n            margin:0 !important;\n        }\n\n        /* What it does: Stops Outlook from adding extra spacing to tables. */\n        table,\n        td {\n            mso-table-lspace: 0pt !important;\n            mso-table-rspace: 0pt !important;\n        }\n\n        /* What it does: Fixes webkit padding issue. Fix for Yahoo mail table alignment bug. Applies table-layout to the first 2 tables then removes for anything nested deeper. */\n        table {\n            border-spacing: 0 !important;\n            border-collapse: collapse !important;\n            table-layout: fixed !important;\n            margin: 0 auto !important;\n        }\n        table table table {\n            table-layout: auto;\n        }\n\n        /* What it does: Uses a better rendering method when resizing images in IE. */\n        img {\n            -ms-interpolation-mode:bicubic;\n        }\n\n        /* What it does: A work-around for email clients meddling in triggered links. */\n        *[x-apple-data-detectors],\t/* iOS */\n        .x-gmail-data-detectors, \t/* Gmail */\n        .x-gmail-data-detectors *,\n        .aBn {\n            border-bottom: 0 !important;\n            cursor: default !important;\n            color: inherit !important;\n            text-decoration: none !important;\n            font-size: inherit !important;\n            font-family: inherit !important;\n            font-weight: inherit !important;\n            line-height: inherit !important;\n        }\n\n        /* What it does: Prevents Gmail from displaying an download button on large, non-linked images. */\n        .a6S {\n\t        display: none !important;\n\t        opacity: 0.01 !important;\n        }\n        /* If the above doesn't work, add a .g-img class to any image in question. */\n        img.g-img + div {\n\t        display:none !important;\n\t   \t}\n\n        /* What it does: Prevents underlining the button text in Windows 10 */\n        .button-link {\n            text-decoration: none !important;\n        }\n\n        /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */\n        /* Create one of these media queries for each additional viewport size you'd like to fix */\n        /* Thanks to Eric Lepetit (@ericlepetitsf) for help troubleshooting */\n        @media only screen and (min-device-width: 375px) and (max-device-width: 413px) { /* iPhone 6 and 6+ */\n            .email-container {\n                min-width: 375px !important;\n            }\n        }\n\n    </style>\n\n    <!-- Progressive Enhancements -->\n    <style>\n\n        /* What it does: Hover styles for buttons */\n        .button-td,\n        .button-a {\n            transition: all 100ms ease-in;\n        }\n        .button-td:hover,\n        .button-a:hover {\n            background: #555555 !important;\n            border-color: #555555 !important;\n        }\n\n        /* Media Queries */\n        @media screen and (max-width: 600px) {\n\n            /* What it does: Adjust typography on small screens to improve readability */\n\t\t\t.email-container p {\n\t\t\t\tfont-size: 17px !important;\n\t\t\t\tline-height: 22px !important;\n\t\t\t}\n\n\t\t}\n\n\t</style>\n\n\t<!-- What it does: Makes background images in 72ppi Outlook render at correct size. -->\n\t<!--[if gte mso 9]>\n\t<xml>\n\t\t<o:OfficeDocumentSettings>\n\t\t\t<o:AllowPNG/>\n\t\t\t<o:PixelsPerInch>96</o:PixelsPerInch>\n\t\t</o:OfficeDocumentSettings>\n\t</xml>\n\t<![endif]-->\n\n</head>\n<body width=\"100%\" bgcolor=\"#f7f7f7\" style=\"margin: 0; mso-line-height-rule: exactly;\">\n\t<center style=\"width: 100%; background: #f7f7f7; text-align: left;\">\n\n\t\t<!-- Visually Hidden Preheader Text : BEGIN -->\n\t\t<div style=\"display:none;font-size:1px;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;mso-hide:all;font-family: sans-serif;\">\n\t\t\tSent to {{=it.subscribers.length}} subscribers.\n\t\t</div>\n\t\t<!-- Visually Hidden Preheader Text : END -->\n\n\t\t<!--\n\t\t\tSet the email width. Defined in two places:\n\t\t\t1. max-width for all clients except Desktop Windows Outlook, allowing the email to squish on narrow but never go wider than 600px.\n\t\t\t2. MSO tags for Desktop Windows Outlook enforce a 600px width.\n\t\t-->\n\t\t<div style=\"max-width: 600px; margin: auto;\" class=\"email-container\">\n\t\t\t<!--[if mso]>\n\t\t\t<table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"600\" align=\"center\">\n\t\t\t<tr>\n\t\t\t<td>\n\t\t\t<![endif]-->\n\n      <!-- Clear Spacer : BEGIN -->\n      <table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"100%\">\n        <tr>\n          <td aria-hidden=\"true\" height=\"40\" style=\"font-size: 0; line-height: 0;\">\n            &nbsp;\n          </td>\n        </tr>\n      </table>\n      <!-- Clear Spacer : END -->\n\n\t\t\t<!-- Email Body : BEGIN -->\n\t\t\t<table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" align=\"center\" width=\"100%\" style=\"max-width: 600px;\">\n\n\t\t\t\t<!-- 1 Column Text + Button : BEGIN -->\n\t\t\t\t<tr>\n\t\t\t\t\t<td bgcolor=\"#ffffff\">\n\t\t\t\t\t\t<table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"100%\">\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<td style=\"padding: 40px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;\">\n\t\t\t\t\t\t\t\t\t<h1 style=\"margin: 0 0 10px 0; font-family: sans-serif; font-size: 24px; line-height: 27px; color: #333333; font-weight: normal;\">Send successful!</h1>\n                  <p>Your post <a href=\"https://www.publishthis.email/{{=it.messageId}}\">{{=it.subject}}</a> was delivered to <strong>{{=it.subscribers.length}}</strong> subscribers.</p>\n                  <p>Thanks,</p>\n                  <a href=\"https://www.publishthis.email\"><img src=\"http://i.imgur.com/QoCKNTi.png\" width=\"262px\"/></a>\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t<!-- <tr>\n\t\t\t\t\t\t\t\t<td style=\"padding: 40px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;\">\n\t\t\t\t\t\t\t\t\t<h2 style=\"margin: 0 0 10px 0; font-family: sans-serif; font-size: 18px; line-height: 21px; color: #333333; font-weight: bold;\">Praesent in felis ut velit pretium lobortis rhoncus ut&nbsp;erat.</h2>\n\t\t\t\t\t\t\t\t\t<p style=\"margin: 0;\">Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent laoreet malesuada cursus. Maecenas scelerisque congue eros eu posuere. Praesent in felis ut velit pretium lobortis rhoncus ut&nbsp;erat.</p>\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t</tr> -->\n\t\t\t\t\t\t</table>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<!-- 1 Column Text + Button : END -->\n\n\t\t\t\t<!-- Clear Spacer : BEGIN -->\n\t\t\t\t<tr>\n\t\t\t\t\t<td aria-hidden=\"true\" height=\"40\" style=\"font-size: 0; line-height: 0;\">\n\t\t\t\t\t\t&nbsp;\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<!-- Clear Spacer : END -->\n\n\t\t\t</table>\n\t\t\t<!-- Email Body : END -->\n\n\t\t\t<!-- Email Footer : BEGIN -->\n\t\t\t<table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" align=\"center\" width=\"100%\" style=\"max-width: 680px;\">\n\t\t\t\t<tr>\n\t\t\t\t\t<td style=\"padding: 20px 10px;width: 100%;font-size: 12px; font-family: sans-serif; line-height:18px; text-align: center; color: #888888;\" class=\"x-gmail-data-detectors\">\n\t\t\t\t\t\t<!-- <webversion style=\"color:#cccccc; text-decoration:underline; font-weight: bold;\">View as a Web Page</webversion> -->\n\t\t\t\t\t\t<br>\n\t\t\t\t\t\tPublish This Email Pty Ltd<br>Unit 6, 63 Elizabeth St, Richmond, VIC 3121, Australia\n\t\t\t\t\t\t<br>\n\t\t\t\t\t\t<!-- <unsubscribe style=\"color:#888888; text-decoration:underline;\">unsubscribe</unsubscribe> -->\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t</table>\n\t\t\t<!-- Email Footer : END -->\n\n\t\t\t<!--[if mso]>\n\t\t\t</td>\n\t\t\t</tr>\n\t\t\t</table>\n\t\t\t<![endif]-->\n\t\t</div>\n\n    </center>\n</body>\n</html>\n";
exports.tplListSendComplete = tplListSendComplete;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var tplListSendNoSubs = "<!DOCTYPE html>\n<html lang=\"en\" xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\">\n<head>\n    <meta charset=\"utf-8\"> <!-- utf-8 works for most cases -->\n    <meta name=\"viewport\" content=\"width=device-width\"> <!-- Forcing initial-scale shouldn't be necessary -->\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"> <!-- Use the latest (edge) version of IE rendering engine -->\n    <meta name=\"x-apple-disable-message-reformatting\">  <!-- Disable auto-scale in iOS 10 Mail entirely -->\n    <title>Delivery failed: {{=it.subject}}</title> <!-- The title tag shows in email notifications, like Android 4.4. -->\n\n\t<!-- CSS Reset -->\n    <style>\n\n        /* What it does: Remove spaces around the email design added by some email clients. */\n        /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */\n        html,\n        body {\n            margin: 0 auto !important;\n            padding: 0 !important;\n            height: 100% !important;\n            width: 100% !important;\n        }\n\n        /* What it does: Stops email clients resizing small text. */\n        * {\n            -ms-text-size-adjust: 100%;\n            -webkit-text-size-adjust: 100%;\n        }\n\n        /* What it does: Centers email on Android 4.4 */\n        div[style*=\"margin: 16px 0\"] {\n            margin:0 !important;\n        }\n\n        /* What it does: Stops Outlook from adding extra spacing to tables. */\n        table,\n        td {\n            mso-table-lspace: 0pt !important;\n            mso-table-rspace: 0pt !important;\n        }\n\n        /* What it does: Fixes webkit padding issue. Fix for Yahoo mail table alignment bug. Applies table-layout to the first 2 tables then removes for anything nested deeper. */\n        table {\n            border-spacing: 0 !important;\n            border-collapse: collapse !important;\n            table-layout: fixed !important;\n            margin: 0 auto !important;\n        }\n        table table table {\n            table-layout: auto;\n        }\n\n        /* What it does: Uses a better rendering method when resizing images in IE. */\n        img {\n            -ms-interpolation-mode:bicubic;\n        }\n\n        /* What it does: A work-around for email clients meddling in triggered links. */\n        *[x-apple-data-detectors],\t/* iOS */\n        .x-gmail-data-detectors, \t/* Gmail */\n        .x-gmail-data-detectors *,\n        .aBn {\n            border-bottom: 0 !important;\n            cursor: default !important;\n            color: inherit !important;\n            text-decoration: none !important;\n            font-size: inherit !important;\n            font-family: inherit !important;\n            font-weight: inherit !important;\n            line-height: inherit !important;\n        }\n\n        /* What it does: Prevents Gmail from displaying an download button on large, non-linked images. */\n        .a6S {\n\t        display: none !important;\n\t        opacity: 0.01 !important;\n        }\n        /* If the above doesn't work, add a .g-img class to any image in question. */\n        img.g-img + div {\n\t        display:none !important;\n\t   \t}\n\n        /* What it does: Prevents underlining the button text in Windows 10 */\n        .button-link {\n            text-decoration: none !important;\n        }\n\n        /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */\n        /* Create one of these media queries for each additional viewport size you'd like to fix */\n        /* Thanks to Eric Lepetit (@ericlepetitsf) for help troubleshooting */\n        @media only screen and (min-device-width: 375px) and (max-device-width: 413px) { /* iPhone 6 and 6+ */\n            .email-container {\n                min-width: 375px !important;\n            }\n        }\n\n    </style>\n\n    <!-- Progressive Enhancements -->\n    <style>\n\n        /* What it does: Hover styles for buttons */\n        .button-td,\n        .button-a {\n            transition: all 100ms ease-in;\n        }\n        .button-td:hover,\n        .button-a:hover {\n            background: #555555 !important;\n            border-color: #555555 !important;\n        }\n\n        /* Media Queries */\n        @media screen and (max-width: 600px) {\n\n            /* What it does: Adjust typography on small screens to improve readability */\n\t\t\t.email-container p {\n\t\t\t\tfont-size: 17px !important;\n\t\t\t\tline-height: 22px !important;\n\t\t\t}\n\n\t\t}\n\n\t</style>\n\n\t<!-- What it does: Makes background images in 72ppi Outlook render at correct size. -->\n\t<!--[if gte mso 9]>\n\t<xml>\n\t\t<o:OfficeDocumentSettings>\n\t\t\t<o:AllowPNG/>\n\t\t\t<o:PixelsPerInch>96</o:PixelsPerInch>\n\t\t</o:OfficeDocumentSettings>\n\t</xml>\n\t<![endif]-->\n\n</head>\n<body width=\"100%\" bgcolor=\"#f7f7f7\" style=\"margin: 0; mso-line-height-rule: exactly;\">\n\t<center style=\"width: 100%; background: #f7f7f7; text-align: left;\">\n\n\t\t<!-- Visually Hidden Preheader Text : BEGIN -->\n\t\t<div style=\"display:none;font-size:1px;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;mso-hide:all;font-family: sans-serif;\">\n\t\t\tDelivery failed: No subscribers.\n\t\t</div>\n\t\t<!-- Visually Hidden Preheader Text : END -->\n\n\t\t<!--\n\t\t\tSet the email width. Defined in two places:\n\t\t\t1. max-width for all clients except Desktop Windows Outlook, allowing the email to squish on narrow but never go wider than 600px.\n\t\t\t2. MSO tags for Desktop Windows Outlook enforce a 600px width.\n\t\t-->\n\t\t<div style=\"max-width: 600px; margin: auto;\" class=\"email-container\">\n\t\t\t<!--[if mso]>\n\t\t\t<table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"600\" align=\"center\">\n\t\t\t<tr>\n\t\t\t<td>\n\t\t\t<![endif]-->\n\n      <!-- Clear Spacer : BEGIN -->\n      <table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"100%\">\n        <tr>\n          <td aria-hidden=\"true\" height=\"40\" style=\"font-size: 0; line-height: 0;\">\n            &nbsp;\n          </td>\n        </tr>\n      </table>\n      <!-- Clear Spacer : END -->\n\n\t\t\t<!-- Email Body : BEGIN -->\n\t\t\t<table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" align=\"center\" width=\"100%\" style=\"max-width: 600px;\">\n\n\t\t\t\t<!-- 1 Column Text + Button : BEGIN -->\n\t\t\t\t<tr>\n\t\t\t\t\t<td bgcolor=\"#ffffff\">\n\t\t\t\t\t\t<table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"100%\">\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<td style=\"padding: 40px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;\">\n\t\t\t\t\t\t\t\t\t<h1 style=\"margin: 0 0 10px 0; font-family: sans-serif; font-size: 24px; line-height: 27px; color: #333333; font-weight: normal;\">Well this is embarassing...</h1>\n                  <p>We're sorry to tell you, but delivery of your email <a href=\"https://www.publishthis.email/{{=it.messageId}}\">{{=it.subject}}</a> failed because you don't have any subscribers yet.</p>\n                  <p>Try sharing the link to your audience to grow your subscribers</p>\n                  <p>Thanks,</p>\n                  <a href=\"https://www.publishthis.email\"><img src=\"http://i.imgur.com/QoCKNTi.png\" width=\"262px\"/></a>\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t<!-- <tr>\n\t\t\t\t\t\t\t\t<td style=\"padding: 40px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;\">\n\t\t\t\t\t\t\t\t\t<h2 style=\"margin: 0 0 10px 0; font-family: sans-serif; font-size: 18px; line-height: 21px; color: #333333; font-weight: bold;\">Praesent in felis ut velit pretium lobortis rhoncus ut&nbsp;erat.</h2>\n\t\t\t\t\t\t\t\t\t<p style=\"margin: 0;\">Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent laoreet malesuada cursus. Maecenas scelerisque congue eros eu posuere. Praesent in felis ut velit pretium lobortis rhoncus ut&nbsp;erat.</p>\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t</tr> -->\n\t\t\t\t\t\t</table>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<!-- 1 Column Text + Button : END -->\n\n\t\t\t\t<!-- Clear Spacer : BEGIN -->\n\t\t\t\t<tr>\n\t\t\t\t\t<td aria-hidden=\"true\" height=\"40\" style=\"font-size: 0; line-height: 0;\">\n\t\t\t\t\t\t&nbsp;\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<!-- Clear Spacer : END -->\n\n\t\t\t</table>\n\t\t\t<!-- Email Body : END -->\n\n\t\t\t<!-- Email Footer : BEGIN -->\n\t\t\t<table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" align=\"center\" width=\"100%\" style=\"max-width: 680px;\">\n\t\t\t\t<tr>\n\t\t\t\t\t<td style=\"padding: 20px 10px;width: 100%;font-size: 12px; font-family: sans-serif; line-height:18px; text-align: center; color: #888888;\" class=\"x-gmail-data-detectors\">\n\t\t\t\t\t\t<!-- <webversion style=\"color:#cccccc; text-decoration:underline; font-weight: bold;\">View as a Web Page</webversion> -->\n\t\t\t\t\t\t<br>\n\t\t\t\t\t\tPublish This Email Pty Ltd<br>Unit 6, 63 Elizabeth St, Richmond, VIC 3121, Australia\n\t\t\t\t\t\t<br>\n\t\t\t\t\t\t<!-- <unsubscribe style=\"color:#888888; text-decoration:underline;\">unsubscribe</unsubscribe> -->\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t</table>\n\t\t\t<!-- Email Footer : END -->\n\n\t\t\t<!--[if mso]>\n\t\t\t</td>\n\t\t\t</tr>\n\t\t\t</table>\n\t\t\t<![endif]-->\n\t\t</div>\n\n    </center>\n</body>\n</html>\n";
exports.tplListSendNoSubs = tplListSendNoSubs;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var tplListSubscriberNew = "<!DOCTYPE html>\n<html lang=\"en\" xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\">\n<head>\n    <meta charset=\"utf-8\"> <!-- utf-8 works for most cases -->\n    <meta name=\"viewport\" content=\"width=device-width\"> <!-- Forcing initial-scale shouldn't be necessary -->\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"> <!-- Use the latest (edge) version of IE rendering engine -->\n    <meta name=\"x-apple-disable-message-reformatting\">  <!-- Disable auto-scale in iOS 10 Mail entirely -->\n    <title>New subscriber: {{=it.title}}</title> <!-- The title tag shows in email notifications, like Android 4.4. -->\n\n\t<!-- CSS Reset -->\n    <style>\n\n        /* What it does: Remove spaces around the email design added by some email clients. */\n        /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */\n        html,\n        body {\n            margin: 0 auto !important;\n            padding: 0 !important;\n            height: 100% !important;\n            width: 100% !important;\n        }\n\n        /* What it does: Stops email clients resizing small text. */\n        * {\n            -ms-text-size-adjust: 100%;\n            -webkit-text-size-adjust: 100%;\n        }\n\n        /* What it does: Centers email on Android 4.4 */\n        div[style*=\"margin: 16px 0\"] {\n            margin:0 !important;\n        }\n\n        /* What it does: Stops Outlook from adding extra spacing to tables. */\n        table,\n        td {\n            mso-table-lspace: 0pt !important;\n            mso-table-rspace: 0pt !important;\n        }\n\n        /* What it does: Fixes webkit padding issue. Fix for Yahoo mail table alignment bug. Applies table-layout to the first 2 tables then removes for anything nested deeper. */\n        table {\n            border-spacing: 0 !important;\n            border-collapse: collapse !important;\n            table-layout: fixed !important;\n            margin: 0 auto !important;\n        }\n        table table table {\n            table-layout: auto;\n        }\n\n        /* What it does: Uses a better rendering method when resizing images in IE. */\n        img {\n            -ms-interpolation-mode:bicubic;\n        }\n\n        /* What it does: A work-around for email clients meddling in triggered links. */\n        *[x-apple-data-detectors],\t/* iOS */\n        .x-gmail-data-detectors, \t/* Gmail */\n        .x-gmail-data-detectors *,\n        .aBn {\n            border-bottom: 0 !important;\n            cursor: default !important;\n            color: inherit !important;\n            text-decoration: none !important;\n            font-size: inherit !important;\n            font-family: inherit !important;\n            font-weight: inherit !important;\n            line-height: inherit !important;\n        }\n\n        /* What it does: Prevents Gmail from displaying an download button on large, non-linked images. */\n        .a6S {\n\t        display: none !important;\n\t        opacity: 0.01 !important;\n        }\n        /* If the above doesn't work, add a .g-img class to any image in question. */\n        img.g-img + div {\n\t        display:none !important;\n\t   \t}\n\n        /* What it does: Prevents underlining the button text in Windows 10 */\n        .button-link {\n            text-decoration: none !important;\n        }\n\n        /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */\n        /* Create one of these media queries for each additional viewport size you'd like to fix */\n        /* Thanks to Eric Lepetit (@ericlepetitsf) for help troubleshooting */\n        @media only screen and (min-device-width: 375px) and (max-device-width: 413px) { /* iPhone 6 and 6+ */\n            .email-container {\n                min-width: 375px !important;\n            }\n        }\n\n    </style>\n\n    <!-- Progressive Enhancements -->\n    <style>\n\n        /* What it does: Hover styles for buttons */\n        .button-td,\n        .button-a {\n            transition: all 100ms ease-in;\n        }\n        .button-td:hover,\n        .button-a:hover {\n            background: #555555 !important;\n            border-color: #555555 !important;\n        }\n\n        /* Media Queries */\n        @media screen and (max-width: 600px) {\n\n            /* What it does: Adjust typography on small screens to improve readability */\n\t\t\t.email-container p {\n\t\t\t\tfont-size: 17px !important;\n\t\t\t\tline-height: 22px !important;\n\t\t\t}\n\n\t\t}\n\n\t</style>\n\n\t<!-- What it does: Makes background images in 72ppi Outlook render at correct size. -->\n\t<!--[if gte mso 9]>\n\t<xml>\n\t\t<o:OfficeDocumentSettings>\n\t\t\t<o:AllowPNG/>\n\t\t\t<o:PixelsPerInch>96</o:PixelsPerInch>\n\t\t</o:OfficeDocumentSettings>\n\t</xml>\n\t<![endif]-->\n\n</head>\n<body width=\"100%\" bgcolor=\"#f7f7f7\" style=\"margin: 0; mso-line-height-rule: exactly;\">\n\t<center style=\"width: 100%; background: #f7f7f7; text-align: left;\">\n\n\t\t<!-- Visually Hidden Preheader Text : BEGIN -->\n\t\t<div style=\"display:none;font-size:1px;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;mso-hide:all;font-family: sans-serif;\">\n\t\t\t{{=it.title}} has a new subscriber.\n\t\t</div>\n\t\t<!-- Visually Hidden Preheader Text : END -->\n\n\t\t<!--\n\t\t\tSet the email width. Defined in two places:\n\t\t\t1. max-width for all clients except Desktop Windows Outlook, allowing the email to squish on narrow but never go wider than 600px.\n\t\t\t2. MSO tags for Desktop Windows Outlook enforce a 600px width.\n\t\t-->\n\t\t<div style=\"max-width: 600px; margin: auto;\" class=\"email-container\">\n\t\t\t<!--[if mso]>\n\t\t\t<table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"600\" align=\"center\">\n\t\t\t<tr>\n\t\t\t<td>\n\t\t\t<![endif]-->\n\n      <!-- Clear Spacer : BEGIN -->\n      <table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"100%\">\n        <tr>\n          <td aria-hidden=\"true\" height=\"40\" style=\"font-size: 0; line-height: 0;\">\n            &nbsp;\n          </td>\n        </tr>\n      </table>\n      <!-- Clear Spacer : END -->\n\n\t\t\t<!-- Email Body : BEGIN -->\n\t\t\t<table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" align=\"center\" width=\"100%\" style=\"max-width: 600px;\">\n\n\t\t\t\t<!-- 1 Column Text + Button : BEGIN -->\n\t\t\t\t<tr>\n\t\t\t\t\t<td bgcolor=\"#ffffff\">\n\t\t\t\t\t\t<table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"100%\">\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<td style=\"padding: 40px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;\">\n\t\t\t\t\t\t\t\t\t<h1 style=\"margin: 0 0 10px 0; font-family: sans-serif; font-size: 24px; line-height: 27px; color: #333333; font-weight: normal;\">You have a new subscriber!</h1>\n                  <p>{{=it.subscriber.subscriberEmail}} just subscribed to your list <strong>{{=it.title}}</strong>.</p>\n                  <p>Thanks,</p>\n                  <a href=\"https://www.publishthis.email\"><img src=\"http://i.imgur.com/QoCKNTi.png\" width=\"262px\"/></a>\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t<!-- <tr>\n\t\t\t\t\t\t\t\t<td style=\"padding: 40px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;\">\n\t\t\t\t\t\t\t\t\t<h2 style=\"margin: 0 0 10px 0; font-family: sans-serif; font-size: 18px; line-height: 21px; color: #333333; font-weight: bold;\">Praesent in felis ut velit pretium lobortis rhoncus ut&nbsp;erat.</h2>\n\t\t\t\t\t\t\t\t\t<p style=\"margin: 0;\">Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent laoreet malesuada cursus. Maecenas scelerisque congue eros eu posuere. Praesent in felis ut velit pretium lobortis rhoncus ut&nbsp;erat.</p>\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t</tr> -->\n\t\t\t\t\t\t</table>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<!-- 1 Column Text + Button : END -->\n\n\t\t\t\t<!-- Clear Spacer : BEGIN -->\n\t\t\t\t<tr>\n\t\t\t\t\t<td aria-hidden=\"true\" height=\"40\" style=\"font-size: 0; line-height: 0;\">\n\t\t\t\t\t\t&nbsp;\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<!-- Clear Spacer : END -->\n\n\t\t\t</table>\n\t\t\t<!-- Email Body : END -->\n\n\t\t\t<!-- Email Footer : BEGIN -->\n\t\t\t<table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" align=\"center\" width=\"100%\" style=\"max-width: 680px;\">\n\t\t\t\t<tr>\n\t\t\t\t\t<td style=\"padding: 20px 10px;width: 100%;font-size: 12px; font-family: sans-serif; line-height:18px; text-align: center; color: #888888;\" class=\"x-gmail-data-detectors\">\n\t\t\t\t\t\t<!-- <webversion style=\"color:#cccccc; text-decoration:underline; font-weight: bold;\">View as a Web Page</webversion> -->\n\t\t\t\t\t\t<br>\n\t\t\t\t\t\tPublish This Email Pty Ltd<br>Unit 6, 63 Elizabeth St, Richmond, VIC 3121, Australia\n\t\t\t\t\t\t<br>\n\t\t\t\t\t\t<!-- <unsubscribe style=\"color:#888888; text-decoration:underline;\">unsubscribe</unsubscribe> -->\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t</table>\n\t\t\t<!-- Email Footer : END -->\n\n\t\t\t<!--[if mso]>\n\t\t\t</td>\n\t\t\t</tr>\n\t\t\t</table>\n\t\t\t<![endif]-->\n\t\t</div>\n\n    </center>\n</body>\n</html>\n";
exports.tplListSubscriberNew = tplListSubscriberNew;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var tplPageReply = "<!DOCTYPE html>\n<html lang=\"en\" xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\">\n<head>\n    <meta charset=\"utf-8\"> <!-- utf-8 works for most cases -->\n    <meta name=\"viewport\" content=\"width=device-width\"> <!-- Forcing initial-scale shouldn't be necessary -->\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"> <!-- Use the latest (edge) version of IE rendering engine -->\n    <meta name=\"x-apple-disable-message-reformatting\">  <!-- Disable auto-scale in iOS 10 Mail entirely -->\n    <title>{{=it.subject}}</title> <!-- The title tag shows in email notifications, like Android 4.4. -->\n\n\t<!-- CSS Reset -->\n    <style>\n\n        /* What it does: Remove spaces around the email design added by some email clients. */\n        /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */\n        html,\n        body {\n            margin: 0 auto !important;\n            padding: 0 !important;\n            height: 100% !important;\n            width: 100% !important;\n        }\n\n        /* What it does: Stops email clients resizing small text. */\n        * {\n            -ms-text-size-adjust: 100%;\n            -webkit-text-size-adjust: 100%;\n        }\n\n        /* What it does: Centers email on Android 4.4 */\n        div[style*=\"margin: 16px 0\"] {\n            margin:0 !important;\n        }\n\n        /* What it does: Stops Outlook from adding extra spacing to tables. */\n        table,\n        td {\n            mso-table-lspace: 0pt !important;\n            mso-table-rspace: 0pt !important;\n        }\n\n        /* What it does: Fixes webkit padding issue. Fix for Yahoo mail table alignment bug. Applies table-layout to the first 2 tables then removes for anything nested deeper. */\n        table {\n            border-spacing: 0 !important;\n            border-collapse: collapse !important;\n            table-layout: fixed !important;\n            margin: 0 auto !important;\n        }\n        table table table {\n            table-layout: auto;\n        }\n\n        /* What it does: Uses a better rendering method when resizing images in IE. */\n        img {\n            -ms-interpolation-mode:bicubic;\n        }\n\n        /* What it does: A work-around for email clients meddling in triggered links. */\n        *[x-apple-data-detectors],\t/* iOS */\n        .x-gmail-data-detectors, \t/* Gmail */\n        .x-gmail-data-detectors *,\n        .aBn {\n            border-bottom: 0 !important;\n            cursor: default !important;\n            color: inherit !important;\n            text-decoration: none !important;\n            font-size: inherit !important;\n            font-family: inherit !important;\n            font-weight: inherit !important;\n            line-height: inherit !important;\n        }\n\n        /* What it does: Prevents Gmail from displaying an download button on large, non-linked images. */\n        .a6S {\n\t        display: none !important;\n\t        opacity: 0.01 !important;\n        }\n        /* If the above doesn't work, add a .g-img class to any image in question. */\n        img.g-img + div {\n\t        display:none !important;\n\t   \t}\n\n        /* What it does: Prevents underlining the button text in Windows 10 */\n        .button-link {\n            text-decoration: none !important;\n        }\n\n        /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */\n        /* Create one of these media queries for each additional viewport size you'd like to fix */\n        /* Thanks to Eric Lepetit (@ericlepetitsf) for help troubleshooting */\n        @media only screen and (min-device-width: 375px) and (max-device-width: 413px) { /* iPhone 6 and 6+ */\n            .email-container {\n                min-width: 375px !important;\n            }\n        }\n\n    </style>\n\n    <!-- Progressive Enhancements -->\n    <style>\n\n        /* What it does: Hover styles for buttons */\n        .button-td,\n        .button-a {\n            transition: all 100ms ease-in;\n        }\n        .button-td:hover,\n        .button-a:hover {\n            background: #555555 !important;\n            border-color: #555555 !important;\n        }\n\n        /* Media Queries */\n        @media screen and (max-width: 600px) {\n\n            /* What it does: Adjust typography on small screens to improve readability */\n\t\t\t.email-container p {\n\t\t\t\tfont-size: 17px !important;\n\t\t\t\tline-height: 22px !important;\n\t\t\t}\n\n\t\t}\n\n\t</style>\n\n\t<!-- What it does: Makes background images in 72ppi Outlook render at correct size. -->\n\t<!--[if gte mso 9]>\n\t<xml>\n\t\t<o:OfficeDocumentSettings>\n\t\t\t<o:AllowPNG/>\n\t\t\t<o:PixelsPerInch>96</o:PixelsPerInch>\n\t\t</o:OfficeDocumentSettings>\n\t</xml>\n\t<![endif]-->\n\n</head>\n<body width=\"100%\" bgcolor=\"#f7f7f7\" style=\"margin: 0; mso-line-height-rule: exactly;\">\n\t<center style=\"width: 100%; background: #f7f7f7; text-align: left;\">\n\n\t\t<!-- Visually Hidden Preheader Text : BEGIN -->\n\t\t<div style=\"display:none;font-size:1px;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;mso-hide:all;font-family: sans-serif;\">\n\t\t\tYour page has been published!\n\t\t</div>\n\t\t<!-- Visually Hidden Preheader Text : END -->\n\n\t\t<!--\n\t\t\tSet the email width. Defined in two places:\n\t\t\t1. max-width for all clients except Desktop Windows Outlook, allowing the email to squish on narrow but never go wider than 600px.\n\t\t\t2. MSO tags for Desktop Windows Outlook enforce a 600px width.\n\t\t-->\n\t\t<div style=\"max-width: 600px; margin: auto;\" class=\"email-container\">\n\t\t\t<!--[if mso]>\n\t\t\t<table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"600\" align=\"center\">\n\t\t\t<tr>\n\t\t\t<td>\n\t\t\t<![endif]-->\n\n      <!-- Clear Spacer : BEGIN -->\n      <table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"100%\">\n        <tr>\n          <td aria-hidden=\"true\" height=\"40\" style=\"font-size: 0; line-height: 0;\">\n            &nbsp;\n          </td>\n        </tr>\n      </table>\n      <!-- Clear Spacer : END -->\n\n\t\t\t<!-- Email Body : BEGIN -->\n\t\t\t<table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" align=\"center\" width=\"100%\" style=\"max-width: 600px;\">\n\n\t\t\t\t<!-- 1 Column Text + Button : BEGIN -->\n\t\t\t\t<tr>\n\t\t\t\t\t<td bgcolor=\"#ffffff\">\n\t\t\t\t\t\t<table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"100%\">\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<td style=\"padding: 40px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;\">\n\t\t\t\t\t\t\t\t\t<!-- <h1 style=\"margin: 0 0 10px 0; font-family: sans-serif; font-size: 24px; line-height: 27px; color: #333333; font-weight: normal;\">Praesent laoreet malesuada&nbsp;cursus.</h1>\n\t\t\t\t\t\t\t\t\t<p style=\"margin: 0;\">Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent laoreet malesuada cursus. Maecenas scelerisque congue eros eu posuere. Praesent in felis ut velit pretium lobortis rhoncus ut&nbsp;erat.</p> -->\n                  <p>Good news!</p>\n                  <p>We\u2019ve received your email <strong>{{=it.subject}}</strong>, converted it into a tidy little web page and published it online:</p>\n                  <p><a href=\"https://publishth.is/{{=it.messageId}}\">https://publishth.is/{{=it.messageId}}</a></p>\n                  <!-- {{? it.slug}}<p><a href=\"{{=it.pteDomain}}/{{=it.slug}}-{{=it.messageId}}\">{{=it.pteDomain}}/{{=it.slug}}-{{=it.messageId}}</a></p>{{?}} -->\n                  <p>For a brief moment you were the creator of the newest page on the internet. Congratulations.</p>\n                  <p>Sadly, that moment has passed. But you can be the creator of the newest page on the internet at any time. Simply send another email to <a href=\"mailto:page@publishthis.email\">page@publishthis.email</a> to publish a page - we\u2019ll reply with a link to your new page in seconds.</p>\n\n                  <p>Delete your page: <a href=\"{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}\">{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}</a></p>\n                  {{? it.collectionId}}\n                  <p>This page is part of your <strong>{{=it.label}}</strong> collection. Any pages you send to <strong>page+{{=it.label}}@publishthis.email</strong> will be added to this collection page: <a href=\"{{=it.pteDomain}}/c/{{=it.collectionId}}\">{{=it.pteDomain}}/c/{{=it.collectionId}}</a></p>\n                  {{?}}\n                  <p>Thanks,</p>\n                  <a href=\"https://www.publishthis.email\"><img src=\"http://i.imgur.com/QoCKNTi.png\" width=\"262px\"/></a>\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t<!-- <tr>\n\t\t\t\t\t\t\t\t<td style=\"padding: 40px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;\">\n\t\t\t\t\t\t\t\t\t<h2 style=\"margin: 0 0 10px 0; font-family: sans-serif; font-size: 18px; line-height: 21px; color: #333333; font-weight: bold;\">Praesent in felis ut velit pretium lobortis rhoncus ut&nbsp;erat.</h2>\n\t\t\t\t\t\t\t\t\t<p style=\"margin: 0;\">Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent laoreet malesuada cursus. Maecenas scelerisque congue eros eu posuere. Praesent in felis ut velit pretium lobortis rhoncus ut&nbsp;erat.</p>\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t</tr> -->\n\t\t\t\t\t\t</table>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<!-- 1 Column Text + Button : END -->\n\n\t\t\t\t<!-- Clear Spacer : BEGIN -->\n\t\t\t\t<tr>\n\t\t\t\t\t<td aria-hidden=\"true\" height=\"40\" style=\"font-size: 0; line-height: 0;\">\n\t\t\t\t\t\t&nbsp;\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<!-- Clear Spacer : END -->\n\n\t\t\t</table>\n\t\t\t<!-- Email Body : END -->\n\n\t\t\t<!-- Email Footer : BEGIN -->\n\t\t\t<table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" align=\"center\" width=\"100%\" style=\"max-width: 680px;\">\n\t\t\t\t<tr>\n\t\t\t\t\t<td style=\"padding: 20px 10px;width: 100%;font-size: 12px; font-family: sans-serif; line-height:18px; text-align: center; color: #888888;\" class=\"x-gmail-data-detectors\">\n\t\t\t\t\t\t<!-- <webversion style=\"color:#cccccc; text-decoration:underline; font-weight: bold;\">View as a Web Page</webversion> -->\n\t\t\t\t\t\t<br>\n\t\t\t\t\t\tPublish This Email Pty Ltd<br>Unit 6, 63 Elizabeth St, Richmond, VIC 3121, Australia\n\t\t\t\t\t\t<br>\n\t\t\t\t\t\t<!-- <unsubscribe style=\"color:#888888; text-decoration:underline;\">unsubscribe</unsubscribe> -->\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t</table>\n\t\t\t<!-- Email Footer : END -->\n\n\t\t\t<!--[if mso]>\n\t\t\t</td>\n\t\t\t</tr>\n\t\t\t</table>\n\t\t\t<![endif]-->\n\t\t</div>\n\n    </center>\n</body>\n</html>\n";
exports.tplPageReply = tplPageReply;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var tplSubscribeVerify = "<!DOCTYPE html>\n<html lang=\"en\" xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\">\n<head>\n  <meta charset=\"utf-8\"> <!-- utf-8 works for most cases -->\n  <meta name=\"viewport\" content=\"width=device-width\"> <!-- Forcing initial-scale shouldn't be necessary -->\n  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"> <!-- Use the latest (edge) version of IE rendering engine -->\n  <meta name=\"x-apple-disable-message-reformatting\">  <!-- Disable auto-scale in iOS 10 Mail entirely -->\n  <titleVerify your email address.</title> <!-- The title tag shows in email notifications, like Android 4.4. -->\n\n    <!-- CSS Reset -->\n    <style>\n\n    /* What it does: Remove spaces around the email design added by some email clients. */\n    /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */\n    html,\n    body {\n      margin: 0 auto !important;\n      padding: 0 !important;\n      height: 100% !important;\n      width: 100% !important;\n    }\n\n    /* What it does: Stops email clients resizing small text. */\n    * {\n      -ms-text-size-adjust: 100%;\n      -webkit-text-size-adjust: 100%;\n    }\n\n    /* What it does: Centers email on Android 4.4 */\n    div[style*=\"margin: 16px 0\"] {\n      margin:0 !important;\n    }\n\n    /* What it does: Stops Outlook from adding extra spacing to tables. */\n    table,\n    td {\n      mso-table-lspace: 0pt !important;\n      mso-table-rspace: 0pt !important;\n    }\n\n    /* What it does: Fixes webkit padding issue. Fix for Yahoo mail table alignment bug. Applies table-layout to the first 2 tables then removes for anything nested deeper. */\n    table {\n      border-spacing: 0 !important;\n      border-collapse: collapse !important;\n      table-layout: fixed !important;\n      margin: 0 auto !important;\n    }\n    table table table {\n      table-layout: auto;\n    }\n\n    /* What it does: Uses a better rendering method when resizing images in IE. */\n    img {\n      -ms-interpolation-mode:bicubic;\n    }\n\n    /* What it does: A work-around for email clients meddling in triggered links. */\n    *[x-apple-data-detectors],\t/* iOS */\n    .x-gmail-data-detectors, \t/* Gmail */\n    .x-gmail-data-detectors *,\n    .aBn {\n      border-bottom: 0 !important;\n      cursor: default !important;\n      color: inherit !important;\n      text-decoration: none !important;\n      font-size: inherit !important;\n      font-family: inherit !important;\n      font-weight: inherit !important;\n      line-height: inherit !important;\n    }\n\n    /* What it does: Prevents Gmail from displaying an download button on large, non-linked images. */\n    .a6S {\n      display: none !important;\n      opacity: 0.01 !important;\n    }\n    /* If the above doesn't work, add a .g-img class to any image in question. */\n    img.g-img + div {\n      display:none !important;\n    }\n\n    /* What it does: Prevents underlining the button text in Windows 10 */\n    .button-link {\n      text-decoration: none !important;\n    }\n\n    /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */\n    /* Create one of these media queries for each additional viewport size you'd like to fix */\n    /* Thanks to Eric Lepetit (@ericlepetitsf) for help troubleshooting */\n    @media only screen and (min-device-width: 375px) and (max-device-width: 413px) { /* iPhone 6 and 6+ */\n      .email-container {\n        min-width: 375px !important;\n      }\n    }\n\n    </style>\n\n    <!-- Progressive Enhancements -->\n    <style>\n\n    /* What it does: Hover styles for buttons */\n    .button-td,\n    .button-a {\n      transition: all 100ms ease-in;\n    }\n    .button-td:hover,\n    .button-a:hover {\n      background: #555555 !important;\n      border-color: #555555 !important;\n    }\n\n    /* Media Queries */\n    @media screen and (max-width: 600px) {\n\n      /* What it does: Adjust typography on small screens to improve readability */\n      .email-container p {\n        font-size: 17px !important;\n        line-height: 22px !important;\n      }\n\n    }\n\n    </style>\n\n    <!-- What it does: Makes background images in 72ppi Outlook render at correct size. -->\n    <!--[if gte mso 9]>\n    <xml>\n    <o:OfficeDocumentSettings>\n    <o:AllowPNG/>\n    <o:PixelsPerInch>96</o:PixelsPerInch>\n  </o:OfficeDocumentSettings>\n</xml>\n<![endif]-->\n\n</head>\n<body width=\"100%\" bgcolor=\"#f7f7f7\" style=\"margin: 0; mso-line-height-rule: exactly;\">\n  <center style=\"width: 100%; background: #f7f7f7; text-align: left;\">\n\n    <!-- Visually Hidden Preheader Text : BEGIN -->\n    <div style=\"display:none;font-size:1px;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;mso-hide:all;font-family: sans-serif;\">\n      Verify your email address.\n    </div>\n    <!-- Visually Hidden Preheader Text : END -->\n\n    <!--\n    Set the email width. Defined in two places:\n    1. max-width for all clients except Desktop Windows Outlook, allowing the email to squish on narrow but never go wider than 600px.\n    2. MSO tags for Desktop Windows Outlook enforce a 600px width.\n  -->\n  <div style=\"max-width: 600px; margin: auto;\" class=\"email-container\">\n    <!--[if mso]>\n    <table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"600\" align=\"center\">\n    <tr>\n    <td>\n    <![endif]-->\n\n    <!-- Clear Spacer : BEGIN -->\n    <table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"100%\">\n      <tr>\n        <td aria-hidden=\"true\" height=\"40\" style=\"font-size: 0; line-height: 0;\">\n          &nbsp;\n        </td>\n      </tr>\n    </table>\n    <!-- Clear Spacer : END -->\n\n    <!-- Email Body : BEGIN -->\n    <table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" align=\"center\" width=\"100%\" style=\"max-width: 600px;\">\n\n      <!-- 1 Column Text + Button : BEGIN -->\n      <tr>\n        <td bgcolor=\"#ffffff\">\n          <table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"100%\">\n            <tr>\n              <td style=\"padding: 40px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;\">\n                <h2>Please verify your email address</h2>\n                <p>Hi there,</p>\n                <p>Please click the link below to verify your email address and begin receiving updates.</p>\n              </td>\n            </tr>\n            <tr>\n              <td style=\"padding: 0 40px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;\">\n                <!-- Button : BEGIN -->\n                <table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" align=\"center\" style=\"margin: auto;\">\n                  <tr>\n                    <td style=\"border-radius: 3px; background: #FF5468; text-align: center;\" class=\"button-td\">\n                      <a href=\"https://www.publishthis.email/verify?sid={{=it.subscriberId}}\" style=\"background: #FF5468; border: 15px solid #FF5468; font-family: sans-serif; font-size: 13px; line-height: 1.1; text-align: center; text-decoration: none; display: block; border-radius: 3px; font-weight: bold;\" class=\"button-a\">\n                        <span style=\"color:#ffffff;\" class=\"button-link\">&nbsp;&nbsp;&nbsp;&nbsp;Confirm my email address&nbsp;&nbsp;&nbsp;&nbsp;</span>\n                      </a>\n                    </td>\n                  </tr>\n                </table>\n                <!-- Button : END -->\n              </td>\n            </tr>\n            <tr>\n              <td style=\"padding: 40px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;\">\n                <p>Thanks</p>\n                <p><a href=\"https://www.publishthis.email\"><img src=\"http://i.imgur.com/QoCKNTi.png\" width=\"262px\"/></a></p>\n              </td>\n            </tr>\n          </table>\n        </td>\n      </tr>\n      <!-- 1 Column Text + Button : END -->\n\n      <!-- Clear Spacer : BEGIN -->\n      <tr>\n        <td aria-hidden=\"true\" height=\"40\" style=\"font-size: 0; line-height: 0;\">\n          &nbsp;\n        </td>\n      </tr>\n      <!-- Clear Spacer : END -->\n\n    </table>\n    <!-- Email Body : END -->\n\n    <!-- Email Footer : BEGIN -->\n    <table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" align=\"center\" width=\"100%\" style=\"max-width: 680px;\">\n      <tr>\n        <td style=\"padding: 20px 10px;width: 100%;font-size: 12px; font-family: sans-serif; line-height:18px; text-align: center; color: #888888;\" class=\"x-gmail-data-detectors\">\n          <!-- <webversion style=\"color:#cccccc; text-decoration:underline; font-weight: bold;\">View as a Web Page</webversion> -->\n          <br>\n          Publish This Email Pty Ltd<br>Unit 6, 63 Elizabeth St, Richmond, VIC 3121, Australia\n          <br>\n          <!-- <unsubscribe style=\"color:#888888; text-decoration:underline;\">unsubscribe</unsubscribe> -->\n        </td>\n      </tr>\n    </table>\n    <!-- Email Footer : END -->\n\n    <!--[if mso]>\n  </td>\n</tr>\n</table>\n<![endif]-->\n</div>\n\n</center>\n</body>\n</html>\n";
exports.tplSubscribeVerify = tplSubscribeVerify;

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = require("aws-sdk");

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = require("cheerio");

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = require("cloudflare");

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = require("franc-min");

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = require("imgur");

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = require("mailparser");

/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = require("traditional-or-simplified");

/***/ })
/******/ ])));