import React from 'react'
import axios from 'axios'
import { TwitterTweetEmbed } from 'react-twitter-embed'
import styled from 'styled-components'

import Spinner from '../layout/Spinner'
import Box from '../layout/Box'

interface State {
  tweets: Array<Object>
}

const TW = styled(Box)`
  height: 35rem;
  margin: 1rem 0 2rem 0;
  overflow: scroll;
  padding: 0;
  width: 25rem;
`

class Tweet extends React.Component<any, any> {
  constructor(props: any) {
    super(props)

    this.state = { tweets: null }
  }

  componentDidMount() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://pokedex-api.nayed.now.sh/tweets/${
          this.props.name
        }`
      )
      .then(res => this.setState({ tweets: res.data.statuses }))
  }

  render() {
    const { tweets } = this.state
    const { name } = this.props

    return tweets !== null ? (
      <>
        Latest tweets about {name}:
        <TW>
          {tweets.map((item: any) => (
            <div key={item.id_str}>
              <TwitterTweetEmbed tweetId={item.id_str} />
            </div>
          ))}
        </TW>
      </>
    ) : (
      <Spinner />
    )
  }
}

export default Tweet
