import React, { Component, PropTypes } from 'react'
import Dropzone from 'react-dropzone'

export default class FileUpload extends Component {
  static get displayName () {
    return 'FileUpload'
  }

  static get propTypes () {
    return {
      cb: PropTypes.func
    }
  }

  constructor (props) {
    super(props)
    this.state = {}
    this.onDrop = this.onDrop.bind(this)
  }

  onDrop (files) {
    if (this.props.cb) {
      this.props.cb(files)
    }
  }

  render () {
    return (
      <div>
        <Dropzone ref='dropzone' className='header-drop' onDrop={ this.onDrop } multiple={ false }>
          <a>Drop or click to add a header image</a>
        </Dropzone>
      </div>
    )
  }
}

/*
Available props for <Dropzone />

Dropzone.defaultProps = {
  disablePreview: false,
  disableClick: false,
  multiple: true
};

Dropzone.propTypes = {
  onDrop: React.PropTypes.func,
  onDropAccepted: React.PropTypes.func,
  onDropRejected: React.PropTypes.func,
  onDragEnter: React.PropTypes.func,
  onDragLeave: React.PropTypes.func,

  children: React.PropTypes.node,
  style: React.PropTypes.object,
  activeStyle: React.PropTypes.object,
  rejectStyle: React.PropTypes.object,
  className: React.PropTypes.string,
  activeClassName: React.PropTypes.string,
  rejectClassName: React.PropTypes.string,

  disablePreview: React.PropTypes.bool,
  disableClick: React.PropTypes.bool,

  inputProps: React.PropTypes.object,
  multiple: React.PropTypes.bool,
  accept: React.PropTypes.string,
  name: React.PropTypes.string
};
*/
