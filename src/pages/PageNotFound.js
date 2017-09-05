import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { goBack } from 'react-router-redux'

export default class PageNotFound extends Component {
  static get displayName () {
    return 'PageNotFound'
  }

  static get propTypes () {
    return {
      dispatch: PropTypes.func.isRequired
    }
  }

  goToPrevious () {
    this.props.dispatch(goBack())
  }

  render () {
    return (
      <div style={{padding: '25px'}}>
        <h1 style={{textAlign: 'center'}}>Oh no! It looks like the page you wanted ...</h1>
        <h1 style={{textAlign: 'center'}}>does not exist!</h1>
        <div style={{textAlign: 'center'}}>
          <button
            onClick={ this.goToPrevious.bind(this) }>
            Return to Previous Page
          </button>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {}
}

export default connect(mapStateToProps)(PageNotFound)
