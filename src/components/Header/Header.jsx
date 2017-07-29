import React, { PropTypes } from 'react'
import NavLink from '../NavLink/NavLink'
import request from 'superagent'
import { setUser } from '../../actions/setUser'

export default class Header extends React.Component {
  constructor () {
    super()
    this.state = {
      user: null
    }

    this.toggleMenu = this.toggleMenu.bind(this)
  }

  componentDidMount () {
    request.get('/getUserInfo').end((err, res) => {
      this.setState({
        user: res.body
      })

      this.context.dispatch(setUser(res.body))
    })
  }

  toggleMenu () {
    this.refs.menu.classList.toggle('open-mobile')
  }

  render () {
    return <header className='header'>
      <div className='row flex-header'>
        <div className='small-7 medium-3 columns'>
          <NavLink href='/' className='navlink' data-el='header-logo'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOQAAABgCAYAAAANdt5DAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpBNEE2RTU5MkRGMjhFNDExQjA5QUNCQUJCRDczNjFCQSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4QzU0NTg3ODJCQjYxMUU0OEJGRjg0QTdEQTZGNjQ5MCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4QzU0NTg3NzJCQjYxMUU0OEJGRjg0QTdEQTZGNjQ5MCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjQ1MDdBOUQxNzAyOUU0MTE5OTkzQ0I1Qzk2Qzc1REE3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE0QTZFNTkyREYyOEU0MTFCMDlBQ0JBQkJENzM2MUJBIi8+IDwvcmRmOkRlc2NyaXB0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' alt='iOverlander' /></NavLink>
        </div>
        <div className='small-5 medium-9 columns flex-navbar'>
          <a className='menu-toggle' onClick={this.toggleMenu}>Menu</a>
          <ul ref='menu' className='menu-primary'>
            <li><NavLink className='navlink' href='/countries/places_by_country'>Find Places by Country</NavLink></li>
            <li>
              <NavLink href='/static/add-or-update-a-single-place'>Add Places</NavLink>
            </li>
            <li><NavLink className='navlink' href='/static/mobile-apps'>Mobile Apps</NavLink></li>
            <li data-el='volunteer-submenu'>
              <span>Volunteer</span>
              <ul className='header-submenu'>
                <li><NavLink href='/static/i-have-time'>How can I get involved?</NavLink></li>
                <li><NavLink href='/static/donate'>Donate</NavLink></li>
              </ul>
            </li>
            <li>
              <NavLink href='/static/faqs'>FAQs</NavLink>
            </li>
            <li data-el='about-submenu'>
              <span>About</span>
              <ul className='header-submenu'>
                <li><NavLink href='/static/about-ioverlander'>About iOverlander</NavLink></li>
                <li><NavLink href='/static/contact'>Contact</NavLink></li>
                <li><NavLink href='/static/contributors'>Contributors</NavLink></li>
              </ul>
            </li>
            {!this.state.user && <li className='header-user'><NavLink className='navlink' href='/users/sign_in'>Have an account? Log in</NavLink></li>}
            {this.state.user && <li tabIndex='0' className='header-user'>Welcome back {this.state.user.name}
              <ul className='header-submenu'>
                <li><a href='/users/edit'>Update Account Details</a></li>
                <li><NavLink href={`/blogs/${this.state.user.blog_id}`}>View your blog</NavLink></li>
                <li><NavLink href={`/blogs/${this.state.user.blog_id}/check_ins/1`}>View check-ins</NavLink></li>
                <li><a href='/logout'>Log out</a></li>
              </ul>
            </li>}
          </ul>
        </div>
      </div>
    </header>
  }
}

Header.contextTypes = {
  dispatch: PropTypes.func
}
