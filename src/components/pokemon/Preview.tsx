import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import B from '../layout/Box'

const Box = styled(B)`
  margin: 0 1rem 1rem 1rem;
`

const Name = styled(Box)`
  font-size: 1.2rem;

  &::first-letter {
    text-transform: capitalize;
  }
`

const Img = styled.img`
  height: 10rem;
`

const Data = styled(Box)`
  background-color: #c5283d;
  border-color: #73000f;
  color: #fff8f0;
  text-align: left;

  ul {
    margin-top: -0.8rem;
  }
`

const ResultArea = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const ResultDataArea = styled.div`
  flex: 0 0 50%;

  @media (max-width: 36rem) {
    flex: 1 1 auto;
  }
`

const A = styled(Link)`
  margin: 1rem auto;

  &:link {
    text-decoration: none;
  }

  &:visited {
    color: inherit;
    text-decoration: none;
  }
`

const LinkProfile = styled(Box)`
  background-color: #577590;
  border-color: #183752;
  color: #fff8f0;
  font-size: 1.25rem;
`

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

const Preview: React.StatelessComponent<any> = (props: any) => {
  return (
    <ResultArea>
      <ResultDataArea>
        <Name>
          #{props.id} · {capitalize(props.name)}
        </Name>
        <Box>
          <Img src={props.sprites.front_default} />
        </Box>
      </ResultDataArea>

      <ResultDataArea>
        <Data>
          <p>Abilities:</p>
          <ul>
            {props.abilities.map((ability: any) => (
              <li key={props.abilities.indexOf(ability)}>
                {ability.ability.name}
              </li>
            ))}
          </ul>

          <p>Height: {props.height / 10} meters</p>

          <p>Types:</p>
          <ul>
            {props.types.map((type: any) => (
              <li key={props.types.indexOf(type)}>{type.type.name}</li>
            ))}
          </ul>

          <p>Weight: {props.weight / 10} kg</p>
        </Data>
      </ResultDataArea>
      {props.location &&
        props.location.pathname &&
        props.location.pathname === '/' && (
          <A to={`/profile/${props.name}`}>
            <LinkProfile>Go to {capitalize(props.name)} profile </LinkProfile>
          </A>
        )}
    </ResultArea>
  )
}

export default Preview
