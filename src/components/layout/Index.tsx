import React from 'react'
import styled from 'styled-components'

import Layout from './Layout'
import Search from '../pokemon/Search'

const Index: React.StatelessComponent<{}> = (props: any) => {
  return (
    <>
      <Layout>
        <Search {...props} />
      </Layout>
    </>
  )
}

export default Index
