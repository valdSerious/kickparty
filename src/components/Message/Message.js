import React, { Component, PropTypes } from 'react'

export default class Message extends Component {
  static get displayName () {
    return 'Message'
  }

  static propTypes () {
    return {
      onsubmit: PropTypes.func.isRequired,
      oncancel: PropTypes.func
    }
  }

  constructor (props) {
    super(props)
    this.state = {}
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  onSubmit (se) {
    se.preventDefault()
    const { onsubmit } = this.props

    if (onsubmit) {
      onsubmit(this.state)
    }
  }

  onChange (se) {
    this.setState({
      [se.target.name]: se.target.value
    })
  }

  onCancel (se) {
    const { oncancel } = this.props

    if (oncancel) {
      oncancel()
    }
  }

  render () {
    const buttonStyle = {
      backgroundColor: 'rgba(255,255,255,0)',
      border: 'none',
      display: 'block',
      boxShadow: 'none',
      flex: 1,
      color: '#666',
      boxSizing: 'border-box'
    }

    const submitStyle = Object.assign({}, buttonStyle, {
      textAlign: 'left',
      textTransform: 'uppercase',
      fontWeight: 700
    })

    const cancelStyle = Object.assign({}, buttonStyle, {
      textAlign: 'right',
      fontWeight: 300,
      textTransform: 'lowercase'
    })

    const inputStyle = {
      padding: '10px 12px',
      boxSizing: 'border-box',
      width: '100%',
      border: '1px solid #DDDDDD'
    }

    const labelStyle = {
      lineHeight: 2,
      color: '#7777777',
      fontWeight: 700
    }

    return (
      <form ref='message-form' onSubmit={this.onSubmit} onChange={this.onChange}>
        <label htmlFor='subject' style={labelStyle}>Subject</label><br />
        <input type='text' name='subject' style={inputStyle} required />
        <label htmlFor='body' style={labelStyle}>Message</label><br />
        <textarea name='body' style={inputStyle} required></textarea>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <button style={submitStyle} type='submit'>Send</button>
          <button style={cancelStyle} type='button' onClick={this.onCancel}>Cancel</button>
        </div>
      </form>
    )
  }
}
