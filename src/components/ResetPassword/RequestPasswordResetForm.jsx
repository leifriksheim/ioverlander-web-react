import React, { PropTypes } from 'react'
import createValidatedForm from '../Validation/ValidatedForm'
import request from 'superagent'

const REQUEST_PASSWORD_RESET_FORM_FIELDS = ['user_email']

const REQUEST_PASSWORD_RESET_FORM_VALIDTE = (fields) => {
  const errors = {}
  if (!fields.user_email) { errors.user_email = 'We need your email address to reset your password' }
  return errors
}

class RequestPasswordResetForm extends React.Component {

  constructor () {
    super()
    this.state = {
      submitted: false
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit () {
    this.setState({
      submitting: true
    })
    return new Promise((resolve, reject) => {
      request.post(this.refs.form.action).send({ to: this.refs.email.value }).end(() => {
        this.setState({
          submitted: true,
          submitting: false
        })
        resolve()
      })
    })
  }

  render () {
    return <main className='content is-flex' style={{ display: 'block' }}>
      <section className='login-container' style={{width: '100%'}}>
        <div className='row'>
          <form ref='form' action='/api/user/resetPassword' onSubmit={this.props.onSubmit(this.onSubmit)} method='POST' className='input-form registration-form small-12 medium-centered medium-8 large-6 columns center'>
            <h4 style={{ textAlign: 'center' }}>Reset your pasword</h4>
            <p>Enter your email address below and we'll send you an email so you can reset your password.</p>

            {!this.state.submitted && <label htmlFor='user_email'>Your email address {this.props.fields.user_email.error && <span className='error'>{this.props.fields.user_email.error}</span>}</label>}
            {!this.state.submitted && <input ref='email' type='text' name='user_email' id='user_email' {...this.props.fields.user_email} />}

            {!this.state.submitted && <button type='submit' disabled={this.state.submitting} className='btn btn-primary'>{this.state.submitting ? 'Sending the email...' : 'Reset Password'}</button>}
            {this.state.submitted && this.state.submitted && <span className='flash-message' style={{
              marginTop: 20,
              textAlign: 'center'
            }}>If that email address is registered with us, we've sent a reset email speeding into the inbox!</span>}
          </form>
        </div>
      </section>
    </main>
  }
}

RequestPasswordResetForm.propTypes = {
  fields: PropTypes.object,
  onSubmit: PropTypes.func
}

RequestPasswordResetForm.displayName = RequestPasswordResetForm

export default createValidatedForm(RequestPasswordResetForm,
  REQUEST_PASSWORD_RESET_FORM_FIELDS,
  REQUEST_PASSWORD_RESET_FORM_VALIDTE)
