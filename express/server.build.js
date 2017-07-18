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
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
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
  CF_KEY: env.PTE_CF_KEY,
  CF_EMAIL: env.PTE_CF_EMAIL,
  CF_ZONEID: env.PTE_CF_ZONEID,
  IMGUR_ID: env.PTE_IMGUR_ID,
  IMGUR_SECRET: env.PTE_IMGUR_SECRET,
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

var _aws = __webpack_require__(2);

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

exports.default = {
  getResource: getResource,
  putResource: putResource,
  deleteResource: deleteResource,
  query: query
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateConfig = undefined;

var _awsSdk = __webpack_require__(25);

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
/* 3 */
/***/ (function(module, exports) {

module.exports = require("sanitize-html");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.langCode3to2 = exports.detectLanguage = exports.detectWhitelist = exports.acceptLanguages = exports.useLanguage = undefined;

var _francMin = __webpack_require__(28);

var _francMin2 = _interopRequireDefault(_francMin);

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
    // }else if(acceptedLanguage && !acceptedLanguage.isArray){
    //   // prioritise EN if multiple languages are accepted
    //   if(acceptedLanguage.includes('en')){
    //     lang = 'en'
    //   }else{
    //     lang = acceptedLanguage[0]
    //   }
    //   return lang
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
    return detectedLanguage;
  } else {
    return 'eng'; // fall back to english
  }
};

exports.useLanguage = useLanguage;
exports.acceptLanguages = acceptLanguages;
exports.detectWhitelist = detectWhitelist;
exports.detectLanguage = detectLanguage;
exports.langCode3to2 = langCode3to2;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("shortid");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.acceptLanguages = exports.useLanguage = exports.clearCache = exports.collectionsProcess = exports.getCollection = exports.addTimeSince = exports.preRender = exports.deleteCollectionItemFromDynamo = exports.deleteEmailFromDynamo = exports.getStoredEmail = exports.storeInDynamo = exports.sendReply = exports.processEmail = exports.getRawEmail = undefined;

var _get_raw_email = __webpack_require__(15);

var _process_email = __webpack_require__(17);

var _send_reply = __webpack_require__(18);

var _store_in_dynamo = __webpack_require__(19);

var _get_stored_email = __webpack_require__(16);

var _get_collection = __webpack_require__(14);

var _delete_from_dynamo = __webpack_require__(13);

var _collections_process = __webpack_require__(12);

var _clear_cache = __webpack_require__(11);

var _localise = __webpack_require__(4);

exports.getRawEmail = _get_raw_email.getRawEmail;
exports.processEmail = _process_email.processEmail;
exports.sendReply = _send_reply.sendReply;
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

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("express-dot-engine");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("serve-favicon");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearCache = undefined;

var _cloudflare = __webpack_require__(26);

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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collectionsProcess = undefined;

var _dynamo = __webpack_require__(1);

var _dynamo2 = _interopRequireDefault(_dynamo);

var _shortid = __webpack_require__(5);

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
/* 13 */
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
/* 14 */
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRawEmail = undefined;

var _s = __webpack_require__(20);

var _s2 = _interopRequireDefault(_s);

var _environment = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getRawEmail = function getRawEmail(id) {
  return _s2.default.get(id, _environment.config.S3_BUCKET);
};

exports.getRawEmail = getRawEmail;

/***/ }),
/* 16 */
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addTimeSince = exports.preRender = exports.processEmail = undefined;

var _mailparser = __webpack_require__(30);

var _mailparser2 = _interopRequireDefault(_mailparser);

var _sanitizeHtml = __webpack_require__(3);

var _sanitizeHtml2 = _interopRequireDefault(_sanitizeHtml);

var _shortid = __webpack_require__(5);

var _shortid2 = _interopRequireDefault(_shortid);

var _imgur = __webpack_require__(23);

var _imgur2 = _interopRequireDefault(_imgur);

var _localise = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sanitizeOptions = {
  // allowedTags: [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
  // 'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
  // 'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'img' ],
  allowedTags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol', 'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div', 'thead', 'caption', 'img', 'dir', 'marquee', 'font'],
  allowedAttributes: {
    a: ['href', 'name', 'target', 'rel'],
    // We don't currently allow img itself by default, but this
    // would make sense if we did
    img: ['src', 'width'],
    p: ['dir'],
    div: ['dir'],
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
  var lang3 = (0, _localise.detectLanguage)(email);
  email.language = (0, _localise.langCode3to2)(lang3);
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

var processEmail = function processEmail(rawEmail) {
  return parseMail(rawEmail).then(tidyEmail).then(setLanguage).then(processImages).then(sanitize).then(filterLinks).then(function (_ref) {
    var messageId = _ref.messageId,
        to = _ref.to,
        from = _ref.from,
        cc = _ref.cc,
        bcc = _ref.bcc,
        subject = _ref.subject,
        html = _ref.html,
        date = _ref.date,
        language = _ref.language;


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
    }).join(',').match(/(staging|page|email)(?:\+)([\w]+)(?:@publishthis.email)/);

    var output = {
      to: to,
      from: from,
      subject: subject,
      html: html,
      messageId: _shortid2.default.generate(),
      headerMessageId: messageId,
      timeAdded: new Date().getTime(),
      language: language,
      editKey: _shortid2.default.generate() + _shortid2.default.generate()
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
  });
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
exports.preRender = preRender;
exports.addTimeSince = addTimeSince;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendReply = undefined;

var _ses = __webpack_require__(21);

var _ses2 = _interopRequireDefault(_ses);

var _dot = __webpack_require__(27);

var _dot2 = _interopRequireDefault(_dot);

var _replyEmail = __webpack_require__(24);

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

  mailObj.pteDomain = stagingTest.test(emailStr) ? 'http://staging.publishthis.email' : 'http://www.publishthis.email';

  // set reply template for the appropriate language
  var replyTemplate = _dot2.default.template(_replyEmail.replyEmails[mailObj.language]);
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
/* 19 */
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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _aws = __webpack_require__(2);

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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _aws = __webpack_require__(2);

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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _aws = __webpack_require__(2);

var _aws2 = _interopRequireDefault(_aws);

var _environment = __webpack_require__(0);

var _express = __webpack_require__(7);

var _express2 = _interopRequireDefault(_express);

var _expressDotEngine = __webpack_require__(8);

var _expressDotEngine2 = _interopRequireDefault(_expressDotEngine);

var _serveFavicon = __webpack_require__(10);

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _sanitizeHtml = __webpack_require__(3);

var _sanitizeHtml2 = _interopRequireDefault(_sanitizeHtml);

var _actions = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var path = __webpack_require__(9);

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

app.get('/create/:messageId', function (req, res) {
  // var messageId = 'ucfq0pevg0cmkhs86b30p4u87vfbtkov3etii5o1' // arabic
  // var messageId = 'rdki1plbl1bv7snds28k66rpbuvdtcrcf11d1rg1' // chinese
  // var messageId = 'pvom20688e6s4utam0r2uiukld52khsqci21ca01' // russian
  // var messageId = 'j6pc17lq9unlq12va42jf749vcd7k5u47plfhhg1' // French
  // var messageId = '7kt4cpfjbepjkl8ldgku1ggmp8lkm9ii3dasfu81' // English + collection
  var messageId = '235ms787oko9iibmpukok2gmrku5rh3sdckrn181'; //testing

  (0, _actions.getRawEmail)(messageId).then(_actions.processEmail)
  // .then(email => {
  //   console.log(email)
  // })
  .then(_actions.collectionsProcess).then(_actions.storeInDynamo).then(_actions.sendReply)
  // .then(result => {
  //   console.log('stored email:')
  //   console.log(result)
  //   res.send(true)
  // })
  .catch(function (e) {
    return console.log(e);
  });
});

app.get('/:messageId/delete/:editKey', function (req, res) {
  // check for collection
  (0, _actions.getStoredEmail)(req.params.messageId).then(function (mailObj) {
    // check for match of edit key
    if (mailObj.editKey == req.params.editKey) {
      var deleteParams = {
        messageId: req.params.messageId,
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

app.get('/:messageId', function (req, res) {
  // console.log(req.params)
  (0, _actions.getStoredEmail)(req.params.messageId).then(_actions.preRender).then(function (mailObj) {
    mailObj.html = mailObj.html.replace(/<p><br \/>\n<\/p>/g, ''); //attempting to tidy breaks

    // set footer language
    if (!mailObj.language) {
      mailObj.language = 'en';
    }

    // page or email
    if (mailObj.to[0].address.startsWith('page')) {

      res.render('page', mailObj);
    } else {
      mailObj.timestamp = new Date(mailObj.timeAdded).toString();
      res.render('email', mailObj);
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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _imgur = __webpack_require__(29);

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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
     value: true
});
var replyEmails = {
     'ar': '<div dir="rtl">\n       <p>\u0645\u0631\u062D\u0628\u0627,</p>\n       <p>\u0644\u0642\u062F \u062A\u0644\u0642\u064A\u0646\u0627 \u0628\u0631\u064A\u062F\u0643 \u0627\u0644\u0627\u0644\u0643\u062A\u0631\u0648\u0646\u064A <strong>{{=it.subject}}</strong>, \u0642\u0645 \u0628\u062A\u062D\u0648\u064A\u0644\u0629 \u0627\u0644\u064A \u0635\u0641\u062D\u0629 \u0639\u0644\u064A \u0627\u0644\u0646\u062A\u0631\u0646\u062A  \u0648 \u0627\u0646\u0634\u0631\u0629 \u0647\u0646\u0627:</p>\n       <p><a href="{{=it.pteDomain}}/{{=it.messageId}}">{{=it.pteDomain}}/{{=it.messageId}}</a></p>\n       <p><strong>\u062A\u0634\u0643\u0631\u0643.<a href="https://www.publishthis.email">publishthis.email</a></strong></p>\n       <p>\u0627\u062D\u0630\u0641 \u0635\u0641\u062D\u062A\u0643: <a href="{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}">{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}</a></p>\n       {{? it.collectionId}}\n       <p>\u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062D\u0629 \u062C\u0632\u0621 \u0645\u0646 \u0645\u062C\u0645\u0648\u0639\u0629: <a href="{{=it.pteDomain}}/c/{{=it.collectionId}}">{{=it.pteDomain}}/c/{{=it.collectionId}}</a></p>\n       {{?}}\n       </div>\n       ',
     'es': '<p>Hola!</p>\n       <p>Hemos recibido tu email <strong>{{=it.subject}}</strong>, lo convertimos en una p\xE1gina web y la publicamos online en este enlace::</p>\n       <p><a href="{{=it.pteDomain}}/{{=it.messageId}}">{{=it.pteDomain}}/{{=it.messageId}}</a></p>\n       <p>Gracias de parte de <strong><a href="https://www.publishthis.email">publishthis.email</a></strong></p>\n       <p>Borra tu p\xE1gina: <a href="{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}">{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}</a></p>\n       {{? it.collectionId}}\n       <p>Esta p\xE1gina es parte de una colecci\xF3n: <a href="{{=it.pteDomain}}/c/{{=it.collectionId}}">{{=it.pteDomain}}/c/{{=it.collectionId}}</a></p>\n       {{?}}\n       ',
     'en': '<p>Good news!</p>\n       <p>We\u2019ve received your email <strong>{{=it.subject}}</strong>, converted it into a tidy little web page, and published it online here:</p>\n       <p><a href="{{=it.pteDomain}}/{{=it.messageId}}">{{=it.pteDomain}}/{{=it.messageId}}</a></p>\n       <p>For a brief moment there, you were the creator of the newest page on the internet. Congratulations.</p>\n       <p>Sadly, that moment has passed, but you can be the creator of the newest page on the internet at any time. Simply send another email to <a href="mailto:page@publishthis.email">page@publishthis.email</a> to publish a page, or <a href="mailto:email@publishthis.email">email@publishthis.email</a> to publish any email online - we\u2019ll reply with a link to your new page in seconds.</p>\n       <p>Until then,</p>\n       <p><strong>Thanks from <a href="https://www.publishthis.email">publishthis.email</a></strong></p>\n       <p>Delete your page: <a href="{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}">{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}</a></p>\n       {{? it.collectionId}}\n       <p>This page is part of a collection: <a href="{{=it.pteDomain}}/c/{{=it.collectionId}}">{{=it.pteDomain}}/c/{{=it.collectionId}}</a></p>\n       {{?}}\n       ',
     'ru': '<p>\u041F\u0440\u0438\u0432\u0435\u0442!</p>\n        <p>\u041C\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u0438 \u0432\u0430\u0448\u0435 \u043F\u0438\u0441\u044C\u043C\u043E <strong>{{=it.subject}}</strong>, \u043F\u0440\u0435\u0432\u0440\u0430\u0442\u0438\u043B\u0438 \u0435\u0433\u043E \u0432 \u0432\u0435\u0431-\u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0438 \u043E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043B\u0438 \u0435\u0433\u043E \u043F\u043E \u044D\u0442\u043E\u0439 \u0441\u0441\u044B\u043B\u043A\u0435:</p>\n        <p><a href="{{=it.pteDomain}}/{{=it.messageId}}">{{=it.pteDomain}}/{{=it.messageId}}</a></p>\n        <p><strong>\u0421\u043F\u0430\u0441\u0438\u0431\u043E \u0437\u0430 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 <a href="https://www.publishthis.email">publishthis.email</a></strong></p>\n        <p>\u0427\u0442\u043E\u0431\u044B \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0432\u0430\u0448\u0443 \u0432\u0435\u0431-\u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443, \u043F\u0435\u0440\u0435\u0439\u0434\u0438\u0442\u0435 \u043F\u043E \u0441\u0441\u044B\u043B\u043A\u0435: <a href="{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}">{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}</a></p>\n        {{? it.collectionId}}\n        <p>\u042D\u0442\u0430 \u0432\u0435\u0431-\u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0447\u0430\u0441\u0442\u044C\u044E \u043A\u043E\u043B\u043B\u0435\u043A\u0446\u0438\u0438: <a href="{{=it.pteDomain}}/c/{{=it.collectionId}}">{{=it.pteDomain}}/c/{{=it.collectionId}}</a></p>\n        {{?}}\n        ',
     'zh': '<p>\u60A8\u597D\uFF0C</p>\n       <p>\u6211\u4EEC\u5DF2\u6536\u5230\u60A8\u7684\u7535\u5B50\u90AE\u4EF6 <strong>{{=it.subject}}</strong>, \u5C06\u5176\u8F6C\u6362\u4E3A\u7F51\u9875\uFF0C\u5E76\u5728\u7EBF\u53D1\u5E03\uFF1A</p>\n       <p><a href="{{=it.pteDomain}}/{{=it.messageId}}">{{=it.pteDomain}}/{{=it.messageId}}</a></p>\n       <p><strong><a href="https://www.publishthis.email">publishthis.email</a></strong>\u611F\u8C22\u60A8</p>\n       <p>\u5220\u9664\u60A8\u7684\u9875\u9762\uFF1A <a href="{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}">{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}</a></p>\n       {{? it.collectionId}}\n       <p>\u6B64\u9875\u9762\u662F\u6C47\u96C6\u7684\u4E00\u90E8\u5206\uFF1A <a href="{{=it.pteDomain}}/c/{{=it.collectionId}}">{{=it.pteDomain}}/c/{{=it.collectionId}}</a></p>\n       {{?}}\n       ',
     'zh-t': '<p>\u60A8\u597D\uFF0C</p>\n        <p>\u6211\u5011\u5DF2\u6536\u5230\u60A8\u7684\u96FB\u5B50\u90F5\u4EF6l <strong>{{=it.subject}}</strong>\uFF0C\u5C07\u5176\u8F49\u63DB\u70BA\u7DB2\u9801\uFF0C\u4E26\u5728\u7DDA\u767C\u5E03\uFF1A</p>\n        <p><a href="{{=it.pteDomain}}/{{=it.messageId}}">{{=it.pteDomain}}/{{=it.messageId}}</a></p>\n        <p><strong><a href="https://www.publishthis.email">publishthis.email</a></strong>\u611F\u8B1D\u60A8</p>\n        <p>\u522A\u9664\u60A8\u7684\u9801\u9762\uFF1A<a href="{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}">{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}</a></p>\n        {{? it.collectionId}}\n        <p>\u6B64\u9801\u9762\u662F\u532F\u96C6\u7684\u4E00\u90E8\u5206\uFF1A<a href="{{=it.pteDomain}}/c/{{=it.collectionId}}">{{=it.pteDomain}}/c/{{=it.collectionId}}</a></p>\n        {{?}}\n        '
};

exports.replyEmails = replyEmails;

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("aws-sdk");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("cloudflare");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("dot");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("franc-min");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("imgur");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("mailparser");

/***/ })
/******/ ])));