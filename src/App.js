import React from 'react'
import { connect } from 'mirrorx'

import Container from './components/Container'
import GameInfo from './components/GameInfo'
import GameDisplay from './components/GameDisplay'
import Header from './components/Header'
import Footer from './components/Footer'

import useGameInputs from './hooks/useGameInputs'
import useGameTicker from './hooks/useGameTicker'

const App = ({ tickSpeed }) => {

  useGameInputs()
  useGameTicker(tickSpeed, 60)

  return <Container>
    <Header>Welcome to Metris</Header>
    <GameInfo />
    <GameDisplay />
    <Footer>Made with ♥ by Nicolas</Footer>
  </Container>
}

const mapStateToProps = ({ tickSpeed }) => ({ tickSpeed })

export default connect(mapStateToProps)(App)
