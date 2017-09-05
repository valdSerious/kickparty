import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { addNotification } from '../../actions/appActions'
import { resetPassword } from '../../actions/authActions'

const INVALID_PASSWORDS = {
  type: 'error',
  title: 'Error',
  message: 'Passwords must match.'
}

const PASSWORD_TOO_SHORT = {
  type: 'error',
  title: 'Error',
  message: 'Password cannot be less than 8 characters.'
}

class ResetPassword extends Component {
  static displayName () {
    return 'ResetPassword'
  }

  static propTypes () {
    return {
      dispatch: PropTypes.func,
      params: PropTypes.object.isRequired,
      fields: PropTypes.object.isRequired
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      password: '',
      passwordConfirmation: '',
      resetPasswordToken: this.props.params.resetPasswordToken
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  onSubmit (se) {
    se.preventDefault()

    if (this.state.password === this.state.passwordConfirmation) {
      if (this.state.password.length < 8) {
        this.props.dispatch(addNotification(PASSWORD_TOO_SHORT))
      } else {
        this.props.dispatch(resetPassword(this.state))
      }
    } else {
      this.props.dispatch(addNotification(INVALID_PASSWORDS))
    }
  }

  onCancel () {
    this.props.dispatch(push('/'))
  }

  render () {
    const labelStyle = {
      fontWeight: 700,
      display: 'block',
      textAlign: 'left'
    }

    return (
      <div className='auth-component'>
        <header>Reset Password</header>
        <div className='auth-content'>
          <form onSubmit={this.onSubmit}>
            <div>
              <label style={ labelStyle } htmlFor='password'>Password</label>
              <input
                id='password'
                value={this.state.password}
                type='password'
                onChange={(se) => this.setState({password: se.target.value})}
              >
              </input>
            </div>
            <div>
              <label style={ labelStyle } htmlFor='confirm-password'>Confirm Password</label>
              <input
                id='confirm-password'
                value={ this.state.passwordConfirmation }
                type='password'
                onChange={(se) => this.setState({passwordConfirmation: se.target.value})}
              >
              </input>
            </div>
          </form>
          <div className='flex-container'>
            <a className='action text-left' onClick={this.onSubmit}>Submit</a>
            <a className='action alt text-right' onClick={this.onCancel}>Cancel</a>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {}
}

export default connect(mapStateToProps)(ResetPassword)
