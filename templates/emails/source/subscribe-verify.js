var tplSubscribeVerify = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8"> <!-- utf-8 works for most cases -->
  <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
  <meta name="x-apple-disable-message-reformatting">  <!-- Disable auto-scale in iOS 10 Mail entirely -->
  <titleVerify your email address.</title> <!-- The title tag shows in email notifications, like Android 4.4. -->

    <!-- CSS Reset -->
    <style>

    /* What it does: Remove spaces around the email design added by some email clients. */
    /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */
    html,
    body {
      margin: 0 auto !important;
      padding: 0 !important;
      height: 100% !important;
      width: 100% !important;
    }

    /* What it does: Stops email clients resizing small text. */
    * {
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
    }

    /* What it does: Centers email on Android 4.4 */
    div[style*="margin: 16px 0"] {
      margin:0 !important;
    }

    /* What it does: Stops Outlook from adding extra spacing to tables. */
    table,
    td {
      mso-table-lspace: 0pt !important;
      mso-table-rspace: 0pt !important;
    }

    /* What it does: Fixes webkit padding issue. Fix for Yahoo mail table alignment bug. Applies table-layout to the first 2 tables then removes for anything nested deeper. */
    table {
      border-spacing: 0 !important;
      border-collapse: collapse !important;
      table-layout: fixed !important;
      margin: 0 auto !important;
    }
    table table table {
      table-layout: auto;
    }

    /* What it does: Uses a better rendering method when resizing images in IE. */
    img {
      -ms-interpolation-mode:bicubic;
    }

    /* What it does: A work-around for email clients meddling in triggered links. */
    *[x-apple-data-detectors],	/* iOS */
    .x-gmail-data-detectors, 	/* Gmail */
    .x-gmail-data-detectors *,
    .aBn {
      border-bottom: 0 !important;
      cursor: default !important;
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
    }

    /* What it does: Prevents Gmail from displaying an download button on large, non-linked images. */
    .a6S {
      display: none !important;
      opacity: 0.01 !important;
    }
    /* If the above doesn't work, add a .g-img class to any image in question. */
    img.g-img + div {
      display:none !important;
    }

    /* What it does: Prevents underlining the button text in Windows 10 */
    .button-link {
      text-decoration: none !important;
    }

    /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */
    /* Create one of these media queries for each additional viewport size you'd like to fix */
    /* Thanks to Eric Lepetit (@ericlepetitsf) for help troubleshooting */
    @media only screen and (min-device-width: 375px) and (max-device-width: 413px) { /* iPhone 6 and 6+ */
      .email-container {
        min-width: 375px !important;
      }
    }

    </style>

    <!-- Progressive Enhancements -->
    <style>

    /* What it does: Hover styles for buttons */
    .button-td,
    .button-a {
      transition: all 100ms ease-in;
    }
    .button-td:hover,
    .button-a:hover {
      background: #555555 !important;
      border-color: #555555 !important;
    }

    /* Media Queries */
    @media screen and (max-width: 600px) {

      /* What it does: Adjust typography on small screens to improve readability */
      .email-container p {
        font-size: 17px !important;
        line-height: 22px !important;
      }

    }

    </style>

    <!-- What it does: Makes background images in 72ppi Outlook render at correct size. -->
    <!--[if gte mso 9]>
    <xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]-->

</head>
<body width="100%" bgcolor="#f7f7f7" style="margin: 0; mso-line-height-rule: exactly;">
  <center style="width: 100%; background: #f7f7f7; text-align: left;">

    <!-- Visually Hidden Preheader Text : BEGIN -->
    <div style="display:none;font-size:1px;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;mso-hide:all;font-family: sans-serif;">
      Verify your email address.
    </div>
    <!-- Visually Hidden Preheader Text : END -->

    <!--
    Set the email width. Defined in two places:
    1. max-width for all clients except Desktop Windows Outlook, allowing the email to squish on narrow but never go wider than 600px.
    2. MSO tags for Desktop Windows Outlook enforce a 600px width.
  -->
  <div style="max-width: 600px; margin: auto;" class="email-container">
    <!--[if mso]>
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" align="center">
    <tr>
    <td>
    <![endif]-->

    <!-- Clear Spacer : BEGIN -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
      <tr>
        <td aria-hidden="true" height="40" style="font-size: 0; line-height: 0;">
          &nbsp;
        </td>
      </tr>
    </table>
    <!-- Clear Spacer : END -->

    <!-- Email Body : BEGIN -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 600px;">

      <!-- 1 Column Text + Button : BEGIN -->
      <tr>
        <td bgcolor="#ffffff">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
              <td style="padding: 40px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;">
                <h2>Please verify your email address</h2>
                <p>Hi there,</p>
                <p>Please click the link below to verify your email address and begin receiving updates.</p>
              </td>
            </tr>
            <tr>
              <td style="padding: 0 40px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;">
                <!-- Button : BEGIN -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: auto;">
                  <tr>
                    <td style="border-radius: 3px; background: #FF5468; text-align: center;" class="button-td">
                      <a href="https://www.publishthis.email/verify?sid={{=it.subscriberId}}" style="background: #FF5468; border: 15px solid #FF5468; font-family: sans-serif; font-size: 13px; line-height: 1.1; text-align: center; text-decoration: none; display: block; border-radius: 3px; font-weight: bold;" class="button-a">
                        <span style="color:#ffffff;" class="button-link">&nbsp;&nbsp;&nbsp;&nbsp;Confirm my email address&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      </a>
                    </td>
                  </tr>
                </table>
                <!-- Button : END -->
              </td>
            </tr>
            <tr>
              <td style="padding: 40px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;">
                <p>Thanks</p>
                <p><a href="https://www.publishthis.email"><img src="http://i.imgur.com/QoCKNTi.png" width="262px"/></a></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <!-- 1 Column Text + Button : END -->

      <!-- Clear Spacer : BEGIN -->
      <tr>
        <td aria-hidden="true" height="40" style="font-size: 0; line-height: 0;">
          &nbsp;
        </td>
      </tr>
      <!-- Clear Spacer : END -->

    </table>
    <!-- Email Body : END -->

    <!-- Email Footer : BEGIN -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 680px;">
      <tr>
        <td style="padding: 20px 10px;width: 100%;font-size: 12px; font-family: sans-serif; line-height:18px; text-align: center; color: #888888;" class="x-gmail-data-detectors">
          <!-- <webversion style="color:#cccccc; text-decoration:underline; font-weight: bold;">View as a Web Page</webversion> -->
          <br>
          Publish This Email Pty Ltd<br>Unit 6, 63 Elizabeth St, Richmond, VIC 3121, Australia
          <br>
          <!-- <unsubscribe style="color:#888888; text-decoration:underline;">unsubscribe</unsubscribe> -->
        </td>
      </tr>
    </table>
    <!-- Email Footer : END -->

    <!--[if mso]>
  </td>
</tr>
</table>
<![endif]-->
</div>

</center>
</body>
</html>
`
export { tplSubscribeVerify }
