import React from 'react'
import styled from 'styled-components'

const Box = styled.div`
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-color: grey;
  border-radius: 0.25rem;
  border-width: 1px 1px 4px 1px;
  margin: 0 1rem 1rem 1rem;
  padding: 1.25rem;
  text-align: center;
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
  color: #ffffff;
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

  @media (max-width: 576px) {
    flex: 1 1 auto;
  }
`

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

const Preview: React.StatelessComponent<{}> = (props: any) => {
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
    </ResultArea>
  )
}

export default Preview
