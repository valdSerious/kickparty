import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { AddResources } from '../components/EventForm'
import EventBanner from '../components/EventBanner'
import eventFormMapper from '../utils/eventFormMapper'
import { getEvent, updateEvent } from '../actions/eventActions'
import { removeResource } from '../actions/eventActions'
import { requireEditAuthentication } from '../components/Authentication/AuthenticateEdit'

class NewResourcesPage extends Component {
  static get displayName () {
    return 'EditResourcesPage'
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
    this.onCancel = this.onCancel.bind(this)
    this.removeResource = this.removeResource.bind(this)
  }

  removeResource (resource) {
    const { event } = this.props
    if (event) {
      // we only have one tier right now
      this.props.dispatch(removeResource(event.slug, resource.resourceId, event.tiers[0].tierId))
    }
  }

  onSubmit (formData) {
    const { form, event } = this.props
    if (form && event && event.slug) {
      const mappedData = eventFormMapper.resourcesToApi(formData, form, event.slug)
      this.props.dispatch(updateEvent(mappedData, event.slug))
    }
  }

  onCancel () {
    this.props.dispatch(push(`/events/${this.props.event.slug}`))
  }

  render () {
    const { event, resourceTypes } = this.props

    if (!event || !resourceTypes || resourceTypes.length === 0) {
      return <div />
    }

    return (
      <div className='new-event-page'>
        <EventBanner title='Event Summary' event={ event } />
        <AddResources
          onSubmit={this.onSubmit}
          onCancel={this.onCancel}
          removeResource={this.removeResource}
          resourceTypes={resourceTypes}
          activeResources={event.helpers.resources}
          minAttendeeCount={event.helpers.minAttendeeCount}
          baseCost={event.helpers.baseCost}
          costPerPerson={event.helpers.costPerPerson}
          calculationMethod={event.helpers.calculationMethod}
        />
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

export default connect(mapStateToProps)(requireEditAuthentication(NewResourcesPage, 'eventStore', 'event', 'eventId', getEvent))
