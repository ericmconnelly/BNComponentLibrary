import React, { Component, PropTypes } from 'react'
import noop from 'lodash/noop'

import BnModal from '../bn-modal/BnModal'
import BnPopover from '../bn-popover/BnPopover'
import BnTooltip from '../bn-tooltip/BnTooltip'

const { func } = PropTypes

export default class BnProvider extends Component {
  static childContextTypes = {
    modalClose: func,
    modalOpen: func,
    popoverClose: func,
    popoverOpen: func,
    helperTextOpen: func,
    helperTextClose: func,
  }

  constructor(props) {
    super(props)

    this.state = {
      modal_content: null,
      modal_open: false,
      popover_content: null,
      popover_open: false,
      popover_target: null,
      helpertext_open: false,
      helpertext_target: null,
      helpertext: ''
    }
  }
  
  getChildContext() {
    return {
      modalClose: this.modalClose,
      modalOpen: this.modalOpen,
      popoverClose: this.popoverClose,
      popoverOpen: this.popoverOpen,
      helperTextOpen: this.helperTextOpen,
      helperTextClose: this.helperTextClose
    }
  }

  modalClose = (callback = noop) => {
    this.setState({
      modal_content: null,
      modal_open: false,
    }, callback)
  }

  modalOpen = (component, size) => {
    this.setState({
      modal_content: component,
      modal_open: true,
      modal_size: size,
    })
  }

  popoverClose = (callback = noop) => {
    this.setState({
      popover_content: null,
      popover_open: false,
      popover_targetEl: null,
    }, callback)
  }

  popoverOpen = (target, component, position) => {
    this.setState({
      popover_content: component,
      popover_open: true,
      popover_position: position,
      popover_target: target,
    })
  }

  helperTextOpen = (target, text) => {
    this.setState({
      helpertext_open: true,
      helpertext_target: target,
      helpertext: text
    })
  }

  helperTextClose = () => {
    this.setState({
      helpertext_open: false,
      helpertext_target: null,
      helpertext: ''
    })
  }

  render() {
    return (
      <div>
        {this.props.children}
        {this.state.modal_open &&
          <BnModal handleClickOutside={this.modalClose} size={this.state.modal_size} >
            {this.state.modal_content}
          </BnModal>
        }
        {this.state.popover_open &&
          <BnPopover handleClickOutside={this.popoverClose} position={this.state.popover_position} target={this.state.popover_target} >
            {this.state.popover_content}
          </BnPopover>
        }
        {this.state.helpertext_open &&
          <BnTooltip text={this.state.helpertext} target={this.state.helpertext_target} />
        }
      </div>
    )
  }
}
