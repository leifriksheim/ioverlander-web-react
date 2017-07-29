var config = require('config')
import asyncApiAction from '../helpers/asyncApiAction'

const CHECK_RESET_TOKEN = 'CHECK_RESET_TOKEN'

function setResetUserID (data) {
  return {
    type: CHECK_RESET_TOKEN,
    reset_user_id: data.user_id
  }
}

export function checkResetTokenAction (route) {
  return asyncApiAction(`${config.get('apiEndpoint')}/user/checkPasswordResetToken?token=${route.params.token}`, setResetUserID, setResetUserID, { err: 'An error occured' }, route)
}
