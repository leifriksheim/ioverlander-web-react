import request from 'superagent'
var config = require('config')
import showMapLoader from './showMapLoader'

const ADD_MARKERS_TO_MAP = 'ADD_MARKERS_TO_MAP'

function addMarkersToMap (data) {
  return {
    type: ADD_MARKERS_TO_MAP,
    mapMarkers: data
  }
}

export function getPlacesByLatLng (query, index, total) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      request.get(`${config.get('apiEndpoint')}/locations/${query}`).end((err, res) => {
        if (err) {
          dispatch(addMarkersToMap({ err: 'There was an error retrieving the country data' }))
        } else {
          dispatch(addMarkersToMap(JSON.parse(res.text)))
          if (index === total) {
            setTimeout(() => dispatch(showMapLoader(false)), 100)
          } else {
            dispatch(showMapLoader(true, total, index))
          }
        }
        resolve()
      })
    })
  }
}
