import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { fetchError } from '../actions/appActions'

export default class HomePage extends Component {
  static get displayName () {
    return 'Pages/TestingPage'
  }

  static propTypes () {
    return {
      dispatch: PropTypes.func.isRequired
    }
  }

  fetchError () {
    console.log('fetchError in component')
    this.props.dispatch(fetchError())
  };

  render () {
    return (
      <div>
      <button onClick={this.fetchError.bind(this)}>fetch me an error</button>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    events: state.eventStore.events
  }
}

export default connect(mapStateToProps)(HomePage)
