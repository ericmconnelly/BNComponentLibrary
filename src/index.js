import React from 'react'
import ReactDOM from 'react-dom'

import BnAutocompleteSection from './demo/BnAutocompleteSection/bn-autocomplete-section'
import BnButtonSection from './demo/BnButtonSection/bn-button-section'
import BnCalendarSection from './demo/BnCalendarSection/bn-calendar-section'
import BnSearchInputSection from './demo/BnSearchInputSection/bn-search-input-section'
import { BnProvider } from './lib'

function Demo() {
  return (
    <BnProvider>
      <div id='docs-content' className='padding-40 active'>
        <div className="text-center">
          <div className="padding-40">
            <h1 className="margin-bottom-16">BN Design Docs</h1>
            <div className="margin-bottom-24">
              <div className="label notify bold-text">v0.0.0</div>
            </div>
          </div>
        </div>
        <div>
          <BnAutocompleteSection />
          <BnButtonSection />
          <BnCalendarSection />
          <BnSearchInputSection />
        </div>
      </div>
    </BnProvider>
  )
}

ReactDOM.render(
  <Demo />,
  document.getElementById('demo')
)
