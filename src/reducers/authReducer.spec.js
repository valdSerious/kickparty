import auth from './authReducer'
import expect from 'expect'
import { LOGIN, LOGOUT, FB_LOADED, SIGN_UP } from '../actions/authActions'

// TODO: Test the actual user data instead of leaving it undefined
describe('Auth Reducer', () => {
  it('allows an empty action', () => {
    const state = {
      loggedIn: true,
      fbLoaded: false
    }
    const action = {}
    expect(
      auth(state, action)
    ).toEqual(state)
  })

  it('logs user in', () => {
    const stateBefore = {
      loggedIn: false
    }
    const action = {
      type: LOGIN,
      user: undefined
    }
    const stateAfter = {
      loggedIn: true,
      user: undefined
    }
    expect(
      auth(stateBefore, action)
    ).toEqual(stateAfter)
  })

  it('logs user out', () => {
    const stateBefore = {
      slug: 'Charlie',
      loggedIn: true
    }
    const action = {
      type: LOGOUT,
      slug: 'Charlie'
    }
    const stateAfter = {
      slug: null,
      loggedIn: false
    }
    expect(
      auth(stateBefore, action)
    ).toEqual(stateAfter)
  })

  it('loads Facebook', () => {
    const stateBefore = { fbLoaded: false }
    const action = { type: FB_LOADED }
    const stateAfter = { fbLoaded: true }

    expect(
      auth(stateBefore, action)
    ).toEqual(stateAfter)
  })

  it('signs up user', () => {
    const stateBefore = {
      loggedIn: false
    }
    const action = {
      type: SIGN_UP,
      user: undefined
    }
    const stateAfter = {
      loggedIn: true,
      user: undefined
    }
    expect(
      auth(stateBefore, action)
    ).toEqual(stateAfter)
  })
})
