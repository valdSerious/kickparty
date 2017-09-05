import '../styles/style.scss'
import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import MediaQuery from 'react-responsive'

import AppConstants from '../constants/AppConstants'
import { HamburgerMenu } from '../components/UIComponents'
import Spinner from '../components/Spinner'
import Modal from '../components/Modal'
import TweenMax from 'gsap/src/minified/TweenMax.min.js'
import Flash from '../components/Flash'
import ProfileImage from '../components/ProfileImage'
import { logout } from '../actions/authActions'
import { searchEvents } from '../actions/eventActions'
import Search from '../components/Search'
import { addNotification, updateModal, toggleSpinner } from '../actions/appActions'
import { clearError } from '../actions/errorActions'
import { DropdownButton } from '../components/UIComponents'

class App extends Component {
  static get displayName () {
    return 'App'
  }

  static get propTypes () {
    return {
      dispatch: PropTypes.func,
      notifications: PropTypes.array,
      children: PropTypes.object,
      loggedIn: PropTypes.bool,
      currentUser: PropTypes.object,
      showSpinner: PropTypes.bool,
      error: PropTypes.object,
      modal: PropTypes.object,
      location: PropTypes.object
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      menuOpen: false,
      closeNow: false
      // isTourActive: true,
      // tourStep: 1
    }

    this.toggleMenu = this.toggleMenu.bind(this)
    this.signOut = this.signOut.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
    this.renderMobileNav = this.renderMobileNav.bind(this)
    this.renderBrowserNav = this.renderBrowserNav.bind(this)
    this.renderTour = this.renderTour.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.dismissModal = this.dismissModal.bind(this)
  }

  componentDidMount () {
    /*const tour = new Shepherd.Tour({
      defaults: {
        classes: 'shepherd-theme-arrows'
      }
    })

    tour.addStep('example', {
      title: 'Example Shepherd',
      text: 'Creating a Shepherd is easy too! Just create ...',
      attachTo: '.primary-logo bottom',
      advanceOn: '.docs-link click'
    })*/

    // tour.start()
  }

  signOut () {
    this.props.dispatch(logout())
    // This causes error: Refused to display 'https://www.facebook.com/home.php' in a frame because it set 'X-Frame-Options' to 'DENY'
    // window.FB.logout(function(response) {
    //   console.log("FB logged out")
    // })
  }

  componentWillMount () {
    this.props.dispatch(toggleSpinner(false))
  }

  componentWillReceiveProps (props) {
    if (props.closeNow) {
      this.closeMenu()
    }

    if (props.error) {
      this.props.dispatch(clearError())
      this.props.dispatch(addNotification(props.error))
    }

    return props
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.close)
    document.removeEventListener('touchstart', this.close)
  }

  toggleMenu () {
    const mobileContent = findDOMNode(this.refs.mobileNav)
    const duration = AppConstants.ANIMATION_DURATION
    const height = this.state.menuOpen ? '0px' : '200px'

    TweenMax.to(mobileContent, duration, { css: { height } })
    this.setState({ menuOpen: !this.state.menuOpen })

    if (this.state.menuOpen) {
      document.removeEventListener('click', this.closeMenu)
      document.removeEventListener('tap', this.closeMenu)
    } else {
      document.addEventListener('click', this.closeMenu)
      document.addEventListener('tap', this.closeMenu, true)
    }
  }

  closeMenu () {
    this.setState({ menuOpen: false, closeNow: true })
    const mobileContent = findDOMNode(this.refs.mobileNav)
    const duration = AppConstants.ANIMATION_DURATION
    const height = '0px'
    TweenMax.to(mobileContent, duration, { css: { height } })
    document.removeEventListener('click', this.closeMenu)
    this.setState({ closeNow: false })
  }

  dismissModal () {
    this.props.dispatch(updateModal())
  }

  onSearch (searchTerm) {
    this.props.dispatch(searchEvents(searchTerm))
  }

  render () {
    const max = '(max-width: 949px)'
    const min = '(min-width: 950px)'

    const modalTitle = (this.props.modal && this.props.modal.title) ? this.props.modal.title : null
    const modalContent = (this.props.modal && this.props.modal.content) ? this.props.modal.content : null
    const modalChildren = (this.props.modal && this.props.modal.children) ? this.props.modal.children : null

    return (
      <div>
        <Spinner isActive={ this.props.showSpinner } />
        <Modal title={modalTitle} content={modalContent} ondismiss={this.dismissModal}>{modalChildren}</Modal>

        <MediaQuery query={ max }>
          <header className='mobile-header'>
            <div className='hamburger-box'>
              <HamburgerMenu className='primary-hambuger' onclick={ this.toggleMenu } closeNow={ this.state.closeNow } />
            </div>

            <Search onSearch={ this.onSearch } />

            <Logo className='primary-logo' />
          </header>

          <div className='mobile-nav' ref='mobileNav'>
            { this.renderMobileNav(this.props.loggedIn, this.props.currentUser) }
          </div>
        </MediaQuery>

        <MediaQuery query={ min } id='app'>
          { this.renderBrowserNav(this.props.loggedIn, this.props.currentUser) }
        </MediaQuery>

        <div id='main'>{ this.props.children }</div>

        { this.renderFooter() }

        <Flash notifications={ this.props.notifications } dispatch={ this.props.dispatch }/>
      </div>
    )
  }

  renderMobileNav (loggedIn, currentUser) {
    // Hide 'login'/'sign up' links when viewing specific events
    // This is because 'sign up' is mistaken to be 'sign up for event'
    const pathIsNotAnEvent = !this.props.location.pathname.includes('/events/')
    return (
      <nav className='nav-bar primary-nav'>
        { (loggedIn) ? <div style={{ display: 'flex', flexDirection: 'row-reverse' }}><ProfileImage user={ currentUser } size={ 24 } /></div> : null }
        <div className='nav-item'>
          <Link to='/aboutus'>About&nbsp;Us</Link>
        </div>
        <div className='nav-item'>
          <Link to='/contact'>Contact&nbsp;Us</Link>
        </div>

        { (!loggedIn && pathIsNotAnEvent) ? <div className='nav-item'><Link to={ `/signup?next=${this.props.location.pathname}` }>Sign&nbsp;Up</Link></div> : null }
        { (!loggedIn) ? <div className='nav-item'><Link to={ `/signin?next=${this.props.location.pathname}` }>Sign&nbsp;In</Link></div> : null }
        { (loggedIn) ? <div className='nav-item'><Link to={`/${currentUser.slug}`}>Profile</Link></div> : null }
        { (loggedIn) ? <div className='nav-item'><a onClick={ this.signOut }>Logout</a></div> : null }
      </nav>
    )
  }

  renderBrowserNav (isLoggedIn, currentUser) {
    // Hide 'login'/'sign up' links when viewing specific events
    // This is because 'sign up' is mistaken to be 'sign up for event'
    const path = this.props.location.pathname
    const pathIsNotAnEvent = !path.includes('/events/')
    let loginButton

    if (isLoggedIn && currentUser) {
      loginButton = (
        <div className='flex-container' style={{ justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row' }}>
          <span className='purple margin-right'>/</span>
          <span className='teal margin-right'>/</span>
          <span className='green margin-right'>/</span>
          <div style={{ paddingLeft: 6 }}><ProfileImage user={ currentUser } size={ 20 } /></div>
          <div style={{ paddingLeft: 6, paddingRight: 6 }}>
            <Link to={`/${currentUser.slug}`}>{ currentUser.firstName }</Link>
          </div>
          <DropdownButton hasCaret={true}>
            <Link to={`/${currentUser.slug}/edit`}>Update Profile</Link>
            <Link to={`/${currentUser.slug}`}>View Profile</Link>
            <a onClick={ this.signOut } alt='logout'>Logout</a>
          </DropdownButton>
        </div>
      )
    } else {
      loginButton = (
        <div style={{ paddingLeft: 6, paddingRight: 6 }}>
          {
            // Hide 'login'/'sign up' links when viewing specific events
            // This is because 'sign up' is mistaken to be 'sign up for event'
            pathIsNotAnEvent
              ? <div><Link to={ `/signup?next=${path}` }>Sign Up</Link> - <Link to={ `/signin?next=${path}` }>Sign In</Link></div>
              : <Link to={ `/signin?next=${path}` }>Sign In</Link>
          }
        </div>
      )
    }

    return (
      <header>
        <nav>
          <div className='wrapper'>
            <div className='nav-sections web-nav'>
              <Logo />
              <Search onSearch={ this.onSearch } />
              <Navigation />
              <div className='user-box' ref='step1' style={{ justifyContent: 'flex-end' }}>{ loginButton }</div>
            </div>
          </div>
        </nav>
      </header>
    )
  }

  renderFooter () {
    return (
      <footer>
        <div>
          <a className='social' href='https://www.facebook.com/kickpartyapp' target='_blank'>
            <img src='/images/facebook.png' alt=''/>
          </a>
          <a className='social' href='https://www.twitter.com/kickparty' target='_blank'>
            <img src='/images/twitter.png' alt=''/>
          </a>
        </div>
        <div>
          <p className='white footer-links'>
            <span>&copy; KICKPARTY 2015</span>
            <span>
              <a href='/terms-of-use'>Terms of Use</a>
            </span>
            <span>An <a href='http://www.elevate.blue' target='_blank'>Elevate Blue</a> Company</span>
          </p>
        </div>
      </footer>
    )
  }

  renderTour () {
    return (<div />)
  }
}

const Logo = () => (
  <Link to='/' className='primary-logo'>
    <span className='purple margin-right'>/</span>
    <span className='teal margin-right'>/</span>
    <span className='green margin-right'>/</span>
    <div style={{display: 'inline-block'}}>KICKPARTY</div>
    <span className='green margin-left'>\</span>
    <span className='teal margin-left'>\</span>
    <span className='purple margin-left'>\</span>
      <MediaQuery query={ `(min-width: ${AppConstants.DEVICE_MAXWIDTH + 1}px)` }>
        <i className='fa fa-trademark' style={{fontSize: '11px', verticalAlign: 'top', paddingTop: '11px'}}></i>
      </MediaQuery>
      <MediaQuery query={ `(max-width: ${AppConstants.DEVICE_MAXWIDTH}px)` }>
        <i className='fa fa-trademark' style={{fontSize: '8px', verticalAlign: 'top', paddingTop: '2px'}}></i>
      </MediaQuery>
  </Link>
)

const Navigation = () => (
  <nav className='nav-bar primary-nav'>
    <div className='nav-item'>
      <Link to='/aboutus'>
        <span className='purple'>/</span>&nbsp;<span style={{ color: 'white' }}>About</span>
      </Link>
    </div>
    <div className='nav-item'>
      <Link to='/contact'>
        <span className='green'>/</span>&nbsp;<span style={{ color: 'white' }}>Contact</span>
      </Link>
    </div>
  </nav>
)

function mapStateToProps (state) {
  console.info('APP:MSTP', state)
  const props = {
    showSpinner: state.appStore.showSpinner,
    loggedIn: state.authStore.loggedIn,
    fbLoaded: state.authStore.fbLoaded,
    currentUser: state.authStore.user,
    notifications: state.appStore.notifications,
    error: state.errorStore.error,
    modal: (state.appStore.modal) ? state.appStore.modal : null
  }

  return props
}

export default connect(mapStateToProps)(App)
