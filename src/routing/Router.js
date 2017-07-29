import ErrorHandler from '../components/ErrorHandler/ErrorHandler'
import debugLib from 'debug'

const debug = debugLib('Reduxible:Router')
const ROLE_HIERACHY = ['guest', 'user', 'moderator', 'admin', 'superadmin']

export default (function () {
  'use strict'

  let currentRoutes = null
  let keys = Object.keys

  const generateRouteBlueprint = (path) => {
    let routeBlueprint = []

    path.replace(/\/$/g, '').split('/').forEach((pathSegment) => {
      if (pathSegment.indexOf(':') > -1) {
        routeBlueprint.push({
          'type': 'param',
          'id': pathSegment.substr(1)
        })
      } else {
        routeBlueprint.push({
          'type': 'fixed',
          'value': pathSegment
        })
      }
    })
    return routeBlueprint
  }

  const getConfigForPath = (req, user) => {
    let params = Object.assign({}, req.query)

    const matchingRoute = keys(currentRoutes).filter((route) => {
      return currentRoutes[route].type === req.method
    }).map((routeName) => {
      return currentRoutes[routeName]
    }).filter((route) => {
      let matches = true
      const expectedRoute = generateRouteBlueprint(route.path)
      const currentRoute = generateRouteBlueprint(req.path)

      if (expectedRoute.length !== currentRoute.length) {
        matches = false
      }

      expectedRoute.forEach((routeSegment, i) => {
        if (currentRoute[i] && routeSegment.type === 'param' && matches) {
          params[routeSegment.id] = currentRoute[i].value
        } else if (currentRoute[i] && currentRoute[i].value !== routeSegment.value) {
          matches = false
        }
      })

      if (matches) {
        return route
      }
    })

    if (matchingRoute[0]) {
      const role = user ? user.dataValues.roles[0].dataValues.name : ROLE_HIERACHY[0]
      if (matchingRoute[0].role_required) {
        const target = ROLE_HIERACHY.indexOf(matchingRoute[0].role_required)
        const actual = ROLE_HIERACHY.indexOf(role)
        if (matchingRoute[0].role_required === 'user' && actual === 0) {
          req.session.targetUrl = req.originalUrl
          return Object.assign({}, currentRoutes['login_form'], {
            redirect: true,
            message: 'You must be signed in before viewing this page'
          })
        } else if (actual < target) {
          return Object.assign({}, currentRoutes['homepage'], {
            redirect: true,
            message: 'You\'re not allowed to view that page, try looking elsewhere!'
          })
        }
      }
    }

    return Object.assign({}, matchingRoute[0] || {err: 404, handler: ErrorHandler}, {params: params})
  }

  const generateFullPath = (route, params = {}) => {
    let fullPath = route.path
    Object.keys(params).forEach((param) => {
      fullPath = fullPath.replace(new RegExp(`:${param}`, 'g'), params[param])
    })
    return fullPath
  }

  return {
    setRoutes: (routes) => currentRoutes = routes,
    getRoute: (req, user) => {
      return getConfigForPath(req, user)
    },
    getRouteByName: (routeName) => {
      return currentRoutes[routeName]
    },
    getRouteName: (unnamedRoute) => {
      return Object.keys(currentRoutes).filter(route => {
        return currentRoutes[route].path === unnamedRoute.path
      })[0]
    },
    generateFullPath: generateFullPath
  }
}())
