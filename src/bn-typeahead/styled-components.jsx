import styled from 'styled-components'

const { div, i, input, li, ul } = styled

const isPanOrPop = props => !!(props.panel || props.popover)

const popover = `
  background: #fff;
  border: 1px solid #e1e4ec;
  border-radius: 6px;
  -webkit-box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  -ms-filter: none;
  filter: none;
  max-width: 640px;
  min-height: 48px;
  min-width: 92px;
  overflow: hidden;
  -webkit-transition: opacity 0.2s ease-out;
  -moz-transition: opacity 0.2s ease-out;
  -ms-transition: opacity 0.2s ease-out;
  -o-transition: opacity 0.2s ease-out;
  transition: opacity 0.2s ease-out;
  z-index: 15;
`

const panel = `
  background: #fff;
  border: 1px solid #e1e4ec;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  -webkit-transform: translateZ(0);
  -moz-transform: translateZ(0);
  -o-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
`

export const Wrapper = div`
  ${props => props.panel && panel}
  ${props => props.popover && popover}
`

export const InputWrapper = div`
  position: relative
  ${props => isPanOrPop(props) && `
    border-bottom: 1px solid #e1e4ec;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    height: 48px;
    min-width: 320px;
  `}
`

export const Input = input`
  padding: 0 40px 0 36px !important;
  z-index: 1 !important;
  ${props => isPanOrPop(props) && `
    background: #f6f8fa;
    border: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    height: 100%;
    left: 0;
    padding: 0 40px !important;
    position: absolute;
    top: 0;
    width: 100%;
    &:focus {
      background: #fff;
      box-shadow: none;
      -webkit-box-shadow: none;
    }
  `}
`

export const SearchIcon = i`
  left: 16px;
  pointer-events: none;
  position: absolute;
  text-align: center;
  top: 12px;
  width: 16px;
  z-index: 2;
  ${props => isPanOrPop(props) && `
    top: 16px;
  `}
`

export const ClearButton = div`
  font-style: italic;
  position: absolute;
  right: 4px;
  top: 4px;
  z-index: 2;
  ${props => isPanOrPop(props) && `
    top: 8px;
  `}
`

export const ListWrapper = div`
  max-height: 320px;
  overflow-y: auto;
  -ms-filter: none;
  filter: none;
  left: auto;
  opacity: 1;
  top: auto;
  width: 100%;
  ${popover}
`
