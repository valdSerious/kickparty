import { push } from 'react-router-redux'

import UserModel from '../models/UserModel'
import API from '../utils/api'
import session from '../utils/session'
import errorReporter from '../utils/errorReporter'
import { clearProfile } from './profileActions'
import { toggleSpinner, addNotification } from './appActions'
import { attendForFree } from './eventActions'

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const FB_LOADED = 'FB_LOADED'
export const SIGN_UP = 'SIGN_UP'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const CURRENT_USER = 'CURRENT_USER'
export const CHANGE_BILLING = 'CHANGE_BILLING'
export const GET_BILLING = 'GET_BILLING'
export const RESET_PASSWORD = 'RESET_PASSWORD'
export const REQUEST_PASSWORD = 'REQUEST_PASSWORD'
export const UNKNOWN = 'UNKNOWN'

export function signUp (userData, redirect = '/', eventToAttend) {
  return (dispatch) => {
    dispatch(toggleSpinner(true))

    const body = {
      user: userData
    }

    API.post('/users', body).then(
      (dbUser) => {
        _loginSuccess(dispatch, dbUser)
        if (eventToAttend && typeof eventToAttend === 'string') {
          dispatch(attendForFree(eventToAttend))
        }
      },
      (error) => {
        _loginFail(dispatch, error)
      }).then(() => {
        dispatch(push(redirect))
        dispatch(toggleSpinner(false))
      }
      ).catch((error) => {
        errorReporter.submit(error)
      }
    )
  }
}

export function login (data, redirect = '/', eventToAttend) {
  return (dispatch) => {
    const body = {
      user: data
    }

    API.post('/users/sign_in', body)
      .then((dbUser) => {
        _loginSuccess(dispatch, dbUser)
        if (eventToAttend && typeof eventToAttend === 'string') {
          dispatch(attendForFree(eventToAttend))
        }
        dispatch(push(redirect))
      }, (error) => {
        _loginFail(dispatch, error)
      }).catch((error) => {
        errorReporter.submit(error)
      })
  }
}

export function fbLogin (fbUserData, redirect = '/', eventToAttend) {
  return (dispatch) => {
    API.post('/facebook_login', {fbUser: fbUserData}).then(
      (dbUser) => {
        _loginSuccess(dispatch, dbUser)
        if (eventToAttend && typeof eventToAttend === 'string') {
          dispatch(attendForFree(eventToAttend))
        }

        const fbId = fbUserData.id
        const accessToken = fbUserData.accessToken

        getFbFriends(`https://graph.facebook.com/v2.5/${fbId}/friends?access_token=${accessToken}`, fbId)

        dispatch(push(redirect))
      },
      (error) => {
        _loginFail(dispatch, error)
      }
    ).catch((error) => {
      errorReporter.submit(error)
    })
  }
}

export function logout () {
  return (dispatch) => {
    dispatch(clearProfile())
    API.delete('/users/sign_out').then(
      () => {
        session.deleteToken()

        dispatch({
          type: LOGOUT,
          payload: {}
        })

        dispatch(push('/'))
      },
      (error) => {
        session.deleteToken()

        dispatch({
          error,
          type: LOGOUT,
          payload: error.message
        })

        dispatch(push('/'))
      }
    ).catch((error) => {
      errorReporter.submit(error)
    })
  }
}

export function verifySession (token) {
  if (!token) {
    return {
      type: LOGOUT
    }
  }

  return (dispatch) => {
    dispatch({
      type: LOGIN,
      payload: UNKNOWN
    })

    API.get('/current_session').then(
      (dbUser) => {
        _loginSuccess(dispatch, dbUser)
      }
    ).catch((error) => {
      errorReporter.submit(error)
      // We are suppressing this error because if the user goes to kickparty
      // with an old JWT, it will create a notification. This notification then
      // would usually happen when you first go to the page.
      session.deleteToken()
    })
  }
}

export function changeBilling (data, redirect) {
  return (dispatch) => {
    dispatch({
      type: CHANGE_BILLING,
      fetching: true
    })

    API.post('/payments', data).then(
      (response) => {
        // response is an object containing data (payment method), and response (status code)
        // If the only reason for this GET call is to update 'payment' bool of user then it should be removed
        // and that logic should be added to the reducer. Keeping this just incase there is some security reason for this.
        API.get('/current_session').then(
          (dbUser) => {
            _loginSuccess(dispatch, dbUser)
            dispatch({
              type: CHANGE_BILLING,
              payload: response.data,
              fetching: false
            })
            if (redirect) {
              dispatch(push(redirect))
            }
          },
          (error) => {
            _loginFail(dispatch, error)
          }
        ).catch((error) => {
          errorReporter.submit(error)
        })
      },
      (error) => {
        dispatch(addNotification({
          type: 'error',
          title: 'Credit Card Processing',
          message: error.message,
          timeOut: 5000
        }))

        dispatch(toggleSpinner(false))
      }
    ).catch((error) => {
      errorReporter.submit(error)
    })
  }
}

export function getBilling () {
  return (dispatch) => {
    API.get('/payments').then(
      (response) => {
        dispatch({
          type: GET_BILLING,
          payload: response
        })
      },
      (error) => {
        dispatch({
          error: true,
          payload: error.message,
          type: GET_BILLING
        })
      }
    ).catch((error) => {
      errorReporter.submit(error)
    })
  }
}

export function requestPassword (props) {
  return (dispatch) => {
    API.post('/reset_password_request', { user: props }).then(
      () => {
        dispatch(push('/'))
      },
      (error) => {
        dispatch({
          type: REQUEST_PASSWORD,
          error: true,
          payload: error.message
        })
      }
    ).catch((error) => {
      errorReporter.submit(error)
    })
  }
}

export function resetPassword (props) {
  return (dispatch) => {
    API.post('/reset_password', { user: props }).then(
      () => {
        dispatch(push('/'))
      },
      (error) => {
        dispatch({
          type: RESET_PASSWORD,
          error: true,
          payload: error.message
        })
      }
    ).catch((error) => {
      errorReporter.submit(error)
    })
  }
}

function _loginSuccess (dispatch, dbUser) {
  const user = new UserModel(dbUser.data)
  session.token = user.authToken

  dispatch({
    type: LOGIN,
    payload: {
      user,
      loggedIn: true
    }
  })
}

function _loginFail (dispatch, error) {
  session.deleteToken()

  return dispatch({
    error,
    type: LOGIN,
    payload: { errorMessage: error.message, loggedIn: false }
  })
}

function getFbFriends (nextUrl, fbId, friends = []) {
  if (!nextUrl) return

  API.getExactUrl(nextUrl).then(
    (response) => {
      friends = friends.concat(response.data)

      if (response.paging.next) {
        getFbFriends(response.paging.next, fbId, friends)
      } else {
        sendFbFriendsToBackend(fbId, friends)
      }
    },
    (error) => {
      errorReporter.submit(error)
    }
  )
}

function sendFbFriendsToBackend (fbId, friends) {
  const requestBody = {
    userId: fbId,
    friendIds: friends.map((elem) => elem.id)
  }

  API.post('/users/update_fb_friends', requestBody).then(
    (success) => {},
    (error) => {
      errorReporter.submit(error)
    }
  )
}
