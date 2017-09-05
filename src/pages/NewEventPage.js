import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import EventBanner from '../components/EventBanner'
import { CreateEvent } from '../components/EventForm'
import { createEvent } from '../actions/eventActions'
import { clearForm } from '../actions/eventFormAction'
import eventFormMapper from '../utils/eventFormMapper'

class NewEventPage extends Component {
  static get displayName () {
    return 'NewEventPage'
  }

  static propTypes () {
    return {
      dispatch: PropTypes.func,
      params: PropTypes.object,
      eventTypes: PropTypes.array,
      form: PropTypes.object
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      buildBarTitle: 'Create an Event'
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillMount () {
    this.props.dispatch(clearForm())
    // this.props.dispatch(getEventTypes())
  }

  onSubmit (formData) {
    const mappedData = eventFormMapper.toApi(formData)
    this.props.dispatch(createEvent(mappedData))
  }

  render () {
    const { eventTypes } = this.props

    if (!eventTypes || eventTypes.length === 0) {
      return null
    }

    return (
      <div className='new-event-page'>
        <EventBanner title={ this.state.buildBarTitle } event={ this.state.event } />
        <CreateEvent onSubmit={ this.onSubmit } eventTypes={ eventTypes } />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    event: state.eventStore.event,
    eventTypes: state.eventStore.eventTypes,
    form: state.form.eventForm
  }
}

export default connect(mapStateToProps)(NewEventPage)
