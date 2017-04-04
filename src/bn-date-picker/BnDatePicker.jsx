import React, { PropTypes, PureComponent } from 'react'
import moment from 'moment'

import { DayHeader, MonthHeader, MonthNav, Table, Wrapper } from './styled-components' 
import Month from './Month'
import { allDaysDisabledAfter, allDaysDisabledBefore, isSameDay, localizeMoment } from './date-utils'

const { array, bool, func, number, object, oneOfType, string } = PropTypes

export default class BnDatePicker extends PureComponent {
  static propTypes = {
    date_format: oneOfType([string, array]),
    disabled: bool,
    end_date: object,
    locale: string,
    max_date: object,
    min_date: object,
    open_to_date: object,
    selected_date: object,
    selects_end: bool,
    selects_start: bool,
    start_date: object,
    utc_offset: number,
    handleClick: func.isRequired,
    handleDayMouseEnter: func,
    handleMouseLeave: func,
  }

  static defaultProps = {
    date_format: 'MMM YYYY',
    disabled: false,
    locale: 'en',
    utc_offset: moment.utc().utcOffset(),
    selects_start: false,
    selects_end: false,
  }

  constructor(props) {
    super(props)
    
    this.state = {
      date: localizeMoment(this.getDateInView(), this.props.locale),
      selecting_date: null,
    }
  }
  
  componentWillReceiveProps (nextProps) {
    if (nextProps.selected_date && !isSameDay(nextProps.selected_date, this.props.selected_date))
      this.setState({ date: localizeMoment(nextProps.selected_date, this.props.locale) })
  }

  getDateInView() {
    const { max_date, min_date, open_to_date, selected_date, utc_offset } = this.props
    const current = moment.utc().utcOffset(utc_offset)

    if (selected_date) return selected_date

    if (min_date) {
      if (open_to_date && open_to_date.isBetween(min_date, max_date))
        return open_to_date
      if (min_date.isAfter(current))
        return min_date
    } 

    if (max_date) {
      if (open_to_date && open_to_date.isBefore(max_date))
        return open_to_date
      if (max_date.isBefore(current))
        return max_date
    } 

    if (open_to_date) return open_to_date

    return current
  }

  increaseMonth = () => {
    this.setDate(this.state.date.clone().add(1, 'month'))
  }

  decreaseMonth = () => {
    this.setDate(this.state.date.clone().subtract(1, 'month'))
  }
  
  setDate = (date) => {
    this.setState({ date })
  } 

  handleDayMouseEnter = (day) => {
    this.setState({ selecting_date: day })
  }

  handleMonthMouseLeave = () => {
    this.setState({ selecting_date: null })
  }

  renderHeader(date = this.state.date) {
    const start_of_week = date.clone().startOf('week')

    return [0, 1, 2, 3, 4, 5, 6].map(offset => {
      const day = start_of_week.clone().add(offset, 'days')

      return <DayHeader key={offset} {...this.props}>{day.localeData().weekdaysMin(day)}</DayHeader>
    })
  }

  renderCurrentMonth(date = this.state.date) {
    return <MonthHeader colSpan={5}>{date.format(this.props.date_format)}</MonthHeader>
  }

  renderNextMonthButton() {
    if (allDaysDisabledAfter(this.state.date, 'month', this.props.max_date)) {
      return <th />
    }

    return <MonthNav {...this.props}><i className="icon-arrow-right" onClick={this.increaseMonth} /></MonthNav>
  }
  
  renderPreviousMonthButton() {
    if (allDaysDisabledBefore(this.state.date, 'month', this.props.min_date)) {
      return <th />
    }

    return <MonthNav {...this.props}><i className="icon-arrow-left" onClick={this.decreaseMonth} /></MonthNav>
  }

  render () {
    const month_date = this.state.date.clone()
    const { selects_start, selects_end } = this.props
    const styleProps = { selects_start, selects_end }
    
    return (
      <Wrapper {...styleProps}>
        <Table {...styleProps}>
          <thead>
            <tr>
              {this.renderPreviousMonthButton()}
              {this.renderCurrentMonth(month_date)}
              {this.renderNextMonthButton()}
            </tr>
            <tr>
              {this.renderHeader(month_date)}
            </tr>
          </thead>
          <Month
            day={month_date}
            end_date={this.props.end_date}
            min_date={this.props.min_date}
            max_date={this.props.max_date}
            selected_date={this.props.selected_date}
            selecting_date={this.state.selecting_date}
            selects_start={this.props.selects_start}
            selects_end={this.props.selects_end}
            start_date={this.props.start_date}
            utc_offset={this.props.utcOffset}
            filterDate={this.props.filterDate}
            handleDayClick={this.props.handleClick}
            handleDayMouseEnter={this.handleDayMouseEnter}
            handleMouseLeave={this.handleMonthMouseLeave}
          />
        </Table>
      </Wrapper>
    )
  }
}
