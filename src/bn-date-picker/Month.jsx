import React, { PropTypes, PureComponent } from 'react'

import Day from './Day'

const { array, bool, func, object, number } = PropTypes

export default class Month extends PureComponent {
  static propTypes = {
    day: object.isRequired,
    end_date: object,
    exclude_dates: array,
    include_dates: array,
    max_date: object,
    min_date: object,
    selected_date: object,
    selecting_date: object,
    selects_end: bool,
    selects_start: bool,
    start_date: object,
    utc_offset: number,
    filterDate: func,
    handleClick: func,
    handleDayMouseEnter: func,
    handleMouseLeave: func,
  }

  isWeekInMonth (startOfWeek) {
    const day = this.props.day,
      endOfWeek = startOfWeek.clone().add(6, 'days')

    return startOfWeek.isSame(day, 'month') || endOfWeek.isSame(day, 'month')
  }

  renderWeeks () {
    const { day, selects_end, selects_start } = this.props
    const weeks = []
    let currentWeekStart = day.clone().startOf('month').startOf('week')

    while (selects_start || selects_end ? weeks.length < 6 : this.isWeekInMonth(currentWeekStart)) {
      const row = weeks.length
      weeks.push(<tr key={row}>{this.renderDays(currentWeekStart, row)}</tr>)

      currentWeekStart = currentWeekStart.clone().add(1, 'weeks')
    }

    return weeks
  }

  renderDays (startOfWeek, row) {
    return [0, 1, 2, 3, 4, 5, 6].map(column => {
      const day = startOfWeek.clone().add(column, 'days')

      return (
        <Day
          column={column}
          day={day}
          key={column}
          end_date={this.props.end_date}
          max_date={this.props.max_date}
          min_date={this.props.min_date}
          month={this.props.day.month()}
          row={row}
          selected_date={this.props.selected_date}
          selecting_date={this.props.selecting_date}
          selects_end={this.props.selects_end}
          selects_start={this.props.selects_start}
          start_date={this.props.start_date}
          utc_offset={this.props.utc_offset}
          handleClick={this.props.handleDayClick}
          handleMouseEnter={this.props.handleDayMouseEnter}
        />
      )
    })
  }

  render () {
    return <tbody onMouseLeave={this.props.handleMouseLeave}>{this.renderWeeks()}</tbody>
  }
}
