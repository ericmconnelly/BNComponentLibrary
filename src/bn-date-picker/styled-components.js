import styled, { css } from 'styled-components'

const { div, table, td, th } = styled

const isRangePicker = props => !!(props.selects_start || props.selects_end)

const default_cell = css`
  text-align: center;
  user-select: none;
  height: 24px;
  font-size: 12px;
  text-transform: uppercase;
`

const width = props => css`
  width: ${isRangePicker(props) ? '28' : '24'}px;
`

const rangeDay = ({ active, available, end_date, in_range, selects_end, selects_start, start_date }) => css`
  border-radius: 0;
  height: 22px;
  ${available && css`
  &:hover {
    border-radius: 4px;
  }
    ${in_range && css`
  background: #deeeff;
  &:hover {
    border-radius: 0;
  }
    `}
  `}
  &:first-child {
    border-radius: 4px 0 0 4px
  }
  &:last-child {
    border-radius: ${active ? '4px' : '0 4px 4px 0'};
  }
  ${start_date && css`
  border-radius: 4px 0 0 4px;
  `}
  ${end_date && css`
  border-radius: 0 4px 4px 0;
  `}
  ${active && (start_date || end_date) && css`
  position: relative;
  &::before,
  &::after {
    border-style: solid;
    content: '';
    display: block;
    height: 0;
    position: absolute;
    width: 0;
  }
  `}
  ${selects_start && active && start_date && css`
  &::before {
    top: 0;
    right: 0;
    border-width: 0 6px 11px 0;
    border-color: transparent #deeeff transparent transparent;
  }
  &::after {
    bottom: 0;
    right: 0;
    border-width: 0 0 11px 6px;
    border-color: transparent transparent #deeeff transparent;
  }
  `}
  ${selects_end && active && end_date && css`
  &::before {
    top: 0;
    left: 0;
    border-width: 11px 6px 0 0;
    border-color: #deeeff transparent transparent transparent;
  }
  &::after {
    bottom: 0;
    left: 0;
    border-width: 11px 0 0 6px;
    border-color: transparent transparent transparent #deeeff;
  }
  `}
`

export const Wrapper = div`
  background: #fff;
  padding: 12px;
  ${props => props.selects_start && `
  float: left;
  padding-right: 24px;
  `}
  ${props => props.selects_end && `
  border-left: 1px solid #e1e4ec;
  float: right;
  padding-left: 24px;
  `}
`

export const Table = table`
  border-collapse: separate;
  border-spacing: ${props => isRangePicker(props) ? '0' : '4px'} 2px;
`

export const MonthHeader = th`
  ${default_cell}
  font-weight: 700;
  font-size: 12px;
`

export const MonthNav = styled(MonthHeader)`
  cursor: pointer;
  ${width}
  &:hover i {
    color: #2185ec;
  }
`

export const DayHeader = styled(MonthHeader)`
  ${width}
  text-transform: uppercase;
  font-size: 11px;
  color: #9aa1b6;
`

export const DayCell = td`
  ${default_cell}
  border-radius: 50%;
  ${props => props.available && css`
  cursor: pointer;
  &:hover {
    color: #2185ec;
    background: #deeeff;
    font-weight: 500;
  }
  `}
  ${props => props.off && css`
  color: #a1a8bb;
  `}
  ${props => props.active && css`
  background: #2185ec;
  color: #fff;
  font-weight: 700;
  &:hover {
    background: #2185ec;
    color: #fff
  }
  `}
  ${props => isRangePicker(props) && rangeDay(props)}
`
