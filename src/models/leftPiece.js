import Mirror, { actions } from 'mirrorx'

import { SHAPES } from '../constants'

import {
  getNextLeftPiece,
  pieceWillCollideBelow,
  pieceWillCollideLeft,
  pieceWillCollideRight,
  cannotRotate,
  pieceOverlapsAnything,
  moveDown,
  moveRight,
  moveLeft,
  rotatePiece,
  newPiece
} from '../helpers/piece'

Mirror.model({
  name: 'leftPiece',
  initialState: getNextLeftPiece(SHAPES),
  reducers: {
    moveDown,
    moveRight,
    moveLeft,
    rotatePiece,
    newPiece
  },
  effects: {
    descend (_, getState) {
      const { leftPiece, board } = getState()
      if (pieceWillCollideBelow(leftPiece, board)) {
        actions.board.stickPiece(leftPiece)
        actions.leftPiece.nextPiece()
      } else {
        actions.leftPiece.moveDown()
      }
    },
    left (_, getState) {
      const { leftPiece, board } = getState()
      if (pieceWillCollideLeft(leftPiece, board)) return
      actions.leftPiece.moveLeft()
    },
    right (_, getState) {
      const { leftPiece, board } = getState()
      if (pieceWillCollideRight(leftPiece, board)) return
      actions.leftPiece.moveRight()
    },
    rotate (_, getState) {
      const { leftPiece, board } = getState()
      if (cannotRotate(leftPiece, board)) return
      actions.leftPiece.rotatePiece()
    },
    nextPiece (_, getState) {
      const { board, nextLeftPiece } = getState()
      if (pieceOverlapsAnything(nextLeftPiece, board)) {
        console.error('Game over!')
      } else {
        actions.leftPiece.newPiece(nextLeftPiece)
        actions.nextLeftPiece.getNextPiece()
      }
    }
  }
})
