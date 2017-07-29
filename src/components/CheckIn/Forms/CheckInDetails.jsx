import React, { PropTypes } from 'react'
import createValidatedForm from '../../Validation/ValidatedForm'
import request from 'superagent'

export function validate (fields) {
  const errors = {}
  const rating = parseInt(fields.rating, 10)

  if (!fields.comment) {
    errors.comment = 'A comment is required for your check-in'
  }
  if (!fields.visited) {
    errors.visited = 'The date you visited this place is required'
  }
  if (!fields.rating) {
    errors.rating = 'The rating is required'
  } else if (isNaN(rating)) {
    errors.rating = 'The rating must be a number'
  } else if (rating < 0 || rating > 5 || (rating % 1) !== 0) {
    errors.rating = 'The rating must be a whole number between 0 and 5'
  }
  return errors
}

class CheckInDetails extends React.Component {
  constructor () {
    super()
    this.state = {
      isSubmitting: false
    }
    this.submit = this.submit.bind(this)
  }

  submit () {
    this.setState({ isSubmitting: true })
    return new Promise((res, rej) => {
      request.post('/api/check_ins/create').type('form').send(Object.assign({},
        this.props.getFieldValues(), {
          place: this.props.selectedPlace.id,
          location: this.props.selectedPlace.location.id
        })).end((err, response) => {
          if (err) { /* handle */ }

          if (response.body.loggedIn === false) {
            window.location.href = '/users/sign_in'
          } else if (response.errors) {
            this.props.displayErrorsFromServer(response.errors)
            this.setState({ isSubmitting: false })
            rej()
          } else if (!response.errors) {
            this.context.setState({
              checkInSaved: true,
              checkInId: response.body.id
            })
            res()
          }
        })
    })
  }

  render () {
    const { fields: { comment, visited, rating } } = this.props

    return <main className='content is-flex'>
      <section className='login-container' style={{width: '100%'}}>
        <div className='row'>
          <div className='small-12 medium-centered medium-6 large-6 columns center check-in-form'>
            <h4 style={{ textAlign: 'center' }}>Check-in at {this.props.selectedPlace.name}</h4>

            <form method='POST' action='/api/check_ins/create' className='input-form' onSubmit={this.props.onSubmit(this.submit)}>
              <label htmlFor='comment'>
                <strong>Your comment</strong>
                <p>How was your stay? Were the bathrooms dirty? Did the dogs bark all night? Please include anything that you think might be useful to others, including the price if this is a pay campsite.</p>
              </label>
              {comment && comment.touched && comment.error && <span className='error'>{comment.error}</span>}
              <textarea ref='comment' name='comment' autoFocus {...comment} />

              <label htmlFor='visited'>
                <strong>Visited</strong>
                <p>When did you visit this place? Things change fast and your information will be much more useful with a time reference (nevermind if you don't remember exactly, year and month is fine in that case).</p>
              </label>
              {visited && visited.touched && visited.error && <span className='error'>{visited.error}</span>}
              <input type='date' ref='visited' name='visited' {...visited} />

              <label htmlFor='visited'>
                <strong>Your rating</strong>
                <p>How would you rate this place?</p>
              </label>
              {rating && rating.touched && rating.error && <span className='error'>{rating.error}</span>}
              <input type='text' ref='rating' name='rating' {...rating} />

              <button type='submit' disabled={this.state.isSubmitting} className='btn'>{this.state.isSubmitting ? 'Submitting...' : 'Check-in!'}</button>
            </form>

          </div>
      </div>
      </section>
    </main>
  }
}

CheckInDetails.propTypes = {
  formState: PropTypes.object,
  selectedPlace: PropTypes.object,
  state: PropTypes.object,
  fields: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  getFieldValues: PropTypes.func.isRequired,
  displayErrorsFromServer: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired
}

CheckInDetails.contextTypes = {
  setState: PropTypes.func
}

CheckInDetails.displayName = 'CheckInDetails'

export default createValidatedForm(CheckInDetails, [ 'comment', 'visited', 'rating' ], validate)
