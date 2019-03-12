import React from 'react'
import axios from 'axios'

interface Props {}

interface State {
  pokemonData: Object
  dispatch: Function
}

const Context = React.createContext<{}>({})

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SEARCH_POKEMON':
      return { ...state, pokemonData: action.payload }
    default:
      return state
  }
}

export class Provider extends React.Component<{}, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      pokemonData: {},
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
