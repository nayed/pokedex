import React from 'react'
import styled from 'styled-components'
import GlobalStyles from './globalStyles'
import Navbar from './Navbar'

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  // display: flex;
  // flex-direction: column;
  // min-height: 100vh;

  @media (min-width: 576px) {
    max-width: 540px;
  }

  @media (min-width: 768px) {
    max-width: 720px;
  }

  @media (min-width: 992px) {
    max-width: 960px;
  }

  @media (min-width: 1200px) {
    max-width: 1140px;
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
