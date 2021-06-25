const nodemailer = require('nodemailer')
const {google} = require('googleapis')
const {OAuth2} = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

const{
    MAILING_SERVER_CLIENT_ID,
    MAILING_SERVER_CLIENT_SECRET,
    MAILING_SERVER_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS
} = process.env

const oauth2Client = new OAuth2(
    MAILING_SERVER_CLIENT_ID,
    MAILING_SERVER_CLIENT_SECRET,
    MAILING_SERVER_REFRESH_TOKEN,
    OAUTH_PLAYGROUND
)

// mail gönderme 

const sendEmail = (to, url, txt) =>{
   oauth2Client.setCredentials({
       refresh_token: MAILING_SERVER_REFRESH_TOKEN
   })

   const accessToken = oauth2Client.getAccessToken()
   const smtpTransport = nodemailer.createTransport({
       service: 'gmail',
       auth: {
           type:'OAuth2',
           user: SENDER_EMAIL_ADDRESS,
           clientId: MAILING_SERVER_CLIENT_ID,
           clientSecret: MAILING_SERVER_CLIENT_SECRET,
           refreshToken: MAILING_SERVER_REFRESH_TOKEN,
           accessToken
       }
   })
   const mailOptions = {
       from: SENDER_EMAIL_ADDRESS,
       to: to,
       subject: "Osman Hakan",
       html: `
       <p>Linke tıkla. ${txt} ${url}</p>

       `
   }

   smtpTransport.sendMail(mailOptions, (err, infor) => {
       if(err) return err;
       return infor
   })
}

module.exports = sendEmail