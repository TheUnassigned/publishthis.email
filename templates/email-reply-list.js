var listReply = {
'en': `
<p>You've published a new post for your list.</p>
<p>See it online here:</p>
<p>http://www.publishthis.email/{{=it.mailObj.messageId}}</p>
<p>preview your email below</p>
<p>==========</p>
{{=it.mailObj.html}}
`
}

export { listReply }
