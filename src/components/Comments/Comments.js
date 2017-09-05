import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { Comments as styles } from './CommentStyles'
import Comment from './Comment'

class Comments extends Component {
  static get displayName () {
    return 'Comments'
  }

  static propTypes () {
    return {
      comments: PropTypes.array.isRequired,
      showCount: PropTypes.number,
      loggedIn: PropTypes.bool,
      dispatch: PropTypes.func
    }
  }

  constructor (props) {
    super(props)
    this.defaultCount = (props.showCount) ? props.showCount : 10
    this.defaultMax = 10 // Todo maybe use this

    this.state = {
      showCount: this.defaultCount,
      isShowingMore: false
    }

    this.toggle = this.toggle.bind(this)
  }

  componentWillReceiveProps (props) {
    console.log(props)
  }

  toggle () {
    const {showCount, isShowingMore} = this.state
    const newCount = (showCount) ? null : this.defaultCount

    this.setState({
      showCount: newCount,
      isShowingMore: !isShowingMore
    })
  }

  render () {
    const {comments} = this.props
    const {showCount} = this.state

    if (!comments || comments.length === 0) {
      return null
    }

    const commentList = []

    for (let i = 0, j = comments.length; i < j; i++) {
      const comment = comments[i]

      if (showCount && showCount - 1 < i) {
        break
      } else {
        commentList.push((
          <li style={styles.li} key={`comment-${i}`}>
            { comment.pinned ? <span style={styles.pinnedText}>PINNED</span> : null }
            <Comment comment={comment} loggedIn={this.props.loggedIn} dispatch={this.props.dispatch}/>
          </li>
        ))
      }
    }

    return (
      <div>
        <ul style={styles.ul}>
          {commentList}
        </ul>
        {(showCount && comments.length > showCount) ? <a onClick={this.toggle}>show more</a> : null}
        {(this.state.isShowingMore) ? <a onClick={this.toggle}>show less</a> : null}
      </div>
    )
  }
}

function mapStateToProps (state) {
  const props = {}

  if (state.authStore.hasOwnProperty('loggedIn')) {
    props.loggedIn = state.authStore.loggedIn
  }

  return props
}

export default connect(mapStateToProps)(Comments)
