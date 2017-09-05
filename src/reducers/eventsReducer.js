import objectAssign from 'object-assign'
import { GET_EVENTS, SEARCH_EVENTS, GET_EVENT, POST_EVENT, CREATE_EVENT, REMOVE_RESOURCE, GET_POSTS, CREATE_POST } from '../actions/eventActions'
import { GET_EVENT_TYPES, GET_EVENT_TYPE, POST_EVENT_TYPE } from '../actions/eventTypeActions'

export default function events (state = {}, action) {
  switch (action.type) {
    /* Currently just fetching the event again. Attending wasn't always being set to true after
    * sign up. Also need to add user to the Attendees List here if we want to use the reducer.
    *
    case ATTEND_EVENT:
      if (action.payload) {
        return objectAssign({}, state, {
          event: objectAssign({}, state.event, { attending: true })
        })
      } else {
        return state
      }
    */
    case CREATE_EVENT:
      return updateStore(action, state, 'events')
    case GET_EVENTS:
      return updateStore(action, state, 'events')
    case SEARCH_EVENTS:
      return updateStore(action, state, 'searchResults')
    case GET_EVENT:
      return updateStore(action, state, 'event')
    case POST_EVENT:
      return updateStore(action, state, 'event')
    case GET_EVENT_TYPES:
      return updateStore(action, state, 'eventTypes')
    case GET_EVENT_TYPE:
      return updateStore(action, state, 'eventType')
    case POST_EVENT_TYPE:
      return updateStore(action, state, 'eventType')
    case REMOVE_RESOURCE:
      return updateStore(action, state, 'event')
    case GET_POSTS:
      return updateStore(action, state, 'posts')
    case CREATE_POST:
      if (action.payload) {
        const posts = [
          action.payload,
          ...state.posts
        ]
        return objectAssign({}, state, { posts })
      } else {
        return state
      }
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
