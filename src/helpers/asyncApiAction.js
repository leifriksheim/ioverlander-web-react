import request from 'superagent'
import { updateCurrentRoute } from '../actions/navigationActions'

// TODO: Lucas: In my opinion this wrapper should be modified to support the use of
// request.get(url).query({field:"value"})
const asyncApiAction = (url, successAction, errorAction, errorPayload, route) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      request.get(url).end((err, res) => {
        if (err) {
          dispatch(errorAction(errorPayload))
        } else {
          dispatch(successAction(JSON.parse(res.text)))
          if (route && route.navigateTo) {
            dispatch(updateCurrentRoute(route))
          }
        }
        resolve()
      })
    })
  }
}

export default asyncApiAction
