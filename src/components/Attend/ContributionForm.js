import React, { Component, PropTypes } from 'react'
import objectAssign from 'object-assign'
import format from '../../utils/format'
import helpers from '../../utils/helpers'

export default class ContributionForm extends Component {
  static propTypes () {
    return {
      basePrice: PropTypes.number,
      priceWithFee: PropTypes.number,
      serviceFee: PropTypes.number,
      onPriceChange: PropTypes.func,
      onNoteChange: PropTypes.func,
      onNotePostCheckboxChange: PropTypes.func,
      checkoutText: PropTypes.string,
      userSetPrice: PropTypes.boolean
    }
  }

  static defaultProps () {
    return {
      basePrice: 0,
      priceWithFee: 0,
      serviceFee: 0
    }
  }

  constructor (props) {
    super(props)

    this.contribution = props.userSetPrice ? parseFloat(props.basePrice) : 0

    this.state = {
      feeTextShown: false,
      totalPrice: props.priceWithFee,
      serviceFee: props.serviceFee,
      contribution: this.contribution
    }

    this.isCheckboxChecked = false

    this.finishPriceEdit = this.finishPriceEdit.bind(this)
    this.finishNoteEdit = this.finishNoteEdit.bind(this)
    this.formatContribution = this.formatContribution.bind(this)
    this.onCheckboxChange = this.onCheckboxChange.bind(this)
    this.toggleProcessingFeeText = this.toggleProcessingFeeText.bind(this)
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (this.props !== nextProps) || (this.state !== nextState)
  }

  finishPriceEdit (e) {
    const { onPriceChange } = this.props
    const newContribution = parseFloat(e.target.value)
    const basePrice = this.props.userSetPrice ? 0 : parseFloat(this.props.basePrice)

    if (newContribution) {
      this.contribution = Number(newContribution.toFixed(2))
    } else {
      this.contribution = 0
    }

    let serviceFee = helpers.getPercentOf(0.05, this.contribution + basePrice)
    // If there is a charge, minimum service fee should be $1
    serviceFee = (serviceFee !== 0 && serviceFee < 1) ? 1 : serviceFee

    const totalPrice = basePrice + this.contribution + serviceFee

    if (onPriceChange && onPriceChange instanceof Function) {
      onPriceChange(this.contribution, totalPrice)
    }

    this.setState({
      totalPrice,
      serviceFee,
      contribution: this.contribution
    })
  }

  finishNoteEdit (e) {
    const { onNoteChange } = this.props

    if (onNoteChange && onNoteChange instanceof Function) {
      const newNote = e.target.value

      if (newNote) {
        onNoteChange(newNote.trim())
      } else {
        // send empty string if user cleared the text box
        onNoteChange('')
      }
    }
  }

  onCheckboxChange (e) {
    const { onNotePostCheckboxChange } = this.props

    if (onNotePostCheckboxChange && onNotePostCheckboxChange instanceof Function) {
      this.isCheckboxChecked = !this.isCheckboxChecked
      onNotePostCheckboxChange(this.isCheckboxChecked)
    }
  }

  formatContribution (e) {
    if (e.target.value) {
      this.refs.contributionForm.value = this.contribution
    }
  }

  toggleProcessingFeeText () {
    this.state.feeTextShown
      ? this.setState({ feeTextShown: false })
      : this.setState({ feeTextShown: true })
  }

  displayInputField (formattedBasePrice, defaultValue) {
    return (
      <input
        onBlur={this.formatContribution}
        onChange={this.finishPriceEdit}
        placeholder={formattedBasePrice}
        defaultValue={defaultValue}
        ref='contributionForm'
        style={{ textAlign: 'right', maxWidth: '80px' }}
        type='text'
      />
    )
  }

  render () {
    const containerStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%'
    }
    const dlStyles = {
      display: 'flex',
      flexWrap: 'wrap',
      margin: 0,
      marginBottom: 12,
      width: '100%'
    }
    const baseDlStyle = {
      flexGrow: 1,
      lineHeight: 2,
      margin: 0
    }
    const dtStyles = objectAssign({}, baseDlStyle, {
      textAlign: 'left',
      flexBasis: '62%'
    })
    const ddStyles = objectAssign({}, baseDlStyle, {
      textAlign: 'right',
      flexBasis: '38%'
    })

    const {userSetPrice} = this.props

    return (
      <div style={containerStyle}>
        <dl style={dlStyles}>
          <dt style={dtStyles}>{this.props.checkoutText ? this.props.checkoutText : 'Your Contribution'}</dt>
          <dd style={ddStyles}>
            { userSetPrice
            ? this.displayInputField(format.currency(this.props.basePrice), this.props.basePrice)
            : this.props.basePrice > 0 ? format.currency(this.props.basePrice) : 'Free'
            }
          </dd>

          { userSetPrice
          ? null
          : <dt style={dtStyles}>Add a Gift/Contribution?</dt>
          }
          { userSetPrice
          ? null
          : <dd style={ddStyles}>
              {this.displayInputField('$0.00', '')}
            </dd>
          }

          <dt style={dtStyles}>
            5% Processing Fee
            <a onClick={this.toggleProcessingFeeText} style={{display: 'block', fontSize: '0.90em', marginTop: '-0.75em'}}>
              {this.state.feeTextShown ? ' Hide' : ' What\'s this?'}
            </a>
          </dt>
          <dd style={ddStyles}>{format.currency(this.state.serviceFee)}</dd>

          {
            this.state.feeTextShown
              ? <div style={{display: 'flex', flex: 1, flexBasis: '100%', color: '#008'}}>
                <i>This fee covers credit card processing and other costs so 100% of the contribution goes to the hosts.</i>
              </div>
              : null
          }

          <dt style={dtStyles}><strong>Total</strong></dt>
          <dd style={ddStyles}><strong>{format.currency(this.state.totalPrice)}</strong></dd>
        </dl>

        <textarea type='text' placeholder='Send a message to the hosts!'
          onBlur={this.finishNoteEdit}
          style={{ marginBottom: '1em', resize: 'vertical', width: '100%', height: '3em' }} />
        <label>
          <input type='checkbox' style={{marginRight: '0.5em'}} onClick={this.onCheckboxChange}/>
          Post this message to the event page
        </label>
      </div>
    )
  }
}
