import React from 'react'
import { connect } from 'mirrorx'
import styled from 'styled-components'

const GameInfo = ({ score, tickSpeed, className }) =>
  <div className={className}>
    <h2>Score: {score}</h2>
    <h3>Tick speed: {tickSpeed}</h3>
  </div>

const StyledGameInfo = styled(GameInfo)`
  width: 100%;

  h2, h3 {
    text-align: center;
  }
`

export default connect(({ score, tickSpeed }) => ({ score, tickSpeed }))(StyledGameInfo)
