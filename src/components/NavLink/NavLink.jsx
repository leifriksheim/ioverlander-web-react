import React, { PropTypes } from 'react'
import { navigate } from '../../actions/navigationActions'

class NavLink extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false
    }

    this.navigate = this.navigate.bind(this)
  }

  navigate (e) {
    // e.preventDefault()
    // this.context.dispatch(navigate(this.props.href, this.props.params))
  }

  render () {
    return <a className={this.props.className || ''} href={this.props.href} onClick={this.navigate} style={Object.assign({}, this.props.style)} {...this.props}>
        {this.props.children && !this.props.children.length && React.cloneElement(this.props.children)}
        {typeof this.props.children === 'string' && this.props.children}
        {this.props.children instanceof Array && this.props.children.every((i) => typeof i === 'string') && this.props.children.join('')}
        {this.props.children instanceof Array && !this.props.children.every((i) => typeof i === 'string') && this.props.children.map((child, i) => React.cloneElement(child, { key: i }))}
    </a>
  }

}

NavLink.contextTypes = {
  dispatch: PropTypes.func
}

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  params: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.object]),
  className: PropTypes.string,
  style: PropTypes.object
}

export default NavLink
