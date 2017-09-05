import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import { GoogleMap, Marker, SearchBox, GoogleMapLoader } from 'react-google-maps'
import location from '../../utils/location'
import API from '../../utils/api'

// Elevate Blue!!!
const fallbackPosition = {
  lat: 39.2494644,
  lng: -119.954313
}

const MAP_HEIGHT = 200
const GOOGLE_TIMEZONE_API = 'https://maps.googleapis.com/maps/api/timezone/json?sensor=false&location='

export default class MapSearch extends Component {
  static displayName () {
    return 'MapSearch'
  }

  static propTypes () {
    return {
      handleChange: PropTypes.func.isRequired,
      handleTimezoneChange: PropTypes.func.isRequired,
      defaultName: PropTypes.string,
      defaultPosition: PropTypes.array,
      defaultAddress: PropTypes.string,
      defaultCity: PropTypes.string,
      defaultState: PropTypes.string,
      defaultCountry: PropTypes.string
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      bounds: null,
      markers: [],
      center: (location && location.coordinates) ? location.coordinates : fallbackPosition
    }

    this.getStatePosition = this.getStatePosition.bind(this)
    this.setMarker = this.setMarker.bind(this)
    this.centerMap = this.centerMap.bind(this)
    this.getLocationTimezone = this.getLocationTimezone.bind(this)
  }

  componentWillMount () {
    const positionState = this.getStatePosition(this.props)

    // If we have a location to set, prevent the geolocation from happening
    if (positionState.markers && positionState.markers.length > 0) {
      this.setState(positionState)
    }
  }

  componentWillReceiveProps (props) {
    const positionState = this.getStatePosition(props)

    // If we have a location coming into the component, set it
    if (positionState.markers && positionState.markers.length > 0) {
      this.setMarker(positionState.markers[0], 'CWRP')
    }

    return props
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.defaultAddress && this.refs.searchBox && this.refs.searchBox.state && this.refs.searchBox.state.inputElement) {
      const searchBox = findDOMNode(this.refs.searchBox.state.inputElement)
      if (searchBox) {
        searchBox.value = prevProps.defaultAddress
      }
    }

    const prevMarkers = prevState.markers
    const nowMarkers = this.state.markers

    if (nowMarkers && nowMarkers.length > 0) {
      if (!prevMarkers || prevMarkers.length === 0 || (prevMarkers[0].address !== nowMarkers[0].address)) {
        this.getLocationTimezone(nowMarkers[0])
      }
    }
  }

  // Used to extract a usable position from component properties
  getStatePosition (props) {
    const state = {}
    const { defaultPosition, defaultName, defaultAddress,
      defaultCity, defaultState, defaultCountry } = props

    if (!defaultPosition || !defaultName || !defaultAddress) {
      return state
    }

    // If a location is provided, use it
    if (defaultPosition[0] !== undefined && defaultPosition[1] !== undefined && defaultName && defaultAddress) {
      const position = { lat: defaultPosition[0], lng: defaultPosition[1] }
      state.center = position
      state.markers = [{
        position,
        title: defaultName,
        address: defaultAddress,
        city: defaultCity,
        state: defaultState,
        country: defaultCountry
      }]
    }

    return state
  }

  centerMap (lat, lng, from) {
    // console.warn(`Center: ${from}`, lat, lng)
    this.setState({
      center: { lat, lng }
    })
  }

  setMarker (marker = {}, from) {
    this.setState({
      markers: [ marker ]
    })

    // console.warn(`Marker: ${from}`, marker)
    this.centerMap(marker.position.lat, marker.position.lng, from)
  }

  getLocationTimezone (marker) {
    if (marker) {
      const { handleTimezoneChange } = this.props
      const latitude = marker.position.lat
      const longitude = marker.position.lng
      const seconds = new Date().getTime() / 1000
      const url = `${GOOGLE_TIMEZONE_API}${latitude},${longitude}&timestamp=${seconds}`

      API.getExactUrl(url).then(
        (timezone) => {
          const locationTimezone = {
            dstOffset: timezone.dstOffset / 60,
            rawOffset: timezone.rawOffset / 60,
            timeZoneId: timezone.timeZoneId,
            timeZoneName: timezone.timeZoneName
          }

          handleTimezoneChange(locationTimezone)
        },
        (error) => {
          console.log(error)
        }
      )
    }
  }

  handleBoundsChanged () {
    const bounds = this.refs.map.getBounds()
    const { defaultPosition } = this.props

    this.setState({ bounds })

    if (defaultPosition && defaultPosition.length > 0) {
      this.centerMap(defaultPosition[0], defaultPosition[1], 'handleBoundsChanged')
    } else {
      const center = this.refs.map.getCenter()
      this.centerMap(center.lat(), center.lng(), 'handleBoundsChanged')
    }
  }

  handlePlacesChanged () {
    const { handleChange } = this.props
    const places = this.refs.searchBox.getPlaces()
    const place = places[0]
    const cityStateCountry = parseCityStateCountry(place)
    const newMarker = {
      position: {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      },
      title: place.name,
      address: place.formatted_address,
      city: cityStateCountry['city'],
      state: cityStateCountry['state'],
      country: cityStateCountry['country']
    }

    this.setMarker(newMarker, 'handlePlacesChanged')

    if (handleChange instanceof Function && places.length > 0) {
      handleChange(newMarker)
    }
  }

  render () {
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapLoader
          hostname={'maps.googleapis.com'}
          pathname={'/maps/api/js'}
          query={{
            key: 'AIzaSyBCfiFHdbE6wZKKjdAP2o88DCiYZsifpsg',
            libraries: 'places'
          }}
          loadingElement={<div style={{height: '100%', width: '100%'}}>Loading</div>}
          containerElement={<div {...this.props} style={{ height: MAP_HEIGHT }} />}
          googleMapElement={this.renderMap()}
        />
    </div>
    )
  }

  renderMap () {
    return (
      <GoogleMap
        center={ this.state.center }
        containerProps={{ ...this.props, style: { height: MAP_HEIGHT } }}
        defaultZoom={ 15 }
        onBoundsChanged={ this.handleBoundsChanged.bind(this) }
        ref='map'>

        { this.renderSearchBox() }

        {this.state.markers.map((marker, i) => (
          <Marker position={marker.position} key={i} />
        ))}
      </GoogleMap>
    )
  }

  renderSearchBox () {
    const inputStyle = {
      'border': '1px solid transparent',
      'borderRadius': '1px',
      'boxShadow': '0 2px 6px rgba(0, 0, 0, 0.3)',
      'boxSizing': 'border-box',
      'MozBoxSizing': 'border-box',
      'fontSize': '14px',
      'height': '32px',
      'maxWidth': '400px',
      'marginTop': '27px',
      'outline': 'none',
      'padding': '0 12px',
      'textOverflow': 'ellipses'
    }

    return (
      <SearchBox
        bounds={ this.state.bounds }
        controlPosition={ window.google.maps.ControlPosition.TOP_LEFT }
        onPlacesChanged={ this.handlePlacesChanged.bind(this) }
        ref='searchBox'
        className='mapsearch-box'
        placeholder='Choose your location'
        style={ inputStyle } />
    )
  }
}

function parseCityStateCountry (place) {
  if (!place || !place.address_components) {
    return {}
  }

  const mappedTypesToLongName = mapTypesToLongName(place.address_components)

  return {
    country: mappedTypesToLongName['country'],
    state: mappedTypesToLongName['administrative_area_level_1'],
    city: mappedTypesToLongName['locality']
  }
}

function mapTypesToLongName (address_components) {
  const mapped = {}

  for (let index = 0; index < address_components.length; index++) {
    let component = address_components[index]

    if (component.types && component.types.length > 0) {
      mapped[component.types[0]] = component.long_name
    }
  }

  return mapped
}
