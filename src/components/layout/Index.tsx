import React from 'react'
import styled from 'styled-components'

import Layout from './Layout'
import Search from '../pokemon/Search'

const Index: React.StatelessComponent<{}> = () => {
  return (
    <>
      <Layout>
        <Search />
      </Layout>
    </>
  )
}

export default Index
