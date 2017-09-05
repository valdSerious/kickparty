import format from '../utils/format'
import helpers from '../utils/helpers'
import UserModel from './UserModel'
import TierModel from './TierModel'

export default class EventModel {
  constructor (props) {
    const deadline = helpers.unmergeDateTime(props.deadline)
    const start = helpers.unmergeDateTime(props.start)
    const end = helpers.unmergeDateTime(props.end)

    this._attendees = []
    this._tiers = []

    this.id = props.id

    this.attendees = this._setAttendees(props.attendees)

    this.attending = format.tryParseBool(props.attending)
    this.committedCount = format.tryParseInt(props.committedCount)
    this.contactEmail = format.tryParseString(props.contactEmail)
    this.contactPhone = format.tryParseString(props.contactPhone)
    this.deadline = deadline['date']
    this.description = format.tryParseString(props.description)
    this.endDate = end['date']
    this.endTime = end['time']
    this.eventType = format.tryParseString(props.eventType)
    this.eventTypeId = props.eventTypeId + ''
    this.headerImage = format.tryParseString(props.headerImg)
    this.key = format.tryParseString(props.key)
    this.locationAddress = format.tryParseString(props.locationAddress)
    this.locationLat = format.tryParseFloat(props.locationLat)
    this.locationLng = format.tryParseFloat(props.locationLng)
    this.locationName = format.tryParseString(props.locationName)
    this.locationCity = props.locationCity // Allow null
    this.locationState = props.locationState // Allow null
    this.locationCountry = props.locationCountry // Allow null
    this.maybeCount = format.tryParseInt(props.maybeCount)
    this.me = format.tryParseBool(props.me)
    this.name = format.tryParseString(props.name)
    this.profileImg = format.tryParseString(props.profileImg)
    this.slug = format.tryParseString(props.slug)
    this.checkoutText = format.tryParseString(props.checkoutText)
    this.startDate = start['date']
    this.startDateTime = props.start
    this.startTime = start['time']
    this.status = `${props.status}`
    this.tiers = this._setTiers(props.tiers)
    this.timezoneName = format.tryParseString(props.timezoneName)
    this.timezoneOffset = props.timezoneOffset
    this.totalCount = format.tryParseInt(props.totalCount)

    if (props.user) {
      this.user = new UserModel(props.user)
    }

    this.hosts = this._setHosts(props.hosts)
    this.host = format.tryParseBool(props.host)
    this.shortUrlLink = format.tryParseString(props.shortUrlLink)
    this.kickBy = format.tryParseInt(props.kickBy)
    this.showResources = format.tryParseBool(props.showResources)
    this.showDollars = format.tryParseBool(props.showDollars)

    this.initHelpers(this.tiers)

    // console.info('api props', props)
    // console.info('event model', this)
  }

  // Creates a user model for each attendee
  _setAttendees (attendees) {
    const temp = []

    if (attendees) {
      attendees.forEach((attentee) => {
        temp.push(new UserModel(attentee))
      })
    }

    this.attendeeCount = temp.length
    return temp
  }

  // Creates a user model for each host
  _setHosts (hosts) {
    const temp = []

    if (hosts) {
      hosts.forEach((host) => {
        temp.push(new UserModel(host))
      })
    }

    this.hostCount = temp.length
    return temp
  }

  // Creates a tier model for each tier
  _setTiers (tiers) {
    const temp = []

    if (tiers) {
      tiers.forEach((tier) => {
        temp.push(new TierModel(tier))
      })
    }

    return temp
  }

  initHelpers () {
    this.helpers = {
      resources: {}
    }

    this._calcTierProps(this.tiers)
  }

  _calcTierProps (tiers) {
    tiers.forEach((tier) => {
      this.helpers.tierTotal = tier.tierTotalCost
      this.helpers.tierTotalResources = tier.tierTotalResources
      this.helpers.hostContribution = tier.contribution
      this.helpers.baseCost = tier.baseCost
      this.helpers.calculationMethod = tier.calculationMethod
      this.helpers.costPerPerson = tier.baseCostPerAttendee
      this.helpers.serviceChargePerPerson = tier.serviceChargePerAttendee
      this.helpers.totalCostPerPerson = tier.totalCostPerAttendee
      this.helpers.minAttendeeCount = tier.minAttendeeCount
      this.helpers.maxAttendeeCount = tier.maxAttendeeCount
      this.helpers.userSetPrice = tier.userSetPrice

      this._extractResourcesTypes(tier.resourceTypes)
    })
  }

  // pulls the resources to a helper object so we do not have to
  // loop over the event properties every time we need them
  _extractResourcesTypes (resourceTypes) {
    resourceTypes.forEach((resourceType) => {
      resourceType.resources.forEach((resource) => {
        const typeId = resource.resourceTypeId

        if (!this.helpers.resources[typeId]) {
          this.helpers.resources[typeId] = []
        }

        this.helpers.resources[typeId].push(resource)
      })
    })
  }
}
