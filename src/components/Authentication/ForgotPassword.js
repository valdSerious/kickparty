import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { addNotification } from '../../actions/appActions'
import { requestPassword } from '../../actions/authActions'
import isValid from '../../utils/isValid'

const INVALID_EMAIL_ADDRESS = {
  type: 'error',
  title: 'Error',
  message: 'E-mail address is invalid.'
}

class ForgotPassword extends Component {
  static propTypes () {
    return {
      dispatch: PropTypes.func.isRequired
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      submitted: false,
      email: ''
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  onSubmit (event) {
    event.preventDefault()

    if (!isValid.email(this.state.email)) {
      this.props.dispatch(requestPassword({ email: this.state.email }))
      // TODO: this very optimistically displays a success message without waiting for the backend reply
      this.setState({ submitted: true })
    } else {
      this.props.dispatch(addNotification(INVALID_EMAIL_ADDRESS))
    }
  }

  onCancel () {
    this.props.dispatch(push('/'))
  }

  form () {
    return (
      <div className='auth-component forgot-password'>
        <header>Forgot Password</header>
        <div className='auth-content'>
          <form onSubmit={this.onSubmit} >
            <input id='email'
              placeholder='Email address'
              value={this.state.email}
              onChange={(event) => this.setState({email: event.target.value})}
            />
            <div className='flex-container'>
              <button type='submit' className='action text-left'>Submit</button>
              <button className='action alt text-right' onClick={this.onCancel}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  success () {
    return (
      <div className='auth-component' style={{ backgroundColor: 'rgba(255,255,255,0)' }}>
        <h4>Success!</h4>
        <div>Check your email for instructions to reset your password.</div>
      </div>
    )
  }

  render () {
    if (this.state.submitted) {
      return this.success()
    }

    return this.form()
  }
}

function mapStateToProps (state) {
  return {}
}

export default connect(mapStateToProps)(ForgotPassword)
