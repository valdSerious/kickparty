import React, { Component, PropTypes } from 'react'
import AttributeService from './AttributeService'

export default class TextArea extends Component {
  static get displayName () {
    return 'UIComponent/TextArea'
  }

  static get propTypes () {
    return {
      config: PropTypes.object,
      handleChange: PropTypes.func,
      value: PropTypes.string,
      name: PropTypes.string.isRequired,
      className: PropTypes.string
    }
  }

  static get defaultProps () {
    return {
      config: {},
      label: '',
      value: '',
      name: ''
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      value: props.value
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    const value = e.target.value
    this.setState({ value })

    if (this.props.handleChange) {
      this.props.handleChange([this.props.name, value])
    }
  }

  render () {
    const { config } = this.props
    const opts = AttributeService.getAttrs(config)

    return (
      <textarea className={ this.props.className } name={ this.props.name } value={ this.state.value } onChange={ this.handleChange } { ...opts } />
    )
  }
}
