import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Events from '../components/Events'
import { searchEvents } from '../actions/eventActions'

class SearchPage extends Component {
  static get displayName () {
    return 'Pages/SearchPage'
  }

  static propTypes () {
    return {
      dispatch: PropTypes.func.isRequired,
      searchResults: PropTypes.array,
      location: PropTypes.object.isRequired
    }
  }

  componentWillMount () {
    if (!this.props.searchResults) {
      const { location } = this.props
      this.props.dispatch(searchEvents(location.query.term))
    }
  }

  render () {
    return (
      <div style={{padding: '25px'}}>
        <h1>Search results</h1>
        <Events events={ this.props.searchResults } />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    searchResults: state.eventStore.searchResults
  }
}

export default connect(mapStateToProps)(SearchPage)
