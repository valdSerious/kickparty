import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { push } from 'react-router-redux'
import reduce from 'lodash/reduce.js'
import map from 'lodash/map.js'

import FileUpload from '../FileUpload'
import { getProfile, editProfile } from '../../actions/profileActions'
import { changeSlug } from '../../actions/editProfileFormActions'
import { requireEditAuthentication } from './AuthenticateEdit'
import isValid from '../../utils/isValid'

const FIELDS = [
  {
    prop: 'firstName',
    label: 'First',
    placeholder: 'Enter your first name'
  }, {
    prop: 'lastName',
    label: 'Last',
    placeholder: 'Enter your last name'
  }, {
    prop: 'slug',
    label: 'Profile Name',
    placeholder: 'Enter a username'
  }, {
    prop: 'slugValid',
    ignore: true
  }, {
    prop: 'email',
    label: 'Email',
    placeholder: 'Enter your email'
  }, {
    prop: 'mobileNumber',
    label: 'Mobile Number',
    placeholder: 'Enter your mobile number'
  }
]

const USER_FRIENDLY_NAMES = {
  firstName: 'first name',
  lastName: 'last name',
  slug: 'slug',
  email: 'email',
  mobileNumber: 'mobile number'
}

class EditProfile extends Component {
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

    this.state = {
      profileImg: null,
      showImageSelector: false, // This specifies if you want to show the selector
      setNewImg: false // This will specify to the back end that a new image wants to be set.
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.addHeaderImage = this.addHeaderImage.bind(this)
    this.handleImageClear = this.handleImageClear.bind(this)
    this.renderImage = this.renderImage.bind(this)
    this.renderFields = this.renderFields.bind(this)
    this.renderForm = this.renderForm.bind(this)
    this.onSlugChange = this.onSlugChange.bind(this)
  }

  componentWillMount () {
    if (this.props.profile) {
      this.setState({
        // If the image selector is ever shown then specify that there will be
        // a new image to be patched.
        showImageSelector: !this.props.profile.profileImg ||
          this.props.profile.profileImg === '/images/user/missing.png',
        setNewImg: !this.props.profile.profileImg ||
          this.props.profile.profileImg === '/images/user/missing.png'
      })
    }
  }

  onSubmit (props) {
    const slug = this.props.params.userId
    this.props.dispatch(editProfile(slug, {
      ...props,
      profileImg: this.state.profileImg,
      setNewImg: this.state.setNewImg
    }))
  }

  onCancel () {
    const slug = this.props.params.userId
    this.props.dispatch(push(`/${slug}`))
  }

  addHeaderImage (files) {
    if (files.length > 0) {
      const reader = new window.FileReader()
      const file = files[0]

      reader.onload = (readerEvt) => {
        const binaryString = readerEvt.target.result
        const image = window.btoa(binaryString)
        this.setState({
          profileImg: {
            data: image,
            type: file.type,
            name: file.name
          },
          showImageSelector: false
        })
      }

      reader.readAsBinaryString(file)
    }
  }

  handleImageClear () {
    this.setState({
      profileImg: null,
      // If the image selector is ever shown then specify that there will be
      // a new image to be patched.
      showImageSelector: true,
      setNewImg: true
    })
  }

  onSlugChange (event) {
    const slug = event.target.value
    const ownSlug = this.props.profile.slug
    this.props.dispatch(changeSlug(slug, ownSlug))
  }

  render () {
    const { profile } = this.props

    if (!profile) {
      return <div></div>
    }

    return (
      <div className='auth-component sign-up edit-profile'>
        <header>Edit your Profile</header>
        <div className='auth-content'>
          {this.renderForm()}
        </div>
      </div>
    )
  }

  renderImage () {
    const { profile } = this.props

    if (this.state.showImageSelector) {
      return <FileUpload cb={this.addHeaderImage}/>
    }

    return (
      <div>
        <div>
          <img src={this.state.profileImg
            ? `data:image/png;base64,${this.state.profileImg.data}`
            : profile.profileImg}/>
        </div>
        <div>
          {<a onClick={this.handleImageClear}>Pick another picture...</a>}
        </div>
      </div>
    )
  }

  renderFields () {
    return FIELDS.map(({prop, label, placeholder, ignore}) => {
      if (ignore) {
        return null
      }

      const rules = this.props.fields[prop]
      const error = rules.touched && rules.error

      if (prop === 'slug') {
        rules.onChange = this.onSlugChange
      }

      return (
        <div key={prop} className='form-group'>
          <label>{label}</label>
          {error && <div className='error'>{rules.error}</div>}
          <input
            {...rules}
            className={error ? 'input-error' : ''}
            placeholder={placeholder} />
        </div>
      )
    })
  }

  renderForm () {
    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        {this.renderImage()}
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
  const errors = reduce(values, (mem, value, prop) => {
    if (!value) {
      mem[prop] = `Please enter a ${USER_FRIENDLY_NAMES[prop]}`
    }

    return mem
  }, {})

  if (!errors.email && isValid.email(values.email)) {
    errors.email = 'Invalid e-mail address'
  }

  if (!errors.mobileNumber && isValid.phone(values.mobileNumber)) {
    errors.mobileNumber = 'Invalid phone number'
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
  const props = {}
  const { profile } = state.profileStore

  if (profile) {
    props.profile = profile
    props.initialValues = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      slug: profile.slug,
      email: profile.email,
      mobileNumber: profile.mobileNumber,
      slugValid: profile.slug
    }
  }
  return props
}

export default reduxForm({
  form: 'editProfileForm',
  fields: map(FIELDS, 'prop'),
  validate
}, mapStateToProps)(requireEditAuthentication(EditProfile, 'profileStore', 'profile', 'userId', getProfile))
