import React, { PropTypes } from 'react'

require('./Lightbox.scss')

class Lightbox extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      isOpen: false
    }

    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  open () {
    this.setState({
      isOpen: true
    })
  }

  close () {
    this.setState({
      isOpen: false
    })
  }

  render () {
    return <div className={'lightbox' + (this.state.isOpen ? ' is-open' : '')}>
      <div className='lightbox-overlay' onClick={this.close} />
      <div className={'lightbox-content' + (this.props.small ? ' lightbox-content-small' : '')}>
        <button className='lightbox-close' onClick={this.close}>Close</button>
        {!this.props.children.length && React.cloneElement(this.props.children)}
        {this.props.children.length && this.props.children.map((child, i) => React.cloneElement(child, { key: i }))}
      </div>
    </div>
  }

}

Lightbox.propTypes = {
  placesData: PropTypes.array,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
  small: PropTypes.bool
}

export default Lightbox
