import React from 'react'

import BnSearchInputExample from './bn-search-input-example'
import BnSearchInputText from './bn-search-input-text'

export default function BnSearchInputSection() {
  return (
    <section className="docs-section docs-section-search-input">
      <h2 id="search-input" className="docs">Search Input</h2>

      <section className="docs-block docs-section-search-input">
        <BnSearchInputText />
        <BnSearchInputExample />
      </section>
    </section>
  )
}
