import ResourceTypeModel from './ResourceTypeModel'
import format from '../utils/format'

export default class TierModel {
  constructor (props) {
    this._resourceTypes = []

    // db tiers
    this.baseCost = format.tryParseFloat(props.baseCost)
    this.calculationMethod = format.tryParseInt(props.calculationMethod)
    this.contribution = format.tryParseFloat(props.contribution)
    this.contributionNote = format.tryParseString(props.contributionNote)
    this.costPerAttendee = format.tryParseFloat(props.costPerAttendee)
    this.description = format.tryParseString(props.description)
    this.eventId = format.tryParseInt(props.eventId)
    this.id = format.tryParseInt(props.id)
    this.kicked = format.tryParseBool(props.kicked)
    this.maxAttendeeCount = format.tryParseInt(props.maxAttendeeCount)
    this.minAttendeeCount = format.tryParseInt(props.minAttendeeCount)
    this.profileImg = format.tryParseString(props.profileImg)
    this.userSetPrice = format.tryParseBool(props.userSetPrice)

    if (props.hasOwnProperty('resourceTypes')) {
      props.resourceTypes.forEach((type) => {
        this._resourceTypes.push(
          new ResourceTypeModel(type)
        )
      })
    }

    // Attached Properties from the API
    this.baseCostPerAttendee = format.tryParseFloat(props.baseCostPerAttendee)
    this.serviceChargePerAttendee = format.tryParseFloat(props.serviceChargePerAttendee)
    this.tierId = format.tryParseInt(props.tierId)
    this.tierTotalCost = format.tryParseFloat(props.tierTotalCost)
    this.tierTotalResources = format.tryParseFloat(props.tierTotalResources)
    this.totalCostPerAttendee = format.tryParseFloat(props.totalCostPerAttendee)

    // console.info('api TierModel', props)
    // console.info('TierModel', this)
  }

  get resourceTypes () {
    return this._resourceTypes
  }
}
