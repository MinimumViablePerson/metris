import React, { useRef, useEffect } from 'react'
import { connect } from 'mirrorx'

import { COLORS, TILE_SIZE } from '../constants'

const NextPiece = ({ nextPiece }) => {
  const canvasRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const { width, height } = canvas

    ctx.clearRect(0, 0, width, height)

    nextPiece.shape.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        ctx.fillStyle = COLORS[cell] || '#fff'
        const x = cellIndex * TILE_SIZE
        const y = rowIndex * TILE_SIZE
        ctx.fillRect(x, y, TILE_SIZE - 2, TILE_SIZE - 2)
      })
    })
  }, [nextPiece])
  
  return <div style={{ margin: '30px' }}>
    <h3>Next piece:</h3>
    <br />
    <canvas  ref={canvasRef} width='80' height='80' />
  </div>
}

const mapStateToProps = ({ nextPiece, nextPiece2}, { side }) => ({
  nextPiece: side === 'right' ? nextPiece : nextPiece2
})

export default connect(mapStateToProps)(NextPiece)

