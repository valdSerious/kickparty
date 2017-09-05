import React from 'react'
import { Route, IndexRoute } from 'react-router'

import { requireAuthentication } from '../components/Authentication/AuthenticateComponent'
// import { requirePaymentInfo } from '../components/Authentication/AuthenticatePayment'

import AboutUsPage from '../pages/AboutUsPage'
import App from '../containers/App'
import ContactPage from '../pages/ContactPage'
import EditEventPage from '../pages/EditEventPage'
import EditResourcesPage from '../pages/EditResourcesPage'
import EventDetailsPage from '../pages/EventDetailsPage'
import HomePage from '../pages/HomePage'
import NewEventPage from '../pages/NewEventPage'
import NewResourcesPage from '../pages/NewResourcesPage'
import SearchPage from '../pages/SearchPage'
import TermsOfUsePage from '../pages/TermsOfUsePage'
import TestingPage from '../pages/TestingPage'
import EditProfile from '../components/Authentication/EditProfile'
import EditPassword from '../components/Authentication/EditPassword'
import Profile from '../pages/ProfilePage'
import PageNotFound from '../pages/PageNotFound'
import InternalServerError from '../pages/InternalServerError'

import { SignUp, SignIn } from '../components/Authentication'
import ForgotPassword from '../components/Authentication/ForgotPassword'
import ResetPassword from '../components/Authentication/ResetPassword'
import AttendPage from '../pages/AttendPage'
import PaymentPage from '../pages/PaymentPage'

export default (
  <Route path='/' component={ App }>
    <IndexRoute component={ HomePage } />
    <Route path='404' component={ PageNotFound } />
    <Route path='500' component={ InternalServerError } />
    <Route path='aboutus' component={ AboutUsPage } />
    <Route path='contact' component={ ContactPage } />
    <Route path='terms-of-use' component={ TermsOfUsePage } />

    <Route path='signup' component={ SignUp } />
    <Route path='signin' component={ SignIn } />
    <Route path='forgot-password' component={ ForgotPassword } />
    <Route path='reset-password/:resetPasswordToken' component={ ResetPassword } />

    <Route path='events' component={ HomePage } />
    <Route path='events/new' component={ requireAuthentication(NewEventPage) } />
    <Route path='events/:eventId/resources' component={ requireAuthentication(NewResourcesPage) }/>
    <Route path='events/:eventId' component={ EventDetailsPage }/>
    <Route path='events/:eventId/edit' component={ requireAuthentication(EditEventPage) }/>
    <Route path='events/:eventId/edit-resources' component={ requireAuthentication(EditResourcesPage) }/>
    <Route path='events/:eventId/attend' component={ requireAuthentication(AttendPage) }/>

    <Route path='payment' component={ requireAuthentication(PaymentPage) } />
    <Route path='search' component={ SearchPage } />
    <Route path='testing' component={ TestingPage } />

    <Route path='user'>
      <Route path='edit' component={ EditProfile } />
      <Route path='edit-password' component={ EditPassword } />
    </Route>

    <Route path=':userId'>
      <IndexRoute component={ Profile } />
      <Route path='edit' component={ requireAuthentication(EditProfile) } />
      <Route path='edit-password' component={ EditPassword } />
    </Route>

    <Route path='*' component={ PageNotFound } />
  </Route>
)
