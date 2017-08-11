var replyEmails = {
'ar': `<div dir="rtl">
<p>مرحبا,</p>
<p>لقد تلقينا بريدك الإلكتروني <strong>{{=it.subject}}</strong>,  , ثم قمنا بتحويله الي صفحة ويب ونشرناه علي الإنترنت هنا:</p>
<p><a href="https://publishth.is/{{=it.messageId}}">https://publishth.is/{{=it.messageId}}</a></p>
{{? it.slug}}<p><a href="{{=it.pteDomain}}/{{=it.slug}}-{{=it.messageId}}">{{=it.pteDomain}}/{{=it.slug}}-{{=it.messageId}}</a></p>{{?}}
<p><strong>شكرا لك،<a href="https://www.publishthis.email">publishthis.email</a></strong></p>
<p>احذف صفحتك: <a href="{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}">{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}</a></p>
{{? it.collectionId}}
<p>هذه الصفحة جزء من مجموعة: <a href="{{=it.pteDomain}}/c/{{=it.collectionId}}">{{=it.pteDomain}}/c/{{=it.collectionId}}</a></p>
{{?}}
</div>
`,
'es': `<p>Hola!</p>
<p>Hemos recibido tu email <strong>{{=it.subject}}</strong>, lo convertimos en una página web y la publicamos online en este enlace::</p>
<p><a href="https://publishth.is/{{=it.messageId}}">https://publishth.is/{{=it.messageId}}</a></p>
{{? it.slug}}<p><a href="{{=it.pteDomain}}/{{=it.slug}}-{{=it.messageId}}">{{=it.pteDomain}}/{{=it.slug}}-{{=it.messageId}}</a></p>{{?}}
<p>Gracias de parte de <strong><a href="https://www.publishthis.email">publishthis.email</a></strong></p>
<p>Borra tu página: <a href="{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}">{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}</a></p>
{{? it.collectionId}}
<p>Esta página es parte de una colección: <a href="{{=it.pteDomain}}/c/{{=it.collectionId}}">{{=it.pteDomain}}/c/{{=it.collectionId}}</a></p>
{{?}}
`,
'en': `
<!DOCTYPE html><html> <head> <meta name="viewport" content="width=device-width"> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <title>{{=it.subject}}</title> <style type="text/css"> /* ------------------------------------- RESPONSIVE AND MOBILE FRIENDLY STYLES ------------------------------------- */ @media only screen and (max-width: 620px){table[class=body] h1{font-size: 28px !important; margin-bottom: 10px !important;}table[class=body] p, table[class=body] ul, table[class=body] ol, table[class=body] td, table[class=body] span, table[class=body] a{font-size: 16px !important;}table[class=body] .wrapper, table[class=body] .article{padding: 10px !important;}table[class=body] .content{padding: 0 !important;}table[class=body] .container{padding: 0 !important; width: 100% !important;}table[class=body] .main{border-left-width: 0 !important; border-radius: 0 !important; border-right-width: 0 !important;}table[class=body] .btn table{width: 100% !important;}table[class=body] .btn a{width: 100% !important;}table[class=body] .img-responsive{height: auto !important; max-width: 100% !important; width: auto !important;}}/* ------------------------------------- PRESERVE THESE STYLES IN THE HEAD ------------------------------------- */ @media all{.ExternalClass{width: 100%;}.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div{line-height: 100%;}.apple-link a{color: inherit !important; font-family: inherit !important; font-size: inherit !important; font-weight: inherit !important; line-height: inherit !important; text-decoration: none !important;}.btn-primary table td:hover{background-color: #34495e !important;}.btn-primary a:hover{background-color: #34495e !important; border-color: #34495e !important;}}</style> </head> <body class="" style="background-color:#f6f6f6;font-family:sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;line-height:1.4;margin:0;padding:0;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;"> <table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#f6f6f6;width:100%;"> <tr> <td style="font-family:sans-serif;font-size:14px;vertical-align:top;">&nbsp;</td><td class="container" style="font-family:sans-serif;font-size:14px;vertical-align:top;display:block;max-width:580px;padding:10px;width:580px;Margin:0 auto !important;"> <div class="content" style="box-sizing:border-box;display:block;Margin:0 auto;max-width:580px;padding:10px;"> <span class="preheader" style="color:transparent;display:none;height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;visibility:hidden;width:0;">Success! Your page has been published.</span> <table class="main" style="border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;background:#fff;border-radius:3px;width:100%;"> <tr> <td class="wrapper" style="font-family:sans-serif;font-size:14px;vertical-align:top;box-sizing:border-box;padding:20px;"> <table border="0" cellpadding="0" cellspacing="0" style="border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;"> <tr> <td style="font-family:sans-serif;font-size:14px;vertical-align:top;"> <p style="font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;">Good news!</p><p style="font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;">We’ve received your email <strong>{{=it.subject}}</strong>, converted it into a tidy little web page and published it online:</p><p style="font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;"><a href="https://publishth.is/{{=it.messageId}}" style="color:#FF5468;text-decoration:underline;">https://publishth.is/{{=it.messageId}}</a></p>{{? it.slug}}<p style="font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;"><a href="{{=it.pteDomain}}/{{=it.slug}}-{{=it.messageId}}" style="color:#FF5468;text-decoration:underline;">{{=it.pteDomain}}/{{=it.slug}}-{{=it.messageId}}</a></p>{{?}}<p style="font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;">For a brief moment you were the creator of the newest page on the internet. Congratulations.</p><p style="font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;">Sadly, that moment has passed. But you can be the creator of the newest page on the internet at any time. Simply send another email to <a href="mailto:page@publishthis.email" style="color:#FF5468;text-decoration:underline;">page@publishthis.email</a> to publish a page - we’ll reply with a link to your new page in seconds.</p><p style="font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;">Delete your page: <a href="{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}" style="color:#FF5468;text-decoration:underline;">{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}</a></p>{{? it.collectionId}}<p style="font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;">This page is part of your <strong>{{=it.label}}</strong> collection. Any pages you send to <strong>page+{{=it.label}}@publishthis.email</strong> will be added to this collection: <a href="{{=it.pteDomain}}/c/{{=it.collectionId}}" style="color:#FF5468;text-decoration:underline;">{{=it.pteDomain}}/c/{{=it.collectionId}}</a></p>{{?}}<p style="font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;">Thanks,</p><a href="https://www.publishthis.email" style="color:#FF5468;text-decoration:underline;"><img src="http://i.imgur.com/QoCKNTi.png" width="262px" style="border:none;-ms-interpolation-mode:bicubic;max-width:100%;"/></a> </td></tr></table> </td></tr></table> <div class="footer" style="clear:both;padding-top:10px;text-align:center;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" style="border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;"> <tr> <td class="content-block" style="font-family:sans-serif;font-size:14px;vertical-align:top;color:#999999;font-size:12px;text-align:center;"> <span class="apple-link" style="color:#999999;font-size:12px;text-align:center;">Publish This Email Pty Ltd, 6/63 Elizabeth St, Richmond, VIC 3121, Australia</span></td></tr><!-- <tr> <td class="content-block powered-by"> Powered by <a href="http://htmlemail.io">HTMLemail</a>. </td></tr>--> </table> </div></div></td><td style="font-family:sans-serif;font-size:14px;vertical-align:top;">&nbsp;</td></tr></table> </body></html>
`,
'ru': `<p>Привет!</p>
<p>Мы получили ваше письмо <strong>{{=it.subject}}</strong>, превратили его в веб-страницу и опубликовали его по этой ссылке:</p>
<p><a href="https://publishth.is/{{=it.messageId}}">https://publishth.is/{{=it.messageId}}</a></p>
{{? it.slug}}<p><a href="{{=it.pteDomain}}/{{=it.slug}}-{{=it.messageId}}">{{=it.pteDomain}}/{{=it.slug}}-{{=it.messageId}}</a></p>{{?}}
<p><strong>Спасибо за использование <a href="https://www.publishthis.email">publishthis.email</a></strong></p>
<p>Чтобы удалить вашу веб-страницу, перейдите по ссылке: <a href="{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}">{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}</a></p>
{{? it.collectionId}}
<p>Эта веб-страница является частью коллекции: <a href="{{=it.pteDomain}}/c/{{=it.collectionId}}">{{=it.pteDomain}}/c/{{=it.collectionId}}</a></p>
{{?}}
`,
'zh': `<p>您好，</p>
<p>我们已收到您的电子邮件 <strong>{{=it.subject}}</strong>, 将其转换为网页，并在线发布：</p>
<p><a href="https://publishth.is/{{=it.messageId}}">https://publishth.is/{{=it.messageId}}</a></p>
{{? it.slug}}<p><a href="{{=it.pteDomain}}/{{=it.slug}}-{{=it.messageId}}">{{=it.pteDomain}}/{{=it.slug}}-{{=it.messageId}}</a></p>{{?}}
<p><strong><a href="https://www.publishthis.email">publishthis.email</a></strong>感谢您</p>
<p>删除您的页面： <a href="{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}">{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}</a></p>
{{? it.collectionId}}
<p>此页面是汇集的一部分： <a href="{{=it.pteDomain}}/c/{{=it.collectionId}}">{{=it.pteDomain}}/c/{{=it.collectionId}}</a></p>
{{?}}
`,
'zh-t': `<p>您好，</p>
<p>我們已收到您的電子郵件l <strong>{{=it.subject}}</strong>，將其轉換為網頁，並在線發布：</p>
<p><a href="https://publishth.is/{{=it.messageId}}">https://publishth.is/{{=it.messageId}}</a></p>
{{? it.slug}}<p><a href="{{=it.pteDomain}}/{{=it.slug}}-{{=it.messageId}}">{{=it.pteDomain}}/{{=it.slug}}-{{=it.messageId}}</a></p>{{?}}
<p><strong><a href="https://www.publishthis.email">publishthis.email</a></strong>感謝您</p>
<p>刪除您的頁面：<a href="{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}">{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}</a></p>
{{? it.collectionId}}
<p>此頁面是匯集的一部分：<a href="{{=it.pteDomain}}/c/{{=it.collectionId}}">{{=it.pteDomain}}/c/{{=it.collectionId}}</a></p>
{{?}}
`
}

export { replyEmails }
