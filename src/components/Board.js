import React, { useEffect } from 'react'
import { connect, actions } from 'mirrorx'
import styled from 'styled-components'

import Row from './Row'

const Board = ({ board, className }) => {

  useEffect(() => {
    const handle = setInterval(actions.piece.moveDown, 1000)
    return () => clearInterval(handle)
  }, [])

  return <div className={className}>
    {
      board.map((cells, rowIndex) => <Row key={`row-${rowIndex}`} cells={cells} rowIndex={rowIndex} />)
    }
  </div>
}

const StyledBoard = styled(Board)`
  display: grid;
  grid-template-rows: repeat(20, 1fr);
  grid-template-columns: 1fr;
  width: 200px;
  grid-gap: 1px;
`

const mapStateToProps = ({ board }) => ({
  board
})

export default connect(mapStateToProps)(StyledBoard)
