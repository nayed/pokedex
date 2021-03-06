import React from 'react'
import axios from 'axios'
import styled from 'styled-components'

import { Consumer } from '../../context'
import Box from '../layout/Box'
import Preview from './Preview'
import Autosuggest from './Autosuggest'

import PokeSVG from '../../images/pokeball.svg'

const Pokeball = styled.img`
  height: 50px;
  vertical-align: middle;
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

interface State {}

class Search extends React.Component<Props, State> {
  render() {
    return (
      <Consumer>
        {(value: any) => {
          const { pokemonData } = value
          return (
            <>
              <Box>
                <H1>Search a Pokemon</H1>
                <div style={{ display: 'inline-flex' }}>
                  <Autosuggest />
                </div>
              </Box>
              {Object.keys(pokemonData).length > 0 && (
                <Preview {...pokemonData} {...this.props} />
              )}
            </>
          )
        }}
      </Consumer>
    )
  }
}

export default Search
