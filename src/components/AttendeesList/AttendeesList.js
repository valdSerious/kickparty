import React, { Component, PropTypes } from 'react'
import ProfileImage from '../ProfileImage'

export default class AttendeesList extends Component {
  static get propTypes () {
    return {
      attendees: PropTypes.array,
      maxDisplayed: PropTypes.number
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      attendees: props.attendees.slice(0, props.maxDisplayed),
      numDisplayed: props.maxDisplayed,
      moreShown: false
    }
    this.showMore = this.showMore.bind(this)
    this.reset = this.reset.bind(this)
  }

  showMore () {
    const { attendees, maxDisplayed } = this.props
    const { numDisplayed } = this.state
    // incrementAmount can be its own prop if the customizability is needed
    const incrementAmount = maxDisplayed
    this.setState({
      attendees: attendees.slice(0, numDisplayed + incrementAmount),
      numDisplayed: numDisplayed + incrementAmount,
      moreShown: true
    })
  }

  reset () {
    const { attendees, maxDisplayed } = this.props
    this.setState({
      attendees: attendees.slice(0, maxDisplayed),
      numDisplayed: maxDisplayed,
      moreShown: false
    })
  }

  render () {
    const { attendees, numDisplayed, moreShown } = this.state
    const buttonStyle = {
      backgroundColor: '#7ED321',
      color: 'white',
      paddingTop: '5px',
      paddingBottom: '5px',
      margin: '0 5px 0 5px'
    }
    return (
      <div>
        <ul className='invitees'>
          { attendees.map((attendee, i) =>
            <li className='invitee' key={ `attendee-${i}` }>
              <ProfileImage user={ attendee } size={ 70 }/>
            </li>
          ) }
          <li className='invitee phantom'><div className='profile-image'></div></li>
          <li className='invitee phantom'><div className='profile-image'></div></li>
          <li className='invitee phantom'><div className='profile-image'></div></li>
          <li className='invitee phantom'><div className='profile-image'></div></li>
          <li className='invitee phantom'><div className='profile-image'></div></li>
          <li className='invitee phantom'><div className='profile-image'></div></li>
          <li className='invitee phantom'><div className='profile-image'></div></li>
        </ul>
        <div style={{textAlign: 'center'}}>
          { numDisplayed < this.props.attendees.length
            ? <button onClick={this.showMore} style={buttonStyle}>Show more</button>
            : null
          }
          { moreShown
            ? <button onClick={this.reset} style={buttonStyle}>Show less</button>
            : null
          }
        </div>
      </div>
    )
  }
}
