import objectAssign from 'object-assign'
import { CHANGE_BILLING, GET_BILLING, LOGIN, LOGOUT, FB_LOADED, SIGN_UP, UNKNOWN } from '../actions/authActions'

export default function auth (state = {}, action) {
  switch (action.type) {
    case CHANGE_BILLING:
      if (!action.error && action.payload) {
        // This is the user's first payment method
        if (!state.paymentMethods || state.paymentMethods.length === 0) {
          return objectAssign({}, state, {
            paymentMethods: [action.payload]
            // Currently there is a GET current_session call in changeBilling action creator that
            // makes this useless; if that is removed the payment prop of user should be set to true
            //
            // user: objectAssign({}, state.user, {
            //  payment: true,
            // })
          })
        } else {
          let { paymentMethods } = state

          // Clear previous default if the new payment method is the new default
          if (action.payload.default) {
            const i = paymentMethods.findIndex((p) => p.default)
            paymentMethods[i].default = false
          }

          return objectAssign({}, state, {
            // Important that the new payment method gets added to the end (look at AttendPage)
            paymentMethods: [ ...paymentMethods, action.payload ]
          })
        }
      } else {
        return state
      }
    case GET_BILLING:
      if (!action.error && action.payload) {
        return objectAssign({}, state, {
          paymentMethods: action.payload
        })
      } else {
        return state
      }
    case LOGIN:
      if (action.payload === UNKNOWN) {
        return state
      } else {
        return objectAssign({}, state, {
          loggedIn: action.payload.loggedIn,
          user: action.payload.user
        })
      }
    case LOGOUT:
      return objectAssign({}, state, {
        loggedIn: false,
        user: null
      })
    case FB_LOADED:
      return objectAssign({}, state, {
        fbLoaded: true
      })
    case SIGN_UP:
      return objectAssign({}, state, {
        loggedIn: true,
        user: action.payload
      })
    default:
      return state
  }
}
