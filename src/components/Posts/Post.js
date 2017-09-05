import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import objectAssign from 'object-assign'

import ProfileImage from '../ProfileImage'
import { Post as styles } from './PostStyles'
import format from '../../utils/format'
import { MAX_LENGTH } from '../Posts/NewPost'
import { updateModal } from '../../actions/appActions'
import { NewPost } from '../Posts'
import { createComment, clearNewCommentFromStore, addLike, removeLike, clearLikeFromStore } from '../../actions/postActions'
import { Comments } from '../Comments'

class Post extends Component {
  static get displayName () {
    return 'Post'
  }

  static propTypes () {
    return {
      post: PropTypes.object.isRequired,
      likeCount: PropTypes.number,
      loggedIn: PropTypes.bool,
      dispatch: PropTypes.func
    }
  }

  constructor (props) {
    super(props)

    this.likeTitle = (props.post.likeCount === 1 ? 'person likes' : 'people like')

    // This is used because currently the comments are being sent from the api
    // in the wrong order.
    const comments = props.post.comments.reverse()

    this.state = {
      likeCount: props.post.likeCount,
      likeTitle: this.likeTitle,
      like: props.post.like,
      showCommentInput: false,
      comments: comments
    }
    this.filterLoggedIn = this.filterLoggedIn.bind(this)
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this)
    this.handleLikeClick = this.handleLikeClick.bind(this)
  }

  componentWillReceiveProps (props) {
    if (props.post) {
      if (props.newComments && props.newComments[props.post.id]) {
        this.setState({
          comments: [props.newComments[props.post.id], ...this.state.comments]
        })
        props.dispatch(clearNewCommentFromStore(props.post.id))
      }
      if (props.newLikes && props.newLikes[props.post.id]) {
        const likeCountChanged = this.state.likeCount + props.newLikes[props.post.id].delta
        const likeTitle = (props.post.likeCount === 1 ? 'person likes' : 'people like')
        const like = props.newLikes[props.post.id].delta === -1 ? null : props.newLikes[props.post.id].id
        this.setState({
          likeCount: likeCountChanged,
          likeTitle: likeTitle,
          like: like
        })
        props.dispatch(clearLikeFromStore(props.post.id))
      }
    }
  }

  filterLoggedIn () {
    if (!this.props.loggedIn) {
      this.props.dispatch(updateModal({
        title: '',
        content: (<div>
          <p>We totally want to hear what you would like to say, but you have to login first.  Do it <Link to={`/signin?next=/events/${this.props.post.eventId}`}>here</Link></p>
        </div>)
      }))
      return false
    }
    return true
  }

  handleLikeClick (post, se) {
    if (!this.filterLoggedIn()) return
    if (this.state.like) {
      this.props.dispatch(removeLike(post.id, this.state.like, 1))
    } else {
      this.props.dispatch(addLike(post.id, 1))
    }
  }

  handleCommentClick () {
    if (!this.filterLoggedIn()) return
    this.setState(objectAssign({}, this.state, {showCommentInput: !this.state.showCommentInput}))
  }

  handleCommentSubmit (value) {
    this.props.dispatch(createComment({objectTypeId: 1, body: value, objectId: this.props.post.id}))
  }

  render () {
    const {post} = this.props
    // const {likeCount, likeTitle} = this.state
    // console.log('LIKECOUNT', likeCount)
    const maxWordLength = 30
    const postBody = post.body
      .slice(0, MAX_LENGTH)
      .split(' ')
      .map((word) => {
        if (word.length > maxWordLength) {
          const seperate = (word) => {
            if (word.length === 0) return ''
            return word.slice(0, maxWordLength) + ' ' + seperate(word.slice(maxWordLength))
          }
          return seperate(word)
        }
        return word
      })
      .join(' ')

    return (
      <article style={objectAssign({}, styles.article, (post.pinned ? styles.pinned : styles.unpinned))}>
        <div style={styles.mainContent}>
          <ProfileImage user={post.user} size={ 50 } />
          <div style={styles.textBlock} className='post-text'>
            <Link style={styles.link} to={`/${post.user.slug}`}>{`${post.user.firstName} ${post.user.lastName}`}</Link>
            <p style={styles.time}>{format.timeAgo(post.createdAt, 24)}</p>
            <p style={styles.body}>{postBody}</p>
            <div style={styles.socialButtons}>
              <a style={objectAssign({}, styles.socialLink, (this.state.like) ? styles.socialLinkActive : styles.socialLinkInactive)} onClick={this.handleLikeClick.bind(this, post)}>
                <i className='fa fa-thumbs-up'></i> {(this.state.like) ? 'Unlike' : 'Like'}
              </a>
              <a style={objectAssign({}, styles.socialLink)} onClick={this.handleCommentClick.bind(this)}><i className='fa fa-comments'></i> Comment</a>
            </div>
          </div>
          <span style={styles.thumbtack}>{(post.pinned) ? <i className='fa fa-thumb-tack'></i> : null}</span>
        </div>
        {this.state.likeCount > 0 ? <div style={styles.likeContainer}>{`${this.state.likeCount} ${this.state.likeTitle} this`}</div> : null}
        <div style={styles.mainContent}>
          <div style={styles.textBlock} className='comments'>
            {this.state.showCommentInput
              ? <NewPost onsubmit={this.handleCommentSubmit} loggedIn={this.props.loggedIn}/>
            : null
            }
            <Comments comments={this.state.comments} />
          </div>
        </div>
      </article>
    )
  }
}

function mapStateToProps (state) {
  return {
    newComments: state.postStore.newComments,
    newLikes: state.postStore.newLikes
  }
}

export default connect(mapStateToProps)(Post)
