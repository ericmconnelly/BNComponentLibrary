import React, { PureComponent } from 'react'
import cx from 'classnames'

export default class BnButtonGroup extends PureComponent {
  render() {
    const classes = cx({
      'button-group': true,
      'margin-right-12': this.props.marginRight12
    })

    return (
      <div className={`${classes} ${this.props.className}`}>
        {this.props.children}
      </div>
    )
  }
}
