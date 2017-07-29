import Router from '../routing/Router'
import objectFromQueryString from '../helpers/objectFromQueryString'

export const RESTORE_STATE = 'RESTORE_STATE'
export const CURRENT_ROUTE = 'CURRENT_ROUTE'

export function restoreState (state) {
  return { type: RESTORE_STATE, state: state }
}

export function updateCurrentRoute (route) {
  return { type: CURRENT_ROUTE, route }
}

export function navigate (path, params) {
  let query
  const a = document.createElement('a')
  a.href = path

  const split = path.split('?')
  if (split.length > 1) {
    path = split[0]
    query = objectFromQueryString(split[1])
  }
  const route = Router.getRoute({
    method: 'GET',
    path: path.replace(a.hash, ''),
    query: query || params || {}
  })

  if (route.action) {
    return route.action(Object.assign({}, route, {
      navigateTo: true,
      navigationAction: CURRENT_ROUTE
    }))
  }
  return { type: CURRENT_ROUTE, route }
}

if (!global) {
  window.navigate = navigate
}
