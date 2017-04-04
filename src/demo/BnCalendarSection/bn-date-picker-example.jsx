import React, { Component } from 'react'

import { BnButton } from '../../lib'
import { BnDatePicker } from '../../lib'
import { registerComponent } from '../../lib'

export default class BnDatePickerExample extends Component {
  state = { selected: null }

  handleClick = (selected) => {
    this.setState({ selected })
    this.context.popoverClose()
  }
  
  openDatePicker = () => {
    this.context.popoverOpen(this.button, <BnDatePicker selected_date={this.state.selected} handleClick={this.handleClick} />)
  }
  
  render() {
    return (
      <div className="docs-example">
        <div className="docs-canvas">
          <BnButton getRef={ref => this.button = ref} icon="icon-calendar" onClick={this.openDatePicker} >
            {' ' + (this.state.selected ? this.state.selected.format('MMM DD') : 'Pick a date')}
          </BnButton>
        </div>
      </div>
    )
  }
}

registerComponent(BnDatePickerExample)
