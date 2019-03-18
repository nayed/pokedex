import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Preview from './Preview'
import Spinner from '../layout/Spinner'
import Box from '../layout/Box'
import Tweet from '../tweets/Tweet'

interface State {
  name: string
  data: any
}

const A = styled(Link)`
  background-color: #555;
  border: 1px solid transparent;
  border-color: #000;
  border-radius: 0.25rem;
  color: #fff;
  display: inline-block;
  margin-bottom: 1rem;
  padding: 0.375rem 0.75rem;
  text-decoration: none;
`

const Description = styled(Box)`
  text-align: left;
`

const Table = styled.table`
  background: #fff;
  border: 1px solid grey;
  border-radius: 0.25rem;
  border-width: 1px 1px 4px 1px;
  margin-bottom: 2rem;
  width: 100%;

  th {
    font-size: 1.2rem;
  }

  th,
  td {
    border-bottom: 1px solid #dee2e6;
    padding: 0.75rem;
  }

  tbody tr td {
    text-transform: capitalize;

    &:first-child {
      border-right: 1px solid #dee2e6;
    }
    &:last-child {
      text-align: center;
    }
  }
`

const StatsTweetsArea = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const StatsTweets = styled.div`
  flex: 0 0 50%;
  padding: 1rem;

  @media (max-width: 576px) {
    flex: 1 1 auto;
  }
`

class Pokemon extends React.Component<any, State> {
  constructor(props: any) {
    super(props)

    this.state = { name: this.props.match.params.name, data: {} }
  }

  componentDidMount() {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${this.state.name}`)
      .then(res => {
        this.setState({ data: res.data })

        return axios(`https://pokeapi.co/api/v2/pokemon-species/${res.data.id}`)
      })
      .then(res => {
        const { data } = this.state
        const pokemonSpecies = res.data
        this.setState({ data: { ...data, ...pokemonSpecies } })
      })
      .catch(err => console.log(err))
  }

  description(desc: Array<Object>) {
    const msg: any = desc.find((item: any) => item.language.name === 'en')
    return <Description>{msg.flavor_text}</Description>
  }

  stats(stats: Array<Object>) {
    stats.sort((a: any, b: any) => a.stat.name.localeCompare(b.stat.name))

    return (
      <Table>
        <thead>
          <tr>
            <th colSpan={2}>Base Stats</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((item: any) => (
            <tr key={stats.indexOf(item)}>
              <td>{item.stat.name}</td>
              <td>{item.base_stat}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }

  render() {
    const { data, name } = this.state
    const center = 'center'
    if (Object.keys(data).length > 0) {
      return (
        <>
          <A to="/" className="btn btn-dark btn-sm mb-4">
            Go back
          </A>

          <Preview {...data} {...this.props} />

          {data.flavor_text_entries &&
            this.description(data.flavor_text_entries)}

          <StatsTweetsArea>
            <StatsTweets>{data.stats && this.stats(data.stats)}</StatsTweets>
            <StatsTweets>
              <Tweet name={name} />
            </StatsTweets>
          </StatsTweetsArea>
        </>
      )
    } else {
      return <Spinner />
    }
  }
}

export default Pokemon
