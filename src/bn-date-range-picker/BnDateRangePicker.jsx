import React, { PropTypes, PureComponent } from 'react'
import moment from 'moment'

import getPresets from './getPresets'
import { DefaultButton, RangesWrapper, SubmitButton, Wrapper } from './styled-components'
import BnDatePicker from '../bn-date-picker/BnDatePicker'
import BnButton from '../bn-button/BnButton'
import { localizeMoment } from '../bn-date-picker/date-utils'

const { bool, func, object, string } = PropTypes

export default class BnDateRangePicker extends PureComponent {
  static propTypes = {
    button_text: string,
    disabled: bool,
    end_date: object,
    locale: string,
    max_date: object,
    min_date: object,
    start_date: object,
    handleSubmit: func.isRequired,
  }

  static defaultProps = {
    button_text: 'Apply date range',
    locale: 'en',
  }
  
  constructor(props) {
    super(props)

    this.state = {
      start_date: localizeMoment(props.start_date || moment()),
      end_date: localizeMoment(props.end_date || moment()),
    }
    
    this.presets = getPresets()
  }

  handleClickStart = (start_date) => {
    if (start_date.isAfter(this.state.end_date.end_date))
      this.setState({ start_date, end_date: start_date.clone() })
    else
      this.setState({ start_date })
  }

  handleClickEnd = (end_date) => {
    if (end_date.isBefore(this.state.start_date))
      this.setState({ start_date: end_date.clone(), end_date })
    else
      this.setState({ end_date })
  }

  handleSubmit = () => {
    const { start_date, end_date } = this.state
    this.props.handleSubmit({ start_date, end_date })
  }
  
  handleSelectionChange = ({ target }) => {
    const { min_date, max_date } = this.props

    this.setState({ ...this.adjustRange(this.presets[target.value](), min_date, max_date) })
  }
  
  adjustRange = ({ start_date, end_date }, min, max) => {
    return {
      start_date: min && min.isAfter(start_date) ? min.clone() : start_date,
      end_date: max && max.isBefore(end_date) ? max.clone() : end_date
    }
  }

  renderPresets() {
    return Object.keys(this.presets).map((preset, index) => <option key={preset + index} value={preset} >{preset}</option>)
  }

  render() {
    return(
      <Wrapper>
        <BnDatePicker 
          selects_start 
          selected_date={this.state.start_date}
          start_date={this.state.start_date}
          end_date={this.state.end_date}
          min_date={this.props.min_date}
          max_date={this.props.max_date}
          handleClick={this.handleClickStart}
        />
        <BnDatePicker 
          selects_end 
          selected_date={this.state.end_date} 
          start_date={this.state.start_date} 
          end_date={this.state.end_date} 
          min_date={this.props.min_date}
          max_date={this.props.max_date}
          handleClick={this.handleClickEnd}
        />
        <RangesWrapper>
          <select onChange={this.handleSelectionChange}>
            {this.renderPresets()}
          </select>
          <BnButton onClick={this.handleSubmit} style={{ float: 'right' }} primary>{this.props.button_text}</BnButton>
          <BnButton onClick={() => this.handleSelectionChange({ target: { value: 'Last 30 days' } })} style={{ float: 'right' }} marginRight4>Default Range</BnButton>
        </RangesWrapper>
      </Wrapper>
    )
  }
}
