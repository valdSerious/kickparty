import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'

import Resource from '../Resource'
import format from '../../utils/format'
import { updateResources, setAttendeeCost, updatePricing, setCalculationMethod } from '../../actions/eventFormAction'
import { FLAT_RATE, AUTO_CALCULATE } from '../../constants/AppConstants'

const temp = {}

class AddResources extends Component {
  static displayName () {
    return 'EventForm/AddResources'
  }

  static get propTypes () {
    return {
      activeResources: PropTypes.object,
      baseCost: PropTypes.number,
      calculationMethod: PropTypes.number,
      costPerPerson: PropTypes.number,
      dispatch: PropTypes.func,
      fields: PropTypes.object.isRequired,
      handleSubmit: PropTypes.func.isRequired,
      minAttendeeCount: PropTypes.number.isRequired,
      onCancel: PropTypes.func,
      removeResource: PropTypes.func, // THIS FUNCTION GETS PASSED TRHOUGH THIS CLASS
      resetForm: PropTypes.func.isRequired,
      resourceTypes: PropTypes.array.isRequired,
      submitting: PropTypes.bool.isRequired
    }
  }

  static get defaultProps () {
    return {
      activeResources: {}
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      resourcesCost: {},
      resources: []
    }

    this.getResourceCosts = this.getResourceCosts.bind(this)
    this.onBaseCostChange = this.onBaseCostChange.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onChangeAttendeeCost = this.onChangeAttendeeCost.bind(this)
    this.onChangeCalcMethod = this.onChangeCalcMethod.bind(this)
    this.onResourceChange = this.onResourceChange.bind(this)
    this.renderPricing = this.renderPricing.bind(this)
    this.setAttendeeCost = this.setAttendeeCost.bind(this)
    this.setBaseCost = this.setBaseCost.bind(this)
    this.setCalculationMethod = this.setCalculationMethod.bind(this)
  }

  componentDidMount () {
    // Calculate resource costs based on passed in resources when editing
    const { baseCost, costPerPerson, calculationMethod } = this.props

    if (calculationMethod === FLAT_RATE) {
      this.setCalculationMethod(calculationMethod)
    } else {
      this.setCalculationMethod(AUTO_CALCULATE)
    }

    this.setBaseCost(baseCost)
    this.setAttendeeCost(costPerPerson)
  }

  getResourceCosts () {
    let cost = 0

    for (var typeCost in temp) {
      cost += temp[typeCost]
    }

    return cost
  }

  setBaseCost (cost) {
    const {fields} = this.props

    const priceParams = {
      baseCost: cost,
      resourceCost: this.getResourceCosts()
    }

    if (fields.calculationMethod.value === AUTO_CALCULATE) {
      priceParams.attendeeCount = this.props.minAttendeeCount
    }

    this.props.dispatch(updatePricing(priceParams))
  }

  setAttendeeCost (cost) {
    this.props.dispatch(setAttendeeCost(cost))
  }

  setCalculationMethod (calculationMethod) {
    const {fields} = this.props

    this.props.dispatch(setCalculationMethod(calculationMethod))

    if (calculationMethod === AUTO_CALCULATE) {
      this.props.dispatch(updatePricing({
        resourceCost: this.getResourceCosts(),
        baseCost: fields.baseCost.value,
        attendeeCount: this.props.minAttendeeCount
      }))
    } else if (calculationMethod === FLAT_RATE) {
      this.setAttendeeCost(0)
    }
  }

  onChangeCalcMethod (se) {
    this.setCalculationMethod(~~se.target.value)
  }

  onCancel () {
    const { onCancel, resetForm } = this.props

    if (onCancel && onCancel instanceof Function) {
      onCancel()
    }

    resetForm()
  }

  onResourceChange (resources, cost) {
    const {fields} = this.props
    temp[resources[0]] = cost
    this.props.dispatch(updateResources(resources))

    const priceParams = {
      resourceCost: this.getResourceCosts(),
      baseCost: fields.baseCost.value
    }

    if (fields.calculationMethod.value === AUTO_CALCULATE) {
      priceParams.attendeeCount = this.props.minAttendeeCount
    }

    this.props.dispatch(updatePricing(priceParams))
  }

  onBaseCostChange (se) {
    this.setBaseCost(parseFloat(se.target.value))
  }

  onChangeAttendeeCost (se) {
    if (se.target.name === 'price') {
      this.setAttendeeCost(se.target.value.replace(/[^\d.]/gi, ''))
    } else {
      this.setAttendeeCost(se.target.value)
    }
  }

  render () {
    const { resourceTypes, activeResources } = this.props
    if (!resourceTypes) {
      return <div />
    }

    const { handleSubmit, fields, submitting } = this.props
    const { baseCost, attendeeCost, totalCost } = fields

    return (
      <form onSubmit={ handleSubmit } className='form-newEvent'>
        <section className='form-section'>
          <div className='form-component'>
            <h2>
              Total Cost <span className='text text-light'>{ format.currency(totalCost.value) }</span> /
              Cost Per Person <span className='text text-light'>{ (attendeeCost) ? format.currency(attendeeCost.value) : null }</span>
            </h2>
            <label>Set a base cost for the event</label>
            <input type='number' value={ baseCost.value } onChange={ this.onBaseCostChange } />
          </div>

          <div className='form-component'>
            { this.renderPricing() }
          </div>

          <div className='event-resourceTypes'>
            <h2>Select what to include: </h2>

            <ul>
              { resourceTypes.map((type, i) => {
                return (
                  <li key={ i }>
                    <Resource
                      resourceType={ type }
                      activeResources={activeResources[type.id]}
                      onchange={ this.onResourceChange }
                      removeResource={this.props.removeResource}
                    />
                  </li>
                )
              }) }
            </ul>
          </div>

          <footer className='event-form__footer'>
            <button type='button' className='btn-prev' onClick={ this.onCancel } disabled={ submitting }>Cancel</button>
            <button type='submit' className='btn-next' disabled={ submitting }>Save</button>
          </footer>
        </section>
      </form>
    )
  }

  renderPricing () {
    const { calculationMethod, attendeeCost } = this.props.fields

    return (
      <div className='input-pricingModel'>
        <h3>How would you like to calculate your cost per attendee</h3>
        <label>
          <input type='radio' onChange={this.onChangeCalcMethod} value={AUTO_CALCULATE} checked={calculationMethod.value === AUTO_CALCULATE} /> Auto calculate as you add resources
        </label><br />
        <label>
          <input type='radio' onChange={this.onChangeCalcMethod} value={FLAT_RATE} checked={calculationMethod.value === FLAT_RATE} /> Set a flat price per person
        </label>
        { (calculationMethod && calculationMethod.value === FLAT_RATE)
          ? <div>
            <input type='text' name='price' placeholder='How much per person? ($)' onChange={this.onChangeAttendeeCost} value={attendeeCost.value} />
          </div>
          : null
        }
      </div>
    )
  }
}

const fields = ['totalCost', 'baseCost', 'resources', 'calculationMethod', 'attendeeCost', 'totalCost']

const validate = () => {
  const errors = {}
  return errors
}

export default reduxForm({
  form: 'eventResources',
  fields,
  destroyOnUnmount: true,
  validate
})(AddResources)
