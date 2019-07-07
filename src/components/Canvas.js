import React, { useEffect, useRef } from 'react'
import { connect } from 'mirrorx'

import { COLUMNS, ROWS, COLORS, TILE_SIZE } from '../constants'
import useFadeIn from '../hooks/useFadeIn';

const width = COLUMNS * TILE_SIZE
const height = ROWS * TILE_SIZE

const drawSquare = ({ ctx, x, y, size, color }) => {
  ctx.fillStyle = color
  ctx.fillRect(x, y, size, size)
}

const drawBoard = (ctx, board) => {
  board.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      const x = cellIndex * TILE_SIZE
      const y = rowIndex * TILE_SIZE
      const size = TILE_SIZE - 2
      const color = COLORS[cell]

      drawSquare({ ctx, x, y, size, color })
    })
  })
}

const drawPiece = (ctx, piece) => {  
  piece.shape.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (cell === undefined) return
      const x = (cellIndex + piece.xOffset) * TILE_SIZE
      const y = (rowIndex + piece.yOffset) * TILE_SIZE
      const size = TILE_SIZE - 2
      const color = COLORS[cell]

      drawSquare({ ctx, x, y, size, color })
    })
  })
}

export const Canvas = ({ board, pieces }) => {
  const canvasRef = useRef()

  const style = useFadeIn('200ms')

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d')
    drawBoard(ctx, board)
    pieces.forEach(piece => drawPiece(ctx, piece))
  }, [board, pieces])

  return <canvas style={style} ref={canvasRef} width={width} height={height}></canvas>
}

const mapStateToProps = ({ board, leftPiece, rightPiece }) => ({
  board,
  pieces: [leftPiece, rightPiece]
})

export default connect(mapStateToProps)(Canvas)
