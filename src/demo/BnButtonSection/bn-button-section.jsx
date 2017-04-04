import React from 'react'

import BnButtonText from './bn-button-text'
import BnButtonExample from './bn-button-example'
import BnButtonGroupText from './bn-button-group-text'
import BnButtonGroupExample from './bn-button-group-example'

export default function BnButtonSection() {
  return (
    <section className="docs-section docs-section-button">
      <h2 id="button" className="docs">Buttons</h2>
      <section className="docs-block docs-section-all-button-options">
        <BnButtonText />
        <BnButtonExample />
      </section>
      
      <section className="docs-block docs-section-button-group">
        <BnButtonGroupText />
        <BnButtonGroupExample />
      </section>
    </section>
  )
}
