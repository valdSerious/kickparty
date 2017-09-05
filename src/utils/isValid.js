const isValid = {
  email (val) {
    return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)
  },
  phone (val) {
    return !/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/.test(val)
  },
  time (val) {
    return !/([01]\d|2[0-3]):([0-5]\d)\s?(am|pm|AM|PM)?/.test(val)
  }
}

export default isValid
