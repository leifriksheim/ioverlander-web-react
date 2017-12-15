import React, { PropTypes } from 'react'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import { Route, Switch } from 'react-router-dom'
import routes from '../config/routes'

require('../assets/scss/MarkerCluster.Default.css')
require('../assets/scss/shared/variables.scss')
require('../assets/scss/foundation/foundation.scss')
require('../assets/scss/global/layout.scss')
require('../assets/scss/global/header.scss')
require('../assets/scss/global/form.scss')
require('../assets/scss/global/tables.scss')
require('../assets/scss/global/buttons.scss')
require('../assets/scss/global/footer.scss')
require('../assets/scss/global/mediaPlayer.scss')

class Container extends React.Component {
  getChildContext () {
    return {
      dispatch: this.props.store.dispatch.bind(this.props.store),
      store: this.props.store
    }
  }

  render () {
    return <div className='app-inner'>
      <Header user={this.props.loggedInUser} />
      <Switch>
        {routes.map(route => {
          // Below code is a bit of a hack to get Matt's redux stuff working with client side
          // rendering only. The app's structure is unfortunately not that well thought out:
          // The components are not made to consume AJAX apis but rely on the state to be assembled
          // by the server. I've ripped this out but fixed only the smallest amount needed in 
          // the components to get it to work. Major cleanup should still be done.
          return <Route exact path={route.path} key={route.path} render={props => {
            const actionsToDispatch = [];

            if (Array.isArray(route.action)) {
              route.action.forEach(action => actionsToDispatch.push([action, props.match]))
            } else {
              actionsToDispatch.push([route.action, props.match])
            }
            let waitForRender = Promise.resolve()
            if (actionsToDispatch.length) {
              waitForRender = Promise.all(actionsToDispatch.map(action => {
                return this.props.store.dispatch(action[0](action[1], null))
              }))
            }

            waitForRender.then(() => {
              this.props.store.dispatch({
                type: 'SET_FLASH',
                flashMessage: 'ERROR'
              })
            })
            return React.createElement(route.component, props)
          }}/>
        })}
      </Switch>
      <Footer />
    </div>
  }
}

Container.childContextTypes = {
  dispatch: PropTypes.func,
  store: PropTypes.object
}

Container.propTypes = {
  handler: PropTypes.func,
  dispatch: PropTypes.func,
  store: PropTypes.object,
  loggedInUser: PropTypes.object
}

export default Container
