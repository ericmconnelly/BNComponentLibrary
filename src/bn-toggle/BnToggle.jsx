import React from 'react'

export default function BnToggle(props) {
  const rightMargin = `margin-right-${props.rightMargin}`

  return (
    <div className={`toggle-wrap ${props.rightMargin ? rightMargin : ''}`}>
      <div className="toggle" />
      <label>
        {props.label}
      </label>
    </div>
  )
}
