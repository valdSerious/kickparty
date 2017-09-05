// AttributeService

export default {
  getAttrs (attrsObj) {
    const attrs = {}

    if (attrsObj.isDisabled) {
      attrs.disabled = 'disabled'
    }

    if (attrsObj.placeholder) {
      attrs.placeholder = attrsObj.placeholder
    }

    if (attrsObj.isRequired) {
      attrs.required = 'required'
    }

    if (attrsObj.isReadonly) {
      attrs.readOnly = 'readonly'
    }

    return attrs
  }
}
