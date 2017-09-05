import { push } from 'react-router-redux'

import API from '../utils/api'
import { verifySession } from './authActions'
import session from '../utils/session'
import handleErrorStatus from '../utils/httpStatusHandler'
import errorReporter from '../utils/errorReporter'

export const GET_PROFILE = 'GET_PROFILE'
export const EDIT_PROFILE = 'EDIT_PROFILE'
export const CLEAR_PROFILE = 'CLEAR_PROFILE'
export const FOLLOW = 'FOLLOW'
export const UNFOLLOW = 'UNFOLLOW'

export function getProfile (slug) {
  return (dispatch) => {
    if (slug) {
      dispatch({type: GET_PROFILE, fetching: true})

      API.get('/users/' + slug).then(
        (profile) => {
          dispatch({type: GET_PROFILE, payload: profile})
        },
        (error) => {
          handleErrorStatus(dispatch, error, GET_PROFILE, '/')
        }
      ).catch((error) => {
        errorReporter.submit(error)
      })
    } else {
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    }
  }
}

export function editProfile (slug, body) {
  return (dispatch) => {
    API.patch(`/users/${slug}`, body).then(
      (profile) => {
        // Update the AWT token and force a session verification
        session.token = profile.data.authToken
        dispatch(verifySession(session.token))
        dispatch(push(`/${profile.data.slug}`))
      },
      (error) => {
        handleErrorStatus(dispatch, error, EDIT_PROFILE, `/${slug}`)
      }
    ).catch((error) => {
      errorReporter.submit(error)
    })
  }
}

export function changePassword (slug, body) {
  return (dispatch) => {
    API.patch(`/users/${slug}`, body).then(
      (profile) => {
        dispatch(push(`/${slug}`))
      },
      (error) => {
        handleErrorStatus(dispatch, error, 'ERROR', `/${slug}`)
      }
    ).catch((error) => {
      errorReporter.submit(error)
    })
  }
}

export function clearProfile () {
  return {
    type: CLEAR_PROFILE,
    payload: null
  }
}

export function follow (followed_id) {
  return (dispatch) => {
    API.post('/relationships/', {followed_id}).then(
      (response) => {
        dispatch({
          type: FOLLOW,
          payload: {...response, following: true}
        })
      },
      (error) => {
        handleErrorStatus(dispatch, error, FOLLOW)
      }
    ).catch((error) => {
      errorReporter.submit(error)
    })
  }
}

export function unfollow (userId) {
  return (dispatch) => {
    API.delete(`/relationships/${userId}/`).then(
      (response) => {
        dispatch({
          type: UNFOLLOW,
          payload: {...response, following: false}
        })
      },
      (error) => {
        handleErrorStatus(dispatch, error, UNFOLLOW)
      }
    ).catch((error) => {
      errorReporter.submit(error)
    })
  }
}
