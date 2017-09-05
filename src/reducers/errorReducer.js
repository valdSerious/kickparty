import objectAssign from 'object-assign'
import { CLEAR_ERROR } from '../actions/errorActions'

export default function error (state = {}, action) {
  // Global error handler.
  if (action.error) {
    let notification = {
      type: 'error',
      title: 'Error Occurred',
      message: action.payload.errorMessage ? action.payload.errorMessage : action.payload
    }
    state = objectAssign({}, state, {
      error: notification
    })
  }

  switch (action.type) {
    case CLEAR_ERROR:
      return objectAssign({}, state, {
        error: null
      })
    default:
      return state
  }
}
