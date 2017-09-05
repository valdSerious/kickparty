import { push } from 'react-router-redux'
import objectAssign from 'object-assign'

import EventModel from '../models/EventModel'
import PostModel from '../models/PostModel'
import { toggleSpinner, addNotification } from './appActions'
import API from '../utils/api'
import handleErrorStatus from '../utils/httpStatusHandler'
import errorReporter from '../utils/errorReporter'

export const GET_EVENTS = 'GET_EVENTS'
export const SEARCH_EVENTS = 'SEARCH_EVENTS'
export const GET_EVENT = 'GET_EVENT'
export const POST_EVENT = 'POST_EVENT'
export const CREATE_EVENT = 'CREATE_EVENT'
export const ATTEND_EVENT = 'ATTEND_EVENT'
export const LEAVE_EVENT = 'LEAVE_EVENT'
export const REMOVE_RESOURCE = 'REMOVE_RESOURCE'
export const DELETE_EVENT = 'DELETE_EVENT'
export const UPDATE_EVENT = 'UPDATE_EVENT'
export const GET_POSTS = 'GET_POSTS'
export const CREATE_POST = 'CREATE_POST'

/*
Get all events
*/
export function getEvents () {
  return (dispatch) => {
    dispatch({
      type: GET_EVENTS,
      fetching: true
    })

    API.get('/events').then(
      (events) => {
        const eventModels = []

        events.forEach((event) => {
          eventModels.push(new EventModel(event))
        })

        dispatch({
          type: GET_EVENTS,
          payload: eventModels
        })
      },
      (error) => {
        handleErrorStatus(dispatch, error, GET_EVENTS)
      }
    ).catch((error) => {
      errorReporter.submit(error)
    })
  }
}

/*
Get filtered list of events
*/
export function searchEvents (searchTerm) {
  const searchParams = {
    searchTerm
    // locationLat
    // locationLng
  }

  return (dispatch) => {
    dispatch(toggleSpinner(true))

    API.post('/events/search', searchParams).then(
      (events) => {
        const eventModels = []

        events.forEach((event) => {
          eventModels.push(new EventModel(event))
        })

        dispatch({
          type: SEARCH_EVENTS,
          payload: eventModels
        })
      },
      (error) => {
        dispatch({
          error: true,
          type: SEARCH_EVENTS,
          payload: error['message']
        })
        dispatch(toggleSpinner(false))
      }
    )
    .then(() => {
      dispatch(push(`/search?term=${searchTerm}`, {
        term: searchTerm
      }))
    })
    .then(() => {
      dispatch(toggleSpinner(false))
    })
    .catch((error) => {
      errorReporter.submit(error)
    })
  }
}

/*
Get a single event by id
@params id: [string]
*/
export function getEvent (id) {
  return (dispatch) => {
    dispatch({
      type: GET_EVENT,
      fetching: true
    })

    API.get(`/events/${id}`).then(
      (event) => {
        // console.log(JSON.stringify(event, null, 2))
        const eventModel = new EventModel(event)
        dispatch({
          type: GET_EVENT,
          payload: eventModel
        })
      },
      (error) => {
        handleErrorStatus(dispatch, error, GET_EVENT, '/')
      }
    ).catch((error) => {
      errorReporter.submit(error)
    })
  }
}

export function updateEvent (attrs, slug) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_EVENT,
      fetching: true
    })

    API.post(`/events/${slug}/update`, attrs).then(
      (success) => {
        dispatch({
          type: UPDATE_EVENT,
          payload: attrs
        })
        dispatch(push(`/events/${success.data.slug}`))
      },
      (error) => {
        handleErrorStatus(dispatch, error, UPDATE_EVENT)
      }
    ).catch((error) => {
      errorReporter.submit(error)
    })
  }
}

export function createEvent (attrs) {
  return (dispatch) => {
    dispatch({
      type: CREATE_EVENT,
      fetching: true
    })

    API.post('/events/', attrs).then(
      (response) => {
        const eventModel = new EventModel(response.data)
        dispatch({
          type: CREATE_EVENT,
          payload: eventModel
        })
        getEvents()(dispatch)
        dispatch(push(`/events/${eventModel.slug}/resources`))
      },
      (error) => {
        handleErrorStatus(dispatch, error, CREATE_EVENT)
      }
    ).catch((error) => {
      errorReporter.submit(error)
    })
  }
}

export function attendEvent (eventSlug, paymentId, contribution, note, guests) {
  return (dispatch) => {
    dispatch({
      type: ATTEND_EVENT,
      fetching: true
    })

    API.post('/attendees', { eventId: eventSlug, paymentId, contribution, note, guests }).then(
      () => {
        dispatch({
          type: ATTEND_EVENT,
          payload: eventSlug
        })
        dispatch(push(`/events/${eventSlug}`))
      },
      (error) => {
        handleErrorStatus(dispatch, error, ATTEND_EVENT)
      }
    ).catch((error) => {
      errorReporter.submit(error)
    })
  }
}

export function attendForFree (eventSlug) {
  return (dispatch) => {
    dispatch({
      type: ATTEND_EVENT,
      fetching: true
    })

    API.post('/attendees/attend', { eventId: eventSlug }).then(
      () => {
        dispatch({
          type: ATTEND_EVENT,
          payload: eventSlug
        })
        dispatch(getEvent(eventSlug))
      },
      (error) => {
        handleErrorStatus(dispatch, error, ATTEND_EVENT)
      }
    ).catch((error) => {
      errorReporter.submit(error)
    })
  }
}

export function leaveEvent (eventSlug) {
  return (dispatch) => {
    dispatch({
      type: LEAVE_EVENT
    })

    API.delete(`/events/${eventSlug}/attendees`).then(
      (response) => {
        /*
        dispatch({
          type: LEAVE_EVENT,
          payload: eventSlug
        })
        */
        dispatch(getEvent(eventSlug))
      },
      (error) => {
        handleErrorStatus(dispatch, error, LEAVE_EVENT)
      }
    ).catch((error) => {
      errorReporter.submit(error)
    })
  }
}

/*
Get all posts by event id
@params id: [string]
*/
export function getPosts (eventSlug) {
  return (dispatch) => {
    API.get(`/posts/${eventSlug}`).then(
      (posts) => {
        const postModels = []
        posts.forEach((post) => {
          postModels.push(new PostModel(post))
        })

        dispatch({
          type: GET_POSTS,
          payload: posts.map((post) => {
            return new PostModel(post)
          })
        })
      },
      (error) => {
        handleErrorStatus(dispatch, error, GET_POSTS, '/')
      }
    ).catch((error) => {
      errorReporter.submit(error)
    })
  }
}

/*
Create a posts with event id, user id
@params id: [string]
*/
export function createPost (params) {
  return (dispatch) => {
    API.post('/posts', {post: params}).then(
      (post) => {
        dispatch({
          type: CREATE_POST,
          payload: new PostModel(post.data)
        })
      },
      (error) => {
        handleErrorStatus(dispatch, error, CREATE_POST)
      }
    ).catch((error) => {
      errorReporter.submit(error)
    })
  }
}

/* Remove an event's resource
* TODO: After successfully deleting a resource, it fetches the event again and rerenders
* (this is inefficient and looks bad, but works for now)
* @param slug - event slug; can be passed id instead
* @param resourceId
* @param tierId
*/
export function removeResource (eventSlug, resourceId, tierId) {
  // TODO: add proper async flow for loading/error handling. See above.
  return (dispatch) => {
    API.delete(`/resources/${eventSlug}`, { resourceId, tierId }).then(
      (response) => {
        dispatch(getEvent(eventSlug))
      },
      (error) => {
        handleErrorStatus(dispatch, error, REMOVE_RESOURCE)
      }
    ).catch((error) => {
      errorReporter.submit(error)
    })
  }
}

/* Delete an event
*/
export function deleteEvent (eventSlug) {
  // TOOD: add proper async flow for loading/error handling. See above.
  return (dispatch) => {
    dispatch(toggleSpinner(true))

    API.delete(`/events/${eventSlug}`).then(
      (response) => {
        dispatch(push('/events'))
      },
      (error) => {
        handleErrorStatus(dispatch, error, DELETE_EVENT)
      }
    ).catch((error) => {
      errorReporter.submit(error)
    })
  }
}

export function messageGuests (message, eventSlug) {
  const params = objectAssign({}, message, {
    id: eventSlug
  })

  const notification = {
    type: (message.sendPreview) ? 'info' : 'success',
    title: (message.sendPreview) ? 'Preview Sent' : 'Confirmation',
    message: (message.sendPreview) ? 'Check your inbox for your message' : 'Your message has been sent',
    timeOut: 5000
  }

  return (dispatch) => {
    API.post('/emails', params).then(
      () => {
        dispatch(addNotification(notification))
      },
      (error) => {
        errorReporter.submit(error)
      }
    ).catch((error) => {
      errorReporter.submit(error)
    })
  }
}
