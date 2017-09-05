import { push, replace } from 'react-router-redux'
import { toggleSpinner } from '../actions/appActions'

function handleErrorStatus (dispatch, error, type = 'ERROR', defaultPushPath = undefined) {
  if (error['status'] === 404) {
    dispatch(replace('/404'))
    dispatch(toggleSpinner(false))
  } else if (error['status'] === 500) {
    dispatch(replace('/500'))
    dispatch(toggleSpinner(false))
  } else {
    if (defaultPushPath) {
      console.log(`Redirecting to ${defaultPushPath}`)
      dispatch(push(defaultPushPath))
    }

    dispatch({error: true, type: type, payload: error['message']})
  }
}

export default handleErrorStatus
