import React from 'react'

import BnTypeaheadText from './bn-typeahead-text'
import BnTypeaheadExample from './bn-typeahead-example'

export default function BnAutocompleteSection() {
  return (
    <section className="docs-section docs-section-autocomplete">
      <h2 id="autocomplete" className="docs">Autocomplete</h2>

      <section className="docs-block docs-section-typeahead">
        <BnTypeaheadText />
        <BnTypeaheadExample />
      </section>
    </section>
  )
}
