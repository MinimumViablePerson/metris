import React from 'react'

import Container from './components/Container'
import Score from './components/Score'
import Canvas from './components/Canvas'
import Header from './components/Header'
import Footer from './components/Footer'
import Gamepad from './components/Gamepad'

import useGameLogic from './hooks/useGameLogic'

const App = () => {

  useGameLogic()

  return <Container>
    <Header>Welcome to Metris</Header>
    <Score />
    <Canvas />
    <Gamepad />
    <Footer>Made with ♥ by Nicolas</Footer>
  </Container>
}


export default App
