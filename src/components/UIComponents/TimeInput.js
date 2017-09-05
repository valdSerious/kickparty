import React, { Component, PropTypes } from 'react'
import AttributeService from './AttributeService'

export default class TimeInput extends Component {
  static get displayName () {
    return 'UIComponent/TimeInput'
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
      value: props.value,
      type: 'text'
    }

    this.updateValue = this.updateValue.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
  }

  onFocus () {
    this.setState({
      type: 'time'
    })
  }

  onBlur () {
    if (!this.state.value) {
      this.setState({
        type: 'text'
      })
    }
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

    return (
      <input className={ this.props.className } onFocus={ this.onFocus } onBlur={ this.onBlur } type={ this.state.type } name={ this.props.name } value={ this.state.value } onChange={ this.updateValue } { ...opts } />
    )
  }
}
