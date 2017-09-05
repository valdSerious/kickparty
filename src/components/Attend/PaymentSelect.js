import React, { PropTypes } from 'react'
import helpers from '../../utils/helpers'

const PaymentSelect = ({paymentMethods, ...props}) => {
  return (
    paymentMethods.length === 1
      ? <div className='card-box white' style={{
        width: '100%',
        fontSize: '1.20em',
        height: '2.5em',
        border: '1px solid #ccc'
      }}>
        <b>{helpers.getCreditCardType(paymentMethods[0].paymentType)}</b> &nbsp;ending in&nbsp;
        <b>{paymentMethods[0].number}</b>&nbsp;&bull;&nbsp;
        <b>{paymentMethods[0].expMonth}/{paymentMethods[0].expYear}</b>
      </div>
      /* TODO: make the select look like the single payment method ^
      A modal with a list of those divs would look good, just need some logic to select them etc
      */
      : <select {...props} style={{width: '100%', height: '2.5em', fontSize: '1.20em'}}>
          {
            paymentMethods.map((paymentMethod, i) => {
              const { expMonth, expYear, number } = paymentMethod
              const paymentType = helpers.getCreditCardType(paymentMethod.paymentType)

              return (
                <option key={i} value={i} style={{textAlign: 'center'}}>
                  {`${paymentType} ending with ${number} - ${expMonth}/${expYear}`}
                </option>
              )
            })
          }
      </select>
  )
}

PaymentSelect.propTypes = {
  paymentMethods: PropTypes.array.isRequired
}

export default PaymentSelect
