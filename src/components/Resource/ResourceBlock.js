import React, { Component, PropTypes } from 'react'
import format from '../../utils/format'

export default class ResourceBlock extends Component {
  static get displayName () {
    return 'Resource/ResourceBlock'
  }

  static propTypes () {
    return {
      resource: PropTypes.object.isRequired,
      cb: PropTypes.function.isRequired,
      isRemovable: PropTypes.bool
    }
  }

  constructor (props) {
    super(props)
    this.state = {}
    this.onClick = this.onClick.bind(this)
  }

  onClick () {
    this.props.cb(this.props.resource)
  }

  render () {
    const { resource } = this.props
    const initials = resource.name.slice(0, 2)

    return (
      <div className='resource-block flex-container'>
        <div className='resource-image'>
          <div className='initials'>{ initials }</div>
        </div>
        <div className='resource-meta'>
          <h4>
            <span className='pull-right'>{ (resource.price > 0) ? format.currency(resource.price) : 'FREE' }</span>
            { resource.name }
            <a onClick={ this.onClick }>
              { (this.props.isRemovable) ? ' Remove' : ' Add' }
            </a>
          </h4>
          <p>{ resource.description }</p>
        </div>
      </div>
    )
  }
}
