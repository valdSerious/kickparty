import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
const defer = require('lodash/defer.js')

export function requirePaymentInfo (Component) {
  class AuthenticatePayment extends React.Component {
    static get displayName () {
      return 'AuthenticatePayment'
    }

    static get propTypes () {
      return {
        dispatch: PropTypes.func.isRequired,
        loggedIn: PropTypes.bool,
        location: PropTypes.object,
        user: PropTypes.object
      }
    }

    constructor (props) {
      super(props)
      this.checkAuth = this.checkAuth.bind(this)
      this.redirectToLogin = this.redirectToLogin.bind(this)
    }

    componentWillMount () {
      if (this.props.hasOwnProperty('loggedIn')) {
        this.checkAuth(this.props)
      }
    }

    componentWillReceiveProps (nextProps) {
      if (nextProps.hasOwnProperty('loggedIn')) {
        this.checkAuth(nextProps)
      }

      return nextProps
    }

    checkAuth (props) {
      const { loggedIn, dispatch, user } = props

      // this has to be an explicit check for false
      if (loggedIn === false) {
        defer(() => { this.redirectToLogin(dispatch) })
      }

      if (loggedIn && user) {
        const { payment } = user

        // this has to be an explicit check for false
        if (payment === false) {
          defer(() => { this.redirectToPayment(dispatch) })
        }
      }
    }

    redirectToLogin (dispatch) {
      const redirectAfterLogin = this.props.location.pathname
      dispatch(push(`/signin?next=${redirectAfterLogin}`))
    }

    redirectToPayment (dispatch) {
      const redirectAfterPayment = this.props.location.pathname
      dispatch(push(`/payment?next=${redirectAfterPayment}`))
    }

    render () {
      const { loggedIn, user } = this.props

      return (
        <div>
          { (loggedIn && user.payment) ? <Component {...this.props} /> : null }
        </div>
      )
    }
  }

  function mapStateToProps (state) {
    const props = {}

    if (state.authStore.hasOwnProperty('loggedIn')) {
      props.loggedIn = state.authStore.loggedIn
    }

    if (state.authStore.hasOwnProperty('user')) {
      props.user = state.authStore.user
    }

    return props
  }

  return connect(mapStateToProps)(AuthenticatePayment)
}
