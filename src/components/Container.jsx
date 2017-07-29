import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Header from './Header/Header'
import Footer from './Footer/Footer'

if (process.env.BROWSER) {
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
}

class Container extends React.Component {
  getChildContext () {
    return {
      dispatch: this.props.store.dispatch.bind(this.props.store)
    }
  }

  render () {
    let others = Object.assign({}, this.props)
    delete others.handler
    const Handler = this.props.handler
    return <div className='app-inner'>
      <Header user={this.props.loggedInUser} />
      <Handler {...others} />
      <Footer />
    </div>
  }
}

Container.childContextTypes = {
  dispatch: PropTypes.func
}

Container.propTypes = {
  handler: PropTypes.func,
  dispatch: PropTypes.func,
  store: PropTypes.object,
  loggedInUser: PropTypes.oneOfType([PropTypes.object, PropTypes.undefined])
}

export default connect(
  (state) => {
    return {
      params: state.currentRoute.params,
      err: state.currentRoute.err,
      handler: state.currentRoute.handler,
      showLoadingWheel: state.showLoadingWheel,
      placesData: state.placesData,
      selectedPlace: state.selectedPlace,
      selectedBlog: state.selectedBlog,
      countryPlaceCounts: state.countryPlaceCounts,
      mapMarkers: state.mapMarkers,
      searchResults: state.searchResults,
      loggedInUser: state.sessionUser,
      checkIns: state.checkIns,
      tilesToLoad: state.tilesToLoad,
      tilesLoaded: state.tilesLoaded,
      staticContent: state.staticContent,
      formState: {
        checkIn: state.checkInFormState
      },
      flashMessage: state.flashMessage,
      placeTypes: state.placeTypes
    }
  }
)(Container)
