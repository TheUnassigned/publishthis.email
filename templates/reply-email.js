var replyEmails = {
  'ar': `<div dir="rtl">
       <p>مرحبا,</p>
       <p>لقد تلقينا بريدك الالكتروني <strong>{{=it.subject}}</strong>, قم بتحويلة الي صفحة علي النترنت  و انشرة هنا:</p>
       <p><a href="{{=it.pteDomain}}/{{=it.messageId}}">{{=it.pteDomain}}/{{=it.messageId}}</a></p>
       <p><strong>تشكرك.<a href="https://www.publishthis.email">publishthis.email</a></strong></p>
       <p>احذف صفحتك: <a href="{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}">{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}</a></p>
       {{? it.collectionId}}
       <p>هذه الصفحة جزء من مجموعة: <a href="{{=it.pteDomain}}/c/{{=it.collectionId}}">{{=it.pteDomain}}/c/{{=it.collectionId}}</a></p>
       {{?}}
       </div>
       `,
  'es': `<p>Hola!</p>
       <p>Hemos recibido tu email <strong>{{=it.subject}}</strong>, lo convertimos en una página web y la publicamos online en este enlace::</p>
       <p><a href="{{=it.pteDomain}}/{{=it.messageId}}">{{=it.pteDomain}}/{{=it.messageId}}</a></p>
       <p>Gracias de parte de <strong><a href="https://www.publishthis.email">publishthis.email</a></strong></p>
       <p>Borra tu página: <a href="{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}">{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}</a></p>
       {{? it.collectionId}}
       <p>Esta página es parte de una colección: <a href="{{=it.pteDomain}}/c/{{=it.collectionId}}">{{=it.pteDomain}}/c/{{=it.collectionId}}</a></p>
       {{?}}
       `,
  'en': `<p>Good news!</p>
       <p>We’ve received your email <strong>{{=it.subject}}</strong>, converted it into a tidy little web page, and published it online here:</p>
       <p><a href="{{=it.pteDomain}}/{{=it.messageId}}">{{=it.pteDomain}}/{{=it.messageId}}</a></p>
       <p>For a brief moment there, you were the creator of the newest page on the internet. Congratulations.</p>
       <p>Sadly, that moment has passed, but you can be the creator of the newest page on the internet at any time. Simply send another email to <a href="mailto:page@publishthis.email">page@publishthis.email</a> to publish a page, or <a href="mailto:email@publishthis.email">email@publishthis.email</a> to publish any email online instantly - we’ll reply with a link to your new page almost instantly.</p>
       <p>Until then,</p>
       <p><strong>Thanks from <a href="https://www.publishthis.email">publishthis.email</a></strong></p>
       <p>Delete your page: <a href="{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}">{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}</a></p>
       {{? it.collectionId}}
       <p>This page is part of a collection: <a href="{{=it.pteDomain}}/c/{{=it.collectionId}}">{{=it.pteDomain}}/c/{{=it.collectionId}}</a></p>
       {{?}}
       `,
    'ru': `<p>Привет!</p>
        <p>Мы получили ваше письмо <strong>{{=it.subject}}</strong>, превратили его в веб-страницу и опубликовали его по этой ссылке:</p>
        <p><a href="{{=it.pteDomain}}/{{=it.messageId}}">{{=it.pteDomain}}/{{=it.messageId}}</a></p>
        <p><strong>Спасибо за использование <a href="https://www.publishthis.email">publishthis.email</a></strong></p>
        <p>Чтобы удалить вашу веб-страницу, перейдите по ссылке: <a href="{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}">{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}</a></p>
        {{? it.collectionId}}
        <p>Эта веб-страница является частью коллекции: <a href="{{=it.pteDomain}}/c/{{=it.collectionId}}">{{=it.pteDomain}}/c/{{=it.collectionId}}</a></p>
        {{?}}
        `,
  'zh': `<p>您好，</p>
       <p>我们已收到您的电子邮件 <strong>{{=it.subject}}</strong>, 将其转换为网页，并在线发布：</p>
       <p><a href="{{=it.pteDomain}}/{{=it.messageId}}">{{=it.pteDomain}}/{{=it.messageId}}</a></p>
       <p><strong><a href="https://www.publishthis.email">publishthis.email</a></strong>感谢您</p>
       <p>删除您的页面： <a href="{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}">{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}</a></p>
       {{? it.collectionId}}
       <p>此页面是汇集的一部分： <a href="{{=it.pteDomain}}/c/{{=it.collectionId}}">{{=it.pteDomain}}/c/{{=it.collectionId}}</a></p>
       {{?}}
       `,
 'zh-t': `<p>您好，</p>
        <p>我們已收到您的電子郵件l <strong>{{=it.subject}}</strong>，將其轉換為網頁，並在線發布：</p>
        <p><a href="{{=it.pteDomain}}/{{=it.messageId}}">{{=it.pteDomain}}/{{=it.messageId}}</a></p>
        <p><strong><a href="https://www.publishthis.email">publishthis.email</a></strong>感謝您</p>
        <p>刪除您的頁面：<a href="{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}">{{=it.pteDomain}}/{{=it.messageId}}/delete/{{=it.editKey}}</a></p>
        {{? it.collectionId}}
        <p>此頁面是匯集的一部分：<a href="{{=it.pteDomain}}/c/{{=it.collectionId}}">{{=it.pteDomain}}/c/{{=it.collectionId}}</a></p>
        {{?}}
        `
}

export { replyEmails }
