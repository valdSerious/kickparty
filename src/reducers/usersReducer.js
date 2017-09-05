import objectAssign from 'object-assign'
import { CURRENT_USER } from '../actions/userActions'

export default function users (state = { }, action) {
  switch (action.type) {
    case CURRENT_USER:
      return updateStore(action, state, 'currentUser')
    default:
      return state
  }
}

function updateStore (action, state, type) {
  let store = {}

  if (action.error) {
    store = objectAssign({}, state)
  } else {
    const results = {}
    results[type] = action.payload
    store = objectAssign({}, state, results)
  }

  return store
}
