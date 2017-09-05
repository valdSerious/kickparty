import objectAssign from 'object-assign'
import { EDIT_PROFILE, GET_PROFILE, CLEAR_PROFILE, FOLLOW, UNFOLLOW } from '../actions/profileActions'

export default function profile (state = {}, action) {
  if (action.error) return state

  switch (action.type) {
    case GET_PROFILE:
      return objectAssign({}, state, {profile: action.payload})
    case EDIT_PROFILE:
      return objectAssign({}, state, {profile: action.payload})
    case CLEAR_PROFILE:
      return objectAssign({}, state, {profile: null})
    case FOLLOW:
      const newFollowingProfile = objectAssign({}, state.profile, action.payload)
      return objectAssign({}, state, {profile: newFollowingProfile})
    case UNFOLLOW:
      const newUnfollowingProfile = objectAssign({}, state.profile, action.payload)
      return objectAssign({}, state, {profile: newUnfollowingProfile})
    default:
      return state
  }
}
