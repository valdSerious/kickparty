import Accessor from './Accessor'

const location = {
  _store: new Accessor(),
  init () {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        this.coordinates = `${latitude},${longitude}`
      })
    }
  },
  set coordinates (coords) {
    if (coords) {
      location._store.set('COORDS', coords)
    }
  },
  get coordinates () {
    const coordString = location._store.get('COORDS')

    if (coordString && coordString.length > 0) {
      const coordArray = coordString.split(',')
      return {
        lat: parseFloat(coordArray[0]),
        lng: parseFloat(coordArray[1])
      }
    }

    return null
  },
  deleteCoordinates () {
    location._store.remove('COORDS')
    return true
  }
}

export default location
