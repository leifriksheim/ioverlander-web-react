import bcrypt from 'bcrypt-nodejs'

export default (models) => function (req, res) {
  models.users.findOne({
    where: {
      reset_password_token: req.body.token
    }
  }).then((user) => {
    if (!user) { return Promise.reject() }
    return user.update({
      encrypted_password: bcrypt.hashSync(req.body.password),
      reset_password_token: null,
      reset_password_sent_at: null
    })
  }).then((user) => {
    res.json({ saved: true })
  }).catch((e) => {
    res.json({ saved: false })
  })
}
