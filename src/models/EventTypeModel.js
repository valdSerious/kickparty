import format from '../utils/format'

export default class EventTypeModel {
  constructor (props, id) {
    this.name = format.tryParseString(props.name)
    this.id = format.tryParseInt(props.id)
  }
}
