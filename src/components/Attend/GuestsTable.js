import React, { PropTypes } from 'react'
import objectAssign from 'object-assign'

const GuestsTable = ({guests, onDelete}) => {
  const tableStyle = {
    width: '100%',
    margin: '1em 0',
    tableLayout: 'fixed'
  }
  const rowStyle = {
    width: '100%'
  }
  const cellStyle = {
    padding: '0.5em',
    borderBottom: '1px solid #ccc',
    textAlign: 'left'
  }

  return (
    <table style={tableStyle}>
      <thead>
        <tr style={rowStyle}>
          <td style={cellStyle}><strong>Name</strong></td>
          <td style={cellStyle}><strong>Email</strong></td>
          <td>{' '}</td>
        </tr>
      </thead>
      <tbody>
      {
        guests.map((g, i) => {
          return (
            <tr key={i} style={rowStyle}>
              <td style={cellStyle}>{g.firstName + ' ' + g.lastName}</td>
              <td style={cellStyle}>{g.email}</td>
              <td style={objectAssign({}, cellStyle, {
                borderTop: cellStyle.borderBottom,
                marginLeft: '0.5em',
                textAlign: 'right'
              })}>
                <a onClick={onDelete.bind(this, i)} style={{color: '#000'}}>
                  x
                </a>
              </td>
            </tr>
          )
        })
      }
      </tbody>
    </table>
  )
}

GuestsTable.propTypes = {
  guests: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default GuestsTable
