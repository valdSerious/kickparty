import UserModel from './UserModel'

export default class PostModel {
  constructor (props) {
    this.title = props.title
    this.body = props.body
    this.eventId = props.eventId
    this.id = props.id
    this.me = props.me
    this.pinned = props.pinned
    this.likeCount = props.likeCount
    this.like = props.like
    this.createdAt = new Date(props.createdAt)
    this.user = new UserModel(props.user)
    this.comments = props.comments
  }
}
