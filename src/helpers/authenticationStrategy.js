const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const models = require('../db/models')

export default (function () {
  passport.use(new LocalStrategy(
    function (email, password, done) {
      email = email.toLowerCase()
      models.users.findOne({ where: { email: email } }).then(function (user) {
        if (!user) {
          return done(null, false, { message: 'A user with the given email was not found' })
        }

        if (!user.verifyPassword(password)) {
          return done(null, false, { message: 'A user with the given username/password combination was not found' })
        }

        return done(null, user)
      })
    }
  ))

  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function (id, done) {
    models.users.findOne({
      where: { id: id },
      include: models.roles
    }).then(function (user) {
      user.role = user.roles[0].name
      done(null, user)
      return null
    }).catch((err) => {
      done(err)
      return null
    })
  })

  return passport
}())
