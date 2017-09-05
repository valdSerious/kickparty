import React, { Component, PropTypes } from 'react'
import ReactQuill from 'react-quill'

const customToolbar = [
  { label: 'Formats', type: 'group', items: [
    { label: 'Size', type: 'size', items: [
      { label: 'Normal', value: '14px' },
      { label: 'Small', value: '10px' },
      { label: 'Large', value: '18px' },
      { label: 'Huge', value: '32px' }
    ]},
    { type: 'seperator' },
    { label: 'Alignment', type: 'align', items: [
      { label: '', value: 'left' },
      { label: '', value: 'center' },
      { label: '', value: 'right' },
      { label: '', value: 'justify' }
    ]},
    { type: 'seperator' },
    { label: 'Text', type: 'group', items: [
      { type: 'bold', label: 'Bold' },
      { type: 'italic', label: 'Italic' },
      { type: 'underline', label: 'Underline' }
    ]},
    { type: 'seperator' },
    { label: 'Blocks', type: 'group', items: [
      { type: 'bullet', label: 'Bullet' },
      { type: 'list', label: 'List' }
    ]}
  ]}
]

export default class RichTextEditor extends Component {
  static displayName () {
    return 'RichTextEditor'
  }

  static get propTypes () {
    return {
      val: PropTypes.string,
      onChange: PropTypes.func
    }
  }

  constructor (props) {
    super(props)
    this.onTextChange = this.onTextChange.bind(this)
  }

  onTextChange (val) {
    if (this.props.onChange && this.props.onChange instanceof Function) {
      this.props.onChange(val)
    }
  }

  render () {
    return (
      <div className='RichTextEditor'>
        <ReactQuill
          defaultValue={ this.props.val }
          value={ this.props.val }
          theme='snow'
          onChange={ this.onTextChange }
          toolbar={ customToolbar }
        />
      </div>
    )
  }
}
