import Mirror, { actions } from 'mirrorx'

import { SHAPES, COLUMNS } from '../constants'

import {
  getNextRightPiece,
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
  name: 'rightPiece',
  initialState: getNextRightPiece(SHAPES, COLUMNS),
  reducers: {
    moveDown,
    moveRight,
    moveLeft,
    rotatePiece,
    newPiece
  },
  effects: {
    descend (_, getState) {
      const { rightPiece, board } = getState()
      if (pieceWillCollideBelow(rightPiece, board)) {
        actions.board.stickPiece(rightPiece)
        actions.rightPiece.nextPiece()
      } else {
        actions.rightPiece.moveDown()
      }
    },
    left (_, getState) {
      const { rightPiece, board } = getState()
      if (pieceWillCollideLeft(rightPiece, board)) return
      actions.rightPiece.moveLeft()
    },
    right (_, getState) {
      const { rightPiece, board } = getState()
      if (pieceWillCollideRight(rightPiece, board)) return
      actions.rightPiece.moveRight()
    },
    rotate (_, getState) {
      const { rightPiece, board } = getState()
      if (cannotRotate(rightPiece, board)) return
      actions.rightPiece.rotatePiece()
    },
    nextPiece (_, getState) {
      const { board, nextRightPiece } = getState()
      if (pieceOverlapsAnything(nextRightPiece, board)) {
        console.error('Game over!')
      } else {
        actions.rightPiece.newPiece(nextRightPiece)
        actions.nextRightPiece.getNextPiece()
      }
    }
  }
})
