import format from '../utils/format'
import ResourceModel from './ResourceModel'

export default class ResourceTypeModel {
  constructor (props) {
    this._resources = []

    // db entity
    this.id = format.tryParseInt(props.id)
    this.name = format.tryParseString(props.name)

    // json returned
    if (props.hasOwnProperty('resources')) {
      props.resources.forEach((resource) => {
        this._resources.push(new ResourceModel(resource))
      })
    }

    // console.info('api ResourceType', props)
    // console.info('ResourceTypeModel', this)
  }

  get resources () {
    return this._resources
  }
}
