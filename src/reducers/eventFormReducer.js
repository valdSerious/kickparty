import objectAssign from 'object-assign'
import { SEARCH, SAVE_START_DATE, SAVE_END_DATE, SAVE_FUND_DEADLINE, SAVE_END_TIME, SAVE_START_TIME, SAVE_IMAGE, SAVE_LOCATION, SAVE_LOCATION_TIMEZONE, CHANGE_ATTENDEE, CHANGE_MAX_ATTENDEE, CLEAR_FORM, SAVE_DESCRIPTION, SAVE_BROWSER_AND_IP } from '../actions/eventFormAction'

export default function eventForm (state = {}, action) {
  switch (action.type) {
    case CLEAR_FORM:
      return {}
    case SAVE_START_DATE:
      return objectAssign({}, state, {
        startDate: action.payload
      })
    case SAVE_END_DATE:
      return objectAssign({}, state, {
        endDate: action.payload
      })
    case SAVE_FUND_DEADLINE:
      return objectAssign({}, state, {
        deadline: action.payload
      })
    case SAVE_START_TIME:
      return objectAssign({}, state, {
        startTime: action.payload
      })
    case SAVE_END_TIME:
      return objectAssign({}, state, {
        endTime: action.payload
      })
    case SAVE_IMAGE:
      return objectAssign({}, state, {
        headerImg: action.payload
      })
    case SAVE_LOCATION:
      return objectAssign({}, state, {
        locationName: action.payload.locationName,
        locationAddress: action.payload.locationAddress,
        locationLat: action.payload.locationLat,
        locationLng: action.payload.locationLng,
        locationCity: action.payload.locationCity,
        locationState: action.payload.locationState,
        locationCountry: action.payload.locationCountry
      })
    case SAVE_LOCATION_TIMEZONE:
      return objectAssign({}, state, {
        timezoneOffset: action.payload.timezoneOffset,
        timezoneName: action.payload.timezoneName
      })
    case SAVE_BROWSER_AND_IP:
      return objectAssign({}, state, {
        userData: action.payload.userData,
        browserData: action.payload.browserData
      })
    case SAVE_DESCRIPTION:
      return objectAssign({}, state, {
        description: action.payload
      })
    case CHANGE_ATTENDEE:
      return objectAssign({}, state, {
        attendeeCount: action.payload
      })
    case CHANGE_MAX_ATTENDEE:
      return objectAssign({}, state, {
        maxAttendeeCount: action.payload
      })
    case SEARCH:
      console.info('Search Reducer', action.payload)
      return objectAssign({}, state, {
        events: action.payload
      })
    default:
      return state
  }
}
