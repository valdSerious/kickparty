import React, { Component, PropTypes } from 'react'
import { push } from 'react-router-redux'
import { reduxForm } from 'redux-form'
import map from 'lodash/map.js'

import { getProfile, changePassword } from '../../actions/profileActions.js'

const FIELDS = [
  {
    prop: 'password',
    placeholder: 'Password',
    type: 'password'
  }, {
    prop: 'newPassword',
    placeholder: 'New Password',
    type: 'password'
  }, {
    prop: 'newPasswordConfirmation',
    placeholder: 'Confirm your new password',
    type: 'password'
  }
]

const MATCHING_PW_ERROR = 'Passwords must match'

class EditPassword extends Component {
  static get displayName () {
    return 'Authentication/EditProfile'
  }

  static get propTypes () {
    return {
      dispatch: PropTypes.func.isRequired,
      params: PropTypes.object,
      profile: PropTypes.object,
      fields: PropTypes.object.isRequired,
      handleSubmit: PropTypes.func.isRequired
    }
  }

  constructor (props) {
    super(props)

    this.state = {}

    this.onSubmit = this.onSubmit.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.renderFields = this.renderFields.bind(this)
    this.renderForm = this.renderForm.bind(this)
  }

  componentDidMount () {
    const slug = this.props.params.userId
    this.props.dispatch(getProfile(slug))
  }

  onSubmit (props) {
    const slug = this.props.params.userId
    this.props.dispatch(changePassword(slug, {...props}))
  }

  onCancel () {
    const slug = this.props.params.userId
    this.props.dispatch(push(`/${slug}`))
  }

  render () {
    const {profile} = this.props

    if (!profile) {
      return <div></div>
    }

    if (!profile.me) {
      this.props.dispatch(push('/'))
    }

    return (
      <div className='auth-component sign-up edit-profile'>
        <header>Edit your Password</header>
        <div className='auth-content'>
          {this.renderForm()}
        </div>
      </div>
    )
  }

  renderFields () {
    // This is to make it so that the passwords must match validation message
    // will not show unless both the password and confirm fields have been
    // touched.
    const showPasswordErrors = this.props.fields['newPassword'].error !== MATCHING_PW_ERROR ||
                               (this.props.fields['newPassword'].touched &&
                               this.props.fields['newPasswordConfirmation'].touched)
    return FIELDS.map(({prop, placeholder, type, label}) => {
      const rules = this.props.fields[prop]
      let error = rules.touched && rules.error
      if (prop === 'newPassword' || prop === 'newPasswordConfirmation') {
        error = error && showPasswordErrors
      }
      return (
        <div key={prop} className='form-group'>
          <label>{label}</label>
          {error && <div className='error'>{rules.error}</div>}
          <input {...rules}
            className={error ? 'input-error' : ''}
            placeholder={placeholder}
            type={type} />
        </div>
      )
    })
  }

  renderForm () {
    const {handleSubmit} = this.props
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        {this.renderFields()}
        <div className='flex-container'>
          <button type='submit' className='action text-left'>Continue</button>
          <button type='button' className='action alt text-right' onClick={this.onCancel}>Cancel</button>
        </div>
      </form>
    )
  }
}

const validate = (values) => {
  const errors = {}

  if (values.newPassword !== values.newPasswordConfirmation) {
    ['newPassword', 'newPasswordConfirmation'].forEach((prop) => {
      errors[prop] = MATCHING_PW_ERROR
    })
  }

  if (values.newPassword && values.newPassword.length < 8) {
    errors.newPassword = 'Password must be at least 8 characters'
  }

  if (values.newPasswordConfirmation && values.newPasswordConfirmation.length < 8) {
    errors.newPasswordConfirmation = 'Password must be at least 8 characters'
  }

  if (values.password && values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters'
  }

  return errors
}

function mapStateToProps (state) {
  const props = {}
  const {profile} = state.profileStore

  if (profile) {
    props.profile = profile
  }

  return props
}

export default reduxForm({
  form: 'editProfileForm',
  fields: map(FIELDS, 'prop'),
  validate
}, mapStateToProps)(EditPassword)
