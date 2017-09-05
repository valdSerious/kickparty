import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import format from '../../utils/format'

export default class EventPreview extends Component {
  static get displayName () {
    return 'Components/Event'
  }

  static propTypes () {
    return {
      event: PropTypes.object
    }
  }

  render () {
    const { event } = this.props

    if (!event) {
      return null
    }

    const imgUrl = (event.headerImage) ? event.headerImage : 'img1.jpg'
    const imgStyle = {
      background: `#ccc url(${imgUrl}) center`
    }

    return (
      <div>
        <Link to={ `/events/${event.slug}` }>
          <div className='img' style={ imgStyle }>{ (1 === 2) ? event.name : '' }</div>
        </Link>
        <Link className='event-preview-link' to={ `/events/${event.slug}` }>
          <h2>{ event.name }</h2>
        </Link>
        <p>{ format.truncate(event.description.replace(/(<([^>]+)>)/ig, '')) }</p>
      </div>
    )
  }
}
