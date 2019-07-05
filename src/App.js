import React from 'react'
import { connect } from 'mirrorx'

import Container from './components/Container'
import PlayerInput from './components/PlayerInput'
import PlayButton from './components/PlayButton'
import Leaderboard from './components/Leaderboard'
import Game from './components/Game'
import Header from './components/Header'
import Footer from './components/Footer'

import useGameInputs from './hooks/useGameInputs'
import useGameTicker from './hooks/useGameTicker'

const App = ({ tickSpeed, playing, player }) => {

  useGameInputs()
  useGameTicker(tickSpeed, 60, playing)

  return <Container>
    <Header>{`Welcome to Metris${player ? `, ${player}.` : '' }`}</Header>
    { !playing && <Leaderboard /> }
    {
      !player
      ? <PlayerInput />
      : !playing
      ? <PlayButton />
      : <Game />
    }
    <Footer>Made with ♥ by Nicolas</Footer>
  </Container>
}

const mapStateToProps = ({ tickSpeed, playing, player }) => ({ tickSpeed, playing, player })

export default connect(mapStateToProps)(App)
