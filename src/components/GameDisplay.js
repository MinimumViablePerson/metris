import React from 'react'
import styled from 'styled-components'

import Canvas from './Canvas'
import NextPiece from './NextPiece'

const GameDisplay = ({ className }) =>
  <div className={className}>
    <NextPiece side='left' />
    <Canvas />
    <NextPiece side='right' />
  </div>

const StyledGameDisplay = styled(GameDisplay)`
  display:  flex;
  flex-wrap: wrap;
  align-items: center;
`

export default StyledGameDisplay
