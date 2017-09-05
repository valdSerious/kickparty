import API from '../utils/api'
import debounce from 'lodash/debounce.js'
import errorReporter from '../utils/errorReporter'
import isValid from '../utils/isValid'

export const CHANGE_SLUG = 'CHANGE_SLUG'
export const CHECK_SLUG = 'CHECK_SLUG'
export const CHANGE_EMAIL = 'CHANGE_EMAIL'
export const CHECK_EMAIL = 'CHECK_EMAIL'

export function changeSlug (slug) {
  return (dispatch) => {
    dispatch({
      type: CHANGE_SLUG,
      payload: {
        value: slug,
        touched: true,
        visited: true
      }
    })

    if (slug === '') {
      dispatch({
        type: CHECK_SLUG,
        payload: {
          value: '',
          touched: true,
          visited: true
        }
      })
    } else {
      _checkSlug(dispatch, slug)
    }
  }
}

const _checkSlug = debounce((dispatch, slug) => {
  API.get(`/users/check_slug/${slug}`).then(
    (good) => {
      dispatch({
        type: CHECK_SLUG,
        payload: {
          value: good.count === 1 ? undefined : slug,
          touched: true,
          visited: true
        }
      })
    },
    (error) => {
      dispatch({error: true, type: CHECK_SLUG, payload: error['message']})
    }
  ).catch((error) => {
    errorReporter.submit(error)
  })
}, 250)

export function changeEmail (email) {
  return (dispatch) => {
    dispatch({
      type: CHANGE_EMAIL,
      payload: {
        value: email,
        touched: true,
        visited: true
      }
    })
    if (isValid.email(email)) {
      dispatch({
        type: CHECK_EMAIL,
        payload: {
          value: email,
          touched: true,
          visited: true
        }
      })
    } else { // Only dispatch check if the email is a valid email.
      _checkEmail(dispatch, email)
    }
  }
}

const _checkEmail = debounce((dispatch, email) => {
  API.post('/users/check_email', {email}).then(
    (good) => {
      dispatch({
        type: CHECK_EMAIL,
        payload: {
          value: good.count === 1 ? undefined : email,
          touched: true,
          visited: true
        }
      })
    },
    (error) => {
      dispatch({error: true, type: CHECK_EMAIL, payload: error['message']})
    }
  ).catch((error) => {
    errorReporter.submit(error)
  })
}, 250)
