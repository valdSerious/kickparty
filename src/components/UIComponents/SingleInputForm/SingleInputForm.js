import React, { Component, PropTypes } from 'react'

export default class SingleInputForm extends Component {
  static get displayName () {
    return 'SingleInputForm'
  }

  static propTypes () {
    return {
      type: PropTypes.string.isRequired,
      onsubmit: PropTypes.func.isRequired
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      value: null
    }
  }

  onSubmit (se) {
    console.info('formsubmit', se)
    const {onsubmit} = this.props
    if (onsubmit && onsubmit instanceof Function) {
      onsubmit()
    }
  }

  onChange (se) {
    this.setState({
      value: se.target.value
    })
  }

  render () {
    return (
      <form onSubmit={this.onSubmit.bind(this)} className='single-input-form'>
        <input type={this.props.type} onChange={this.onChange.bind(this)} value={this.state.value} />
        <button type='button'></button>
        <button type='submit'>Submit</button>
      </form>
    )
  }
}
