import 'react-notifications/lib/notifications.css'
import React, { Component, PropTypes } from 'react'
import Notifications from 'react-notifications'

import { hideNotification } from '../../actions/appActions'

export default class Flash extends Component {
  static get propTypes () {
    return {
      dispatch: PropTypes.func.isRequired,
      notifications: PropTypes.array
    }
  }

  constructor (props) {
    super(props)
    this.handleRequestHide = this.handleRequestHide.bind(this)
  }

  handleRequestHide (notification) {
    this.props.dispatch(hideNotification(notification))
  }

  render () {
    return (
      <Notifications notifications={this.props.notifications} onRequestHide={this.handleRequestHide} />
    )
  }
}
