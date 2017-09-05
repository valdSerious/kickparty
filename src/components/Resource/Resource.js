import React, { Component, PropTypes } from 'react'
import sortBy from 'lodash/sortBy'

import NewResource from './NewResource'
import ResourceBlock from './ResourceBlock'
import format from '../../utils/format'

const OPEN = 'OPEN'
const CLOSED = 'CLOSED'

export default class Resource extends Component {
  static get displayName () {
    return 'Resource'
  }

  static get propTypes () {
    return {
      activeResources: PropTypes.array,
      onchange: PropTypes.func.isRequired,
      removeResource: PropTypes.func,
      resourceType: PropTypes.object.isRequired
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      viewState: CLOSED,
      addedResources: [], // Resources that will be associated to an event
      totalPrice: 0,
      publicResources: [] // Stored resources come from parse
    }

    // console.info('RES', props)

    this.addUserCreatedResource = this.addUserCreatedResource.bind(this)
    this.addPublicResource = this.addPublicResource.bind(this)
    this.addToPublicAvailableList = this.addToPublicAvailableList.bind(this)
    this.getTotalCost = this.getTotalCost.bind(this)
    this.removeFromEvent = this.removeFromEvent.bind(this)
    this.removeFromPublicList = this.removeFromPublicList.bind(this)
    this.renderResourceInterface = this.renderResourceInterface.bind(this)
    this.toggleView = this.toggleView.bind(this)
    this.updateResourceState = this.updateResourceState.bind(this)
  }

  componentDidMount () {
    const { activeResources } = this.props
    if (activeResources && activeResources.length > 0) {
      this.updateResourceState(activeResources)
    }
  }

  componentWillMount () {
    /*
    // I dont think we need this anymore
    // Resource types models are now statically baked into the app
    const { resourceType } = this.props

    if (!resourceType || !resourceType.id) {
      return
    }

    const self = this
    API.get(`/resources?resource_type_id=${resourceType.id}`).then(
      (resources) => {
        const resourceModels = []
        console.info('Resources', resources)
        resources.forEach((resource) => {
          resourceModels.push(new ResourceTypeModel(resource))
        })

        self.setState({
          publicResources: resources
        })
      },
      (error) => {
        console.error('Resource Error', error)
      }
    )
    */
  }

  updateResourceState (addedResources) {
    const totalPrice = this.getTotalCost(addedResources)

    this.setState({ addedResources, totalPrice })

    const resourceTypeId = this.props.resourceType.id

    addedResources.forEach((resource) => {
      resource.resourceTypeId = resourceTypeId

      // Private resources get assigned null as their ID
      if (!resource.id) {
        resource.id = null
      }

      // Set resource name to anon. if it wasn't specified, fixes the form page breaking for now
      if (!resource.name) {
        resource.name = 'Anonymous'
      }
    })

    this.props.onchange([resourceTypeId, addedResources], totalPrice)
  }

  // Opens and closes a resource type form
  toggleView () {
    if (this.state.viewState === CLOSED) {
      this.setState({
        viewState: OPEN
      })
    } else if (this.state.viewState === OPEN) {
      this.setState({
        viewState: CLOSED
      })
    }
  }

  //
  getTotalCost (addedResources) {
    let priceSum = 0

    for (let i = 0, j = addedResources.length; i < j; i++) {
      const price = format.tryParseFloat(addedResources[i].price)
      priceSum += price
    }

    return priceSum
  }

  // CB: User created resources
  addUserCreatedResource (resource) {
    const newResource = {
      'name': resource.name,
      'description': resource.description,
      'price': format.tryParseFloat(resource.price),
      'private': true
    }

    const addedResources = this.state.addedResources.concat([newResource])
    this.updateResourceState(addedResources)
  }

  // CB: Adds a resource into the events resource list
  addPublicResource (resource) {
    this.removeFromPublicList(resource)
    const addedResources = this.state.addedResources.concat([resource])
    this.updateResourceState(addedResources)
  }

  // Removes a resource from the public type resources
  removeFromPublicList (resource) {
    const publicResources = this.state.publicResources.filter((publicResource) => {
      return (publicResource.id !== resource.id)
    })

    this.setState({ publicResources })
  }

  // removes a resource that has been added to the event
  removeFromEvent (resource) {
    const isPrivate = resource.private

    const addedResources = this.state.addedResources.filter((addedResource) => {
      return (addedResource.id !== resource.id)
    })

    // If it is a public event it needs to be placed back into the
    // the list of public available resources
    if (!isPrivate) {
      this.addToPublicAvailableList(resource)
    }

    // Invoke the CB if it was provided
    if (this.props.removeResource && this.props.removeResource instanceof Function) {
      this.props.removeResource(resource)
    }

    this.updateResourceState(addedResources)
  }

  // Pushes a public resource back into the public list once removed
  addToPublicAvailableList (resource) {
    const temp = this.state.publicResources.concat([resource])
    const publicResources = sortBy(temp, function (rsc) {
      return rsc.name
    })

    this.setState({ publicResources })
  }

  getHeadingText (name, totalPrice) {
    const { addedResources } = this.state
    let headingText = name

    if (addedResources && addedResources.length > 0) {
      if (addedResources.length > 1) {
        headingText += 's'
      }

      if (totalPrice > 0) {
        headingText += ` ${format.currency(totalPrice)}`
      } else if (totalPrice === 0) {
        headingText += ' FREE'
      }
    }

    return headingText
  }

  render () {
    const name = this.props.resourceType.name
    const { addedResources, publicResources } = this.state

    return (
      <div className='event-resourceType'>
        <header className='header' onClick={ this.toggleView }>
          <div className='btn-viewAction'>
            <a>
              { (this.state.viewState === OPEN) ? '-' : null }
              { (this.state.viewState === CLOSED) ? '+' : null }
            </a>
          </div>
          <h4 className='resource-title'>{this.getHeadingText(name, this.state.totalPrice)}</h4>
        </header>

        { (this.state.viewState === OPEN) ? this.renderResourceInterface(addedResources, publicResources) : null }
      </div>
    )
  }

  renderResourceInterface (addedResources, publicResources) {
    const eventTypeName = this.props.resourceType.name

    const resourceList = addedResources.map((addedResource, i) => {
      return (
        <li key={ i }>
          <ResourceBlock resource={ addedResource } cb={ this.removeFromEvent } isRemovable={ 'true' } />
        </li>
      )
    })

    return (
      <div>
        <h5>Your { `${eventTypeName}(s)` }</h5>
        <ul className='added-resource'>
          { resourceList }
        </ul>

        <hr />

        <h5>Add New { `${eventTypeName}` }</h5>
        <NewResource cb={ this.addUserCreatedResource } />

        { (publicResources && publicResources.length > 0)
          ? <div>
            <hr />

            <h5>Use Public { `${eventTypeName}(s)` }</h5>

            <ul className='public-resources'>
              { publicResources.map((publicResource, i) => {
                return (
                  <li key={ i }>
                    <ResourceBlock resource={ publicResource } cb={ this.addPublicResource } />
                  </li>
                )
              }) }
            </ul>
          </div>
          : null
        }
      </div>
    )
  }
}
