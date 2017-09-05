import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

// Example Usage: <Search onSearch={ (searchTerm) => { console.log(searchTerm)} } />
export default class Search extends Component {
  static get displayName () {
    return 'Search'
  }

  static propTypes () {
    return {
      onSearch: PropTypes.func.isRequired,
      style: PropTypes.object,
      className: PropTypes.string
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      value: null
    }

    this.onChange = this.onChange.bind(this)
    this.onSearch = this.onSearch.bind(this)
  }

  onChange (se) {
    const value = se.target.value
    this.setState({ value })
  }

  onSearch (se) {
    se.preventDefault()
    const { value } = this.state

    if (this.props.onSearch && this.props.onSearch instanceof Function) {
      this.props.onSearch(value)
    }

    this.setState({
      value: ''
    })
  }

  render () {
    // const search = _.debounce((term) => { this.onChange }, 300)
    const tempClassNames = {}
    tempClassNames[this.props.className] = (this.props.className)

    const props = {
      className: classnames('search-box', tempClassNames),
      style: (this.props.style) ? this.props.style : null
    }

    return (
      <form onSubmit={ this.onSearch } { ...props }>
        <div className='input-group'>
            <span className='input-group-btn'>
              <button className='btn-search' type='submit'><i className='fa fa-search'></i></button>
            </span>
            <input type='text' className='form-control' value={ this.state.value } onChange={ this.onChange } placeholder='Find Events' />
        </div>
      </form>
    )
  }
}
