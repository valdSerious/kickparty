import React, { Component, PropTypes } from 'react'
import AttributeService from './AttributeService'

export default class SelectMenu extends Component {
  static get displayName () {
    return 'UIComponents/SelectMenu'
  }

  static get propTypes () {
    return {
      config: PropTypes.object,
      handleChange: PropTypes.func,
      options: PropTypes.array.isRequired,
      value: PropTypes.string,
      name: PropTypes.string,
      className: PropTypes.string
    }
  }

  static get defaultProps () {
    return {
      config: {},
      options: [],
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
      <select className={ this.props.className } name={ this.props.name } value={ this.state.value } onChange={this.handleChange} {...opts}>
        <option defaultValue>please select</option>
        {this.props.options.map((option, i) => {
          return (<option key={ i } value={ option.value }>{ option.label }</option>)
        })}
      </select>
    )
  }
}
