import React, { Component } from 'react'
import { connect } from 'react-redux'

class EventResources extends Component {
  static get displayName () {
    return 'EventResources'
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div style={{ marginBottom: '50px' }}>
        SHOW LIST OF RESOURCES IN THIS TYPE
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    event: state.event.event
  }
}

export default connect(mapStateToProps)(EventResources)
