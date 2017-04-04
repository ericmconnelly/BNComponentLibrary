import { PropTypes } from 'react'
const { func } = PropTypes

export default function registerComponent(component) {
  component.contextTypes = {
    popoverClose: func,
    popoverOpen: func,
    modalClose: func,
    modalOpen: func,
    helperTextOpen: func,
    helperTextClose: func
  }
}
