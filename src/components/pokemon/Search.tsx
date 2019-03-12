import React from 'react'
import axios from 'axios'
import styled from 'styled-components'

import { Consumer } from '../../context'
import Preview from './Preview'

import PokeSVG from '../../images/pokeball.svg'

const Pokeball = styled.img`
  height: 50px;
  vertical-align: middle;
`

const Box = styled.div`
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-color: grey;
  border-radius: 0.25rem;
  border-width: 1px 1px 4px 1px;
  margin-bottom: 3rem;
  padding: 1.25rem;
  text-align: center;
`

const H1 = styled.h1`
  font-family: 'Titillium Web', sans-serif;
  font-size: 3rem;
  font-weight: 300;
  line-height: 1.2;
`

const Input = styled.input`
  border: 1px solid #ced4da;
  box-shadow: inset 0 2px 0 rgba(0, 0, 0, 0.075);
  color: #555;
  font-size: 1.3rem;
  height: 3.125rem;
  margin-right: 1rem;
  padding: 0.4rem 1rem;
  vertical-align: middle;
  width: 18rem;
`

const Btn = styled.button`
  background-color: transparent;
  border-color: transparent;
`

interface Props {}

interface State {
  pokemonName: string
}

class Search extends React.Component<Props, State> {
  state: State = { pokemonName: '' }

  findPokemon = (dispatch: any, e: any) => {
    e.preventDefault()

    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${this.state.pokemonName}`)
      .then(res => {
        dispatch({
          type: 'SEARCH_POKEMON',
          payload: res.data
        })
      })
      .catch(err => console.log(err))
  }

  onChange = (e: any) => {
    this.setState({ pokemonName: e.target.value })
  }

  render() {
    return (
      <Consumer>
        {(value: any) => {
          const { dispatch, pokemonData } = value
          console.log(pokemonData)
          return (
            <>
              <Box>
                <H1>Search a Pokemon</H1>
                <form onSubmit={this.findPokemon.bind(this, dispatch)}>
                  <Input
                    placeholder="Enter Pokemon name or ID"
                    value={this.state.pokemonName}
                    name="pokemonName"
                    onChange={this.onChange}
                  />
                  <Btn type="submit">
                    <Pokeball src={PokeSVG} alt="pokeball svg" />
                  </Btn>
                </form>
              </Box>
              {Object.keys(pokemonData).length > 0 && (
                <Preview {...pokemonData} />
              )}
            </>
          )
        }}
      </Consumer>
    )
  }
}

export default Search
