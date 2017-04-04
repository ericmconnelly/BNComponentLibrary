import React, { PropTypes, PureComponent } from 'react'
import debounce from 'lodash/debounce'
import isEmpty from 'lodash/isEmpty'

const { func } = PropTypes

export default class BnSearchInput extends PureComponent {
  static propTypes = {
    handleChange: func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = { text: '' }
  }
  
  updateValue = (text) => {
    this.input.value = text
    this.setState({ text })
    this.props.handleChange(text)
  }

  debouncedUpdate = debounce(this.updateValue, 200)

  handleChange = (event) => {
    event.persist()
    this.debouncedUpdate(event.target.value)
  }

  render() {
    return(
      <div className='search-input'>
        <i className='icon-search' />
        <input onChange={this.handleChange} placeholder='Filter' type='text' ref={(ref) => this.input = ref}/>
        {!isEmpty(this.state.text) &&
          <div className='button no-bg icon-only'>
            <i className='icon-circle-x' onClick={() => this.updateValue('')}/>
          </div>
        }
      </div>
    )
  }
}
