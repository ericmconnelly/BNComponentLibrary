import React, { PureComponent } from 'react'
import cloneDeep from 'lodash/cloneDeep'
import moment from 'moment'

import BnCalendar from './../bn-calendar/BnCalendar'

export default class BnCalendarDouble extends PureComponent {
  constructor(props, context){
    super(props)
    this.state = {
      start_date: moment().subtract(1,'months'),
      end_date: moment(),
      position: {}

    }
    this.options = [
      {
        name: 'Today',
        start_date: moment(this.state.end_date),
        end_date: moment(),
        index: 0
      },
      {
        name :'Yesterday',
        start_date: moment(this.state.end_date).subtract(1, 'day'),
        end_date: moment(),
        index: 1
      },
      {
        name: 'This week',
        start_date: moment(this.state.end_date).startOf('week'),
        end_date: moment(),
        index: 2
      },
      {
        name: 'Last week',
        start_date: moment().subtract(1, 'week').startOf('week'),
        end_date: moment().subtract(1, 'week').endOf('week'),
        index: 3
      },
      {
        name: 'Last 7 days',
        start_date: moment().subtract(7, 'days'),
        end_date: moment(),
        index: 4
      },
      {
        name: 'Last 14 days',
        start_date: moment().subtract(14, 'days'),
        end_date: moment(),
        index: 5

      },
      {
        name: 'Last 28 days',
        start_date: moment().subtract(28, 'days'),
        end_date: moment(),
        index: 6
      },
      {
        name: 'Last 30 days',
        start_date: moment().subtract(30, 'days'),
        end_date: moment(),
        index: 7
      },
      {
        name: 'Last 90 days',
        start_date: moment().subtract(90, 'days'),
        end_date: moment(),
        index: 8
      },
      {
        name: 'This month',
        start_date: moment().startOf('month'),
        end_date: moment(),
        index: 9
      },
      {
        name: 'Last month',
        start_date: moment().subtract(1, 'month').startOf('month'),
        end_date: moment().subtract(1, 'month').endOf('month'),
        index: 10
      },
      {
        name: 'Last 3 months',
        start_date: moment().subtract(3, 'month').startOf('month'),
        end_date: moment().subtract(1, 'month').endOf('month'),
        index: 11
      },
      {
        name: 'Custom(' + this.state.end_date.diff(this.state.start_date, 'days') + ' days)',
        nameChange: function(){
          return this.name = 'Custom(' + this.end_date.diff(this.start_date, 'days') + ' days)'
        },
        start_date: this.state.start_date,
        end_date: this.state.end_date,
        index: 12
      }
    ]
  }

  getRef = (ref) => {
    if(ref){
      this.ref = ref
      this.parent = ref.parentNode
    }
  }

  handleOnSubmit = (start_date, end_date, props, event) => {
    props.onSubmit({
      since: moment(start_date).format('YYYY-MM-DD'),
      until: moment(end_date).format('YYYY-MM-DD')
    })

    this.handleExit()
  }

  handleStartDateChange = (day) => {
    this.setState({
      start_date: day.date.startOf('day')
    })
    this.options[12].start_date = day.date
    this.options[12].nameChange()
  }

  handleEndDateChange = (day) => {
    this.setState({
      end_date: day.date.startOf('day')
    })
    this.options[12].end_date = day.date
    this.options[12].nameChange()
  }

  handleSelectionChange = (event) => {
    const state = {}

    if (this.options[event.target.value].start_date) state.start_date = this.options[event.target.value].start_date
    if (this.options[event.target.value].end_date) state.end_date = this.options[event.target.value].end_date

    this.setState(state)
  }

  handleExit = () => {
    document.body.removeChild(this.ref)
    this.parent.appendChild(this.ref)
    document.body.removeEventListener("click", this.handleOffClick)
    return this.props.handleOffClick()
  }

  handleOffClick = (event) => {
    var event_target = event.target
    while(event_target !== this.ref){
      if(event_target === document.body){
        return this.handleExit()
      }
      event_target = event_target.parentNode
    }
  }

  componentWillReceiveProps(nextProps){
    let set_display

    if (nextProps.open) {
      set_display = cloneDeep(this.state.position)
      set_display.display = 'block'
      this.setState({ position: set_display })
      document.body.appendChild(this.ref)
      document.body.addEventListener("click", this.handleOffClick);
    } else {
      set_display = cloneDeep(this.state.position)
      set_display.display = 'none'
      this.setState({ position: set_display })
    }
  }

  componentDidMount(){
    const bounding_rects = this.ref.previousSibling.getBoundingClientRect()
    const position = { 
      right: 'auto', 
      display: 'none', 
      top: bounding_rects.bottom, 
      left: bounding_rects.left,
    }
    this.setState({ position })
  }

  render(){
    return(
      <div className="daterangepicker dropdown-menu show-calendar opensright" style={this.state.position} ref={this.getRef}>
        <div className="calendar left">
          <BnCalendar left scrollable cantSelectFuture endDate={this.state.end_date} startDate={this.state.start_date} onDateChange={this.handleStartDateChange}/>
        </div>
        <div className="calendar right">
          <BnCalendar right endDate={this.state.end_date} startDate={this.state.start_date} onDateChange={this.handleEndDateChange}/>
        </div>
        <div className="ranges">
          <div className="range_inputs">
            <select onChange={this.handleSelectionChange} className="presetSelect small">
              {this.options.map((option,index) =>{return <option key={option.name + index} value={index} >{option.name}</option>})}
            </select>
            <button onClick={(event) => {this.handleOnSubmit(this.state.start_date, this.state.end_date, this.props, event)}} className="applyBtn btn btn-small btn-sm button primary">Filter Stats to Date Range</button>
            <button className="cancelBtn btn btn-small btn-sm button margin-right-4">Default Range</button>
          </div>
        </div>
      </div>
    )
  }
}
