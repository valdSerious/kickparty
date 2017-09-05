import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

/* This is a High Order Component that will redirect to the main page if the
* server doesnt return an object that has the property 'me' set to true.
* The storeName, propName are provided to the HOC so that mapStateToProps
* will know where to look for the 'me property.
*
* This HOC assumes that there is a function that can be dispatched in order to
* get the necessary information into the store. This function is passed in as
* the mountingCallBack.
*
* This function also asumes that the mounting callback will get the information
* by passing in a slug into the mountingCallback.
*
* This HOC may cause a loop of dispatching the mountingCallback, this can
* usually be solved by removing the dispatch get the information from the
* componenet that this is decorating.
*/

export function requireEditAuthentication (Component, storeName, propName, param, mountingCallback) {
  class AuthenticateComponent extends React.Component {
    static get displayName () {
      return 'AuthenticateComponent'
    }

    static get propTypes () {
      return {
        dispatch: PropTypes.func.isRequired,
        objectWithMeProperty: PropTypes.object,
        params: PropTypes.object
      }
    }

    constructor (props) {
      super(props)
      this.checkAuth = this.checkAuth.bind(this)
    }

    componentWillMount () {
      if (!this.props.objectWithMeProperty && mountingCallback) {
        const slug = this.props.params[param]
        this.props.dispatch(mountingCallback(slug))
      }
    }

    componentWillReceiveProps (nextProps) {
      this.checkAuth(nextProps)
      return nextProps
    }

    checkAuth (props) {
      const { objectWithMeProperty, dispatch } = props

      if (objectWithMeProperty && objectWithMeProperty.me === false) {
        dispatch(push('/'))
      }
    }

    render () {
      const { objectWithMeProperty } = this.props

      return (
        <div>
          { objectWithMeProperty && objectWithMeProperty.me ? <Component {...this.props} /> : null }
        </div>
      )
    }
  }

  function mapStateToProps (state) {
    const props = {}

    if (state[storeName][propName]) {
      props.objectWithMeProperty = state[storeName][propName]
    }

    return props
  }

  return connect(mapStateToProps)(AuthenticateComponent)
}
