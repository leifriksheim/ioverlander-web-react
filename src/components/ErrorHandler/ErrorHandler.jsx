import React, { PropTypes } from 'react'

class ErrorPage extends React.Component {
  render () {
    return <h3>Oh no! Error {this.props.err}</h3>
  }
}

ErrorPage.propTypes = {
  err: PropTypes.number
}

export default ErrorPage
