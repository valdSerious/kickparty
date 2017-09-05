import objectAssign from 'object-assign'
import { CHANGE_SLUG, CHECK_SLUG, CHANGE_EMAIL, CHECK_EMAIL } from '../actions/signupFormActions'

export default function signup (state = {}, action) {
  switch (action.type) {
    case CHANGE_SLUG:
      return objectAssign({}, state, {
        slug: action.payload
      })
    case CHECK_SLUG:
      return objectAssign({}, state, {
        slugValid: action.payload
      })
    case CHANGE_EMAIL:
      return objectAssign({}, state, {
        email: action.payload
      })
    case CHECK_EMAIL:
      return objectAssign({}, state, {
        emailValid: action.payload
      })
    default:
      return state
  }
}
