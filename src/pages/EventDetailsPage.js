import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import objectAssign from 'object-assign'
import CopyToClipboard from 'react-copy-to-clipboard'
import MediaQuery from 'react-responsive'

import AppConstants from '../constants/AppConstants'
import AttendeesList from '../components/AttendeesList'
import EventBanner from '../components/EventBanner'
import EventDescription from '../components/EventDescription'
import Countdown from '../components/Countdown'
import ResourceType from '../components/ResourceType'
import { Posts, NewPost } from '../components/Posts'
import Message from '../components/Message'
import format from '../utils/format'
import { attendForFree, getEvent, getPosts, createPost, removeResource, leaveEvent, deleteEvent, messageGuests } from '../actions/eventActions'
import { updateModal } from '../actions/appActions'

const max = `(max-width: ${AppConstants.DEVICE_MAXWIDTH}px)`
const min = `(min-width: ${AppConstants.DEVICE_MAXWIDTH + 1}px)`

class EventDetailsPage extends Component {
  static get displayName () {
    return 'EventDetailsPage'
  }

  static get propTypes () {
    return {
      dispatch: PropTypes.func,
      event: PropTypes.object,
      invitees: PropTypes.array,
      loggedIn: PropTypes.bool,
      params: PropTypes.object,
      posts: PropTypes.array,
      user: PropTypes.object
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      sendPreview: false
    }

    this.attendEvent = this.attendEvent.bind(this)
    this.attendEventModal = this.attendEventModal.bind(this)
    this.leaveEvent = this.leaveEvent.bind(this)
    this.toggleDelete = this.toggleDelete.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.onCopy = this.onCopy.bind(this)
    this.renderShare = this.renderShare.bind(this)
    this.savePost = this.savePost.bind(this)
    this.checkLoggedIn = this.checkLoggedIn.bind(this)
    this.messageGuests = this.messageGuests.bind(this)
    this.shareOnFB = this.shareOnFB.bind(this)
  }

  componentWillMount () {
    if (this.props.params && this.props.params.eventId) {
      this.props.dispatch(getEvent(this.props.params.eventId))
      this.props.dispatch(getPosts(this.props.params.eventId))
    }
  }

  attendEvent () {
    const { event, dispatch, loggedIn } = this.props
    const attendLink = `/events/${event.slug}/attend`

    if (!loggedIn) {
      dispatch(push(`/signin?next=${attendLink}`))
    } else {
      dispatch(push(attendLink))
    }
  }

  attendEventModal () {
    const { event, dispatch, loggedIn } = this.props
    const linkStyle = { display: 'block', marginTop: 10 }
    const noContributionCallback = () => {
      if (loggedIn) {
        dispatch(attendForFree(event.slug))
        dispatch(updateModal())
      } else {
        dispatch(push(`/signin?next=/events/${event.slug}&attend=${event.slug}`))
      }
    }

    dispatch(updateModal({
      title: '',
      content: (
        <div>
          <h2>Awesome, let's get you started! <i className='fa fa-thumbs-up'></i></h2>
          {
            event.helpers.userSetPrice
              ? <p>You will choose your contribution amount before you check out.  But first, if you don't have a credit card on file, we will ask you for that.  Ready?</p>
              : <p>On the following screen, you will be asked for your credit card.  You will have a chance to review your contribution before you check out.  Ready?</p>
          }
          {
            !loggedIn
              ? <p><i>(You will be asked to sign in or create an account first)</i></p>
              : null
          }
          <button className='card-box highlight green' style={{padding: '20px', lineHeight: 0, margin: '0 0 20px 0'}} onClick={this.attendEvent}>
            <div style={{textAlign: 'center'}}>Yes, Let's Go!</div>
          </button>
          {
            (event.helpers.userSetPrice || event.helpers.costPerPerson === 0)
            ? <a style={linkStyle} onClick={noContributionCallback}>
                 <div>I would like to attend without contributing</div>
              </a>
            : null
          }
          <a style={linkStyle} onClick={() => { dispatch(updateModal()) }}>
            <div>No thanks</div>
          </a>
        </div>
      )
    }))
  }

  leaveEvent () {
    const { event, dispatch } = this.props

    dispatch(updateModal({
      title: '',
      content: (<div>
        <p>Are you sure you want to leave this event?</p>
        <p>If you click OK, we will delete your order and you'll lose your reservation. You sure?</p>
        <button onClick={ () => {
          dispatch(leaveEvent(event.slug))
          dispatch(updateModal())
        } }><div>Leave</div></button>
        <button style={{ backgroundColor: 'rgba(255,255,255,0)', border: 'none', boxShadow: 'none' }} onClick={ () => { dispatch(updateModal()) } }><div>Cancel</div></button>
      </div>)
    }))
  }

  eventLink () {
    const { event } = this.props
    return 'https://kickparty.com/events/' + event.slug + '?key=' + event.key
  }

  attendButton (event) {
    if (event.me) {
      return <div />
    }

    const rightColStyle = {
      width: '100%',
      maxWidth: '375px',
      minWidth: '300px',
      border: 'none'
    }
    const textStyle = {
      color: '#bbb',
      textAlign: 'center'
    }
    const attendButtonStyle = objectAssign({}, rightColStyle, {
      height: '40px',
      marginLeft: '0px'
    })
    const attendingBoxStyle = objectAssign({}, rightColStyle, {
      margin: '0'
    })
    const fbShareStyle = objectAssign({}, rightColStyle, {
      backgroundColor: '#3b5998',
      color: '#fff',
      padding: '10px 15px',
      border: '1px solid #3b5998',
      boxShadow: 'none',
      marginTop: '30px'
    })
    const unattendTextStyle = objectAssign({}, rightColStyle, {
      textAlign: 'center',
      color: '#bbb',
      marginTop: '4px'
    })

    if (event && event.attending) {
      let cancel
      if (event.tiers && event.tiers.length && !event.tiers[0].kicked) {
        cancel = <div style={unattendTextStyle}>
          Need to <a href='javascript://' onClick={ this.leaveEvent }>unattend?</a>
          </div>
      }

      return <div>
          <div className='card-box highlight purple' style={attendingBoxStyle}>
            You are attending this event
          </div>
          {cancel}
          <button onClick={ this.shareOnFB } style={fbShareStyle}>Share on FaceBook</button>
        </div>
    } else {
      return <div>
          <button className='card-box highlight green' type='button' onClick={ this.attendEventModal } style={attendButtonStyle}>
            <div style={{flex: 1}}>
              Attend this Event
            </div>
          </button>
          <div style={objectAssign({}, textStyle, rightColStyle)}>
            {
              event.helpers.userSetPrice
                ? 'You can select a contribution amount'
                  : (event.helpers.costPerPerson > 0
                    ? 'Your requested contribution is ' + format.currency(event.helpers.costPerPerson)
                    : 'This event is FREE!'
                  )
            }
          </div>
          <button onClick={ this.shareOnFB } style={fbShareStyle}>Share on FaceBook</button>
        </div>
    }
  }

  shareOnFB () {
    const { event } = this.props

    window.FB.ui({
      method: 'feed',
      name: event.name,
      picture: event.headerImage,
      link: 'https://kickparty.com/events/' + event.slug
    }, function (response) {})
  }

  onDelete () {
    this.props.dispatch(deleteEvent(this.props.event.slug))
  }

  toggleDelete () {
    if (this.state.deleteClicked) {
      this.setState({ deleteClicked: false })
    } else {
      this.setState({ deleteClicked: true })
    }
  }

  savePost (post) {
    const { event } = this.props

    if (this.props.loggedIn) {
      this.props.dispatch(createPost({eventId: event.id, body: post}))
    } else {
      this.props.dispatch(updateModal({
        title: '',
        content: (<div>
          <p>We totally want to hear what you would like to say, but you have to login first.  Do it <Link to={`/signin?next=/events/${event.slug}`}>here</Link></p>
        </div>)
      }))
    }
  }

  // Callback passed into the new posts component
  checkLoggedIn () {
    const {event, loggedIn} = this.props

    if (loggedIn) {
      return
    }

    this.props.dispatch(updateModal({
      title: '',
      content: (<div>
        <p>We totally want to hear what you would like to say, but you have to login first.  Do it <Link to={`/signin?next=/events/${event.slug}`}>here</Link></p>
      </div>)
    }))
  }

  onCopy () {
    this.setState({ copied: true })
  }

  messageGuests () {
    const {event} = this.props

    this.props.dispatch(updateModal({
      title: 'Message your guests',
      content: (
        <div>
          <p>Your message will be sent out using an email template.  We suggest you send a copy to yourself first to make sure it looks right.  Sending as a test will only send it to you.</p>
          <p>
            <label>
              <input type='checkbox' name='sendPreview' onClick={(se) => {
                this.setState({
                  sendPreview: se.target.checked
                })
              }}/> <strong>Send as a test email</strong>
            </label>
          </p>
          <Message onsubmit={(data) => {
            const mergedData = Object.assign({}, data, {
              sendPreview: this.state.sendPreview
            })

            this.props.dispatch(messageGuests(mergedData, event.slug))

            if (!this.state.sendPreview) {
              this.props.dispatch(updateModal({}))
            }
          }} oncancel={() => {
            this.props.dispatch(updateModal({}))
          }} />
        </div>
      )
    }))
  }

  render () {
    const { event, posts } = this.props

    if (!event) {
      return <div />
    }

    let kicked = <span></span>
    if (event && event.tiers && event.tiers[0].kicked) {
      kicked = <div>This party kicked!</div>
    }

    return (
      <div>
        <EventBanner title='Event Summary' event={ event } />

        <div className='wrapper event-details'>
            <div className='wide'>
              <div className='column left'>
                {kicked}
                <EventDescription description={event.description}/>
                  <MediaQuery query={ max }>
                    <div style={{height: '20px', width: '100%', display: 'block'}}></div>
                    { this.attendButton(event) }
                  </MediaQuery>
                { this.renderPosts(posts) }
                { this.renderResources(event) }
                { this.renderEventTotals(event) }
              </div>

              <div className='column right'>
                { event.me ? <button className='card-box highlight green' onClick={this.messageGuests}><div>Message Guests</div></button> : null }

                <MediaQuery query={ min }>
                  { this.attendButton(event) }
                </MediaQuery>
                { this.renderShare(event) }
                { event.attendees.length !== 0 ? this.renderInvitees(event.attendees) : null }
                { this.renderCountdown(event) }
                <MediaQuery query={ max }>
                  <div style={{marginTop: '20px'}}></div>
                  { this.attendButton(event) }
                </MediaQuery>
                { this.renderLocation(event) }
                { event.me ? this.renderEventOptions() : null }
              </div>
            </div>
          </div>
      </div>
    )
  }

  renderPosts (posts) {
    const { loggedIn } = this.props

    return (
      <div className='posts'>
        <h1>{(posts && posts.length === 0) ? 'Leave us a message!' : 'Messages from our Guests'}</h1>
        <NewPost onsubmit={this.savePost} loggedIn={loggedIn} onfocus={this.checkLoggedIn} />
        <Posts posts={posts} />
      </div>
    )
  }

  renderEventOptions () {
    return (
      <section className='event-options'>
        <h1>Event Options</h1>
        <section>
          { !this.state.deleteClicked
              ? <button className='warning' onClick={this.toggleDelete}>Delete</button>
              : <div className='confirmation'>
                  Delete the event?
                  <button onClick={this.toggleDelete}>No</button>
                  <button className='warning' onClick={this.onDelete}>Yes</button>
                </div>
          }
        </section>
      </section>
    )
  }

  renderResourceList (tiers, event) {
    const resources = []
    const { me, helpers } = event

    tiers.forEach((tier) => {
      const onRemoveResource = (resourceId) => {
        this.props.dispatch(removeResource(event.slug, resourceId, tier.tierId))
      }

      // 'me' is a boolean that returns true if user is owner of the event
      tier.resourceTypes.forEach((resourceType, i) => {
        // Dont push the default resource
        if (resourceType.id !== 0) {
          resources.push(
            <ResourceType key={ `${resourceType.id}-${i}` }
              resourceType={ resourceType }
              onRemoveResource={ onRemoveResource }
              isOwner={ me }
            />
          )
        }
      })
    })

    return (
      <div>
        { resources.length === 0 ? null : <h1>What's Included </h1> }
        { (event.me) ? <h2><Link to={`/events/${event.slug}/edit-resources`}>(This is your event! Edit resources?)</Link></h2> : null }
        { resources }
        { this.renderHostContribution(helpers.hostContribution) }
      </div>
    )
  }

  renderEventTotals (event) {
    const { committedCount, helpers } = event

    const totalCost = helpers.tierTotal
    let peopleNeededCount = helpers.minAttendeeCount - committedCount
    peopleNeededCount = (peopleNeededCount > 0) ? peopleNeededCount : 0 // Event has kicked!
    const totalRaised = helpers.costPerPerson * committedCount
    const amountShort = helpers.costPerPerson * peopleNeededCount

    const displayCost = (totalCost <= 0) ? 'Free' : format.currency(totalCost)

    return (
      <div>
        { helpers.minAttendeeCount === 0
          ? null
          : <div className='card-box total-needed'>
            <p className='flex-start text bold medium dark-gray'>{`Total  ${event.kickBy === 1 ? 'Guests' : 'Funds'} Needed:`}</p>
            <p className='flex-end text bold large darker-gray'>{`${event.kickBy === 1 ? helpers.minAttendeeCount : displayCost}` }</p>
          </div>
        }

        <div className='card-box clear'>
          <p className='flex-start text bold medium dark-gray'>{`${event.kickBy === 1 ? 'Guests' : 'Funds'} Committed:`}</p>
          <p className='flex-end text bold medium dark-green'>{`${event.kickBy === 1 ? committedCount : format.currency(totalRaised)}` }</p>
        </div>

        <hr className='white' />

        { peopleNeededCount === 0
          ? null
          : <div className='card-box white'>
            <p className='flex-start text bold medium dark-gray'>{`Addtl ${event.kickBy === 1 ? 'Guests' : 'Funds'}  Needed:`}</p>
            <p className='flex-end text bold medium dark-purple'>{`${event.kickBy === 1 ? peopleNeededCount : format.currency(amountShort)}` }</p>
          </div>
        }
      </div>
    )
  }

  renderHostContribution (hostContribution) {
    if (hostContribution !== 0) {
      return (
        <div>
          <hr className='white' />
          <div className='flex flex-wrap card-box short clear'>
            <div className='flex-start bold'>Paid for by Host:</div>
            <div className='flex-end bold'>{ format.currency(hostContribution) }</div>
          </div>
        </div>
      )
    } else {
      return (<div></div>)
    }
  }

  renderResources (event) {
    if (event.showResources) {
      return (
        <article>
          {(event.tiers) ? this.renderResourceList(event.tiers, event) : null }
        </article>
      )
    }
  }

  renderInvitees (attendees) {
    const headerStyle = {
      flexDirection: 'row-reverse',
      display: 'flex'
    }

    const textStyle = {
      order: 2,
      flex: 3
    }

    return (
      <div>
        <h1 style={ headerStyle }>
          <div style={ textStyle }>Our Amazing Guests</div>
        </h1>
        <AttendeesList attendees={attendees} maxDisplayed={20} />
      </div>
    )
  }

  renderShare (event) {
    if (event.status === 1 || event.host) {
      return (
        <article style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '20px' }}>
          <h1>Invite Your Friends!</h1>
          <p style={{marginTop: '0'}}>Share the link below with your friends:</p>
          { // TODO: onClick for this input should select all the text
          }
          <input value={event.shortUrlLink} size={30} style={{ padding: '5px' }} readOnly />&nbsp;
            <CopyToClipboard text={event.shortUrlLink} onCopy={this.onCopy}>
              <button className='card-box highlight green' style={{ maxWidth: '50px' }}>
                <i className='fa fa-clipboard'></i>
              </button>
            </CopyToClipboard>&nbsp;
             {this.state.copied ? <span style={{color: 'green'}}>Copied.</span> : null}
        </article>
      )
    }
  };

  renderCountdown (event) {
    let date = event.deadline
    let title = 'Event kicks in'

    if (event.deadline < new Date()) {
      date = event.startDate
      title = 'Event Starts in'
    }

    return (
      <article>
        <h1>{title}</h1>
        <Countdown date={ date } />
      </article>
    )
  }

  renderLocation (event) {
    const encodedAddress = encodeURIComponent(event.locationAddress)
    const mapSrc = `https://www.google.com/maps/embed/v1/place?q=${encodedAddress}&key=AIzaSyBCfiFHdbE6wZKKjdAP2o88DCiYZsifpsg`

    return (
      <article>
        <h1>Where will it happen</h1>
        <p>{ event.locationName }</p>
        <div className='flex'>
          { <iframe width='100%' height='300' frameBorder='0' src={ mapSrc } allowFullScreen></iframe> }
        </div>
      </article>
    )
  }
}

function mapStateToProps (state) {
  const props = {}

  if (state.authStore.hasOwnProperty('loggedIn')) {
    props.loggedIn = state.authStore.loggedIn
  }

  if (state.eventStore.hasOwnProperty('event')) {
    props.event = state.eventStore.event
    props.posts = state.eventStore.posts
  }

  return props
}

export default connect(mapStateToProps)(EventDetailsPage)
