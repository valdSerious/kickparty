import { routerReducer as routing } from 'react-router-redux'
import { reducer as reduxFormReducer } from 'redux-form'
import { combineReducers } from 'redux'

import auth from './authReducer'
import app from './appReducer'
import forms from './formsReducer'
import events from './eventsReducer'
import resources from './resourcesReducer'
import profile from './profileReducer'
import users from './usersReducer'
import error from './errorReducer'
import post from './postReducer'

const rootReducer = combineReducers({
  routing,
  authStore: auth,
  appStore: app,
  form: reduxFormReducer.plugin(forms),
  eventStore: events,
  resourceStore: resources,
  profileStore: profile,
  userStore: users,
  errorStore: error,
  postStore: post
})

export default rootReducer
