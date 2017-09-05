import React, { Component, PropTypes } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'

import { getEvent, updateEvent } from '../actions/eventActions'
import { CreateEvent } from '../components/EventForm'
import EventBanner from '../components/EventBanner'
import eventFormMapper from '../utils/eventFormMapper'
import { requireEditAuthentication } from '../components/Authentication/AuthenticateEdit'

class EditEventPage extends Component {
  static get displayName () {
    return 'EditEventPage'
  }

  static propTypes () {
    return {
      dispatch: PropTypes.func,
      event: PropTypes.object,
      eventTypes: PropTypes.array,
      params: PropTypes.object,
      resourceTypes: PropTypes.array,
      form: PropTypes.array
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      mappedEvent: {}
    }

    this.updateEvent = this.updateEvent.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  updateEvent (formData) {
    const mappedData = eventFormMapper.toApi(formData)
    this.props.dispatch(updateEvent(mappedData, this.props.event.slug))
  }

  onCancel () {
    this.props.dispatch(push(`/events/${this.props.event.slug}`))
  }

  render () {
    const { event, eventTypes } = this.props

    if (!event || !eventTypes || eventTypes.length === 0) {
      return null
    }

    return (
      <div className='new-event-page'>
        <EventBanner title='Event Summary' event={ event } />
        <CreateEvent initFields={ event } eventTypes={ eventTypes } onSubmit={ this.updateEvent } onCancel={ this.onCancel } />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    event: state.eventStore.event,
    eventTypes: state.eventStore.eventTypes,
    resourceTypes: state.resourceStore.resourceTypes,
    form: state.form.eventForm
  }
}

export default connect(mapStateToProps)(requireEditAuthentication(EditEventPage, 'eventStore', 'event', 'eventId', getEvent))
