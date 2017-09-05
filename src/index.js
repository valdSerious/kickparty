'use strict'

if (module && module.hot) {
  console.info('HMR active')
  module.hot.accept()
}

import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { syncHistoryWithStore } from 'react-router-redux'
import { browserHistory } from 'react-router'

import configureStore from './stores/configureStore'
import Root from './containers/Root'
import { verifySession } from './actions/authActions'
import { getEventTypes } from './actions/eventTypeActions'
import { getResourceTypes } from './actions/resourceTypeActions'
import { updateModal } from './actions/appActions'
import session from './utils/session'
import location from './utils/location'
import errorReporter from './utils/errorReporter'

const store = configureStore()

// Initialize Raygun.io error tracking
errorReporter.init(store)

// Installs hooks that always keep react-router and redux store in sync
const history = syncHistoryWithStore(browserHistory, store)

// Listener to browser history that will always close a modal on route change
history.listen(() => {
  store.dispatch(updateModal())
})

const target = document.getElementById('root')
const node = (
  <Root store={ store } history={ history } />
)

location.init()
store.dispatch(verifySession(session.token))
store.dispatch(getEventTypes())
store.dispatch(getResourceTypes())

render(node, target, () => {
  // successful app bootstrapping
})
