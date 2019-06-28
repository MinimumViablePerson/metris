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

export const getNextPiece = (shapes) => {
  const shape = shapes[Math.floor(Math.random() * shapes.length)]
  const xOffset = 0
  const yOffset = 0
  return { shape, xOffset, yOffset }
}

const moveDown = piece => ({...piece, yOffset: piece.yOffset + 1})
const moveRight = piece => ({...piece, xOffset: piece.xOffset + 1})
const moveLeft = piece => ({...piece, xOffset: piece.xOffset - 1})
const rotatePiece = piece => ({...piece, shape: rotateShape(piece.shape)})
const newPiece = (_, newPiece) => newPiece

Mirror.model({
  name: 'piece2',
  initialState: getNextPiece(SHAPES, COLUMNS),
  reducers: {
    moveDown,
    moveRight,
    moveLeft,
    rotatePiece,
    newPiece
  },
  effects: {
    descend (_, getState) {
      const { piece2, board } = getState()
      if (pieceWillCollideBelow(piece2, board)) {
        actions.board.stickPiece(piece2)
        actions.piece2.nextPiece()
      } else {
        actions.piece2.moveDown()
      }
    },
    left (_, getState) {
      const { piece2, board } = getState()
      if (pieceWillCollideLeft(piece2, board)) return
      actions.piece2.moveLeft()
    },
    right (_, getState) {
      const { piece2, board } = getState()
      if (pieceWillCollideRight(piece2, board)) return
      actions.piece2.moveRight()
    },
    rotate (_, getState) {
      const { piece2, board } = getState()
      if (cannotRotate(piece2, board)) return
      actions.piece2.rotatePiece()
    },
    nextPiece (_, getState) {
      const { board, nextPiece2 } = getState()
      if (pieceOverlapsAnything(nextPiece2, board)) {
        console.error('Game over!')
      } else {
        actions.piece2.newPiece(nextPiece2)
        actions.nextPiece2.getNextPiece()
      }
    }
  }
})
