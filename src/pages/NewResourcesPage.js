import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { AddResources } from '../components/EventForm'
import EventBanner from '../components/EventBanner'
import { getEvent, updateEvent } from '../actions/eventActions'
import eventFormMapper from '../utils/eventFormMapper'

class NewResourcesPage extends Component {
  static get displayName () {
    return 'NewResourcesPage'
  }

  static propTypes () {
    return {
      dispatch: PropTypes.func,
      event: PropTypes.object,
      params: PropTypes.object,
      resourceTypes: PropTypes.array,
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
    this.props.dispatch(getEvent(this.props.params.eventId))
  }

  onSubmit (formData) {
    const { form } = this.props
    const mappedData = eventFormMapper.resourcesToApi(formData, form, this.props.event.slug)
    this.props.dispatch(updateEvent(mappedData, this.props.event.slug))
  }

  render () {
    const { event, resourceTypes } = this.props

    if (!event || !resourceTypes || resourceTypes.length === 0) {
      return null
    }

    return (
      <div className='new-event-page'>
        <EventBanner title='Event Summary' event={ event } />
        <AddResources onSubmit={ this.onSubmit } resourceTypes={ resourceTypes } minAttendeeCount={event.helpers.minAttendeeCount} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    event: state.eventStore.event,
    resourceTypes: state.resourceStore.resourceTypes,
    form: state.form.eventResources
  }
}

export default connect(mapStateToProps)(NewResourcesPage)
