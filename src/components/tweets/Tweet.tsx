import React from 'react'
import axios from 'axios'
import { TwitterTweetEmbed } from 'react-twitter-embed'
import styled from 'styled-components'

import Spinner from '../layout/Spinner'
import Box from '../layout/Box'

interface State {
  tweets: Array<Object> | null
}

const TW = styled(Box)`
  height: 35rem;
  overflow: scroll;
  padding: 0;
  width: 13rem;

  @media (max-width: 36rem) {
    margin: 0 auto;
    width: 20rem;
  }

  @media (min-width: 48rem) {
    margin: 0 auto;
    width: 19rem;
  }

  @media (min-width: 62rem) {
    margin: 0 auto;
    width: 26rem;
  }
`

class Tweet extends React.Component<any, State> {
  constructor(props: any) {
    super(props)

    this.state = { tweets: null }
  }

  componentDidMount() {
    axios
      .get(`https://pokedex-api.nayed.now.sh/tweets/${this.props.name}`)
      .then(res => this.setState({ tweets: res.data.statuses }))
  }

  render() {
    const { tweets } = this.state
    const { name } = this.props

    return tweets !== null ? (
      <TW>
        {tweets.map((item: any) => (
          <div key={item.id_str}>
            <TwitterTweetEmbed tweetId={item.id_str} />
          </div>
        ))}
      </TW>
    ) : (
      <Spinner />
    )
  }
}

export default Tweet
