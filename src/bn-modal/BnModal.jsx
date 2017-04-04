import React, { Component, PropTypes } from 'react'
import noop from 'lodash/noop'
import cx from 'classnames'

const { func, string } = PropTypes

export default class BnModal extends Component {
  static propTypes = {
    handleClickOutside: func,
    size: string
  }

  static defaultProps = {
    handleClickOutside: noop,
    size: ''
  }

  handleClickOutside = ({target}) => {
    if (target === this.container) this.props.handleClickOutside()
  }

  render(){
    const class_name = cx({
      'mac-modal-overlay': true,
      [`modal-${this.props.size}`]: this.props.size,
      visible: true,
    })

    return(
      <div 
        className={class_name}
        onClick={this.handleClickOutside}
        ref={ref => this.container = ref}
      >
        {this.props.children}
      </div>
    )
  }
}
