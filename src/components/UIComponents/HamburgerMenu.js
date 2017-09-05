import React, { Component, PropTypes } from 'react'
import TweenMax from 'gsap/src/minified/TweenMax.min.js'
import { findDOMNode } from 'react-dom'
import objectAssign from 'object-assign'

import AppConstants from '../../constants/AppConstants'

export default class HamburgerMenu extends Component {
  static get displayName () {
    return 'HamburgerMenu'
  }

  static propTypes () {
    return {
      onclick: PropTypes.func,
      className: PropTypes.string,
      closeNow: PropTypes.bool
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      isOn: false
    }

    this.onClick = this.onClick.bind(this)
    this.close = this.close.bind(this)
    this.toggleView = this.toggleView.bind(this)
  }

  componentWillReceiveProps (props) {
    if (props.closeNow) {
      this.close()
    }

    return props
  }

  onClick (se) {
    if (this.props.onclick) {
      this.props.onclick()
    }

    this.toggleView(se)
  }

  close () {
    this.toggleView(null, false)
  }

  toggleView (se, hideAnimation) {
    // const mobileNav = this.refs.mobileNav.getDOMNode()
    const bar1 = findDOMNode(this.refs.bar1)
    const bar2 = findDOMNode(this.refs.bar2)
    const bar3 = findDOMNode(this.refs.bar3)

    // const height = (this.state.isNavVisible) ? 0 : 180 // height of #mobile-nav
    const duration = (hideAnimation) ? 0 : AppConstants.ANIMATION_DURATION
    const degrees = Math.atan(14 / 22) * (180 / Math.PI)

    if (!this.state.isOn) {
      TweenMax.to(bar1, duration, { rotation: degrees, transformOrigin: 'left center' })
      TweenMax.to(bar2, duration, { css: { width: 0, opacity: 0 } })
      TweenMax.to(bar3, duration, { rotation: -degrees, transformOrigin: 'left center' })
    } else {
      TweenMax.to(bar1, duration, { rotation: 0, transformOrigin: 'left center' })
      TweenMax.to(bar2, duration, { css: { width: 22, opacity: 1 } })
      TweenMax.to(bar3, duration, { rotation: 0, transformOrigin: 'left center' })
    }

    this.setState({ isOn: !this.state.isOn })
  }

  render () {
    const buttonStyle = {
      padding: '9px 10px',
      margin: 0,
      backgroundImage: 'none',
      border: '0px solid transparent',
      borderRadius: 2,
      backgroundColor: 'rgba(0, 0, 0, 0)',
      width: 44,
      boxShadow: 'none'
    }

    const firstBar = {
      display: 'block',
      height: 2,
      borderRadius: 1,
      backgroundColor: '#D400FF',
      width: 22
    }

    const otherBars = objectAssign({}, firstBar, {
      marginTop: 4
    })

    return (
      <button type='button' style={ buttonStyle } className={`hamburger-menu ${this.props.className}`} onClick={ this.onClick }>
        <span className='icon-bar purple' style={ firstBar } ref='bar1'></span>
        <span className='icon-bar teal' style={ otherBars } ref='bar2'></span>
        <span className='icon-bar green' style={ otherBars } ref='bar3'></span>
      </button>
    )
  }
}
