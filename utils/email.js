const nodemailer = require('nodemailer')
const ejs=require('ejs')
const htmlToText=require('html-to-text')

module.exports=class Email{
  constructor(user,url){
    this.to=user.email
    this.username=user.name.split(' ')[0]
    this.url=url
  }
  newTransport(){
    if(process.env.NODE_ENV=='production'){
      return nodemailer.createTransport({
        service:'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASSWORD,
        },
      })
    }
   return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    })
  }
  async send(template,subject){
    const html=await ejs.renderFile(`${__dirname}/../views/emails/${template}.ejs`,{
      username:this.username,
      subject,
      url:this.url
    })
    const mailOptions = {
      from: 'Moretza Ahmadi',
      to: this.to,
      subject: subject,
      text: htmlToText.htmlToText(html),
      html
    }
    await this.newTransport().sendMail(mailOptions)
  }
  async sendWelcome(){
    await this.send('welcome','به وبلاگ من خوش آمدید')
  }
  async sendPasswordReset(){
    await this.send('passwordReset','Your reset Token(valid for 10 minutes)')
  }
}