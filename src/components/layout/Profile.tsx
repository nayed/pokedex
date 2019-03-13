import React from 'react'

import Layout from './Layout'
import Pokemon from '../pokemon/Pokemon'

class Profile extends React.Component {
  render() {
    return (
      <>
        <Layout>
          <Pokemon {...this.props} />
        </Layout>
      </>
    )
  }
}

export default Profile
