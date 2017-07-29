import nodemailer from 'nodemailer'
import { EmailTemplate } from 'email-templates'
import path from 'path'
import crypto from 'crypto'
import moment from 'moment'
import juice from 'juice'

let config = require('config')
let emailConfig = config.get('email')
export default (models) => function (req, res) {
  const templateDir = path.join(__dirname, '../emails', 'password_reset')
  const resetEmail = new EmailTemplate(templateDir, {
    disableJuice: true
  })
  const RESET_TOKEN = crypto.randomBytes(20).toString('hex')

  models.users.findOne({
    where: {
      email: req.body.to
    }
  }).then((user) => {
    if (!user) { res.end(); return false }

    return user.update({
      reset_password_token: RESET_TOKEN,
      reset_password_sent_at: moment().format('YYYY-MM-DD HH:mm:ss.SSSSSS')
    })
  }).then((user) => {
    if (!user) { return false }

    resetEmail.render({
      resetUrl: `http://staging.ioverlander.com/users/reset_password?token=${RESET_TOKEN}`
    }, (err, email) => {
      const transport = nodemailer.createTransport(emailConfig.transport)
      const mailOptions = {
        to: req.body.to,
        from: emailConfig.from,
        subject: 'iOverlander Password Reset',
        html: juice(email.html)
      }

      transport.sendMail(mailOptions, function (error, info) {
        if (error) {
          return console.log(error)
        }
        console.log('Message sent: ' + info.response)
        res.json({ sent: true })
      })
    })
  })
}
