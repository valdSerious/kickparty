/*eslint react/no-danger: 0, react/no-did-mount-set-state: 0 */

import React, { Component, PropTypes } from 'react'

export default class EventDescription extends Component {
  static get propTypes () {
    return {
      description: PropTypes.string
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      descriptionExpanded: false,
      expandable: false
    }
    this.showMore = this.showMore.bind(this)
    this.renderShowMore = this.renderShowMore.bind(this)
  }

  componentDidMount () {
    if (this.refs.description.offsetHeight > 150) {
      this.refs.description.style.maxHeight = 150
      this.setState({ expandable: true })
    }
  }

  showMore () {
    this.refs.description.style.maxHeight = 'inherit'
    this.refs.showMore.style.display = 'none'
    this.setState({ descriptionExpanded: true })
  }

  stringToMarkup (value) {
    return { __html: value }
  }

  render () {
    return (
      <article className='card-box full event-description' style={{display: 'block'}}>
        <div className='show-more' ref='description'>
          <p dangerouslySetInnerHTML={this.stringToMarkup(this.props.description)}></p>
        </div>
        { this.renderShowMore() }
      </article>
    )
  }

  renderShowMore () {
    if (this.state.expandable) {
      return (
        <p ref='showMore'>
          <a onClick={this.showMore}>
            Show More <span style={{background: 'url(/images/down-arrow.png) no-repeat right 50%', paddingRight: '12px'}}></span>
          </a>
        </p>
      )
    }
  }
}
