import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import objectAssign from 'object-assign'
import ValidationMessage from '../UIComponents/ValidationMessage'

class PaymentForm extends Component {
  static get displayName () {
    return 'PaymentForm'
  }

  static get propTypes () {
    return {
      hasPaymentInfo: PropTypes.bool,
      submit: PropTypes.func.isRequired,
      fields: PropTypes.object.isRequired,
      onCancel: PropTypes.func.isRequired,
      valid: PropTypes.bool,
      values: PropTypes.object
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      defaultSelected: false
    }

    this.toggleDefault = this.toggleDefault.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  toggleDefault () {
    if (this.state.defaultSelected) {
      this.setState({ defaultSelected: false })
    } else {
      this.setState({ defaultSelected: true })
    }
  }

  onSubmit (se) {
    se.preventDefault()
    const {values, valid, submit} = this.props

    if (valid && values) {
      // make a user's first card default, otherwise use the checkbox selection
      values.default = (!this.props.hasPaymentInfo || this.state.defaultSelected)

      if (submit && submit instanceof Function) {
        console.info('values', values)
        submit(values)
      }
    }
  }

  render () {
    const { fields } = this.props
    const { number, cvc, exp_month, exp_year, name, line1, postal_code } = fields

    const dateWrapperStyle = {
      display: 'flex',
      width: '100%'
    }

    const formStyle = {
      boxSizing: 'border-box',
      display: 'flex',
      flexFlow: 'column',
      maxWidth: 600,
      width: '100%',
      margin: '0 10px'
    }

    const inputStyle = {
      boxSizing: 'border-box',
      width: '100%'
    }

    const inputWrapperStyle = {
      boxSizing: 'border-box',
      marginBottom: 20
    }

    const dateStyles = {
      flex: 1
    }

    const dateStylesFirst = objectAssign({}, dateStyles, {
      marginRight: 5
    })

    return (
      <section className='add-payment-info'>
        <p style={{padding: 10, textAlign: 'center', margin: '0.5em'}}>Don't worry, you'll review and confirm your contribution on the next screen.</p>
        <div className='add-payment-header'>
          <h2 className='payment-page-header-text' style={{margin: '0.75em 0'}}><i className='fa fa-lock'></i> Payment Method</h2>
          <p>Your card will not be charged until the event "kicks", or reaches the goal set out by the hosts.</p>
        </div>

        <div className='card-box'>
          <form id='payment-form' onSubmit={ this.onSubmit } style={ formStyle }>
            <div style={inputWrapperStyle}>
              <label>Card Number <span className='cc-label-span'>16 Digits</span></label>
              <input placeholder='xxxx-xxxx-xxxx-xxxx' type='text' size='20' data-stripe='number' {...number} style={ inputStyle } />
              <ValidationMessage validate={ number } />
            </div>

            <div style={inputWrapperStyle}>
              <label>CVV2/CVC2 <span className='cc-label-span'>3 Digits on Back</span></label>
              <input placeholder='CVV2/CVC2' type='text' size='4' data-stripe='cvc' {...cvc} style={ inputStyle } />
              <ValidationMessage validate={ cvc } />
            </div>

            <div style={inputWrapperStyle}>
              <label className='expiration'>Expiration (MM/YYYY)</label>

              <div style={dateWrapperStyle}>
                <div style={dateStylesFirst}>
                  <input placeholder='MM' type='text' size='2' data-stripe='exp_month' {...exp_month} style={ inputStyle } />
                  <ValidationMessage validate={ exp_month } />
                </div>
                <div style={dateStyles}>
                  <input placeholder='YYYY' type='text' size='4' data-stripe='exp_year' {...exp_year} style={ inputStyle } />
                  <ValidationMessage validate={ exp_year } />
                </div>
              </div>
            </div>

            <div style={inputWrapperStyle}>
              <label>Name on Card</label>
              <input placeholder='Full Name on Card' type='text' size='10' data-stripe='name' {...name} style={ inputStyle } />
              <ValidationMessage validate={ name } />
            </div>

            <div style={inputWrapperStyle}>
              <label>Billing Address</label>
              <input placeholder='Billing Address' type='text' size='4' data-stripe='line1' {...line1} style={ inputStyle } />
              <ValidationMessage validate={ line1 } />
            </div>

            <div style={inputWrapperStyle}>
              <label>Zip Code</label>
              <input placeholder='Zip' type='text' size='4' data-stripe='postal_code' {...postal_code} style={ inputStyle } />
              <ValidationMessage validate={ postal_code } />
            </div>

            {
              this.props.hasPaymentInfo
                ? <div id='default-checkbox'>
                    <input type='checkbox' onChange={this.toggleDefault} checked={this.state.defaultSelected}></input>
                    <span>&nbsp;&nbsp;Make this my default payment method</span>
                  </div>
                : null
            }

            <button className='card-box highlight green' style={{ padding: '15px', margin: '20px 0' }} type='submit'>
              Continue to Review Order
            </button>

            {
              this.props.hasPaymentInfo && this.props.onCancel
                ? <a onClick={this.props.onCancel} style={{margin: 0, textAlign: 'center', textTransform: 'none'}}>
                  Don't add this card
                </a>
                : null
            }
          </form>
        </div>
      </section>
    )
  }
}

const validate = (values) => {
  const errors = {}

  if (!errors.numbers && !values.number) {
    errors.number = 'A card number is required'
  }

  if (!errors.code && !values.code) {
    errors.code = 'A cvv/cvz is required'
  }

  if (!errors.exp_month && !values.exp_month) {
    errors.exp_month = 'An expiration month is required'
  }

  if (!errors.exp_year && !values.exp_year) {
    errors.exp_year = 'An expiration year is required'
  }

  if (!errors.name && !values.name) {
    errors.name = 'Your name is required'
  }

  if (!errors.line1 && !values.line1) {
    errors.line1 = 'Your street address is required'
  }

  if (!errors.postal_code && !values.postal_code) {
    errors.postal_code = 'Your zip code is required'
  }

  return errors
}

const fields = ['number', 'cvc', 'exp_month', 'exp_year', 'name', 'line1', 'postal_code']

function mapStateToProps (state) {
  return {}
}

export default reduxForm({
  validate,
  fields,
  form: 'ccForm',
  destroyOnUnmount: true
}, mapStateToProps)(PaymentForm)
