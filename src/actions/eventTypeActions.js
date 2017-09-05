import EventTypeModel from '../models/EventTypeModel'
import EVENT_TYPES from '../constants/EVENT_TYPES.json'
export const GET_EVENT_TYPES = 'GET_EVENT_TYPES'
export const GET_EVENT_TYPE = 'GET_EVENT_TYPE'
export const POST_EVENT_TYPE = 'POST_EVENT_TYPE'

/*
Get all event types
*/
export function getEventTypes () {
  const types = []

  EVENT_TYPES.forEach((type) => {
    types.push(new EventTypeModel(type))
  })

  return {
    type: GET_EVENT_TYPES,
    payload: types
  }
}
