import React, { Component, PropTypes } from 'react'
// import SpinnerA from './SpinnerA'
import SpinnerB from './SpinnerB'
import dom from '../../utils/dom'

export default class Spinner extends Component {
  static get displayName () {
    return 'Spinner'
  }

  static propTypes () {
    return {
      isActive: PropTypes.bool
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.isActive) {
      dom.disableScroll()
    } else {
      dom.enableScroll()
    }

    return nextProps
  }

  render () {
    const { isActive } = this.props
    return (isActive) ? <SpinnerB /> : null
  }
}
