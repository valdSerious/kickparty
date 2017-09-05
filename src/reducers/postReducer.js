import objectAssign from 'object-assign'
import omit from 'lodash/omit.js'

import { CREATE_COMMENT, CLEAR_COMMENT_FROM_STORE, UPDATE_LIKE, CLEAR_LIKE_FROM_STORE } from '../actions/postActions'

export default function postReducer (state = { newComments: {}, newLikes: {} }, action) {
  switch (action.type) {
    case CREATE_COMMENT:
      return objectAssign({}, state, {
        newComments: objectAssign({}, state.newComments, {
          [action.payload.objectId]: action.payload
        })
      })
    case CLEAR_COMMENT_FROM_STORE:
      return objectAssign({}, state, {
        newComments: omit(state.newComments, action.payload)
      })
    case UPDATE_LIKE:
      return objectAssign({}, state, {
        newLikes: objectAssign({}, state.newLikes, {
          [action.payload.objectId]: action.payload
        })
      })
    case CLEAR_LIKE_FROM_STORE:
      return objectAssign({}, state, {
        newLikes: omit(state.newLikes, action.payload)
      })
    default:
      return state
  }
}
