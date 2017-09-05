import events from './eventsReducer'
import expect from 'expect'
import { GET_EVENTS, GET_EVENT, POST_EVENT } from '../actions/eventActions'
import { GET_EVENT_TYPES, GET_EVENT_TYPE, POST_EVENT_TYPE } from '../actions/eventTypeActions'

const ARR_OF_EVENTS = [
  {
    name: 'Beach Party',
    id: 1,
    createdAt: 'Dec 06, 2015, 20:20',
    updatedAt: 'Dec 06, 2015, 20:21'
  },
  {
    name: 'Bowling',
    id: 2,
    createdAt: 'Dec 07, 2015, 20:20',
    updatedAt: 'Dec 08, 2015, 20:21'
  }
]

const SINGLE_EVENT = {
  name: 'Reunion',
  id: 3,
  createdAt: 'Dec 09, 2015, 20:20',
  updatedAt: 'Dec 10, 2015, 20:21'
}

const ARR_OF_EVENT_TYPES = [
  'Party',
  'Sport',
  'Engagement',
  'Wedding',
  'Reunion'
]

const SINGLE_EVENT_TYPE = 'Party'

const FILLER_STATE = {
  isThisFillerData: true,
  reason: 'For tests'
}

describe('Events Reducer', () => {
  it('returns the state if action is unknown', () => {
    expect(
      events(FILLER_STATE, {action: 'random'})
    ).toEqual(
      FILLER_STATE
    )
  })

  describe('GET_EVENTS', () => {
    it('gets events when state is undefined', () => {
      const action = {
        type: GET_EVENTS,
        error: false,
        payload: ARR_OF_EVENTS
      }

      expect(
        events(undefined, action)
      ).toEqual({
        events: ARR_OF_EVENTS
      })
    })

    it('gets events', () => {
      const action = {
        type: GET_EVENTS,
        error: false,
        payload: ARR_OF_EVENTS
      }

      expect(
        events(FILLER_STATE, action)
      ).toEqual({
        isThisFillerData: true,
        reason: 'For tests',
        events: ARR_OF_EVENTS
      })
    })

    it('returns state when GET_EVENT action has error', () => {
      const action = {
        type: GET_EVENTS,
        error: true
      }

      expect(
        events(FILLER_STATE, action)
      ).toEqual(
        FILLER_STATE
      )
    })
  })

  describe('GET_EVENT', () => {
    it('gets an event when state is undefined', () => {
      const action = {
        type: GET_EVENT,
        error: false,
        payload: SINGLE_EVENT
      }

      expect(
        events(undefined, action)
      ).toEqual({
        event: SINGLE_EVENT
      })
    })

    it('gets an event', () => {
      const action = {
        type: GET_EVENT,
        error: false,
        payload: SINGLE_EVENT
      }

      expect(
        events(FILLER_STATE, action)
      ).toEqual({
        isThisFillerData: true,
        reason: 'For tests',
        event: SINGLE_EVENT
      })
    })

    it('returns state when GET_EVENT action has error', () => {
      const action = {
        type: GET_EVENT,
        error: true
      }

      expect(
        events(FILLER_STATE, action)
      ).toEqual(
        FILLER_STATE
      )
    })
  })

  describe('POST_EVENT', () => {
    it('posts an event when state is undefined', () => {
      const action = {
        type: POST_EVENT,
        error: false,
        payload: SINGLE_EVENT
      }

      expect(
        events(undefined, action)
      ).toEqual({
        event: SINGLE_EVENT
      })
    })

    it('posts an event', () => {
      const action = {
        type: POST_EVENT,
        error: false,
        payload: SINGLE_EVENT
      }

      expect(
        events(FILLER_STATE, action)
      ).toEqual({
        isThisFillerData: true,
        reason: 'For tests',
        event: SINGLE_EVENT
      })
    })

    it('returns state when POST_EVENT action has error', () => {
      const action = {
        type: POST_EVENT,
        error: true
      }

      expect(
        events(FILLER_STATE, action)
      ).toEqual(
        FILLER_STATE
      )
    })
  })

  describe('GET_EVENT_TYPES', () => {
    it('gets event types when state is undefined', () => {
      const action = {
        type: GET_EVENT_TYPES,
        error: false,
        payload: ARR_OF_EVENT_TYPES
      }

      expect(
        events(undefined, action)
      ).toEqual({
        eventTypes: ARR_OF_EVENT_TYPES
      })
    })

    it('gets event types', () => {
      const action = {
        type: GET_EVENT_TYPES,
        error: false,
        payload: ARR_OF_EVENT_TYPES
      }

      expect(
        events(FILLER_STATE, action)
      ).toEqual({
        isThisFillerData: true,
        reason: 'For tests',
        eventTypes: ARR_OF_EVENT_TYPES
      })
    })

    it('returns state when GET_EVENT_TYPES action has error', () => {
      const action = {
        type: GET_EVENT_TYPES,
        error: true
      }

      expect(
        events(FILLER_STATE, action)
      ).toEqual(
        FILLER_STATE
      )
    })
  })

  describe('GET_EVENT_TYPE', () => {
    it('gets an event type when state is undefined', () => {
      const action = {
        type: GET_EVENT_TYPE,
        error: false,
        payload: SINGLE_EVENT_TYPE
      }

      expect(
        events(undefined, action)
      ).toEqual({
        eventType: SINGLE_EVENT_TYPE
      })
    })

    it('gets an event type', () => {
      const action = {
        type: GET_EVENT_TYPE,
        error: false,
        payload: SINGLE_EVENT_TYPE
      }

      expect(
        events(FILLER_STATE, action)
      ).toEqual({
        isThisFillerData: true,
        reason: 'For tests',
        eventType: SINGLE_EVENT_TYPE
      })
    })

    it('returns state when GET_EVENT_TYPE action has error', () => {
      const action = {
        type: GET_EVENT_TYPE,
        error: true
      }

      expect(
        events(FILLER_STATE, action)
      ).toEqual(
        FILLER_STATE
      )
    })
  })

  describe('GET_EVENT_TYPE', () => {
    it('posts an event type when state is undefined', () => {
      const action = {
        type: POST_EVENT_TYPE,
        error: false,
        payload: SINGLE_EVENT_TYPE
      }

      expect(
        events(undefined, action)
      ).toEqual({
        eventType: SINGLE_EVENT_TYPE
      })
    })

    it('posts an event type', () => {
      const action = {
        type: POST_EVENT_TYPE,
        error: false,
        payload: SINGLE_EVENT_TYPE
      }

      expect(
        events(FILLER_STATE, action)
      ).toEqual({
        isThisFillerData: true,
        reason: 'For tests',
        eventType: SINGLE_EVENT_TYPE
      })
    })

    it('returns state when POST_EVENT_TYPE action has error', () => {
      const action = {
        type: POST_EVENT_TYPE,
        error: true
      }

      expect(
        events(FILLER_STATE, action)
      ).toEqual(
        FILLER_STATE
      )
    })
  })
})
