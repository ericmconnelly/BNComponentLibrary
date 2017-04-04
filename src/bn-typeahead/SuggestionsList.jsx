import React from 'react'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'

import { ListWrapper } from './styled-components'
import BnLoader from '../bn-loader/BnLoader'

const renderLoading = () => {
  return <div className="placeholder"><BnLoader /></div>
}

const renderNoResults = ({ no_results_placeholder, text_input }) => {
  return (
    <div className="placeholder">
      <div>{no_results_placeholder}</div>
      <b>{text_input}</b>
    </div>
  )
}

const renderResults = (props) => {
  const { filtered_suggestions, handleSelect, suggestionTemplate, suggestionText } = props

  if (isEmpty(filtered_suggestions)) return renderNoResults(props)

  return (
    <ul className="select-list small">
    {
      map(filtered_suggestions, (suggestion) => (
        <li key={suggestionText(suggestion)} onClick={() => handleSelect(suggestion)}>
          {suggestionTemplate(suggestion, props)}
        </li>
      ))
    }
    </ul>
  )
}

export default function SuggestionsList(props) {
  return <ListWrapper id="suggestions-list">{props.is_loading ? renderLoading(props) : renderResults(props)}</ListWrapper>
}
