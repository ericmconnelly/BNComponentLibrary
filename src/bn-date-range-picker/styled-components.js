import styled from 'styled-components'

const { button, div } = styled 

export const Wrapper = div`
  height: 280px;
`

export const RangesWrapper = div`
  background: #f6f8fa;
  bottom: 0;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  height: 56px;
  left: 0;
  padding: 12px;
  position: absolute;
  width: 100%;
`

export const DefaultButton = button`
  float: right;
  margin-right: 4px;
`

export const SubmitButton = button`
  background: linear-gradient(to bottom, #4faaf3, #318ed8);
  border: 1px solid #2185ec;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.2);
  color: #fff;
  float: right;
`
