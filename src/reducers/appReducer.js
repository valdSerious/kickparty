import objectAssign from 'object-assign'
import { SPINNER, MODAL, ADD_NOTIFICATION, HIDE_NOTIFICATION } from '../actions/appActions'

export default function app (state = {notifications: [], fetchMap: {}}, action) {
  // This is a global event to trigger a loading a spinner on async loads
  // I couldn't do this with flux standard action format, since some of the libs we are using
  // eg: redux-form, do not follow it and therefore we can't imply that it's an async call.
  // So for now, it has to be explicit with action.fetching = true
  if (action.fetching && !action.error && !action.payload) { // the action.size check makes sure it's not some action from something like redux-form
    state.fetchMap[action.type] = true
    state = objectAssign({}, state, {
      showSpinner: true
    })
  } else if (action.error || action.payload) {
    if (state.fetchMap[action.type]) {
      state.fetchMap[action.type] = false
      state = objectAssign({}, state, {
        showSpinner: false
      })
    }
  }

  switch (action.type) {
    case SPINNER:
      return objectAssign({}, state, {
        showSpinner: action.payload
      })
    case MODAL:
      if (action.payload) {
        return objectAssign({}, state, {
          modal: action.payload
        })
      }

      return objectAssign({}, state, {
        modal: null
      })
    case ADD_NOTIFICATION:
      return objectAssign({}, state, {
        notifications: state.notifications.concat(action.payload)
      })
    case HIDE_NOTIFICATION:
      return objectAssign({}, state, {
        notifications: state.notifications.filter((n) => n.id !== action.payload.id)
      })
    default:
      return state
  }
}
