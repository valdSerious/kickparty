import React, { Component, PropTypes } from 'react'

export default class ValidationMessage extends Component {
  static get displayName () {
    return 'ValidationMessage'
  }

  static propTypes () {
    return {
      validate: PropTypes.object
    }
  }

  render () {
    const { validate } = this.props

    if (!validate.touched || !validate.error) {
      return null
    }

    return (
      <div className='form-error' style={{ textTransform: 'lowercase', color: 'red', textAlign: 'left' }}>{ validate.error }</div>
    )
  }
}
