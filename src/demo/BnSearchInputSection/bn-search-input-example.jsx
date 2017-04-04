import React from 'react'

import { BnSearchInput } from '../../lib'

export default function BnDatePickerExample(props, context) {
  return (
    <div className="docs-example">
      <div className="docs-canvas">
        <BnSearchInput handleChange={console.log} />
      </div>
    </div>
  )
}
