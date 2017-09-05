import React, { Component, PropTypes } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import classnames from 'classnames'

import ProfileImage from '../ProfileImage'
import format from '../../utils/format'

class EventBanner extends Component {
  static get displayName () {
    return 'EventBanner'
  }

  static get propTypes () {
    return {
      dispatch: PropTypes.func.isRequired,
      title: PropTypes.string.isRequired,
      currentUser: PropTypes.object,
      event: PropTypes.object,
      tag: PropTypes.string
    }
  }

  constructor (props) {
    super(props)

    this.state = {}

    this.renderEditEvent = this.renderEditEvent.bind(this)
    this.renderNewEvent = this.renderNewEvent.bind(this)
  }

  render () {
    const { event } = this.props
    const eventContent = (event) ? this.renderEditEvent() : this.renderNewEvent()
    const style = {}

    if (event && event.headerImage) {
      style.backgroundImage = `url(${event.headerImage})`
      style.backgroundSize = 'cover'
      style.backgroundPosition = 'center'
    }

    return (
      <div className='event-banner'>
        <div className='banner event__banner' style={ style }>
          <div className='wrapper'>
            <div className='flag'>
              <div className='triangle'></div>
            </div>

            <div className={ classnames('flag-text', { 'new-event': !event, 'edit-event': event }) }>
              <p><a style={{color: 'white'}} href='/events/new'>Plan Something Awesome.</a></p>
            </div>
          </div>

          { eventContent }

          <div className='build-bar'>
            <div className='wide'>
              <div className={ classnames('build-button-container', { 'new-event': !event, 'edit-event': event }) }>
                <div className='build-angle-left'></div>
                <div className='build-button'>{ this.props.title }</div>
                <div className='build-angle-right'></div>
              </div>
            </div>

            { (event && (event.me || event.host))
              ? <a className='edit-event-button' onClick={() => { this.props.dispatch(push(`/events/${event.slug}/edit`)) }}>EDIT EVENT</a>
              : <div className='edit-event-button empty'></div>
            }

          </div>
        </div>
      </div>
    )
  }

  renderEditEvent () {
    const { event } = this.props
    let hostedByImage
    let hostedByText

    if (!event.user) {
      return null
    }

    if (event.hostCount > 0) {
      let counter = event.hostCount
      let seperator

      hostedByImage = event.hosts.map((host, i) => {
        return <ProfileImage key={`${host.slug}-${i}`} margin={ '0 5px' } user={ host } size={ 75 }/>
      })
      hostedByText = event.hosts.map((host) => {
        counter--

        switch (counter) {
          case 0:
            seperator = ''
            break
          case 1:
            seperator = ' & '
            break
          default:
            seperator = ', '
        }

        return <span key={`${host.slug}`}><a className='photo-link' href={`/${host.slug}`}>{host.firstName}</a>{seperator}</span>
      })
      hostedByText = <div>Hosted by { hostedByText }</div>
    } else {
      hostedByImage = <ProfileImage user={ event.user }/>
      hostedByText = <div>Started by @<a href={`/${event.user.slug}`}>{event.user.firstName} {event.user.lastName}</a></div>
    }

    return (
      <div className='selector event'>
        <div style={{marginTop: '30px', maxWidth: '800px', textAlign: 'center'}} className='wide title'>{ event.name }</div>
        <div style={{marginTop: '-30px'}} className='wide'>{ hostedByImage }</div>
        <div className='wide started-by'>
          <div>{ hostedByText }</div>
        </div>

        <div className='wide date'>{ format.date(event.startDate) }</div>
        <div className='wide date time'>{ format.time(event.startDateTime) }</div>
        <div className='wide stats'>{`${event.helpers.minAttendeeCount} Guests Needed \u2219 ${event.committedCount} Confirmed`}</div>
      </div>
    )
  }

  renderNewEvent () {
    return (
      <div className='selector shorter'>
        <div className='wide align-end'>
          <ProfileImage user={ this.props.currentUser } />
        </div>
        <div className='wide align-start'>{ (this.props.tag) ? this.props.tag : 'Create Something Amazing Here' }</div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    currentUser: state.userStore.currentUser
  }
}

export default connect(mapStateToProps)(EventBanner)
