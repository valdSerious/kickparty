import API from '../utils/api'
import errorReporter from '../utils/errorReporter'

export const SPINNER = 'SPINNER'
export const MODAL = 'MODAL'
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION'
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION'

/* Expects a notification in the following format:
{
  type: 'warning/info/success/error'
  title: 'Title',
  message: 'Message',
  timeOut:
}
*/
var notificationCounter = 0
export function addNotification (notification) {
  return (dispatch) => {
    notificationCounter++

    var options = {
      id: notificationCounter,
      timeout: 7000,
      onClick: () => {
        dispatch(hideNotification({id: options.id}))
      }
    }

    dispatch({
      type: ADD_NOTIFICATION,
      payload: { ...options, ...notification }
    })
  }
}

export function hideNotification (notification) {
  return {
    type: HIDE_NOTIFICATION,
    payload: notification
  }
}

export function toggleSpinner (showSpinner) {
  return {
    type: SPINNER,
    payload: showSpinner
  }
}

/*
content.title
content.content
content.size
content.children
*/

export function updateModal (content) {
  return {
    type: MODAL,
    payload: content
  }
}

// for testing - PLO
export function fetchError (id) {
  return (dispatch) => {
    dispatch({
      type: 'FETCH_ERROR',
      fetching: true
    })

    API.get('/api/errors').then(
      (event) => {
        console.log('should never get here')
      },
      (error) => {
        dispatch({
          error: true,
          type: 'FETCH_ERROR',
          payload: error['message']
        })
      }
    ).catch((error) => {
      errorReporter.submit(error)
    })
  }
}
