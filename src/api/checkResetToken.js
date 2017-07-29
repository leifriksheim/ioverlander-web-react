import moment from 'moment'

export default (models) => function (req, res) {
  models.users.findOne({
    where: {
      reset_password_token: req.query.token
    }
  }).then((user) => {
    if (!user) {
      return res.json({
        valid: false,
        expired: false
      })
    }

    return res.json({
      valid: true,
      user_id: user.id
    })
  })
}
