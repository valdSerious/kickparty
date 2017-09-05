import objectAssign from 'object-assign'
import { CHANGE_SLUG, CHECK_SLUG } from '../actions/editProfileFormActions'

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
    default:
      return state
  }
}
