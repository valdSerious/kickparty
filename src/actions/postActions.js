import API from '../utils/api'
import handleErrorStatus from '../utils/httpStatusHandler'
import errorReporter from '../utils/errorReporter'

export const CREATE_COMMENT = 'CREATE_COMMENT'
export const CLEAR_COMMENT_FROM_STORE = 'CLEAR_COMMENT_FROM_STORE'
export const UPDATE_LIKE = 'UPDATE_LIKE'
export const CLEAR_LIKE_FROM_STORE = 'CLEAR_LIKE_FROM_STORE'

export function createComment (params) {
  return (dispatch) => {
    API.post('/comments', params).then(
      (comment) => {
        dispatch({
          type: CREATE_COMMENT,
          payload: comment.data
        })
      },
      (error) => {
        handleErrorStatus(dispatch, error, CREATE_COMMENT)
      }
    ).catch((error) => {
      errorReporter.submit(error)
    })
  }
}

export function clearNewCommentFromStore (objectId) {
  return (dispatch) => {
    dispatch({
      type: CLEAR_COMMENT_FROM_STORE,
      payload: objectId
    })
  }
}

export function addLike (postId, objectTypeId) {
  return (dispatch) => {
    API.post('/likes', {objectTypeId: objectTypeId, objectId: postId}).then(
      (response) => {
        dispatch({
          type: UPDATE_LIKE,
          payload: {
            ...response.data,
            objectId: postId,
            delta: 1
          }
        })
      })
      .catch(console.log('Error processing like'))
  }
}

export function removeLike (postId, likeId, objectTypeId) {
  return (dispatch) => {
    API.delete(`/likes/${likeId}`, {objectTypeId: objectTypeId, objectId: postId}).then(
      (response) => {
        dispatch({
          type: UPDATE_LIKE,
          payload: {
            objectId: postId,
            delta: -1
          }
        })
      }
    ).catch((err) => {
      console.error('Resource like error:', err)
    })
  }
}

export function clearLikeFromStore (objectId) {
  return (dispatch) => {
    dispatch({
      type: CLEAR_LIKE_FROM_STORE,
      payload: objectId
    })
  }
}
