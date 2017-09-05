import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Link } from 'react-router'
import load from 'load-script'
import UAParser from 'ua-parser-js'

import FacebookLogin from './FacebookLogin'
import CONFIG from '../../../config'
import { addNotification } from '../../actions/appActions'
import { login, fbLogin } from '../../actions/authActions'
import isValid from '../../utils/isValid'

const PASSWORD_TOO_SHORT = {
  type: 'error',
  title: 'Error',
  message: 'Password cannot be less than 8 characters.'
}

const INVALID_EMAIL_ADDRESS = {
  type: 'error',
  title: 'Error',
  message: 'E-mail address is invalid.'
}

const EMPTY_FIELD = {
  type: 'error',
  title: 'Error',
  message: 'At least one field is empty.'
}

class SignIn extends Component {
  static displayName () {
    return 'Authentication/SignIn'
  }

  static get propTypes () {
    return {
      dispatch: PropTypes.func.isRequired,
      loggedIn: PropTypes.bool,
      location: PropTypes.shape({
        search: PropTypes.string,
        query: PropTypes.object
      })
    }
  }

  constructor (props) {
    super(props)

    if (props.loggedIn) {
      this.props.dispatch(push('/'))
    }

    var uaParser = new UAParser()

    this.state = {
      email: '',
      password: '',
      userData: null,
      browserData: uaParser.getResult()
    }

    load('https://api.userinfo.io/userinfos?jsonp_variable=data', (err, script) => {
      if (err) {
        console.log('Script failed to load.')
      } else {
        // define the variable 'data' that comes from the script above
        /*global data*/
        this.setState({userData: data})
      }
    })

    this.onSubmit = this.onSubmit.bind(this)
    this.onFbLogin = this.onFbLogin.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentWillReceiveProps (props) {
    if (props.loggedIn) {
      this.props.dispatch(push('/'))
    }

    return props
  }

  onChange (se) {
    const change = {}
    change[se.target.id] = se.target.value

    this.setState(change)
  }

  onSubmit (e) {
    e.preventDefault()
    const { query } = this.props.location

    if (this.state.email && this.state.password) {
      if (isValid.email(this.state.email)) {
        this.props.dispatch(addNotification(INVALID_EMAIL_ADDRESS))
      } else if (this.state.password.length < 8) {
        this.props.dispatch(addNotification(PASSWORD_TOO_SHORT))
      } else {
        this.props.dispatch(login(this.state, query.next, query.attend))
      }
    } else {
      this.props.dispatch(addNotification(EMPTY_FIELD))
    }
  }

  onFbLogin (userData) {
    const { query } = this.props.location

    if (userData) {
      this.props.dispatch(fbLogin(userData, query.next, query.attend))
    }
  }

  render () {
    const { search } = this.props.location

    return (
      <div className='auth-component sign-in'>
        <header>Login Form</header>
        <div className='auth-content'>

          <FacebookLogin appId={ CONFIG.FACEBOOK_APP_ID } autoLoad={ false } callback={ this.onFbLogin } text='Click here to sign in with Facebook' />
          <p className='tag-line' style={{ fontWeight: 300, fontSize: '1.2em', color: '#666666' }}><strong>or</strong> use your KickParty login</p>

          <form onSubmit={ this.onSubmit }>
            <input id='email' value={ this.state.email } onChange={ this.onChange } placeholder='Email' />
            <input id='password' value={ this.state.password } type='password' onChange={ this.onChange } placeholder='Password' />

            <div className='flex-container'>
              <button type='submit' className='action text-left'>Login</button>
              {/* There is something wrong with push here. I don't know if I'm just missing something obvious.

                  It first pushes the path '/forgot-password?' and then redirects to '/forgot-password'.
                  When you're at /forgot-password, you have to hit back twice to get back to /signin.
                  The same thing happens if you try to push to /aboutus or anything else.

                  I turned it into a Link with a style to match the button.

                  Also renamed the 'button' to forgot password? instead of just password?

                  - Denis

                  Original line:
                  <button className='action alt text-right' onClick={ () => this.props.dispatch(push('/forgot-password'))}>Password?</button>
               */}
              <Link to='/forgot-password' className='action alt text-right' style={{ margin: '20px auto 0' }}>Forgot Password?</Link>
            </div>
          </form>

          <p className='tag-line'>You don't have an account yet? <Link to={`/signup${search}`}>Sign up here</Link></p>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    loggedIn: state.authStore.loggedIn
  }
}

export default connect(mapStateToProps)(SignIn)
