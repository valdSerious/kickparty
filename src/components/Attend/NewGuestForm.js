import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import objectAssign from 'object-assign'
import { updateModal } from '../../actions/appActions'
import ValidationMessage from '../UIComponents/ValidationMessage'
import isValid from '../../utils/isValid'

export default class NewGuestForm extends Component {
  static propTypes () {
    return {
      dispatch: PropTypes.func.isRequired,
      fields: PropTypes.object.isRequired,
      onSave: PropTypes.func.isRequired,
      valid: PropTypes.bool.isRequired,
      values: PropTypes.object.isRequired

    }
  }

  constructor (props) {
    super(props)
    this.closeModal = this.closeModal.bind(this)
    this.submit = this.submit.bind(this)
  }

  closeModal (e) {
    e ? e.preventDefault() : null
    this.props.dispatch(updateModal())
  }

  submit (e) {
    e.preventDefault()
    const { values, valid, onSave } = this.props

    if (valid && values) {
      if (onSave && onSave instanceof Function) {
        onSave(values)
      }
      this.closeModal()
    }
  }

  render () {
    const { email, firstName, lastName } = this.props.fields

    const buttonStyle = {
      color: '#fff',
      backgroundColor: '#7ED321',
      marginRight: '0.5em',
      paddingLeft: '0.5em',
      paddingRight: '0.5em'
    }
    const inputStyle = (field) => {
      const defaultStyle = {
        height: '1.5em',
        paddingLeft: '0.5em',
        paddingRight: '0.5em',
        marginBottom: '0.5em'
      }
      const errorStyle = objectAssign({}, defaultStyle, {
        borderColor: 'red'
      })
      return (field.touched && field.error)
        ? errorStyle
        : defaultStyle
    }
    return (
      <form onSubmit={this.submit}>
        Enter the name and email of the guest you would like to invite!
        <div style={{marginTop: '0.5em', marginBottom: '0.5em'}}>
          <div>
            <label>
              Name
              <br />
              <input type='text' placeholder='First name'
                     style={inputStyle(firstName)}
                     {...firstName} />
              <input type='text' placeholder='Last name'
                     style={inputStyle(lastName)}
                     {...lastName} />
              <ValidationMessage validate={ firstName } />
              <ValidationMessage validate={ lastName } />
            </label>
          </div>

          <div>
            <label>
              Email
              <br />
              <input type='text' placeholder='Email address'
                     style={inputStyle(email)}
                     {...email} />
              <ValidationMessage validate={ email } />
            </label>
          </div>
        </div>

        <div>
          <button type='submit' style={buttonStyle}>Save</button>
          <button onClick={this.closeModal} style={buttonStyle}>Cancel</button>
        </div>
      </form>
    )
  }
}

const validate = (values) => {
  const errors = {}

  if (!values.firstName) {
    errors.firstName = 'Name is required'
  }
  if (!errors.firstName && !values.lastName) {
    errors.lastName = 'Name is required'
  }
  if (!values.email) {
    errors.email = 'Email is required'
  } else if (isValid.email(values.email)) {
    errors.email = 'Please provide a valid email address.'
  }

  return errors
}

const fields = ['email', 'firstName', 'lastName']

function mapStateToProps (state) {
  return {}
}

export default reduxForm({
  validate,
  fields,
  form: 'guestForm',
  destroyOnUnmount: true
}, mapStateToProps)(NewGuestForm)
