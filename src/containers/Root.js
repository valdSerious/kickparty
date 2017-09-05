import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'

import routes from '../routes'

export default class Root extends Component {
  static get displayName () {
    return 'Root'
  }

  static propTypes () {
    return {
      store: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired
    }
  }

  render () {
    return (
      <div>
        <Provider store={ this.props.store }>
          <Router history={ this.props.history }>
            { routes }
          </Router>
        </Provider>
      </div>
    )
  }
}
