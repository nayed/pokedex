import React from 'react'
import styled from 'styled-components'
import GlobalStyles from './globalStyles'
import Navbar from './Navbar'

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;

  @media (min-width: 36rem) {
    max-width: 33.75rem;
  }

  @media (min-width: 48rem) {
    max-width: 45rem;
  }

  @media (min-width: 62rem) {
    max-width: 60rem;
  }

  @media (min-width: 75rem) {
    max-width: 71.25rem;
  }
`

const Main = styled.main`
  // flex: 1;
`

const Layout: React.StatelessComponent<{}> = ({ children }) => {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <Container>
        <Main>{children}</Main>
      </Container>
    </>
  )
}

export default Layout
