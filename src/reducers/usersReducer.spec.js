import expect from 'expect'
import objectAssign from 'object-assign'
import users from './usersReducer'
import { GET_USERS, CURRENT_USER, GET_USER, POST_USER } from '../actions/userActions'

// Variables used between multiple tests.
const filler_state = {
  filler: true,
  used_for: 'tests'
}

const corrupt_payload = [
  'corrupt',
  'data',
  'here'
]

const single_user = {
  slug: 'charlie',
  id: 300,
  email: 'charlie@gmail.com'
}

const user_array = [
  {
    slug: 'alex',
    id: 100,
    email: 'alex@aol.com'
  },
  {
    slug: 'ben',
    id: 200,
    email: 'ben@hotmail.com'
  },
  {
    slug: 'charlie',
    id: 300,
    email: 'charlie@gmail.com'
  }
]

// TODO (Ernest): Make the states and payloads look more like the objects we will be
// getting back from the api.
describe('Users Reducer', () => {
  describe('No type action tests', () => {
    it('Action with no type with undefined state', () => {
      const state = {}
      const action = {
        type: null
      }
      expect(users(undefined, action)).toEqual(state)
    })

    it('Action with no type with state', () => {
      const action = {
        type: null
      }
      expect(users(filler_state, action)).toEqual(filler_state)
    })
  })

  describe('GET_USERS action tests', () => {
    it('GET_USERS action', () => {
      const stateBefore = filler_state
      const stateAfter = objectAssign({}, filler_state, {users: user_array})
      const action = {
        type: GET_USERS,
        error: false,
        payload: user_array
      }
      expect(users(stateBefore, action)).toEqual(stateAfter)
    })

    it('GET_USERS action with error', () => {
      const action = {
        type: GET_USERS,
        error: true,
        payload: corrupt_payload
      }
      expect(users(filler_state, action)).toEqual(filler_state)
    })

    it('GET_USERS action with undefined state', () => {
      const stateAfter = {users: user_array}
      const action = {
        type: GET_USERS,
        error: false,
        payload: user_array
      }
      expect(users(undefined, action)).toEqual(stateAfter)
    })
  })

  describe('CURRENT_USER action tests', () => {
    it('CURRENT_USER action', () => {
      const stateBefore = filler_state
      const stateAfter = objectAssign({}, filler_state, {currentUser: single_user})
      const action = {
        type: CURRENT_USER,
        error: false,
        payload: single_user
      }
      expect(users(stateBefore, action)).toEqual(stateAfter)
    })

    it('CURRENT_USER action with error', () => {
      const action = {
        type: CURRENT_USER,
        error: true,
        payload: corrupt_payload
      }
      expect(users(filler_state, action)).toEqual(filler_state)
    })

    it('CURRENT_USER action with undefined state', () => {
      const stateAfter = {currentUser: single_user}
      const action = {
        type: CURRENT_USER,
        error: false,
        payload: single_user
      }
      expect(users(undefined, action)).toEqual(stateAfter)
    })
  })

  describe('GET_USER action tests', () => {
    it('GET_USER action', () => {
      const stateBefore = filler_state
      const stateAfter = objectAssign({}, filler_state, {user: single_user})
      const action = {
        type: GET_USER,
        error: false,
        payload: single_user
      }
      expect(users(stateBefore, action)).toEqual(stateAfter)
    })

    it('GET_USER action with undefined state', () => {
      const stateAfter = {user: single_user}
      const action = {
        type: GET_USER,
        error: false,
        payload: single_user
      }
      expect(users(undefined, action)).toEqual(stateAfter)
    })

    it('GET_USER action with error', () => {
      const action = {
        type: GET_USER,
        error: true,
        payload: corrupt_payload
      }
      expect(users(filler_state, action)).toEqual(filler_state)
    })
  })

  describe('POST_USER action tests', () => {
    it('POST_USER action', () => {
      const stateBefore = filler_state
      const stateAfter = objectAssign({}, filler_state, {user: single_user})
      const action = {
        type: POST_USER,
        error: false,
        payload: single_user
      }
      expect(users(stateBefore, action)).toEqual(stateAfter)
    })

    it('POST_USER action with undefined state', () => {
      const stateAfter = {user: single_user}
      const action = {
        type: POST_USER,
        error: false,
        payload: single_user
      }
      expect(users(undefined, action)).toEqual(stateAfter)
    })

    it('POST_USER action with error', () => {
      const action = {
        type: POST_USER,
        error: true,
        payload: corrupt_payload
      }
      expect(users(filler_state, action)).toEqual(filler_state)
    })
  })
})
