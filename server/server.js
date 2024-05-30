const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const postmark = require('postmark');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const emailTemplate = `<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <title></title><!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <style type="text/css">
        #outlook a {
            padding: 0;
        }

        body {
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }

        table,
        td {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }

        img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
        }

        p {
            display: block;
            margin: 13px 0;
        }
    </style>
    <!--[if mso]>         <noscript>         <xml>         <o:OfficeDocumentSettings>           <o:AllowPNG/>           <o:PixelsPerInch>96</o:PixelsPerInch>         </o:OfficeDocumentSettings>         </xml>         </noscript>         <![endif]--><!--[if lte mso 11]>         <style type="text/css">           .mj-outlook-group-fix { width:100% !important; }         </style>         <![endif]--><!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700" rel="stylesheet" type="text/css">
    <style type="text/css">
        @import url(https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700);
    </style><!--<![endif]-->
    <style type="text/css">
        @media only screen and (min-width:480px) {
            .mj-column-per-100 {
                width: 100% !important;
                max-width: 100%;
            }
        }
    </style>
    <style media="screen and (min-width:480px)">
        .moz-text-html .mj-column-per-100 {
            width: 100% !important;
            max-width: 100%;
        }
    </style>
    <style type="text/css">
        @media only screen and (max-width:480px) {
            table.mj-full-width-mobile {
                width: 100% !important;
            }

            td.mj-full-width-mobile {
                width: auto !important;
            }
        }
    </style>
</head>

<body style="word-spacing:normal;background-color:#f8f8f8;">
    <div style="background-color:#f8f8f8;">
        <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                style="background:#ffffff;background-color:#ffffff;width:100%;">
                <tbody>
                    <tr>
                        <td
                            style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-left:0px;padding-right:0px;padding-top:0px;text-align:center;">
                            <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                            <div class="mj-column-per-100 mj-outlook-group-fix"
                                style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                    style="vertical-align:top;" width="100%">
                                    <tbody>
                                        <tr>
                                            <td align="center"
                                                style="font-size:0px;padding:10px 25px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;word-break:break-word;">
                                                <p
                                                    style="border-top:solid 7px darkblue;font-size:1px;margin:0px auto;width:100%;">
                                                </p>
                                                <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 7px darkblue;font-size:1px;margin:0px auto;width:600px;" role="presentation" width="600px" ><tr><td style="height:0;line-height:0;"> &nbsp; </td></tr></table><![endif]-->
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div><!--[if mso | IE]></td></tr></table><![endif]-->
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                style="background:#ffffff;background-color:#ffffff;width:100%;">
                <tbody>
                    <tr>
                        <td
                            style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-top:0px;text-align:center;">
                            <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                            <div class="mj-column-per-100 mj-outlook-group-fix"
                                style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                               
                            </div><!--[if mso | IE]></td></tr></table><![endif]-->
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                style="background:#ffffff;background-color:#ffffff;width:100%;">
                <tbody>
                    <tr>
                        <td
                            style="direction:ltr;font-size:0px;padding:20px 0px 20px 0px;padding-bottom:50px;padding-top:20px;text-align:center;">
                            <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                            <div class="mj-column-per-100 mj-outlook-group-fix"
                                style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                    style="vertical-align:top;" width="100%">
                                    <tbody>
                                        <tr>
                                            <td align="left"
                                                style="font-size:0px;padding:0px 25px 15px 25px;word-break:break-word;">
                                                <div
                                                    style="font-family:Open Sans, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#797e82;">
                                                    <h1
                                                        style="text-align: center;               color: #000000;               font-weight: 700;               font-size: 34px;">
                                                        {{action.name}}</h1>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="left"
                                                style="font-size:0px;padding:10px 25px;padding-top:0px;word-break:break-word;">
                                                <div
                                                    style="font-family:Open Sans, Helvetica, Arial, sans-serif;font-size:16px;line-height:22px;text-align:left;color:#000000;">
                                                    <p style="margin: 0 0">{{action.description}}</p>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center" vertical-align="middle"
                                                style="font-size:0px;padding:10px 25px;padding-top:20px;word-break:break-word;">
                                                <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                                    style="border-collapse:separate;line-height:100%;">
                                                    <tbody>
                                                        <tr>
                                                            <td align="center" bgcolor="darkblue" role="presentation"
                                                                style="border:none;border-radius:100px;cursor:auto;mso-padding-alt:15px 25px 15px 25px;background:darkblue;"
                                                                valign="middle"><a href="{{action.link}}"
                                                                    style="display:inline-block;background:darkblue;color:#ffffff;font-family:Open Sans, Helvetica, Arial, sans-serif;font-size:14px;font-weight:normal;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:15px 25px 15px 25px;mso-padding-alt:0px;border-radius:100px;"
                                                                    target="_blank"><b style="font-weight: 700"><b
                                                                            style="font-weight: 700">{{action.name}}</b></b></a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="left"
                                                style="font-size:0px;padding:10px 25px;padding-top:0px;word-break:break-word;">
                                                <div
                                                    style="font-family:Open Sans, Helvetica, Arial, sans-serif;font-size:16px;line-height:22px;text-align:left;color:#000000;">
                                                  
                                                    <p style="margin: 30px 0">For any questions or concerns, visit our
                                                        FAQs or reach us at <a target="_blank" rel="noopener noreferrer"
                                                            style="color: darkblue"
                                                            href="mailto:contact@syndeo.org">contact@syndeo.org</a>.</p>
                                                    <p>With love 🤍,<br>The $yndeo Team</p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div><!--[if mso | IE]></td></tr></table><![endif]-->
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="margin:0px auto;max-width:600px;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                    <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                            <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                            <div class="mj-column-per-100 mj-outlook-group-fix"
                                style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                    style="vertical-align:top;" width="100%">
                                    <tbody>
                                        <tr>
                                            <td align="center"
                                                style="font-size:0px;padding:0px 20px 0px 20px;padding-top:0px;padding-bottom:0px;word-break:break-word;">
                                                <div
                                                    style="font-family:Open Sans, Helvetica, Arial, sans-serif;font-size:14px;line-height:22px;text-align:center;color:#797e82;">
                                                    <p style="margin: 10px 0"><a target="_blank"
                                                            rel="noopener noreferrer" style="color: darkblue"
                                                            href="https://syndeo.org"><span
                                                                style="color: darkblue">Main</span></a> <span
                                                            style="color: #797e82">&nbsp; &nbsp;|&nbsp; &nbsp;</span> <a
                                                            target="_blank" rel="noopener noreferrer"
                                                            style="color: darkblue" href="{{app.link}}"><span
                                                                style="color: darkblue">{{app.name}}</span></a></p>
                                                    <p style="margin: 10px 0">$yndeo &copy; 2024</p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div><!--[if mso | IE]></td></tr></table><![endif]-->
                        </td>
                    </tr>
                </tbody>
            </table>
        </div><!--[if mso | IE]></td></tr></table><![endif]-->
    </div>
</body>

</html>`



// replace html template with data
function addDataToHtmlTemplate(html, template) {
    const htmlBody = html.replace(/{{(.*?)}}/g, (_, key) => {
      const keys = key.trim().split('.');
      let value = template.data;
      for (const k of keys) {
        value = value[k];
        if (value === undefined) {
          return '';
        }
      }
      return value;
    });
    return htmlBody;
  }



// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
app.use(bodyParser.json());
app.use(cors());

// Initialize Postmark client
const postmarkClient = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));



// API endpoint to send an email
app.post('/api/sendEmail', (req, res) => {
    console.log('Received request to send email');
    const { email } = req.body;

    if (!email ) {
        return res.status(400).json({ error: 'Email, subject, and message are required' });
    }

const template = {
    name: 'action',
    data: {
        subject: 'Join $yndeo!!',
        action: {
          link: 'https://syndeo.org',
          name: 'Join $yndeo',
          description:
            "Click here to sign up: http://syndeo.io. You'll earn Deos and Sui and so will your referrer! Cash out whenever, or refer more people to earn more!",
        },
      app: {
        name: 'Syndeo',
        link: 'https://syndeo.org',
      },
    },
  }
const htmlBody = addDataToHtmlTemplate(emailTemplate, template);
    const emailParams = {
        "From": "yuenler@gbstem.org",
        "To": email,
        "Subject": "🤑💰 Earn $$! Join $yndeo now!",
        "HtmlBody": htmlBody
    };

    postmarkClient.sendEmail(emailParams, (error, result) => {
        if (error) {
            console.error('Unable to send via postmark: ' + error.message);
            return res.status(500).json({ error: 'Failed to send email' });
        }
        console.log('Email sent: ', result);
        res.json({ success: 'Email sent successfully' });
    });
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
