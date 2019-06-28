import React, { useEffect, useRef } from 'react'
import { connect } from 'mirrorx'

import { COLUMNS, ROWS, COLORS } from '../constants';

const size = 20
const width = COLUMNS * size
const height = ROWS * size

const drawBoard = (ctx, board) => {
  board.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      const color = COLORS[cell]
      ctx.fillStyle = color
      ctx.fillRect(cellIndex * size, rowIndex * size, size - 2, size - 2)
    })
  })
}

const drawPiece = (ctx, piece) => {
  piece.shape.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (cell === undefined) return
      const x = cellIndex + piece.xOffset
      const y = rowIndex + piece.yOffset

      const color = COLORS[cell]
      ctx.fillStyle = color
      ctx.fillRect(x * size, y * size, size - 2, size - 2)
    })
  })
}

const Canvas = ({ board, piece }) => {
  const canvasRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    drawBoard(ctx, board)
    drawPiece(ctx, piece)
  }, [board, piece])

  return <canvas ref={canvasRef} width={width} height={height}></canvas>
}

export default connect(({ board, piece }) => ({ board, piece }))(Canvas)
