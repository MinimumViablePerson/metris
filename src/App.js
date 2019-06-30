import React from 'react'
import { connect } from 'mirrorx'

import Container from './components/Container'
import Score from './components/Score'
import Canvas from './components/Canvas'
import Header from './components/Header'
import Footer from './components/Footer'
import NextPiece from './components/NextPiece'

import useGameInputs from './hooks/useGameInputs'
import useGameTicker from './hooks/useGameTicker'

const App = ({ tickSpeed }) => {

  useGameInputs()
  useGameTicker(tickSpeed, 60)

  return <Container>
    <Header>Welcome to Metris</Header>
    <h3>Tick speed: {tickSpeed}</h3>
    <Score />
    <NextPiece side='left' />
    <Canvas />
    <NextPiece side='right' />
    <Footer>Made with ♥ by Nicolas</Footer>
  </Container>
}

const mapStateToProps = ({ tickSpeed }) => ({ tickSpeed })

export default connect(mapStateToProps)(App)
