import React, { Component, PropTypes } from 'react'
import AvatarEditor from 'react-avatar-editor'
import isString from 'lodash/isString.js'
import min from 'lodash/min.js'

class ImageEditor extends Component {
  static get propTypes () {
    return {
      image: PropTypes.object,
      onImageChange: PropTypes.func,
      onRemoveClick: PropTypes.func
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      image: props.image.value.data,
      scale: 1
    }
  }

  onScaleChange () {
    const scale = parseFloat(this.refs.scale.value)
    this.setState({ scale })
    this.saveImage()
  }

  onImageChange () {
    this.saveImage()
  }

  saveImage () {
    let rawImage = this.refs.editor.getImage()
    if (isString(rawImage)) {
      rawImage = rawImage.replace('data:image/png;base64,', '')
    }

    const imageData = {
      data: rawImage,
      type: this.props.image.value.type,
      name: this.props.image.value.name
    }

    this.props.onImageChange(imageData)
  }

  controls () {
    return (
      <div className='controls'>
        <label>Resize your image</label>
        <input name='scale'
          type='range'
          ref='scale'
          onChange={this.onScaleChange.bind(this)}
          min='1'
          max='2'
          step='0.01'
          defaultValue='1' />
      </div>
    )
  }

  avatarEditor () {
    const width = min([700, screen.width * 0.9])
    const height = width * 9 / 16

    return (
      <AvatarEditor
        ref='editor'
        image={`data:image/png;base64,${this.state.image}`}
        width={width}
        height={height}
        border={5}
        color={[100, 100, 100, 0.6]}
        onMouseUp={this.onImageChange.bind(this)}
        scale={this.state.scale} />
    )
  }

  render () {
    return (
      <div className='image-editor'>
        <h3>
          <a className='pull-right' onClick={this.props.onRemoveClick}>X</a>
          Preview
        </h3>
        <div>
          {this.avatarEditor()}
        </div>
        {this.controls()}
      </div>
    )
  }
}

export default ImageEditor
