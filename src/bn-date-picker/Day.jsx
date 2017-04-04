import React, { PropTypes, PureComponent } from 'react'
import moment from 'moment'

import { DayCell } from './styled-components'
import { isSameDay, isDayDisabled, isDayInRange } from './date-utils'

const { bool, func, number, object } = PropTypes

export default class Day extends PureComponent {
  static propTypes = {
    column: number,
    day: object.isRequired,
    end_date: object,
    month: number,
    row: number,
    selected_date: object,
    selecting_date: object,
    selects_end: bool,
    selects_start: bool,
    start_date: object,
    utc_offset: number,
    handleClick: func,
    handleMouseEnter: func,
  }

  static defaultProps = { 
    utc_offset: moment.utc().utcOffset() 
  }

  handleClick = () => {
    if (!this.isDisabled() && this.props.handleClick)
      this.props.handleClick(this.props.day)
  }

  handleMouseEnter = () => {
    if (!this.isDisabled() && this.props.handleMouseEnter)
      this.props.handleMouseEnter(this.props.day)
  }

  isDisabled ({ day, min_date, max_date } = this.props) {
    return isDayDisabled(day, min_date, max_date)
  }

  isInRange ({ day, start_date, end_date } = this.props) {
    if (!start_date || !end_date) return false
    
    return isDayInRange(day, start_date, end_date)
  }

  isSameDay (other) {
    return isSameDay(this.props.day, other)
  }

  isInSelectingRange ({ day, selects_start, selects_end, selecting_date, start_date, end_date } = this.props) {
    if (!(selects_start || selects_end) || !selecting_date || this.isDisabled())
      return false
    
    if (selects_start && end_date && selecting_date.isSameOrBefore(end_date))
      return isDayInRange(day, selecting_date, end_date)
    
    if (selects_end && start_date && selecting_date.isSameOrAfter(start_date))
      return isDayInRange(day, start_date, selecting_date)

    return false
  }

  isRangeStart ({ day, start_date, end_date } = this.props) {
    if (!start_date || !end_date) return false
    return isSameDay(start_date, day)
  }

  isRangeEnd ({ day, start_date, end_date } = this.props) {
    if (!start_date || !end_date) return false
    return isSameDay(end_date, day)
  }

  isOutsideMonth () {
    return this.props.month !== undefined && this.props.month !== this.props.day.month()
  }

  getClassNames () {
    const is_disabled = this.isDisabled(),
      is_start = this.isRangeStart(),
      is_end = this.isRangeEnd()

    return {
      active: this.isSameDay(this.props.selected_date),
      available: !is_disabled,
      disabled: is_disabled,
      end_date: is_end,
      in_range: !is_start & !is_end & this.isInRange(),
      off: is_disabled || this.isOutsideMonth(),
      start_date: is_start,
    }
  }

  render () {
    const { column, day, row, selects_end, selects_start } = this.props
    const styleProps = { selects_end, selects_start, ...this.getClassNames()}

    return (
      <DayCell
        {...styleProps}
        data-title={`r${row}c${column}`}
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
      >
        {day.date()}
      </DayCell>
    )
  }
}
