import React, { PropTypes } from 'react'
import createValidatedForm from '../Validation/ValidatedForm'
import request from 'superagent'

const PASSWORD_RESET_FORM_FIELDS = ['user_password', 'user_password_confirm']

const PASSWORD_RESET_FORM_VALIDTE = (fields) => {
  const errors = {}

  ;['user_password', 'user_password_confirm'].forEach((val) => {
    if (!fields[val]) { errors[val] = 'This field is required' }
  })

  if (fields.user_password && fields.user_password.length < 8) {
    errors.user_password = 'Your password must be at least 8 characters'
  }

  if (fields.user_password && (fields.user_password_confirm !== fields.user_password)) {
    errors.user_password_confirm = 'Your passwords do not match'
  }

  return errors
}

class PasswordResetForm extends React.Component {

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
      request.post(this.refs.form.action).send({ token: this.refs.token.value, password: this.refs.password.value }).end(() => {
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
          <form ref='form' action='/api/user/updatePassword' onSubmit={this.props.onSubmit(this.onSubmit)} method='POST' className='input-form registration-form small-12 medium-centered medium-8 large-6 columns center'>
            <h4 style={{ textAlign: 'center' }}>Reset your pasword</h4>
            <p>Enter a new password below to update your password:</p>

            {!this.state.submitted && <label htmlFor='user_password'>New Password {this.props.fields.user_password.error && <span className='error'>{this.props.fields.user_password.error}</span>}</label>}
            {!this.state.submitted && <input ref='password' type='password' name='user_password' id='user_password' {...this.props.fields.user_password} />}

            {!this.state.submitted && <label htmlFor='user_password_confirm'>Confirm Password {this.props.fields.user_password_confirm.error && <span className='error'>{this.props.fields.user_password_confirm.error}</span>}</label>}
            {!this.state.submitted && <input type='password' name='user_password_confirm' id='user_password_confirm' {...this.props.fields.user_password_confirm} />}

            <input type='hidden' name='token' ref='token' value={this.props.params.token} />

            {!this.state.submitted && <button type='submit' disabled={this.state.submitting} className='btn btn-primary'>{this.state.submitting ? 'Saving...' : 'Reset Password'}</button>}
            {this.state.submitted && this.state.submitted && <span className='flash-message' style={{
              marginTop: 20,
              textAlign: 'center'
            }}>Your password has been updated. Click <a href='/users/sign_in'>here to log in</a></span>}
          </form>
        </div>
      </section>
    </main>
  }
}

PasswordResetForm.propTypes = {
  fields: PropTypes.object,
  onSubmit: PropTypes.func,
  params: PropTypes.object
}

PasswordResetForm.displayName = PasswordResetForm

export default createValidatedForm(PasswordResetForm,
  PASSWORD_RESET_FORM_FIELDS,
  PASSWORD_RESET_FORM_VALIDTE)
