import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { getEvents } from '../actions/eventActions'
import Events from '../components/Events'
import Banner from '../components/banner'
import HeadModifier from '../components/HeadModifier'

class HomePage extends Component {
  static get displayName () {
    return 'Pages/HomePage'
  }

  static get propTypes () {
    return {
      dispatch: PropTypes.func.isRequired,
      events: PropTypes.array
    }
  }

  componentWillMount () {
    this.props.dispatch(getEvents())
  }

  render () {
    const metaOptions = [{
      property: 'og:description',
      content: '"KickParty will help you create and fund epic events."'
    }]

    return (
      <div>
        <HeadModifier title='KickParty - Create Epic Events' meta={ metaOptions } />
        <Banner dispatch={ this.props.dispatch } />
        <Events events={ this.props.events } />
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
