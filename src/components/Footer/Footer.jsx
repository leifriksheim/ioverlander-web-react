import React from 'react'
import Lightbox from '../Lightbox/Lightbox'

export default class Footer extends React.Component {
  constructor () {
    super()
    this.openFeedback = this.openFeedback.bind(this)
  }

  openFeedback (e) {
    e.preventDefault()
    this.refs.lightbox.open()
  }

  render () {
    return <footer className='footer'>
      <div className='row flex-footer'>
        <div className='small-12 medium-4 columns'>
          <h5>On the move?</h5>
          <a href='/static/mobile-apps/'>Download the App!</a>
        </div>
        <div className='small-12 medium-4 columns'>
          <h5>Add more places!</h5>
          <a href='/static/add-or-update-a-single-place/'>Find out how</a>
        </div>
        <div className='small-12 medium-4 columns'>
          <h5>Help make iOverlander better:</h5>
          <a href='mailto:iOverlander.com@gmail.com'>Send Feedback</a>
        </div>
        <div className='small-12 columns'>
          <p>{'\u00A9'}{new Date().getFullYear()} iOverlander.com | <a href='/static/terms-and-conditions/'>Terms and Conditions</a></p>
        </div>

        {/* <Lightbox small={true} ref='lightbox'>
          <form className='iOverlander-feedback' action='mailto:iOverlander.com@gmail.com' target='_blank'>
            <label htmlFor='feedback'>What can we do to improve iOverlander for you?</label>
            <textarea style={{width: '100%', height: 150, border: '1px solid #999', padding: 5}} name='Body' placeholder='Type your feedback here and then hit send!' />
            <button className='btn'>Send feedback</button>
          </form>
        </Lightbox> */}
      </div>
    </footer>
  }
}
