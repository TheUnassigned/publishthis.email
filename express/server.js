'use strict';

import AWS, { updateConfig } from '/config/aws'
import { config } from '/config/environment'
import express from 'express'
import request from 'request'
import doTexpress from 'express-dot-engine'
import favicon from 'serve-favicon'
import sanitizeHtml from 'sanitize-html'
import {
  getRawEmail,
  processEmail,
  processListEmail,
  sendReply,
  sendListPreview,
  storeInDynamo,
  getStoredEmail,
  deleteEmailFromDynamo,
  deleteCollectionItemFromDynamo,
  collectionsProcess,
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

app.engine('dot', doTexpress.__express)
app.set('views', './templates')
app.set('view engine', 'dot')

app.use(express.static(path.resolve(__dirname, 'public')))
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.get('/', function (req, res) {
  var lang = useLanguage(req) // get browser language
  if(lang == 'en'){
    res.render('en' + '/index')
  }else{
    res.redirect(301, '/' + lang + '/') // redirect to other languages
  }
})

app.get('/en/', function (req, res) { res.render('en' + '/index') })
app.get('/es/', function (req, res) { res.render('es' + '/index') })
app.get('/ru/', function (req, res) { res.render('ru' + '/index') })
app.get('/zh/', function (req, res) { res.render('zh' + '/index') })
app.get('/zh-sg/', function (req, res) { res.render('zh-t' + '/index') })
app.get('/zh-hk/', function (req, res) { res.render('zh-t' + '/index') })
app.get('/zh-tw/', function (req, res) { res.render('zh-t' + '/index') })
app.get('/ar/', function (req, res) { res.render('ar' + '/index') })

app.get('/name-your-list', function (req, res) {
  res.render('name-your-list')
})

app.get('/page-sent', function (req, res) {
  res.render('page-sent')
})

// bulk importer
// Unsubscribe endpoint
app.get('/bulk-import', function (req, res) {
  var lid = req.query.lid || ''
  var ek = req.query.ek || ''

  var context = {
    API_URL: config.API_URL,
    lid: lid,
    ek: ek
  }
  res.render('bulk-import', context)
})

// Verify endpoint for double opt-in, passes subscriberId to Lambda endpoint and returns success page or 404
app.get('/verify', function (req, res) {
  if(req.query.sid){
    var subscriberId = req.query.sid
    var url = config.API_URL + 'list/verify?subscriberId=' + subscriberId
    request(url, function (error, response, body) {
      res.render('email-verified')
    });
  }else{
    res.status(404)
    res.render('404')
  }
})

// Unsubscribe endpoint
app.get('/unsubscribe', function (req, res) {
  if(req.query.sid){
    var subscriberId = req.query.sid
    console.log(subscriberId)
    var url = config.API_URL + 'list/unsubscribe?subscriberId=' + subscriberId
    request(url, function (error, response, body) {
      console.log(error)
      console.log(body)
      res.render('unsubscribe-confirmed')
    })
  }else{
    res.status(404)
    res.render('404')
  }
})

// deliver endpoint
app.get('/deliver', function (req, res) {
  if(req.query.mid && req.query.sk){

    var url = `${config.API_URL}list/deliver?mid=${req.query.mid}&sk=${req.query.sk}`
    request(url, function (error, response, body) {
      // console.log(error)
      // console.log(body)
      console.log(body)
      var result = JSON.parse(body)
      console.log(result)
      if(result.success){
        var alert = { title: 'Send success', message: `Your message was delivered to your subscribers (${result.subscriber_count})` }
      }else{
        var alert = { title: 'Send failed', message: result.msg }
      }

      res.render('alert', alert)
    })
  }else{
    res.status(404)
    res.render('404')
  }
})


app.get('/create/:messageId', function (req, res) {
  // var messageId = '2ljatek3dgs5gthccq91ra632vr9epfc35re9mg1' // zh
  var messageId = '979jj082r465msi9qsdd5o1fea9v5o8fhr6luo81' // zh-t

  // list receive
  getRawEmail(messageId, config.S3_BUCKET_LIST)
  .then(processListEmail)
  .then(collectionsProcess)
  .then(storeInDynamo)
  .then(sendListPreview)
  .then(result => {
    console.log('successful receive:', messageId, result)
    callback(null, { "disposition" : "STOP_RULE_SET" })
  })
  .catch(err => console.log(err.stack))


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
})

app.get('/:slug/delete/:editKey', (req, res) => {
  //extract messageId from slug
  var slug = req.params.slug
  var messageId = slug.slice(slug.length - 9, slug.length)

  // check for collection
  getStoredEmail(messageId)
  .then(mailObj => {
    // check for match of edit key
    if(mailObj.editKey == req.params.editKey){
      const deleteParams = {
        messageId: messageId,
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

app.get('/:slug', (req, res) => {
  //extract messageId from slug
  var slug = req.params.slug
  var messageId = slug.slice(slug.length - 9, slug.length)

  getStoredEmail(messageId)
  .then(preRender)
  .then(mailObj => {

    mailObj.html = mailObj.html.replace(/<p><br \/>\n<\/p>/g, '') //attempting to tidy breaks
    // set footer language
    if(!mailObj.language){
      mailObj.language = 'en'
    }
    // add API url
    mailObj.API_URL = config.API_URL
    // page or email
    if(mailObj.to[0].address.startsWith('email')){
      mailObj.timestamp = (new Date(mailObj.timeAdded)).toString()
      res.render('email', mailObj)
    }else{
      res.render('page', mailObj)
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
