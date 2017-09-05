import React, { Component, PropTypes, Children } from 'react'

export default class DropdownButton extends Component {
  static get displayName () {
    return 'Shared/UIComponents/DropdownButton'
  }

  static get defaultProps () {
    return {
      type: 'default',
      hasCaret: false
    }
  }

  static get propTypes () {
    return {
      children: PropTypes.node,
      hasCaret: PropTypes.bool,
      label: PropTypes.string,
      type: PropTypes.string
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      isVisible: false
    }

    this.show = this.show.bind(this)
    this.hide = this.hide.bind(this)
  }

  show () {
    this.setState({ isVisible: true })
    document.addEventListener('click', this.hide)
  }

  hide () {
    this.setState({ isVisible: false })
    document.removeEventListener('click', this.hide)
  }

  render () {
    const caretSize = 10

    const buttonStyles = {
      outline: 'none',
      border: 'none',
      backgroundColor: 'rgba(255,255,255,0)',
      boxShadow: 'none',
      marginRight: caretSize / 2
    }

    const ulStyles = {
      backgroundClip: 'padding-box',
      backgroundColor: '#fff',
      border: '1px solid #ccc',
      borderRadius: 4,
      fontSize: 14,
      listStyleType: 'none',
      margin: 0,
      minWidth: '160px',
      padding: '15px 18px',
      textAlign: 'left'
    }

    const caretBox = {
      display: (this.state.isVisible) ? 'inherit' : 'none',
      right: 0,
      position: 'absolute',
      top: '100%',
      zIndex: 1000
    }

    const caretStyle = {
      width: caretSize,
      position: 'absolute',
      height: caretSize,
      top: -(caretSize - 2),
      right: caretSize * 1.5
    }

    const outerCaretStyle = {
      borderBottom: `${caretSize}px solid #CCC`,
      borderLeft: `${caretSize}px solid transparent`,
      borderRight: `${caretSize}px solid transparent`,
      height: 0,
      width: 0
    }

    const innerCaretStyle = {
      borderBottom: `${caretSize - 1}px solid #FFF`,
      borderLeft: `${caretSize - 1}px solid transparent`,
      borderRight: `${caretSize - 1}px solid transparent`,
      height: 0,
      left: 1,
      top: 1,
      position: 'absolute',
      width: 0
    }

    const dropdownCaret = {
      display: 'inline-block',
      width: 0,
      height: 0,
      marginLeft: 2,
      verticalAlign: 'middle',
      borderTop: '4px solid',
      borderRight: '4px solid transparent',
      borderLeft: '4px solid transparent'
    }

    return (
      <div className='dropdown'>
        <button style={buttonStyles} type='button' onClick={this.show} role='button'>
          {this.props.label}
          {this.props.hasCaret && <span style={dropdownCaret}></span>}
        </button>
        <div style={caretBox}>
          <div style={caretStyle}>
            <div style={outerCaretStyle} />
            <div style={innerCaretStyle} />
          </div>
          <ul style={ulStyles}>
            {Children.map(this.props.children, (child, i) => {
              return (<li style={{ lineHeight: 1.5 }} key={i}>{child}</li>)
            })}
          </ul>
        </div>
      </div>
    )
  }
}
