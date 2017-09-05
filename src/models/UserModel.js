export default class UserModel {
  constructor (props) {
    if (props && props.auth_token) {
      this.authToken = props.auth_token
    }
    if (props && props.id) {
      this.id = props.id
    }

    this.firstName = props.firstName || props.first_name
    this.lastName = props.lastName || props.last_name
    this.slug = props.slug
    this.profileImg = props.profileImg || props.profile_img
    this.fbId = props.fbId || props.fb_id
    this.payment = props.payment
    this.email = props.email
  }
}
