// TODO: check-if-third-party-cookies-are-enabled
// http://stackoverflow.com/questions/3550790/check-if-third-party-cookies-are-enabled

import React, { PropTypes } from 'react'

class FacebookLogin extends React.Component {
  static get propTypes () {
    return {
      callback: PropTypes.func.isRequired,
      appId: PropTypes.string.isRequired,
      scope: PropTypes.string,
      text: PropTypes.string,
      autoLoad: PropTypes.bool,
      size: PropTypes.string,
      fields: PropTypes.string
    }
  }

  static get defaultProps () {
    return {
      textButton: 'Login with Facebook',
      scope: 'public_profile,email,user_friends',
      xfbml: false,
      size: 'medium',
      fields: 'id,name,email,first_name,last_name'
    }
  }

  constructor (props) {
    super(props)

    this.responseApi = this.responseApi.bind(this)
    this.checkLoginState = this.checkLoginState.bind(this)
    this.click = this.click.bind(this)
  }

  responseApi (authResponse) {
    window.FB.api('/me', { fields: this.props.fields }, (me) => {
      me.accessToken = authResponse.accessToken
      this.props.callback(me)
    })
  }

  checkLoginState (response) {
    if (response.authResponse) {
      this.responseApi(response.authResponse)
    } else {
      if (this.props.callback) {
        this.props.callback({ status: response.status })
      }
    }
  };

  click () {
    window.FB.login(this.checkLoginState, { scope: this.props.scope })
  }

  render () {
    const buttonStyle = {
      display: 'block',
      color: 'white',
      backgroundColor: 'rgb(57, 89, 146)',
      border: 0,
      textAlign: 'center',
      padding: '10px 12px',
      borderRadius: 2,
      cursor: 'pointer',
      boxShadow: '1px 1px 4px black',
      backgroundClip: 'padding-box'
    }

    return (
      <div>
        <a
          style={buttonStyle}
          className={`kep-login-facebook kep-login-facebook-${this.props.size}`}
          onClick={this.click}>
          {this.props.text}
        </a>
        <div id='fb-root'></div>
      </div>
    )
  }
}

export default FacebookLogin
