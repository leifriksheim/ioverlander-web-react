var config = require('config')
import asyncApiAction from '../helpers/asyncApiAction'
import request from 'superagent'

const CHECK_IN = 'CHECK_IN'

function updateCheckInForm (data) {
  return {
    type: CHECK_IN,
    checkInFormState: data
  }
}

export function submitCheckIn (params) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      request.post(`${config.get('apiEndpoint')}/check_ins/create`).type('form').send(params).end((err, res) => {
        if (err) {
          dispatch(updateCheckInForm({ err }))
        } else {
          dispatch(updateCheckInForm(JSON.parse(res.text)))
        }
        resolve()
      })
    })
  }
}
