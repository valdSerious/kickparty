import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import { NewPost as styles } from './PostStyles'

export const MAX_LENGTH = 500

export default class NewPost extends Component {
  static get displayName () {
    return 'NewPost'
  }

  static propTypes () {
    return {
      onsubmit: PropTypes.func.isRequired,
      onfocus: PropTypes.func
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      value: '',
      remaining: MAX_LENGTH
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onReset = this.onReset.bind(this)
    this.onFocus = this.onFocus.bind(this)
  }

  componentDidMount () {
    this.newPost = findDOMNode(this.refs['newPost'])
  }

  onFocus () {
    const {onfocus} = this.props

    if (onfocus && onfocus instanceof Function) {
      onfocus()
    }
  }

  onChange (se) {
    const value = se.target.value

    // On paste we need to set focus
    if (this.newPost) {
      this.newPost.focus()
    }

    if (value.length <= MAX_LENGTH) {
      this.setState({
        value,
        remaining: MAX_LENGTH - value.length
      })
    } else {
      // This handles when someone pastes in text that exceeds our limit
      this.setState({
        value: value.slice(0, MAX_LENGTH),
        remaining: MAX_LENGTH - value.length
      })
    }
  }

  onSubmit (se) {
    se.preventDefault()
    const {onsubmit} = this.props

    if (onsubmit && onsubmit instanceof Function) {
      onsubmit(this.state.value)
    }

    this.onReset()
  }

  onReset () {
    this.setState({
      value: '',
      remaining: MAX_LENGTH
    })
  }

  render () {
    return (
      <div>
        <form onSubmit={this.onSubmit} style={styles.form}>
          <textarea style={styles.textarea} value={this.state.value} onChange={this.onChange} ref='newPost' onFocus={this.onFocus}></textarea>
          <button className='card-box highlight green' type='submit' style={{marginLeft: 'inherit', paddingLeft: 'inherit', maxWidth: '75px', padding: 0}}><div style={{width: '100%'}}>Post</div></button>
        </form>
        {
          (this.state.remaining > 0)
          ? <div style={styles.remaining}>{this.state.remaining}</div>
        : <div style={styles.warning}>Little messages go a long way</div>
        }
      </div>
    )
  }
}
