import React from 'react'
import styled from 'styled-components'

const Nav = styled.nav`
  background: #ff6666;
  border-color: #d84a4a;
  border-style: solid;
  border-width: 0 1px 4px 1px;
  color: #ffffff;
  margin-bottom: 3rem;
  padding-bottom: 1rem;
  padding-top: 1rem;
  text-align: center;

  span {
    font-size: 2rem;
  }
`

const Navbar: React.StatelessComponent<{}> = () => {
  return (
    <Nav>
      <span>Pokedex</span>
    </Nav>
  )
}

export default Navbar
