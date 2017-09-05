import React, { Component, PropTypes } from 'react'

export default class ProfileImage extends Component {
  static get displayName () {
    return 'ProfileImage'
  }

  static get propTypes () {
    return {
      user: PropTypes.object,
      size: PropTypes.number,
      margin: PropTypes.string
    }
  }

  render () {
    const { user, size, margin } = this.props

    if (!user) {
      return <div />
    }

    const proportion = size || 100
    const imagePath = user.profileImg

    const profileImageStyle = {
      backgroundImage: `url(${imagePath})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      border: `${(proportion >= 50) ? 4 : 2}px #fff solid`,
      borderRadius: '50%',
      height: proportion,
      width: proportion,
      margin: `${margin}`
    }

    const initialsStyle = {
      color: 'white',
      fontSize: `${proportion * 0.02}em`,
      fontWeight: 300,
      height: proportion,
      lineHeight: `${proportion}px`,
      textAlign: 'center',
      textTransform: 'uppercase'
    }

    const textStyle = {
      fontSize: '14px',
      marginTop: `-${proportion / 2 - 10}`,
      marginLeft: `-${proportion / 2 - 10}`
    }

    let initials = ''

    if (imagePath && imagePath.indexOf('missing.png') !== -1) {
      const fInitial = (user.firstName) ? user.firstName.slice(0, 1) : ''
      const lInitial = (user.lastName) ? user.lastName.slice(0, 1) : ''
      initials = fInitial + lInitial
    }

    return (
      <a href={`/${user.slug}`} className='profile-link'>
        <div className='profile-image' style={ profileImageStyle } >
          <div className='initials' style={ initialsStyle }>{ initials }</div>
        </div>
        <div className='text' style={ textStyle }>{ user.firstName } { user.lastName }</div>
      </a>
    )
  }
}
