import React, { Component, PropTypes } from 'react'
import AttributeService from './AttributeService'

export default class TextInput extends Component {
  static get displayName () {
    return 'UIComponent/TextInput'
  }

  static get propTypes () {
    return {
      config: PropTypes.object,
      handleChange: PropTypes.func,
      value: PropTypes.string,
      name: PropTypes.string.isRequired,
      className: PropTypes.string,
      type: PropTypes.string
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

    this.updateValue = this.updateValue.bind(this)
  }

  updateValue (e) {
    const value = e.target.value
    this.setState({ value })

    if (this.props.handleChange) {
      this.props.handleChange([this.props.name, value])
    }
  }

  render () {
    const { config } = this.props
    const opts = AttributeService.getAttrs(config)
    const type = this.props.type || 'text'

    return (
      <input className={ this.props.className } type={ type } name={ this.props.name } value={ this.state.value } onChange={ this.updateValue } { ...opts } />
    )
  }
}
