import Mirror, { actions } from 'mirrorx'

const pieces = [
  {
    shape: [
      ['red'],
      ['red'],
      ['red'],
      ['red']
    ],
    xOffset: 0,
    yOffset: 0
  },
  {
    shape: [
      ['yellow','yellow'],
      ['yellow','yellow']
    ],
    xOffset: 0,
    yOffset: 0
  },
  {
    shape: [
      ['blue'],
      ['blue'],
      ['blue','blue']
    ],
    xOffset: 0,
    yOffset: 0
  },
  {
    shape: [
      ['', 'green'],
      ['', 'green'],
      ['green','green']
    ],
    xOffset: 0,
    yOffset: 0
  }
]

const initialState = pieces[2]

const rotateShape = shape => {
	const rotatedShape = []
	let currentIndex = 0
	
	while (true) {
		const row = shape.map(piece => piece[currentIndex]).reverse()
		
		if (row.every(cell => cell === undefined)) break

		rotatedShape.push(row)
 		currentIndex++
  }

	return rotatedShape
}

const pieceWillCollideBelow = (piece, board) =>
  piece.shape.some((row, rowIndex) => row.some(cell => {
    const nextRow = rowIndex + piece.yOffset + 1

    if (cell === undefined) return false
    return board[nextRow] === undefined
  }))

const pieceWillCollideLeft = (piece, board) =>
  piece.shape.some((row, rowIndex) => row.some((cell, cellIndex) => {
    const prevCell = cellIndex + piece.xOffset - 1

    if (cell === undefined) return false
    return  board[rowIndex][prevCell] === undefined
  }))

const pieceWillCollideRight = (piece, board) =>
  piece.shape.some((row, rowIndex) => row.some((cell, cellIndex) => {
    const nextCell = cellIndex + piece.xOffset + 1

    if (cell === undefined) return false
    return  board[rowIndex][nextCell] === undefined
  }))

const getNextPiece = () => pieces[Math.floor(Math.random() * pieces.length)]

Mirror.model({
  name: 'piece',
  initialState,
  reducers: {
    moveDown (piece) {
      return {...piece, yOffset: piece.yOffset + 1}
    },
    moveRight (piece) {
      return {...piece, xOffset: piece.xOffset + 1}
    },
    moveLeft (piece) {
      return {...piece, xOffset: piece.xOffset - 1}
    },
    rotate (piece) {
      return {...piece, shape: rotateShape(piece.shape)}
    },
    nextPiece () {
      return getNextPiece()
    }
  },
  effects: {
    descend (_, getState) {
      const { board, piece } = getState()
      if (pieceWillCollideBelow(piece, board)) {
        actions.board.stick(piece)
        actions.piece.nextPiece()
      } else {
        actions.piece.moveDown()
      }
    },
    left (_, getState) {
      const { board, piece } = getState()
      if (pieceWillCollideLeft(piece, board)) return
      actions.piece.moveLeft()
    },
    right (_, getState) {
      const { board, piece } = getState()
      if (pieceWillCollideRight(piece, board)) return
      actions.piece.moveRight()
    }
  }
})
