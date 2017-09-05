import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { push } from 'react-router-redux'
import { reduxForm } from 'redux-form'
import reduce from 'lodash/reduce.js'
import map from 'lodash/map.js'
import load from 'load-script'
import UAParser from 'ua-parser-js'

import { signUp } from '../../actions/authActions'
import { fbLogin } from '../../actions/authActions'
import { changeSlug, changeEmail } from '../../actions/signupFormActions'
import FacebookLogin from './FacebookLogin'
import CONFIG from '../../../config'
import FileUpload from '../FileUpload'
import isValid from '../../utils/isValid'

const FIELDS = [
  { prop: 'firstName', placeholder: 'First name' },
  { prop: 'lastName', placeholder: 'Last name' },
  { prop: 'slug', placeholder: 'Choose an @username' },
  { prop: 'slugValid', ignore: true },
  { prop: 'email', placeholder: 'Email' },
  { prop: 'emailValid', ignore: true },
  { prop: 'mobileNumber', placeholder: 'Mobile number' },
  { prop: 'password', placeholder: 'Password', type: 'password' },
  { prop: 'passwordConfirmation', placeholder: 'Confirm your password', type: 'password' }
]

const MATCHING_PW_ERROR = 'Passwords must match'

const USER_FRIENDLY_NAMES = {
  firstName: 'first name',
  lastName: 'last name',
  slug: 'username',
  email: 'email',
  mobileNumber: 'mobile number',
  password: 'password',
  passwordConfirmation: 'password'
}

class SignUp extends Component {
  static get displayName () {
    return 'Authentication/SignUp'
  }

  static get propTypes () {
    return {
      dispatch: PropTypes.func.isRequired,
      location: PropTypes.shape({
        search: PropTypes.string,
        query: PropTypes.object
      }),
      handleSubmit: PropTypes.func,
      fields: PropTypes.object
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      profileImg: null,
      userData: null,
      browserData: null
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

    this.onSlugChange = this.onSlugChange.bind(this)
    this.onEmailChange = this.onEmailChange.bind(this)
  }

  componentWillReceiveProps (props) {
    if (props.loggedIn) {
      this.props.dispatch(push('/'))
    }
  }

  onSubmit (props) {
    const { query } = this.props.location

    const uaParser = new UAParser()

    this.props.dispatch(signUp({
      ...props,
      profileImg: this.state.profileImg,
      browserData: uaParser.getResult(),
      userData: this.state.userData
    }, query.next, query.attend))
  }

  addHeaderImage (files) {
    if (files.length > 0) {
      const reader = new FileReader()
      const file = files[0]

      reader.onload = (readerEvt) => {
        const binaryString = readerEvt.target.result
        const image = btoa(binaryString)
        this.setState({ profileImg: { data: image, type: file.type, name: file.name } })
      }

      reader.readAsBinaryString(file)
    }
  }

  handleImageClear () {
    this.setState({ profileImg: null })
  }

  onFacebookSignup (userData) {
    const { query } = this.props.location

    if (userData) {
      this.props.dispatch(fbLogin(userData, query.next, query.attend))
    }
  }

  onSlugChange (event) {
    const slug = event.target.value
    this.props.dispatch(changeSlug(slug))
  }

  onEmailChange (event) {
    const email = event.target.value
    this.props.dispatch(changeEmail(email))
  }

  render () {
    const { search } = this.props.location
    return (
      <div className='auth-component sign-up'>
        <header>Sign up form</header>
        <div className='auth-content'>
          <h1>Join now</h1>
          <p className='tag-line'>Its free and takes seconds</p>
          {this.renderFacebookSignup()}
          <p className='tag-line' style={{ fontWeight: 300, fontSize: '1.2em', color: '#666666' }}><strong>or</strong> make a KickParty login</p>
          {this.renderForm()}

          <p className='tag-line'>You already have an account? <Link to={`/signin${search}`}>Sign in here</Link></p>
        </div>
      </div>
    )
  }

  renderFacebookSignup () {
    return (
      <FacebookLogin
        appId={CONFIG.FACEBOOK_APP_ID}
        autoLoad={ false }
        callback={this.onFacebookSignup.bind(this)}
        text='Click here to sign up with Facebook' />
    )
  }

  renderForm () {
    const { handleSubmit } = this.props

    return (
      <form>
        {this.renderImage()}
        {this.renderFields()}
        <div className='flex-container'>
          <button onClick={handleSubmit(this.onSubmit.bind(this))} className='action text-left'>Continue</button>
          <Link to='/' className='action alt text-right' style={{ margin: '20px auto 0' }}>cancel</Link>
        </div>
      </form>
    )
  }

  renderImage () {
    if (!this.state.profileImg) {
      return <FileUpload cb={this.addHeaderImage.bind(this)} />
    }

    return (
      <div>
        <img src={`data:image/png;base64,${this.state.profileImg.data}`} />
        <a onClick={this.handleImageClear}>Pick another picture...</a>
      </div>
    )
  }

  renderFields () {
    // This is to make it so that the passwords must match validation message
    // will not show unless both the password and confirm fields have been
    // touched.
    const showPasswordErrors = this.props.fields['password'].error !== MATCHING_PW_ERROR ||
                               (this.props.fields['password'].touched &&
                               this.props.fields['passwordConfirmation'].touched)
    return FIELDS.map(({prop, placeholder, type, ignore}) => {
      if (ignore) {
        return null
      }

      const rules = this.props.fields[prop]
      let error = rules.touched && rules.error

      if (prop === 'password' || prop === 'passwordConfirmation') {
        error = error && showPasswordErrors
      }

      if (prop === 'slug') {
        rules.onChange = this.onSlugChange
      }

      if (prop === 'email') {
        rules.onChange = this.onEmailChange
      }

      return (
        <div key={prop}>
          <input
            {...rules}
            className={error ? 'input-error' : null}
            placeholder={placeholder}
            type={type} />
          {error && <div className='error'>{rules.error}</div>}
        </div>
      )
    })
  }
}

const validate = (values) => {
  const errors = reduce(values, (mem, value, prop) => {
    if (!value) {
      mem[prop] = `Please enter a ${USER_FRIENDLY_NAMES[prop]}`
    }

    return mem
  }, {})

  if (!errors.email && isValid.email(values.email)) {
    errors.email = 'Invalid e-mail address'
  } else if (!values.emailValid) {
    errors.email = 'Email is already in use'
  } else if (values.emailValid !== values.email) {
    errors.email = 'Checking if email is taken ...'
  }

  if (!errors.mobileNumber && isValid.phone(values.mobileNumber)) {
    errors.mobileNumber = 'Invalid phone number'
  }

  if (values.password !== values.passwordConfirmation) {
    ['password', 'passwordConfirmation'].forEach((prop) => {
      errors[prop] = MATCHING_PW_ERROR
    })
  }

  if (values.passwordConfirmation && values.passwordConfirmation.length < 8) {
    errors.passwordConfirmation = 'Password must be at least 8 characters'
  }

  if (values.password && values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters'
  }

  if (values.slug) {
    if (!values.slugValid) {
      errors.slug = 'Username is already in use'
    } else if (values.slugValid !== values.slug) {
      errors.slug = 'Checking if username is taken ...'
    }
  }

  return errors
}

function mapStateToProps (state) {
  return {
    loggedIn: state.authStore.loggedIn,
    fbLoaded: state.authStore.fbLoaded,
    initialValues: {
      slugValid: '',
      emailValid: ''
    }
  }
}

export default reduxForm({
  form: 'signupForm',
  fields: map(FIELDS, 'prop'),
  validate
}, mapStateToProps)(SignUp)
