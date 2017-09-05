import API from '../utils/api'
import handleErrorStatus from 'utils/httpStatusHandler'
import errorReporter from 'utils/errorReporter'

export const FOLLOW = 'FOLLOW'
export const UNFOLLOW = 'UNFOLLOW'
export const CHECK_FOLLOW = 'CHECK_FOLLOW'

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
