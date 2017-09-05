// Possibles create a HOC that can be used to apply vendor prefixes

const BASE_SIZE = 1
const PRIMARY_COLOR = '#39bbff'

export default {
  h1: {
    fontSize: BASE_SIZE * 1.5,
    fontWeight: 300,
    lineHeight: 2
  },
  h2: {
    fontSize: BASE_SIZE * 1.3,
    lineHeight: 1.5
  },
  h3: {
    fontSize: BASE_SIZE * 1.2,
    lineHeight: 2
  },
  h4: {
    fontSize: BASE_SIZE,
    fontWeight: 700,
    textTransform: 'uppercase'
  },
  a: {
    color: PRIMARY_COLOR
  },
  p: {
    fontSize: BASE_SIZE
  },
  ul: {

  },
  ul_noDots: {
    listStyleType: 'none',
    paddingLeft: 0
  },
  li: {

  }
}

// export default addPrefix(BaseStyles)
// function addPrefix (styles) {
  // let js = ''
  // let css = ''

  // We should not do anything if required serverside.
  /* if (typeof document !== 'undefined') {
    let jsCssMap = {
      Webkit: '-webkit-',
      Moz: '-moz-',
      // IE did it wrong again ...
      ms: '-ms-',
      O: '-o-'
    }
    let style = document.createElement('p').style
    let testProp = 'Transform'

    for (let key in jsCssMap) {
      if ((key + testProp) in style) {
        js = key
        css = jsCssMap[key]
        break
      }
    }
  }*/

  /**
   * Vendor prefix string for the current browser.
   *
   * @type {{js: String, css: String}}
   * @api public
   */
  // export default {js, css}

  /* for (const prop in styles) {
    const value = rule.style[prop]

    let changeProp = false
    const supportedProp = vendor.supportedProperty(prop)
    if (supportedProp && supportedProp !== prop) changeProp = true

    let changeValue = false
    const supportedValue = vendor.supportedValue(supportedProp, value)
    if (supportedValue && supportedValue !== value) changeValue = true

    if (changeProp || changeValue) {
      if (changeProp) delete rule.style[prop]
      rule.style[supportedProp] = supportedValue
    }
  }*/
// }
