import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'

export default class HeadModifier extends Component {
  static get displayName () {
    return 'HeadModifier'
  }

  static get propTypes () {
    return {
      title: PropTypes.string,
      meta: PropTypes.array
    }
  }

  render () {
    return (
      <Helmet title={ this.props.title } meta={ this.props.meta } />
    )
  }
}
