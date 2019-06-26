import React from 'react'
import styled from 'styled-components'
import { connect, actions } from 'mirrorx'

const colors = {
  red: '#e34',
  green: '#3e4',
  blue: '#34e',
  yellow: '#3ee',
  orange: '#e93',
  '': '#ddd'
}

const Cell = ({ className, board, piece, rowIndex, colIndex }) => {
  const row = rowIndex - piece.yOffset
  const col = colIndex - piece.xOffset
  const color = piece.shape[row] && piece.shape[row][col]
    ? piece.shape[row][col]
    : board[rowIndex][colIndex]

  return <div
    onClick={actions.piece.moveRight}
    className={className}
    style={{ background: colors[color] }}
  />
}

const StyledCell = styled(Cell)`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 20px;
`

const mapStateToProps = ({ piece, board }) => ({ piece, board })

export default connect(mapStateToProps)(StyledCell)
