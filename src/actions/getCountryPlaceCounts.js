var config = require('config')
import asyncApiAction from '../helpers/asyncApiAction'

const GET_COUNTRY_PLACE_COUNT = 'GET_COUNTRY_PLACE_COUNT'

function setCountryPlaceCounts (data) {
  return {
    type: GET_COUNTRY_PLACE_COUNT,
    countryPlaceCounts: data
  }
}

export function getCountryPlaceCounts (route) {
  return asyncApiAction(`${config.get('apiEndpoint')}/countries`, setCountryPlaceCounts, setCountryPlaceCounts, { err: 'There was an error retrieving the country data' }, route)
}
