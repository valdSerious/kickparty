import { createStore, applyMiddleware } from 'redux'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import multi from 'redux-multi'
import thunk from 'redux-thunk'

import rootReducer from '../reducers'

const reactRouterReduxMiddleware = routerMiddleware(browserHistory)
const middleware = [thunk, multi, reactRouterReduxMiddleware]

export default function configureStore (initialState) {
  const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)
  const store = createStoreWithMiddleware(rootReducer, initialState)

  if (module && module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
