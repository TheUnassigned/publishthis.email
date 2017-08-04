import * as fs from 'fs'

var tplPageReply = fs.readFileSync('./templates/emails/source/page-reply.html', 'utf8');
var tplListNew = fs.readFileSync('./templates/emails/source/list-new.html', 'utf8');
var tplListSendComplete = fs.readFileSync('./templates/emails/source/list-send-complete.html', 'utf8');
var tplListSendNoSubs = fs.readFileSync('./templates/emails/source/list-send-no-subs.html', 'utf8');
var tplDelivery = fs.readFileSync('./templates/emails/source/delivery.html', 'utf8');
var tplSubscribeVerify = fs.readFileSync('./templates/emails/source/subscribe-verify.html', 'utf8');

export {
  tplPageReply,
  tplListNew,
  tplListSendComplete,
  tplListSendNoSubs,
  tplDelivery,
  tplSubscribeVerify
}
