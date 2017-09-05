import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { Posts as styles } from './PostStyles'
import Post from './Post'

class Posts extends Component {
  static get displayName () {
    return 'Posts'
  }

  static propTypes () {
    return {
      posts: PropTypes.array.isRequired,
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

  toggle () {
    const {showCount, isShowingMore} = this.state
    const newCount = (showCount) ? null : this.defaultCount

    this.setState({
      showCount: newCount,
      isShowingMore: !isShowingMore
    })
  }

  render () {
    const {posts} = this.props
    const {showCount} = this.state

    if (!posts || posts.length === 0) {
      return null
    }

    const postList = []

    for (let i = 0, j = posts.length; i < j; i++) {
      const post = posts[i]

      if (showCount && showCount - 1 < i) {
        break
      } else {
        postList.push((
          <li style={styles.li} key={`post-${i}`}>
            { post.pinned ? <span style={styles.pinnedText}>PINNED</span> : null }
            <Post post={post} loggedIn={this.props.loggedIn} dispatch={this.props.dispatch} />
          </li>
        ))
      }
    }

    return (
      <div>
        <ul style={styles.ul}>
          {postList}
        </ul>
        {(showCount && posts.length > showCount) ? <a onClick={this.toggle}>show more</a> : null}
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

export default connect(mapStateToProps)(Posts)
