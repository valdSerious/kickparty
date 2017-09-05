import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { changeBilling } from '../actions/authActions'
import { PaymentForm } from '../components/Attend'

class PaymentPage extends Component {
  static get propTypes () {
    return {
      dispatch: PropTypes.func.isRequired,
      hasPaymentInfo: PropTypes.bool
    }
  }

  constructor (props) {
    super(props)
    this.state = {}
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit (paymentInfo) {
    this.props.dispatch(changeBilling(paymentInfo, '/'))
  }

  render () {
    return (
      <div className='wrapper'>
        <div className='wide'>
          <div className='column left'>
            <h1>Add payment information</h1>
            <hr />
            <PaymentForm submit={this.onSubmit} hasPaymentInfo={this.props.hasPaymentInfo} />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const props = {}

  if (state.authStore.hasOwnProperty('user') && state.authStore.user !== null) {
    props.hasPaymentInfo = state.authStore.user.payment
  }

  return props
}

export default connect(mapStateToProps)(PaymentPage)
