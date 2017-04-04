import React, { PureComponent } from 'react'

import { BnTypeahead } from '../../lib'
import { registerComponent } from '../../lib'
import { data } from '../data'

export default class BnTypeaheadExample extends PureComponent {
  render () {
    const typeaheadProps = {
      handleSelect: (selection) => this.context.popoverOpen(
        this.target,
        <BnTypeahead
          handleSelect={typeaheadProps.handleSelect}
          suggestionTemplate={typeaheadProps.suggestionTemplate}
          input_placeholder={typeaheadProps.input_placeholder}
          source={typeaheadProps.source}
          text_key={typeaheadProps.text_key}
        />
      ),
      input_placeholder: 'Search people',
      source: data,
      suggestionTemplate: (suggestion) => [
        <div key="pre" className="pre">
          <div className="avatar small">
            <img alt="" src={suggestion.avatar} />
          </div>
        </div>,
        <div key="stretch" className="stretch">{suggestion.name}</div>
      ],
      text_key: 'name'
    }

    return (
      <div className="docs-example">
        <div ref={ref => this.target = ref} className="docs-canvas">
          <BnTypeahead
            handleSelect={typeaheadProps.handleSelect}
            suggestionTemplate={typeaheadProps.suggestionTemplate}
            input_placeholder={typeaheadProps.input_placeholder}
            source={typeaheadProps.source}
            text_key={typeaheadProps.text_key}
          />
        </div>
      </div>
    )
  }
}

registerComponent(BnTypeaheadExample)
