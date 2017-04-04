import React, { PropTypes, PureComponent } from 'react'
import debounce from 'lodash/debounce'
import filter from 'lodash/filter'
import includes from 'lodash/includes'
import isEmpty from 'lodash/isEmpty'

import { ClearButton, Input, InputWrapper, SearchIcon, Wrapper } from './styled-components'
import SuggestionsList from './SuggestionsList'

const { array, func, number, string } = PropTypes

export default class BnTypeahead extends PureComponent {
  static propTypes = {
    debounce: number,
    input_placeholder: string,
    no_results_placeholder: string,
    source: array.isRequired,
    text_key: string,
    handleSelect: func.isRequired,
    suggestionFilter: func,
    suggestionTemplate: func,
  }

  static defaultProps = {
    debounce: 250,
    no_results_placeholder: 'No results matching',
  }

  defaultFilter = (text_input, suggestion) => {
    return includes(this.suggestionText(suggestion).toLowerCase(), text_input.toLowerCase())
  }
  
  defaultTemplate = (suggestion) => {
    return <div className="stretch">{this.suggestionText(suggestion)}</div>
  }

  constructor(props) {
    super(props)

    this.defaultState = {
      filtered_suggestions: [],
      is_loading: false,
      show_dropdown: false,
      text_input: '',
    }

    this.state = { ...this.defaultState }
  }

  handleClear = () => {
    this.input.value = ''
    this.setState({ ...this.defaultState })
  }

  handleInputChange = ({ target }) => {
    const { value } = target
    const not_empty = !isEmpty(value)
    
    this.filterSuggestions(value)
    this.setState({ is_loading: not_empty, show_dropdown: not_empty, text_input: value })
  }

  handleSelect = (selection, idx) => {
    this.props.handleSelect(selection)
    this.setState({ show_dropdown: false, text_input: this.suggestionText(selection) })
  }
 
  filterSuggestions = debounce((text_input) => {
    const suggestionFilter = this.props.suggestionFilter || this.defaultFilter
    const suggestions = filter(this.props.source, (suggestion) => suggestionFilter(text_input, suggestion))

    this.setState({ filtered_suggestions: suggestions.sort(this.suggestionSorter), is_loading: false  })
  }, this.props.debounce)

  suggestionSorter = (a, b) => {
    return this.suggestionText(a) > this.suggestionText(b) ? 1 : -1
  }

  suggestionText = (suggestion, text_key = this.props.text_key) => {
    return text_key ? suggestion[text_key] : suggestion
  }

  render() {
    const { filtered_suggestions, is_loading, show_dropdown, text_input } = this.state
    const { input_placeholder, no_results_placeholder, panel, popover, suggestionTemplate } = this.props
    const styleProps = { panel, popover }

    return (
      <Wrapper {...styleProps}>
        <InputWrapper>
          <SearchIcon className="icon-search" {...styleProps} />
          <Input
            innerRef={ref => this.input = ref}
            placeholder={input_placeholder}
            type="text"
            onChange={this.handleInputChange}
            {...styleProps}
          />

          {show_dropdown &&
            <ClearButton 
              className="button icon-only no-bg"
              onClick={this.handleClear}
              {...styleProps}
            >
              <i className="icon-circle-x" />
            </ClearButton>
          }
        </InputWrapper>

        {show_dropdown &&
          <SuggestionsList
            filtered_suggestions={filtered_suggestions}
            handleSelect={this.handleSelect}
            is_loading={is_loading}
            no_results_placeholder={no_results_placeholder}
            suggestionTemplate={suggestionTemplate || this.defaultTemplate}
            suggestionText={this.suggestionText}
            text_input={text_input}
          />
        }
      </Wrapper>
    )
  }
}
