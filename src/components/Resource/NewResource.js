import React, { Component, PropTypes } from 'react'

export default class NewResource extends Component {
  static get displayName () {
    return 'Resource/NewResource'
  }

  static propTypes () {
    return {
      cb: PropTypes.func.isRequired
    }
  }

  constructor (props) {
    super(props)
    this.state = {}
    this.onChange = this.onChange.bind(this)
    this.save = this.save.bind(this)
  }

  onChange (se) {
    const change = {}

    if (se.target.name === 'price') {
      change[se.target.name] = se.target.value.replace(/[^\d.]/gi, '')
    } else {
      change[se.target.name] = se.target.value
    }

    this.setState(change)
  }

  save () {
    this.props.cb(this.state)

    this.setState({
      name: undefined,
      description: undefined,
      price: undefined
    })
  }

  render () {
    const disableToggle = (!this.state.name && !this.state.price) ? { disabled: 'true' } : null

    return (
      <div className='new-resource'>
        <div className='flex-container'>
          <input className='resource-name' name='name' onChange={ this.onChange } value={ this.state.name } type='text' placeholder='Name' />
          <input className='resource-description' name='description' onChange={ this.onChange } value={ this.state.description } type='text' placeholder='Description' />
          <input className='resource-cost' name='price' onChange={ this.onChange } value={ this.state.price } type='text' placeholder='Cost ($)' />
          <button className='add-resource' type='button' onClick={ this.save } {...disableToggle}>Add</button>
        </div>
      </div>
    )
  }
}
