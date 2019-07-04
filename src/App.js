import React from 'react'
import { connect } from 'mirrorx'

import Container from './components/Container'
import PlayButton from './components/PlayButton'
import GameInfo from './components/GameInfo'
import GameDisplay from './components/GameDisplay'
import Header from './components/Header'
import Footer from './components/Footer'

import useGameInputs from './hooks/useGameInputs'
import useGameTicker from './hooks/useGameTicker'

const App = ({ tickSpeed, playing }) => {

  useGameInputs()
  useGameTicker(tickSpeed, 60, playing)

  return <Container>
    <Header>Welcome to Metris</Header>
    {
      !playing && <PlayButton />
    }
    {
      playing &&
        <>
        <GameInfo />
        <GameDisplay />
        </>
    }
    <Footer>Made with ♥ by Nicolas</Footer>
  </Container>
}

const mapStateToProps = ({ tickSpeed, playing }) => ({ tickSpeed, playing })

export default connect(mapStateToProps)(App)
