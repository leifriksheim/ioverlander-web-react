var config = require('config')
import asyncApiAction from '../helpers/asyncApiAction'

const LOAD_PLACES_DATA = 'LOAD_PLACES_DATA'

function setPlacesByCountryData (data) {
  return {
    type: LOAD_PLACES_DATA,
    placesData: data
  }
}

export function placesByCountryAction (route) {
  return asyncApiAction(`${config.get('apiEndpoint')}/regions`, setPlacesByCountryData, setPlacesByCountryData, { err: 'An error occured' }, route)
}
