var config = require('config')
import asyncApiAction from '../helpers/asyncApiAction'

const PLACE_SEARCH = 'PLACE_SEARCH'

function setSearchResults (data) {
  return {
    type: PLACE_SEARCH,
    searchResults: data,
    pageTitle: `Search places in ${data.countryName} | iOverlander`
  }
}

export function searchForPlacesAction (route) {
  const param_keys = Object.keys(route.params)
  let query = ''

  if (!route.params.query) {
    Object(['amenities', 'excludedTypes']).forEach((param) => {
      let value = new Array(route.params[param]) || []
      if (value && value.length) {
          query += `&${param}=${value.join(',')}`
          }
    })

    if (route.params['lastVisited']) { query += `&lastVisited=${route.params['lastVisited']}` }
    if (query.length) {
      query = '?' + query
    }
  }

  // TODO: We should be able to use request.get('...').query(...) here..
  let URL = `${config.get('apiEndpoint')}/search/${route.params.country}/${route.params.page}${route.params.query || query || ''}`

  return asyncApiAction(URL, setSearchResults, setSearchResults, { err: 'An error occured' }, route)
}
