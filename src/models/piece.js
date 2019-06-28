import Mirror, { actions } from 'mirrorx'

import { SHAPES, COLUMNS } from '../constants'

const rotateShape = shape => {
	const rotatedShape = []
	let currentIndex = 0

  const getCell = row => row[currentIndex]

	while (true) {
		const row = shape.map(getCell).reverse()

		if (row.every(cell => cell === undefined)) break

		rotatedShape.push(row)
 		currentIndex++
  }

	return rotatedShape
}

const pieceWillCollideBelow = (piece, board) =>
  piece.shape.some((row, rowIndex) => row.some((cell, cellIndex) => {
    if (cell === undefined) return false
  
    const nextRowIndex = rowIndex + piece.yOffset + 1
    const nextCellIndex = cellIndex + piece.xOffset

    const nextRow = board[nextRowIndex] || []

    return nextRow[nextCellIndex] !== ''
  }))

const pieceWillCollideLeft = (piece, board) =>
  piece.shape.some((row, rowIndex) => row.some((cell, cellIndex) => {
    const nextRowIndex = rowIndex + piece.yOffset
    const prevCellIndex = cellIndex + piece.xOffset - 1

    if (cell === undefined) return false
    return board[nextRowIndex][prevCellIndex] !== ''
  }))

const pieceWillCollideRight = (piece, board) =>
  piece.shape.some((row, rowIndex) => row.some((cell, cellIndex) => {
    const nextRowIndex = rowIndex + piece.yOffset
    const nextCellIndex = cellIndex + piece.xOffset + 1

    if (cell === undefined) return false
    return board[nextRowIndex][nextCellIndex] !== ''
  }))

const pieceOverlapsAnything = (piece, board) =>
  piece.shape.some((row, rowIndex) => row.some((cell, cellIndex) => {
    rowIndex += piece.yOffset
    cellIndex += piece.xOffset

    if (cell === undefined) return false
    return board[rowIndex][cellIndex] !== ''
  }))

const cannotRotate = (piece, board) => {
  const shape = rotateShape(piece.shape)
  return shape.some((row, rowIndex) => row.some((cell, cellIndex) => {
    const nextRowIndex = rowIndex + piece.yOffset
    const nextCellIndex = cellIndex + piece.xOffset

    if (cell === undefined) return false
    return board[nextRowIndex][nextCellIndex] !== ''
  }))
}

const getNextPiece = shapes => {
  const shape = shapes[Math.floor(Math.random() * shapes.length)]
  const xOffset = Math.floor(COLUMNS / 2)
  const yOffset = 0
  return { shape, xOffset, yOffset }
}

Mirror.model({
  name: 'piece',
  initialState: getNextPiece(SHAPES),
  reducers: {
    moveDown: piece => ({...piece, yOffset: piece.yOffset + 1}),
    moveRight: piece => ({...piece, xOffset: piece.xOffset + 1}),
    moveLeft: piece => ({...piece, xOffset: piece.xOffset - 1}),
    rotatePiece: piece => ({...piece, shape: rotateShape(piece.shape)}),
    newPiece: (_, newPiece) => newPiece
  },
  effects: {
    descend (_, getState) {
      const { piece, board } = getState()
      if (pieceWillCollideBelow(piece, board)) {
        actions.board.stickPiece(piece)
        actions.piece.nextPiece()
      } else {
        actions.piece.moveDown()
      }
    },
    left (_, getState) {
      const { piece, board } = getState()
      if (pieceWillCollideLeft(piece, board)) return
      actions.piece.moveLeft()
    },
    right (_, getState) {
      const { piece, board } = getState()
      if (pieceWillCollideRight(piece, board)) return
      actions.piece.moveRight()
    },
    rotate (_, getState) {
      const { piece, board } = getState()
      if (cannotRotate(piece, board)) return
      actions.piece.rotatePiece()
    },
    nextPiece (_, getState) {
      const { board } = getState()
      const piece = getNextPiece(SHAPES)
      if (pieceOverlapsAnything(piece, board)) {
        console.error('Game over!')
      } else {
        actions.piece.newPiece(piece)
      }
    }
  }
})
