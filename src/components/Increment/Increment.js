import React, { Component, PropTypes } from 'react'

export default class Increment extends Component {
  static get displayName () {
    return 'Increment'
  }

  static propTypes () {
    return {
      val: PropTypes.string,
      onChange: PropTypes.func
    }
  }

  constructor (props) {
    super(props)

    // Make sure the props value is not less than 0
    let value = (props.val) ? ((props.val < 0) ? 0 : props.val) : 0

    this.state = {
      val: value
    }

    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.set = this.set.bind(this)
    this.captureNegatives = this.captureNegatives.bind(this)
    this.handleBlur = this.handleBlur.bind(this)

    this.uniqueId = `incrementer-${~~(Math.random() * (2000 - 1000) + 1000)}`
  }

  componentWillReceiveProps (props) {
    if (props.val) {
      this.setState({ val: props.val })
    }
    return props
  }

  increment () {
    this.set(this.state.val + 1)
  }

  decrement () {
    if (this.state.val > 0) {
      this.set(this.state.val - 1)
    }
  }

  handleChange (se) {
    let val = ~~se.target.value
    if (val < 0) {
      val *= -1
    }
    this.set(val)
  }

  set (val) {
    this.setState({ val })

    if (this.props.onChange) {
      this.props.onChange(val)
    }
  }

  handleBlur (se) {
    this.captureNegatives(se)
  }

  captureNegatives (se) {
    let value = ~~se.target.value
    this.setState({
      val: value < 0 ? 0 : value
    })
  }

  render () {
    return (
      <div className='incrementer'>
        <button type='button' className='btn-minus' onClick={ this.decrement }>-</button>
        <button type='button' className='btn-plus' onClick={ this.increment }>+</button>

        <div className='increment-display'>
          <input className='increment-input' ref={this.uniqueId} type='text' onChange={ this.handleChange } onBlur={ this.handleBlur } value={ this.state.val } />
        </div>
      </div>
    )
  }
}
