import React from 'react'
import axios from 'axios'
import RAS from 'react-autosuggest'
import styled from 'styled-components'

import { Consumer } from '../../context'

const theme: Object = {
  container: {
    position: 'relative'
  },
  input: {
    width: '17rem',
    height: '3.125rem',
    padding: '10px 20px',
    fontSize: '1.25rem',
    border: '1px solid #aaa',
    borderRadius: '4px'
  },
  inputFocused: {
    outline: 'none'
  },
  inputOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  suggestionsContainer: {
    display: 'none'
  },
  suggestionsContainerOpen: {
    display: 'block',
    position: 'absolute',
    top: 51,
    width: '17rem',
    border: '1px solid #aaa',
    backgroundColor: '#fff',
    fontSize: '1.25rem',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    zIndex: 2
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none'
  },
  suggestion: {
    cursor: 'pointer',
    padding: '10px 20px'
  },
  suggestionHighlighted: {
    backgroundColor: '#ddd'
  }
}

interface Props {}

interface State {
  value: string
  suggestions: Array<Object>
  names: Array<string>
}

class Autosuggest extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      value: '',
      suggestions: [],
      names: []
    }
  }

  componentDidMount() {
    axios
      .get('https://pokeapi.co/api/v2/pokedex/1')
      .then(res => {
        const names: Array<string> = res.data.pokemon_entries.map(
          (item: any) => item.pokemon_species.name
        )
        this.setState({
          suggestions: names,
          names
        })
      })
      .catch(err => console.error(err))
  }

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions: any = (value: string) => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length
    const { names } = this.state

    return inputLength === 0
      ? []
      : names.filter(
          (name: any) => name.toLowerCase().slice(0, inputLength) === inputValue
        )
  }

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue = (suggestion: any) => suggestion

  // Use your imagination to render suggestions.
  renderSuggestion = (suggestion: any) => <div>{suggestion}</div>

  onChange = (event: any, { newValue }: any) => {
    this.setState({
      value: newValue
    })
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }: any) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    })
  }

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    })
  }

  onSuggestionSelected = (
    dispatch: Function,
    pokemonName: string,
    e: React.FormEvent<any>,
    request: RAS.SuggestionSelectedEventData<any>
  ) => {
    if (pokemonName !== request.suggestion) {
      this.fetchPokemonData(dispatch, request.suggestion)
    }

    dispatch({
      type: 'GET_POKEMON_NAME',
      payload: request.suggestion
    })
  }

  fetchPokemonData = (dispatch: Function, pokemonName: string) => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then(res => {
        dispatch({
          type: 'SEARCH_POKEMON',
          payload: res.data
        })
      })
      .catch(err => console.log(err))
  }

  onSubmit = (dispatch: Function, e: any) => {
    e.preventDefault()

    this.fetchPokemonData(dispatch, e.target[0].value)
  }

  render() {
    const { value, suggestions } = this.state

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type a pokemon name',
      value,
      onChange: this.onChange
    }

    return (
      <Consumer>
        {(context: any) => {
          // console.log(context)
          const { dispatch, pokemonName } = context
          return (
            <form onSubmit={this.onSubmit.bind(this, dispatch)}>
              <RAS
                theme={theme}
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                onSuggestionSelected={this.onSuggestionSelected.bind(
                  this,
                  dispatch,
                  pokemonName
                )}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
              />
            </form>
          )
        }}
      </Consumer>
    )
  }
}

export default Autosuggest
