import React, { PureComponent } from 'react'
import moment from 'moment'

import { BnButton } from '../../lib'
import { BnDateRangePicker } from '../../lib'
import { registerComponent } from '../../lib'

export default class BnDateRangePickerExample extends PureComponent {
  state = { 
    start_date: null,
    end_date: null, 
  }
  
  handleSubmit = ({start_date, end_date}) => {
    this.setState({ start_date, end_date })
    this.context.popoverClose()
  }
  
  openDateRangePicker = () => {
    this.context.popoverOpen(
      this.button, 
      <BnDateRangePicker 
        start_date={this.state.start_date}
        end_date={this.state.end_date}
        max_date={moment()}
        handleSubmit={this.handleSubmit}
      />
    )
  }

  render() {
    const { start_date, end_date } = this.state

    return (
      <div className="docs-example">
        <div className="docs-canvas">
          <BnButton getRef={ref => this.button = ref} icon="icon-calendar" onClick={this.openDateRangePicker} >
            {start_date && ` ${start_date.format('MMM DD')} - ${end_date.format('MMM DD')}`}
            {!start_date && ' Pick A Date Range'}
          </BnButton>
        </div>
      </div>
    )
  }
}

registerComponent(BnDateRangePickerExample)
