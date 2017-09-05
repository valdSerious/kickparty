import objectAssign from 'object-assign'
import { GET_RESOURCE_TYPES } from '../actions/resourceTypeActions'

export default function resources (state = { resourceTypes: [] }, action) {
  switch (action.type) {
    case GET_RESOURCE_TYPES:
      return updateStore(action, state, 'resourceTypes')
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
