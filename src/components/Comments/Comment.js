import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import objectAssign from 'object-assign'

import ProfileImage from '../ProfileImage'
import { Comment as styles } from './CommentStyles'
import format from '../../utils/format'
import API from '../../utils/api'
import { updateModal } from '../../actions/appActions'
import { MAX_LENGTH } from '../Posts/NewPost'

export default class Comment extends Component {
  static get displayName () {
    return 'Comment'
  }

  static propTypes () {
    return {
      comment: PropTypes.object.isRequired,
      likeCount: PropTypes.number,
      loggedIn: PropTypes.bool,
      dispatch: PropTypes.func
    }
  }

  constructor (props) {
    super(props)

    this.likeTitle = (props.comment.likeCount === 1 ? 'person likes' : 'people like')

    this.state = {
      likeCount: props.comment.likeCount,
      likeTitle: this.likeTitle,
      like: props.comment.like,
      showCommentInput: false
    }
    this.filterLoggedIn = this.filterLoggedIn.bind(this)
  }

  componentWillReceiveProps (props) {
    if (props.comment) {
      this.likeTitle = (props.comment.likeCount === 1 ? 'person likes' : 'people like')

      this.setState({
        likeCount: props.comment.likeCount,
        likeTitle: this.likeTitle,
        like: props.comment.like
      })
    }
  }

  addLike (commentId) {
    // The objectTypeId is set to 2 in order to signify that the like is
    // for a comment.
    API.post('/likes', {objectTypeId: 2, objectId: commentId}).then(
      (response) => {
        if (response.data) {
          const {likeCount} = this.state
          const likeCountIncremented = (likeCount || 0) + 1
          const likeTitle = (likeCountIncremented === 1 ? 'person likes' : 'people like')
          const like = response.data.id
          this.setState(objectAssign({}, this.state, {
            likeCount: likeCountIncremented,
            likeTitle: likeTitle,
            like: like
          }))
        }
      })
      .catch(console.log('Error processing like'))
  }

  removeLike (commentId, likeId) {
    API.delete(`/likes/${likeId}`, {objectTypeId: 2, objectId: commentId}).then(
      (response) => {
        const {likeCount} = this.state
        const likeCountDecremented = likeCount - 1
        const likeTitle = (likeCountDecremented === 1 ? 'person likes' : 'people like')

        this.setState({
          likeCount: likeCountDecremented,
          likeTitle: likeTitle,
          like: null
        })
      }
    ).catch((err) => {
      console.error('Resource like error:', err)
    })
  }

  filterLoggedIn () {
    if (!this.props.loggedIn) {
      this.props.dispatch(updateModal({
        title: '',
        content: (<div>
          <p>We totally want to hear what you would like to say, but you have to login first.  Do it <Link to={`/signin?next=/events/${this.props.comment.eventId}`}>here</Link></p>
        </div>)
      }))
      return false
    }
    return true
  }

  handleLikeClick (comment, se) {
    if (!this.filterLoggedIn()) return
    if (this.state.like) {
      this.removeLike(comment.id, this.state.like)
    } else {
      this.addLike(comment.id)
    }
  }

  render () {
    const {comment} = this.props
    const maxWordLength = 30
    const commentBody = comment.body
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

    // Like is commented out until the api that is returning the comments with
    // the posts has the like id attached to the user returned inside the
    // comments.
    return (
      <article style={objectAssign({}, styles.article, (comment.pinned ? styles.pinned : styles.unpinned))}>
        <div style={styles.mainContent}>
          <ProfileImage user={comment.user} size={ 50 } />
          <div style={styles.textBlock} className='comment-text'>
            <Link style={styles.link} to={`/${comment.user.slug}`}>{`${comment.user.firstName} ${comment.user.lastName}`}</Link>
            <p style={styles.time}>{format.timeAgo(comment.createdAt, 24)}</p>
            <p style={styles.body}>{commentBody}</p>
            {
            // <div style={styles.socialButtons}>
              // <a style={objectAssign({}, styles.socialLink, (this.state.like) ? styles.socialLinkActive : styles.socialLinkInactive)} onClick={this.handleLikeClick.bind(this, comment)}>
              //   <i className='fa fa-thumbs-up'></i> {(this.state.like) ? 'Unlike' : 'Like'}
              // </a>
            // </div>
            }
          </div>
        </div>
        {
          // likeCount > 0 ? <div style={styles.likeContainer}>{`${likeCount} ${likeTitle} this`}</div> : null
        }
      </article>
    )
  }
}
