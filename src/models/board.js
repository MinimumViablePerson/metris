import Mirror from 'mirrorx'

import { ROWS, COLUMNS } from '../constants'
import { actions } from 'mirrorx'
import API from '../services/API'

const initialState = [...Array(ROWS)].map(() => Array(COLUMNS).fill(''))

const rowIsNotFull = row => row.some(cell => cell === '')

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
    update: (_, newBoard) => newBoard,
    reset: () => initialState
  },
  effects: {
    stickPiece (piece, getState) {
      const { board } = getState()
      const withPiece = stickPiece(board, piece)
      const { rowsCleared, newBoard } = clearEmptyRows(withPiece)

      actions.score.clearedRows(rowsCleared)
      actions.board.update(newBoard)
    },
    async gameOver (_, getState) {
      const { player, score } = getState()
      API.createScore(player, score)
      actions.board.reset()
      actions.leftPiece.reset()
      actions.rightPiece.reset()
      actions.tickSpeed.reset()
      actions.score.reset()
      actions.leaderboard.fetch()
      actions.playing.stop()
    }
  }
})
