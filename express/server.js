'use strict';

import AWS, { updateConfig } from '/config/aws'
import { config } from '/config/environment'
import express from 'express'
import dot from 'express-dot-engine'
import favicon from 'serve-favicon'
import sanitizeHtml from 'sanitize-html'
import {
  getRawEmail,
  processEmail,
  sendReply,
  storeInDynamo,
  getStoredEmail,
  deleteEmailFromDynamo,
  deleteCollectionItemFromDynamo,
  preRender,
  addTimeSince,
  getCollection,
  clearCache,
  useLanguage,
  acceptLanguages
} from '/actions'

const app = express()
const path = require('path');

updateConfig()

app.engine('dot', dot.__express)
app.set('views', './templates')
app.set('view engine', 'dot')

app.use(express.static(path.resolve(__dirname, 'public')))
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.get('/', function (req, res) {
  // console.log('browser language: ', req.headers['accept-language'])
  // console.log('accepted language: ', req.acceptsLanguages(acceptLanguages))
  // if(req.query.lang && acceptLanguages.includes(req.query.lang)){
  //   var langCode = req.query.lang.substring(0,2)
  //
  //   if(['zh-hk', 'zh-sg', 'zh-tw'].includes(req.query.lang)){
  //     langCode = req.query.lang // traditional chinese
  //   }
  //   res.render(langCode + '/index');
  // }else{
  //   res.render(useLanguage(req) + '/index');
  // }
  var lang = useLanguage(req)
  if(lang == 'en'){
    res.render('en' + '/index');
  }else{
    res.redirect(301, '/' + lang + '/')
  }

})

app.get('/ar/', function (req, res) { res.render('ar' + '/index') })
app.get('/en/', function (req, res) { res.render('en' + '/index') })
app.get('/es/', function (req, res) { res.render('es' + '/index') })
app.get('/ru/', function (req, res) { res.render('ru' + '/index') })
app.get('/zh/', function (req, res) { res.render('zh' + '/index') })
app.get('/zh-sg/', function (req, res) { res.render('zh-t' + '/index') })
app.get('/zh-hk/', function (req, res) { res.render('zh-t' + '/index') })
app.get('/zh-tw/', function (req, res) { res.render('zh-t' + '/index') })

app.get('/create/:messageId', function (req, res) {
  var messageId = 'ida4g8pdkjesfso6m5d6skkrvcd7l4r8gbp60ng1' // large images

  getRawEmail(messageId)
  .then(processEmail)
  .then(email => {
    console.log(email)
  })
  // .then(storeInDynamo)
  // .then(sendReply)
  // .then(result => {
  //   console.log('stored email:')
  //   console.log(result)
  //   res.send(true)
  // })
  .catch(e => console.log(e))
})

app.get('/:messageId/delete/:editKey', (req, res) => {
  // check for collection
  getStoredEmail(req.params.messageId)
  .then(mailObj => {
    // check for match of edit key
    if(mailObj.editKey == req.params.editKey){
      const deleteParams = {
        messageId: req.params.messageId,
        editKey: req.params.editKey
      }

      // delete email from main table
      deleteEmailFromDynamo(deleteParams)
      .then(result => {
        const alert = {
          title: 'Page deleted',
          message: 'Please note that the page may still be cached in your browser.'
        }
        res.render('alert', alert)
        // clear cache
        var cfParams = {
          files: [
            'http://www.publishthis.email/' + result.messageId,
            'https://www.publishthis.email/' + result.messageId
          ]
        }
        clearCache(cfParams)
      })
      .catch(e => {
        console.log(e)
      })

      // check for collection
      if(mailObj.collectionId){
        const deleteCollectionParams = {
          collectionId: mailObj.collectionId,
          messageId: mailObj.messageId,
          timeAdded: mailObj.timeAdded
        }
        // console.log(deleteCollectionParams)
        // delete from collection
        deleteCollectionItemFromDynamo(deleteCollectionParams)
        .then(result => {
          // console.log('DELETED:', result)
        })
        .catch(e => {
          console.log(e);
        })

      }
    }else{
      const alert = {
        title: 'Invalid delete link',
        message: 'It looks like you are trying to delete an email, but the link you have clicked appears to be invalid, or the page no longer exists.'
      }
      res.render('alert', alert)
    }
  })
  .catch(e => {
    console.log(e)
  })
})

app.get('/:messageId', (req, res) => {
  // console.log(req.params)
  getStoredEmail(req.params.messageId)
  .then(preRender)
  .then(mailObj => {
    mailObj.html = mailObj.html.replace(/<p><br \/>\n<\/p>/g, '')
    if(mailObj.to[0].address.startsWith('page')){

      res.render('page', mailObj)
    }else{
      mailObj.timestamp = (new Date(mailObj.timeAdded)).toString()
      res.render('email', mailObj)
    }
  })
  .catch(e => {
    // console.log(e)
    res.status(404)
    res.render('404')
  })
})

app.get('/c/:collectionId/more/:timeAdded', (req, res) => {
  console.log(req.params)

  var collectionParams = {
    id: req.params.collectionId,
    ExclusiveStartKey: { timeAdded: Number(req.params.timeAdded), collectionId: req.params.collectionId }
  }

  getCollection(collectionParams)
  .then(collection =>{
    res.render('partials/collection-items', collection)
  })
  .catch(e => {
    // console.log(e)
    res.status(404)
    res.render('404')
  })
})

app.get('/c/:collectionSlug', (req, res) => {
  // console.log(req.params)

  var slug = req.params.collectionSlug
  var slugArr = slug.split('-')
  var collectionId = slugArr[0]

  var collectionParams = {
    id: collectionId
  }

  if(slugArr.length > 1){
    collectionParams.title = sanitizeHtml(slugArr.slice(1).join(' '), {})
  }else{
    collectionParams.title = ' '
  }

  getCollection(collectionParams)
  .then(collection =>{
    collection.Items = addTimeSince(collection.Items)
    // console.log(collection)
    res.render('collection', collection)
  })
})

app.listen(config.PORT, function () {
  console.log(`Publish this email express app listening on port ${config.PORT}!`)
})
