import format from '../utils/format'

export default class ResourceModel {
  constructor (props) {
    this.description = format.tryParseString(props.description)
    this.id = format.tryParseInt(props.id)
    this.name = format.tryParseString(props.name)
    this.price = format.tryParseFloat(props.price)
    this.private = format.tryParseBool(props.private)
    this.resourceId = format.tryParseInt(props.resourceId)
    this.resourceTypeId = format.tryParseInt(props.resourceTypeId)
    this.tierResourceId = format.tryParseInt(props.tierResourceId)

    // console.info('API Resource', props)
    // console.info('ResourceModel', this)
  }
}
