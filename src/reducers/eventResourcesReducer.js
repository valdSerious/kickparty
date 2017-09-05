import objectAssign from 'object-assign'
import { BASE_COST, CALC_METHOD, TOTAL_COST, ATTENDEE_COST } from '../actions/eventFormAction'
import { UPDATE_RESOURCE } from '../actions/eventFormAction'

export default function eventResources (state = {}, action) {
  switch (action.type) {
    case ATTENDEE_COST:
      return objectAssign({}, state, {
        attendeeCost: action.payload
      })
    case BASE_COST:
      return objectAssign({}, state, {
        baseCost: action.payload
      })
    case CALC_METHOD:
      return objectAssign({}, state, {
        calculationMethod: action.payload
      })
    case TOTAL_COST:
      return objectAssign({}, state, {
        totalCost: action.payload
      })
    case UPDATE_RESOURCE:
      // console.info('Reducer: state', state)
      // console.info('Reducer: payload', action.payload)
      const resourceType = action.payload.value[0]
      const activeResources = action.payload.value[1]
      const resources = objectAssign({}, state.resources)
      resources[resourceType] = activeResources

      const newState = objectAssign({}, state, {
        resources
      })

      return newState
    default:
      return state
  }
}
