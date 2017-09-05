import React, { Component, PropTypes } from 'react'
import format from '../../utils/format'

export default class ResourceTypes extends Component {
  static get displayName () {
    return 'ResourceType'
  }

  static propTypes () {
    return {
      resourceType: PropTypes,
      onRemoveResource: PropTypes,
      isOwner: PropTypes
    }
  }

  render () {
    const {resourceType, onRemoveResource, isOwner} = this.props

    return (
      <div key={ resourceType.name }>
      <div className='flex-basis-full purple bold'>{ resourceType.name }</div>
        { resourceType.resources
          // .filter(resource => resource.tierResources.length > 0)
          .map((resource, i) => {
            const currentResource = resource // resource.tierResources[0]

            return (
              <div key={ `${resource.name}-${i}` } className='flex flex-wrap'>
                <div className='flex-start bold'>
                  { isOwner
                    ? <button className='resource-error' onClick={() => onRemoveResource(currentResource.resourceId)}>x</button>
                    : null
                  }
                  { currentResource.name }
                </div>
                <div className='flex-end bold'>
                  {(currentResource.price && currentResource.price !== '0.0')
                    ? format.currency(currentResource.price)
                    : 'FREE!'
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}
