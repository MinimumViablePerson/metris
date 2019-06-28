import React from 'react'
import { connect } from 'mirrorx'
import styled from 'styled-components'

const Score = ({ score, className }) =>
  <div className={className}>
    <h2>Score: {score}</h2>
  </div>

const StyledScore = styled(Score)`
  width: 100%;

  h2 {
    text-align: center;
  }
`

export default connect(({ score }) => ({ score }))(StyledScore)
