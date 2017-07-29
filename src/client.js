import createApplicationStore from './store/ApplicationStore'
import React from 'react'
import ReactDOM from 'react-dom'
import Router from './routing/Router'
import routes from './config/routes'
import Container from './components/Container'
import debugLib from 'debug'
import markercluster from 'leaflet.markercluster'
import { restoreState, updateCurrentRoute, navigate as navigateAction } from './actions/navigationActions'

if (process.env.NODE_ENV !== 'production') {
  debugLib.enable('Reduxible, Reduxible:*')
}

const debug = debugLib('Reduxible')

window.React = ReactDOM

const ApplicationStore = createApplicationStore()
debug('Created ApplicationStore on client', ApplicationStore.getState())

// Restore state from the server + enrich with correct routes
ApplicationStore.dispatch(restoreState(Object.assign(window.app, {
  routes: routes
})))

debug('Restored state', ApplicationStore.getState())

// Set the router to use these routes
Router.setRoutes(ApplicationStore.getState().routes)

debug('Loaded Routes', ApplicationStore.getState().routes)

// Update the currentRoute in the state to include the handler (as it doesn't come from the server)
ApplicationStore.dispatch(updateCurrentRoute(routes[Router.getRouteName(ApplicationStore.getState().currentRoute)]))

// Render the container with the store - Now if the currentRoute handler changes, so does the DOM!
ReactDOM.render(<Container store={ApplicationStore} />,
  document.getElementById('app'))

debug('Rendered to Client')

window.store = ApplicationStore
window.navigateAction = navigateAction
