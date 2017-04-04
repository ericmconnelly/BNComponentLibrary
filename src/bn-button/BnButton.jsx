import React from 'react'
import cx from 'classnames'

import addTooltip from '../bn-tooltip/addTooltip'

export default function BnButton(props) {
  const { 
    active,
    children,
    className,
    danger,
    dark,
    disabled,
    expand,
    getRef,
    icon,
    iconOnly,
    large,
    marginRight4,
    onClick,
    onMouseEnter,
    onMouseLeave,
    noBg,
    notify,
    primary,
    small,
    style,
    tooltip
  } = props

  const classes = cx({
    active,
    danger,
    dark,
    expand,
    'icon-only': iconOnly,
    large,
    'margin-right-4': marginRight4,
    'no-bg': noBg,
    notify,
    primary,
    small,
  })

  return (
    <button
      className={`button ${classes} ${className || ''}`}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={style}
      ref={ref => {
        tooltip && addTooltip(ref, tooltip)
        getRef && ref && getRef(ref)
      }}
    >
      <i className={icon} />
      {children}
    </button>
  )
}
