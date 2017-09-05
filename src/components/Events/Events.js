import React, { Component, PropTypes } from 'react'
import { PRIVATE } from '../../constants/AppConstants'
import Event from '../EventPreview'

export default class Events extends Component {
  static get displayName () {
    return 'Components/Events'
  }

  static get propTypes () {
    return {
      events: PropTypes.array
    }
  }

  static get defaultProps () {
    return {
      events: []
    }
  }

  renderEvents (events) {
    if (events.length === 0) {
      return <div>
              <h3 style={{color: '#c64af8'}}>Your search didn't return any results <i className='fa fa-frown-o'></i></h3>
              <p>You can always <a href='/'>browse our awesome events near you.</a></p>
              <p>
                Or you could <a href='/events/new'>create your own awesome event now</a> for <b>FREE</b> <i className='fa fa-smile-o'></i> <i className='fa fa-smile-o'></i> <i className='fa fa-smile-o'></i>
              </p>
              </div>
    } else {
      return events.map((event, i) => {
        if (event.status !== PRIVATE) {
          return (
            <li className='item' key={ i }>
              <Event event={ event } />
            </li>
          )
        }
      })
    }
  }

  render () {
    const { events } = this.props

    if (!events) {
      return <div></div>
    }

    return (
      <div className='wrapper'>
        <ul className='events'>
          { this.renderEvents(events) }
          <li className='item phantom'></li>
          <li className='item phantom'></li>
          <li className='item phantom'></li>
        </ul>
      </div>
    )
  }
}
