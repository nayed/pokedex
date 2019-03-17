import React from 'react'
import axios from 'axios'

interface Props {}

interface State {
  pokemonData: Object
  pokemonName: string
  dispatch: Function
}

const Context = React.createContext<{}>({})

const reducer = (state: State, action: any) => {
  switch (action.type) {
    case 'SEARCH_POKEMON':
      return { ...state, pokemonData: action.payload }
    case 'GET_POKEMON_NAME':
      return { ...state, pokemonName: action.payload }
    default:
      return state
  }
}

export class Provider extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      pokemonData: {},
      pokemonName: '',
      dispatch: (action: any) => this.setState(state => reducer(state, action))
    }
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export const Consumer = Context.Consumer
