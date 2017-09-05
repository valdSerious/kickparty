import eventFormReducer from './eventFormReducer'
import expect from 'expect'
import { SAVE_DATE, SAVE_FUND_DEADLINE, SAVE_START_TIME, SAVE_END_TIME,
  SAVE_IMAGE, SAVE_LOCATION, CHANGE_ATTENDEE, UPDATE_RESOURCE } from '../actions/eventFormAction'

const reducer = eventFormReducer.eventForm

describe('Event Form Reducer', () => {
  it('saves start and deadline dates', () => {
    const now = Date()
    const startDateAction = { type: SAVE_DATE, payload: now }
    const fundDeadlineAction = { type: SAVE_FUND_DEADLINE, payload: now }

    // Make sure it sets start date
    expect(
      reducer(undefined, startDateAction)
    ).toEqual({ startDate: now })

    // Make sure it sets fund deadline date
    expect(
      reducer(undefined, fundDeadlineAction)
    ).toEqual({ fundDeadline: now })
  })

  it('saves start and end times', () => {
    const someTimeValue = 17
    const startTimeAction = { type: SAVE_START_TIME, payload: someTimeValue }
    const endTimeAction = { type: SAVE_END_TIME, payload: someTimeValue }

    expect(
      reducer(undefined, startTimeAction)
    ).toEqual({ startTime: someTimeValue })

    expect(
      reducer(undefined, endTimeAction)
    ).toEqual({ endTime: someTimeValue })
  })

  it('saves image', () => {
    // TODO: Payload should be an a Parse.File object
    // Probably not necessary to test here
    const action = { type: SAVE_IMAGE, payload: undefined }
    expect(
      reducer(undefined, action)
    ).toEqual({ headerImage: undefined })
  })

  it('saves location', () => {
    const location = {
      locationName: 'Tahoe',
      locationAddress: '1234 Super Street'
    }
    const action = { type: SAVE_LOCATION, payload: location }
    expect(
      reducer(undefined, action)
    ).toEqual(location)
  })

  it('changes attendee', () => {
    const action = (attendeeCount) => {
      return {
        type: CHANGE_ATTENDEE,
        payload: attendeeCount
      }
    }

    // sets attendee count for the first time
    expect(
      reducer(undefined, action(2000))
    ).toEqual({ attendeeCount: 2000 })

    // changes it if previously set
    expect(
      reducer({ attendeeCount: 2000 }, action(3000))
    ).toEqual({ attendeeCount: 3000 })
  })

  it('updates resources', () => {
    const resources = {}
    resources.value = 10
    const action = { type: UPDATE_RESOURCE, payload: resources }
    expect(
      reducer(undefined, action)
    ).toEqual({ resources: resources.value })
  })
})
