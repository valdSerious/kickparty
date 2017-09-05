import API from '../utils/api'
import debounce from 'lodash/debounce.js'
import errorReporter from '../utils/errorReporter'

export const CHANGE_SLUG = 'CHANGE_SLUG'
export const CHECK_SLUG = 'CHECK_SLUG'

export function changeSlug (slug, ownSlug) {
  return (dispatch) => {
    dispatch({
      type: CHANGE_SLUG,
      payload: {
        value: slug,
        touched: true,
        visited: true
      }
    })

    if (slug === ownSlug) {
      dispatch({
        type: CHECK_SLUG,
        payload: {
          value: slug,
          touched: true,
          visited: true
        }
      })
    } else if (slug === '') {
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
