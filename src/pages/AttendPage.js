import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import objectAssign from 'object-assign'

import { updateModal } from '../actions/appActions'
import { changeBilling, getBilling } from '../actions/authActions'
import { getEvent, attendEvent, createPost } from '../actions/eventActions'
import { ContributionForm, GuestsTable, NewGuestForm, PaymentForm, PaymentSelect } from '../components/Attend'
import format from '../utils/format'

export default class AttendPage extends Component {
  static get displayName () {
    return 'AttendPage'
  }

  static propTypes () {
    return {
      params: PropTypes.object,
      dispatch: PropTypes.func.isRequired,
      event: PropTypes.object,
      hasPaymentInfo: PropTypes.bool,
      paymentMethods: PropTypes.array
    }
  }

  /* Event and payment methods aren't guaranteed to be there on constructor execution */
  constructor (props) {
    super(props)
    let selectedPaymentIndex = props.paymentMethods ? props.paymentMethods.findIndex((p) => p.default) : 0
    // Just in case default wasn't found (or payment methods)
    if (selectedPaymentIndex === -1) {
      selectedPaymentIndex = 0
    }
    this.state = {
      guests: [],
      guestsCost: 0,
      selectedPaymentIndex,
      submitting: false,
      paymentFormDisplayed: false,
      totalPrice: props.event ? props.event.helpers.totalCostPerPerson : 0
    }
    this.contribution = props.event && props.event.helpers.userSetPrice
      ? parseFloat(props.event.helpers.costPerPerson)
      : 0
    this.note = ''
    this.isNotePostChecked = false

    // styling
    this.buttonStyle = {
      color: '#fff',
      backgroundColor: '#7ED321',
      padding: '0.5em'
    }
    this.sectionStyle = {
      margin: '30px 10px',
      maxWidth: 600,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
      // textAlign: center
    }
    this.h2Style = {
      color: '#555',
      fontSize: '1.25em',
      textAlign: 'center',
      textTransform: 'uppercase'
    }

    this.addNewGuest = this.addNewGuest.bind(this)
    this.confirm = this.confirm.bind(this)
    this.cancel = this.cancel.bind(this)
    this.deleteGuest = this.deleteGuest.bind(this)
    this.handlePaymentOptionChange = this.handlePaymentOptionChange.bind(this)
    this.saveContribution = this.saveContribution.bind(this)
    this.saveNote = this.saveNote.bind(this)
    this.saveNoteCheckboxStatus = this.saveNoteCheckboxStatus.bind(this)
    this.savePaymentInfo = this.savePaymentInfo.bind(this)
    this.togglePaymentForm = this.togglePaymentForm.bind(this)
    this.renderPaymentOptions = this.renderPaymentOptions.bind(this)
  }

  componentWillMount () {
    // Maybe only do this if event doesn't exist in state already
    // Unless we can't guarantee that the event that's in state is up to date
    if (this.props.params && this.props.params.eventId) {
      this.props.dispatch(getEvent(this.props.params.eventId))
    }

    // Same as above
    if (this.props.hasPaymentInfo) {
      this.props.dispatch(getBilling())
    }
  }

  componentWillReceiveProps (props) {
    const { event, paymentMethods } = props

    if (event && this.props.event !== event) {
      this.setState({ totalPrice: event.helpers.totalCostPerPerson })
    }

    if (paymentMethods && this.props.paymentMethods !== paymentMethods) {
      // If a payment method was just added then select it
      let selectedPaymentIndex =
        this.props.paymentMethods && this.props.paymentMethods.length === paymentMethods.length - 1
          ? paymentMethods.length - 1
          : paymentMethods.findIndex((p) => p.default)
      // default was not found
      if (selectedPaymentIndex === -1) {
        selectedPaymentIndex = 0
      }
      this.setState({ selectedPaymentIndex })
    }
  }

  /* Adds a new user
  * 1) Shows modal to add a new guest
  * 2) Sets a default cost if modal didn't return one
  * 3) Update total guests cost
  */
  addNewGuest () {
    const saveGuest = (guest) => {
      if (!guest.cost) {
        guest.cost = this.props.event.helpers.userSetPrice
          ? 0
          : this.props.event.helpers.totalCostPerPerson
      }
      this.setState({
        guests: [...this.state.guests, guest],
        guestsCost: this.state.guestsCost + guest.cost
      })
    }

    this.props.dispatch(updateModal({
      title: 'Invite a new guest!',
      children: <NewGuestForm onSave={saveGuest} />
    }))
  }

  /* Confirm attendance */
  confirm () {
    const { event, dispatch, paymentMethods } = this.props
    this.setState({ submitting: true })

    const paymentMethodId = paymentMethods[this.state.selectedPaymentIndex].id

    // Remove this and getGuestsCost function if everything is ok
    if (this.state.guestsCost !== this.getGuestsCost()) {
      console.error('Guests costs are off in the AttendPage')
    }

    dispatch(attendEvent(event.slug, paymentMethodId, this.contribution, this.note, this.state.guests))

    if (this.isNotePostChecked) {
      dispatch(createPost({eventId: event.id, body: this.note}))
    }
  }

  /* Cancel attendance */
  cancel () {
    this.props.dispatch(push(`/events/${this.props.event.slug}`))
  }

  /* Delete a guest and adjust guest cost */
  deleteGuest (i) {
    const guestsCost = this.state.guestsCost - this.state.guests[i].cost
    const guests = this.state.guests.length !== 1
      ? this.state.guests.slice(0, i).concat(this.state.guests.slice(i + 1))
      : []
    this.setState({
      guests,
      guestsCost
    })
  }

  /* Only used to make sure adding/deleting guests correctly adjusts cost */
  getGuestsCost () {
    return this.state.guests.length > 0
      ? this.state.guests
        .map((guest) => guest.cost)
        .reduce((total, cost) => {
          return total + cost
        })
      : 0
  }

  /* Saves index of selected <option> in paymentMethods */
  handlePaymentOptionChange (e) {
    this.setState({ selectedPaymentIndex: e.target.value })
  }

  /* Callback sent to contribution form to save price changes */
  saveContribution (contribution, totalPrice) {
    this.contribution = contribution
    this.setState({ totalPrice })
  }

  /* Callback to save status of whether or not the checkbox is checked */
  saveNoteCheckboxStatus (isChecked) {
    this.isNotePostChecked = isChecked
  }

  /* Callback sent to contribution form to save note changes */
  saveNote (note) {
    this.note = note
  }

  /* Callback sent to payment form */
  savePaymentInfo (paymentInfo) {
    this.props.dispatch(changeBilling(paymentInfo))
    this.setState({ paymentFormDisplayed: false })
  }

  togglePaymentForm () {
    this.state.paymentFormDisplayed
      ? this.setState({ paymentFormDisplayed: false })
      : this.setState({ paymentFormDisplayed: true })
  }

  render () {
    const { event, hasPaymentInfo, paymentMethods } = this.props
    const { paymentFormDisplayed } = this.state

    if (!event) {
      return <div></div>
    } else if (event.attending) {
      // Needed because the URL is still accessible by someone who is attending the event
      // Alternatively could redirect back to the event page here?
      return <h1 style={{textAlign: 'center'}}>You are already attending this event!</h1>
    }

    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <header>
          <h1 style={{textAlign: 'center', marginBottom: 0}} >{`Let's Go To ${event.name}!`}</h1>
        </header>
        {
          paymentFormDisplayed || !hasPaymentInfo
            ? <PaymentForm
                submit={this.savePaymentInfo}
                onCancel={this.togglePaymentForm}
                hasPaymentInfo={hasPaymentInfo} />
            : <div>
              <section style={this.sectionStyle}>
                <p style={{textAlign: 'center', margin: 0}}>
                  Almost there! Please review the info below and then we're good <i className='fa fa-smile-o'></i>
                </p>
              </section>
              {
                hasPaymentInfo && paymentMethods && paymentMethods.length !== 0
                  ? this.renderPaymentOptions()
                  : null
              }
              {
                this.renderContributionForm()
              }
              {
                this.renderGuestsForm()
              }
              {
                this.renderConfirmation()
              }
            </div>
        }
      </div>
    )
  }

  renderContributionForm () {
    const { event } = this.props
    return (
      <section style={this.sectionStyle}>
        <h2 style={this.h2Style}>Contribution Amount</h2>
        <ContributionForm
          basePrice={event.helpers.costPerPerson}
          priceWithFee={event.helpers.totalCostPerPerson}
          serviceFee={event.helpers.serviceChargePerPerson}
          userSetPrice={event.helpers.userSetPrice}
          checkoutText={event.checkoutText}
          onPriceChange={this.saveContribution}
          onNoteChange={this.saveNote}
          onNotePostCheckboxChange={this.saveNoteCheckboxStatus}/>
      </section>
    )
  }

  renderGuestsForm () {
    const { event } = this.props
    return (
      <section style={this.sectionStyle}>
        <h2 style={this.h2Style}>Guests</h2>
        <p style={{margin: 0, marginBottom: 10, textAlign: 'center'}}>
          Invited guests will be added to the event.
        </p>
        {
          event.userSetPrice || !event.helpers.costPerPerson
            ? null
            : <p style={{margin: 0, marginBottom: 10, textAlign: 'center'}}>
              Since this is a paid event you will have to pay for each your guests.
            </p>
        }
        {
          this.state.guests.length > 0
            ? <div>
              <GuestsTable guests={this.state.guests} onDelete={this.deleteGuest}/>
              {
                this.state.guestsCost > 0
                  ? <p style={{margin: '1em', textAlign: 'center'}}>
                    Additional cost for all guests: {format.currency(this.state.guestsCost)}
                  </p>
                  : null
              }

            </div>
            : null
        }
        <a style={{textAlign: 'center'}} onClick={this.addNewGuest}>Add a new guest</a>
      </section>
    )
  }

  renderPaymentOptions () {
    const { selectedPaymentIndex, submitting } = this.state
    const { paymentMethods } = this.props

    return (
      <section style={this.sectionStyle}>
        <h2 style={this.h2Style}>Credit card</h2>
        <PaymentSelect
          paymentMethods={paymentMethods}
          disabled={submitting}
          onChange={this.handlePaymentOptionChange}
          value={selectedPaymentIndex} />
        <a style={{display: 'block', marginTop: 20}} onClick={this.togglePaymentForm}>
          Add a new card
        </a>
      </section>
    )
  }

  renderConfirmation () {
    return (
      <section style={this.sectionStyle}>
        <h2 style={this.h2Style}>Ready to Join Us?</h2>
        {
          this.state.totalPrice > 0
            ? <p style={{margin: 0, marginBottom: 10}}>You will only be charged if the event kicks.</p>
            : null
        }
        <p style={{margin: 0, textAlign: 'center'}}>
          All credit card processing is handled by Stripe, a secure and reliable third party payment
          system.
        </p>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <button
            style={objectAssign({}, this.buttonStyle, {padding: 15, marginTop: 30, textTransform: 'uppercase'})}
            onClick={ this.confirm }
            disabled={ this.state.submitting || this.state.paymentFormDisplayed }>
            {
              this.state.totalPrice + this.state.guestsCost > 0
                ? `Yes, I agree to contribute ${format.currency(this.state.totalPrice + this.state.guestsCost)}`
                : 'Yes, I\'d like to attend for free!'
            }
          </button>
          <a onClick={ this.cancel } style={{display: 'block', marginTop: 20}}>
            No thanks, I'll just stay home
          </a>
        </div>
      </section>
    )
  }
}

function mapStateToProps (state) {
  const props = {}

  if (state.authStore.hasOwnProperty('user') && state.authStore.user !== null) {
    props.paymentMethods = state.authStore.paymentMethods
    props.hasPaymentInfo = state.authStore.user.payment
  }

  if (state.eventStore.hasOwnProperty('event')) {
    props.event = state.eventStore.event
  }

  return props
}

export default connect(mapStateToProps)(AttendPage)
