import Mirror from 'mirrorx'

import { ROWS, COLUMNS } from '../constants'
import { actions } from 'mirrorx/lib/mirror';

const initialState = [...Array(ROWS)].map(() => Array(COLUMNS).fill(''))

// const countIf = (array, predicate) =>
//   array.reduce((acc, item) => predicate(item) ? acc + 1 : acc, 0)

const rowIsNotFull = row => row.some(cell => cell === '')
// const rowIsFull = row => row.ever(cell => cell !== '')

const clearEmptyRows = board => {
  let rowsCleared = 0
  const newBoard = []
  for (const row of board) {
    if (rowIsNotFull(row)) {
      newBoard.push(row)
    } else {
      rowsCleared++
      const emptyRow = Array(COLUMNS).fill('')
      newBoard.unshift(emptyRow)
    }
  }
  return { rowsCleared, newBoard }
}

const stickPiece = (board, piece) =>
  board.map((row, rowIndex) => row.map((cell, cellIndex) => {
    const row = piece.shape[rowIndex - piece.yOffset] || []
    const newCell = row[cellIndex - piece.xOffset]
    return newCell || cell
  }))

Mirror.model({
  name: 'board',
  initialState,
  reducers: {
    updateBoard: (_, newBoard) => newBoard
  },
  effects: {
    stickPiece (piece, getState) {
      const { board } = getState()
      const withPiece = stickPiece(board, piece)
      const { rowsCleared, newBoard } = clearEmptyRows(withPiece)

      actions.score.clearedRows(rowsCleared)
      actions.board.updateBoard(newBoard)
    }
  }
})
