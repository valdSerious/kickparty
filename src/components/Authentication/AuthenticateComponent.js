import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
const defer = require('lodash/defer.js')

export function requireAuthentication (Component) {
  class AuthenticateComponent extends React.Component {
    static get displayName () {
      return 'AuthenticateComponent'
    }

    static get propTypes () {
      return {
        dispatch: PropTypes.func.isRequired,
        loggedIn: PropTypes.bool,
        location: PropTypes.object
      }
    }

    constructor (props) {
      super(props)
      this.checkAuth = this.checkAuth.bind(this)
      this.redirect = this.redirect.bind(this)
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
      const { loggedIn, dispatch } = props

      // this has to be an explicit check for false
      if (loggedIn === false) {
        defer(() => { this.redirect(dispatch) })
      }

      return loggedIn
    }

    redirect (dispatch) {
      const redirectAfterLogin = this.props.location.pathname

      dispatch(push(`/signin?next=${redirectAfterLogin}`))
    }

    render () {
      const { loggedIn } = this.props

      return (
        <div>
          { loggedIn ? <Component {...this.props} /> : null }
        </div>
      )
    }
  }

  function mapStateToProps (state) {
    const props = {}

    if (state.authStore.hasOwnProperty('loggedIn')) {
      props.loggedIn = state.authStore.loggedIn
    }

    return props
  }

  return connect(mapStateToProps)(AuthenticateComponent)
}
