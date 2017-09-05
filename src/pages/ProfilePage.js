import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { pushPath } from 'react-router-redux'
import { getProfile, follow, unfollow } from '../actions/profileActions.js'
import ProfileImage from '../components/ProfileImage'

class ProfilePage extends Component {
  static get displayName () {
    return 'ProfilePage'
  }

  static get propTypes () {
    return {
      dispatch: PropTypes.func.isRequired,
      params: PropTypes.object,
      profile: PropTypes.object,
      user: PropTypes.object
    }
  }

  constructor (props) {
    super(props)
    this.state = {}
    this.editProfile = this.editProfile.bind(this)
    this.renderEvents = this.renderEvents.bind(this)
    this.renderFollowers = this.renderFollowers.bind(this)
  }

  componentDidMount () {
    const slug = this.props.params.userId
    this.props.dispatch(getProfile(slug))
  }

  componentWillReceiveProps (props) {
    const { profile, params } = props

    if (profile && profile.slug !== params.userId) {
      const slug = props.params.userId
      this.props.dispatch(getProfile(slug))
    }
  }

  componentWillUnmount () {
    this.props.dispatch(getProfile())
  }

  handleFollowClick (se) {
    this.props.dispatch(follow(this.props.profile.id))
  }

  handleUnfollowClick (se) {
    this.props.dispatch(unfollow(this.props.profile.id))
  }

  editProfile () {
    this.props.dispatch(pushPath('/' + this.props.params.userId + '/edit/'))
  }

  render () {
    const { profile } = this.props

    if (!profile) {
      return <div></div>
    }

    let isFollowing
    if (profile.following !== undefined) {
      if (profile.following) {
        isFollowing = <button style={{ backgroundColor: '#8b0000', color: 'white', border: '1px solid #8b0000', boxShadow: 'none' }} onClick={this.handleUnfollowClick.bind(this)} >Unfollow</button>
      } else {
        isFollowing = <button style={{ backgroundColor: '#3b5998', color: 'white', border: '1px solid #3b5998', boxShadow: 'none' }} onClick={this.handleFollowClick.bind(this)} >Follow</button>
      }
    }

    return (
      <div className='auth-component sign-up profile-page'>
        <header>{(profile.me) ? 'Your Profile' : `${profile.firstName}'s Profile` }</header>
        <div className='profile-info'>
          <section className='info-section'>
            <ProfileImage user={ { profileImg: profile.profileImg, firstName: profile.firstName, lastName: profile.lastName, slug: profile.slug } } size={ 100 } />
            <div className='profile-props'>
              <p>{profile.firstName} {profile.lastName}<br />{profile.email}<br />{profile.mobileNumber}</p>
              {isFollowing}
              <p>{profile.me ? <Link to={`/${this.props.params.userId}/edit`}>Update your profile</Link> : null}<br />
              { (!profile.uid && profile.me) ? <Link to={`/${this.props.params.userId}/edit-password`}>Change your password</Link> : null}</p>
            </div>
          </section>
          <hr />
          <section className='event-section'>
            {this.renderFollowers()}
          </section>
          <section className='event-section'>
            {this.renderFollowed()}
          </section>
          <section className='event-section'>
            {this.renderEvents()}
          </section>
        </div>
      </div>
    )
  }

  renderFollowers () {
    const {profile} = this.props
    const pronoun = (profile && profile.me) ? 'You' : profile.firstName
    const contraction = (profile && profile.me) ? 'aren\'t' : 'isn\'t'
    const followersSet = new Set()

    const yourFollowers = (profile.foundFollowers.length === 0)
      ? <div>{`${pronoun} ${contraction} followed by anyone yet `}<i className='fa fa-frown-o'></i>
          <br/><br/>
        </div>
      : profile.foundFollowers.map((follower) => {
        followersSet.add(follower.id)
        return this.renderUserIcon(follower)
      })

    return (
      <div>
        <h1>{(profile.me) ? 'Your' : `${profile.firstName}'s` } Followers</h1>
        <ul>{yourFollowers}</ul>
      </div>
    )
  }

  renderFollowed () {
    const {profile} = this.props
    const pronoun = (profile && profile.me) ? 'You' : profile.firstName
    const contraction = (profile && profile.me) ? 'aren\'t' : 'isn\'t'
    const followedSet = new Set()

    const yourFollowers = (profile.foundFollowed.length === 0)
      ? <div>{`${pronoun} ${contraction} following anyone `}<i className='fa fa-frown-o'></i>
          <br/><br/>
        </div>
      : profile.foundFollowed.map((followed) => {
        followedSet.add(followed.id)
        return this.renderUserIcon(followed)
      })

    return (
      <div>
        <h1>{(profile.me) ? 'You are ' : `${profile.firstName} is ` } Following</h1>
        <ul>{yourFollowers}</ul>
      </div>
    )
  }

  renderEvents () {
    const {profile} = this.props
    const pronoun = (profile && profile.me) ? 'You' : profile.firstName
    const contraction = (profile && profile.me) ? 'haven\'t' : 'hasn\'t'
    const eventsSet = new Set()

    const yourEvents = (profile.createdEvents.length === 0)
      ? <div>{pronoun} {contraction} created any events yet <i className='fa fa-frown-o'></i> <br/><br/>
      <a href='/events/new'>Create an event now for <b>FREE</b> <i className='fa fa-smile-o'></i> <i className='fa fa-smile-o'></i> <i className='fa fa-smile-o'></i></a></div>
      : profile.createdEvents.map((event) => {
        eventsSet.add(event.id)
        return this.renderEventIcon(event)
      })

    const attendingEvents = (profile.attendingEvents.length === 0)
      ? <div>{pronoun} {contraction} been to any events yet?<br/><br/>
      <a href='/'>Search our awesome events near you!</a></div>
      : profile.attendingEvents.map((event) => {
        return eventsSet.has(event.id) ? null : this.renderEventIcon(event)
      })

    return (
      <div>
        <h1>{(profile.me) ? 'Your' : `${profile.firstName}'s` } Events</h1>
        <ul>{yourEvents}</ul>

        <h1 style={{marginTop: '40px', fontSize: '1.4em'}}>{(profile.me) ? 'Events You\'re' : `${profile.firstName} is` } Attending</h1>
        <ul>{attendingEvents}</ul>
      </div>
    )
  }

  renderUserIcon (user) {
    return (
      <li key={user.slug} style={{ backgroundImage: `url(${user.profileImg})` }}>
        <a className='' href={`/${user.slug}`}>{user.firstName[0] + user.lastName[0]}</a>
      </li>
    )
  }

  renderEventIcon (event) {
    return (
      <li key={event.id} style={{ backgroundImage: `url(${event.headerImg})` }}>
        <a className='' href={`/events/${event.slug}`}>{event.name}</a>
      </li>
    )
  }
}

function mapStateToProps (state) {
  return {
    profile: state.profileStore.profile
  }
}

export default connect(mapStateToProps)(ProfilePage)
