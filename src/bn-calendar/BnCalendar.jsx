import React, { PureComponent } from 'react'
import cx from 'classnames'
import moment from 'moment'

const Thingy = (props) => {
  let onClick = () => props.onClick(props.day)

  return(
    <td key={props.day.iso_8061} onClick={onClick} className={props.className}>{props.day.day_of_the_month}</td>
  )
}

export default class BnCalendar extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      calendar : null,
      current_month: props.right ? moment(props.endDate) : props.left ? moment(props.startDate) : null
    }
  }

  buildCalendar = (showing_date) => {
    let date = moment(showing_date).startOf('month').startOf('day').startOf('week')

    var weeks = []

    while (true) {
      var day_of_the_week = date.day()
      var day_of_the_month = date.date()

      if (day_of_the_week === 0) {
        if (weeks.length > 5) break
        var week = []
        weeks.push(week)
      }

      week.push({
        iso_8061: date.format(),
        day_of_the_month: day_of_the_month,
        date: moment(date)
      })
      date.add(1,'day')
    }

    this.setState({
      calendar : weeks,
      current_month: moment(showing_date).startOf('month')
    })
  }

  isInRange = (date, props) => {
    if(props.right)
      return (date.isBefore(props.endDate, 'day') && date.isSameOrAfter(props.startDate, 'day'))
    if(props.left)
      return (date.isAfter(props.startDate, 'day') && date.isSameOrBefore(props.endDate, 'day'))

    return null
  }

  getClass = (date) => {
    return {
      available: date.isValid(),
      active: (date.isSame(this.props.endDate, 'day') && this.props.right)|| (date.isSame(this.props.startDate, 'day') && this.props.left ),
      off: (date.isAfter(this.props.endDate) && this.props.left) || date.isAfter(moment()) || !date.isSame(this.state.current_month, 'month'),
      disabled: date.isAfter(moment()),
      'end-date': date.isSame(this.props.endDate, 'day') && this.props.right,
      'start-date': date.isSame(this.props.startDate, 'day') && this.props.left,
      'in-range': this.isInRange(date, this.props)
    }
  }

  goToNextMonth = (showing_date) => {
    this.buildCalendar(showing_date.add(1, 'month'))
  }

  goToLastMonth = (showing_date) => {
    this.buildCalendar(showing_date.subtract(1, 'month'))
  }

  componentWillMount = () => {
    if (this.props.left) this.buildCalendar(this.props.startDate)
    if (this.props.right) this.buildCalendar(this.props.endDate)
  }

  componentWillReceiveProps = (props) => {
    if (props.left) this.buildCalendar(props.startDate)
    if (props.right) this.buildCalendar(props.endDate)
  }

  handleClick = (day) => {
    if(day.date.isAfter(this.props.endDate) && this.props.left){
      return
    }

    if(day.date.isBefore(this.props.startDate) && this.props.right){
      return
    }

    if(!day.date.isAfter(moment())){
      this.props.onDateChange(day)
    }
  }

  render() {
    this.mapRows = () => {
      if(!this.state.calendar){
        return null
      } else {
        return this.state.calendar.map((week, index) =>{return <tr key={index}>{this.mapDates(week)}</tr>})
      }
    }

    this.mapDates = (week) => {
      if(!week.length){
        return null
      }

      return week.map((day, index) => {
        var classes = cx(this.getClass(day.date))
        return <Thingy key={`${index} ${day.date}`} onClick={this.handleClick} day={day} className={classes}/>
        // return <td onClick={this.handleClick} ref= {this.mapRefs} key={day.iso_8061} className={classes}> {day.day_of_the_month}</td>
      })
    }

    this.nextMonth = (props, current_month) => {
      if(props.right && current_month.isBefore(moment(),'month'))
        return () => this.goToNextMonth(current_month)
      if(props.left && props.endDate.isSameOrAfter(moment(current_month).add(1,'month')))
        return () => this.goToNextMonth(current_month)
      
      return null
    }

    this.prevMonth = (props, current_month) => {
      if(props.right && !moment(props.startDate).isSame(current_month, 'month'))
        return () => this.goToLastMonth(current_month)
      if(props.left)
        return () => this.goToLastMonth(current_month)

      return null
    }

    return(
      <div className="calendar-date">
        <table className="table-condensed">
          <thead>
            <tr>
              <th title="previous month"  onClick={this.prevMonth(this.props, this.state.current_month)} className="prev available">
                { this.prevMonth(this.props, this.state.current_month) ? <i className="icon-arrow-left"></i> : null }
              </th>
              <th colSpan="5" className="month">{moment(this.state.current_month).format('MMM') + ' ' + moment(this.state.current_month).format('YYYY')}</th>
              <th title="next month" onClick={this.nextMonth(this.props, this.state.current_month)}>
                { this.nextMonth(this.props, this.state.current_month) ? <i className="icon-arrow-right"></i> : null }
              </th>
            </tr>
            <tr>
              <th>Su</th>
              <th>Mo</th>
              <th>Tu</th>
              <th>We</th>
              <th>Th</th>
              <th>Fr</th>
              <th>Sa</th>
            </tr>
          </thead>
          <tbody>
            {this.mapRows()}
          </tbody>
        </table>
      </div>
    )
  }
}
