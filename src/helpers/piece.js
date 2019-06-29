export const rotateShape = shape => {
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

export const pieceWillCollideBelow = (piece, board) =>
  piece.shape.some((row, rowIndex) => row.some((cell, cellIndex) => {
    if (cell === undefined) return false
  
    const nextRowIndex = rowIndex + piece.yOffset + 1
    const nextCellIndex = cellIndex + piece.xOffset

    const nextRow = board[nextRowIndex] || []

    return nextRow[nextCellIndex] !== ''
  }))

export const pieceWillCollideLeft = (piece, board) =>
  piece.shape.some((row, rowIndex) => row.some((cell, cellIndex) => {
    const nextRowIndex = rowIndex + piece.yOffset
    const prevCellIndex = cellIndex + piece.xOffset - 1

    if (cell === undefined) return false
    return board[nextRowIndex][prevCellIndex] !== ''
  }))

export const pieceWillCollideRight = (piece, board) =>
  piece.shape.some((row, rowIndex) => row.some((cell, cellIndex) => {
    const nextRowIndex = rowIndex + piece.yOffset
    const nextCellIndex = cellIndex + piece.xOffset + 1

    if (cell === undefined) return false
    return board[nextRowIndex][nextCellIndex] !== ''
  }))

export const pieceOverlapsAnything = (piece, board) =>
  piece.shape.some((row, rowIndex) => row.some((cell, cellIndex) => {
    rowIndex += piece.yOffset
    cellIndex += piece.xOffset

    if (cell === undefined) return false
    return board[rowIndex][cellIndex] !== ''
  }))

export const cannotRotate = (piece, board) => {
  const shape = rotateShape(piece.shape)
  return shape.some((row, rowIndex) => row.some((cell, cellIndex) => {
    const nextRowIndex = rowIndex + piece.yOffset
    const nextCellIndex = cellIndex + piece.xOffset

    if (cell === undefined) return false
    return board[nextRowIndex][nextCellIndex] !== ''
  }))
}

export const getNextLeftPiece = (shapes) => {
  const shape = shapes[Math.floor(Math.random() * shapes.length)]
  const xOffset = 0
  const yOffset = 0
  return { shape, xOffset, yOffset }
}

export const getNextRightPiece = (shapes, columns) => {
  const shape = shapes[Math.floor(Math.random() * shapes.length)]
  const xOffset = columns - 3
  const yOffset = 0
  return { shape, xOffset, yOffset }
}

export const moveDown = piece => ({...piece, yOffset: piece.yOffset + 1})

export const moveRight = piece => ({...piece, xOffset: piece.xOffset + 1})

export const moveLeft = piece => ({...piece, xOffset: piece.xOffset - 1})

export const rotatePiece = piece => ({...piece, shape: rotateShape(piece.shape)})

export const newPiece = (_, newPiece) => newPiece
