import React, { useEffect } from 'react'

import Container from './components/Container'
import Board from './components/Board'
import Header from './components/Header'
import Footer from './components/Footer'
import { actions } from 'mirrorx/lib/mirror';

const App = () => {

  useEffect(() => {
    const listener = window.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') actions.piece.moveLeft()
      if (e.key === 'ArrowRight') actions.piece.moveRight()
      if (e.key === 'ArrowUp') actions.piece.rotate()
      if (e.key === 'ArrowDown') actions.piece.moveDown()
    })
    return () => window.removeEventListener('keydown', listener)
  }, [])

  return <Container>
    <Header>Welcome to Metris</Header>
    <Board />
    <Footer>Made with ♥ by Nicolas</Footer>
  </Container>
}


export default App
