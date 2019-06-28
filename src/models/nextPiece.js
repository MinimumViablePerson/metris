import Mirror from 'mirrorx'

import { getNextPiece } from './piece'
import { SHAPES, COLUMNS } from '../constants'

Mirror.model({
  name: 'nextPiece',
  initialState: getNextPiece(SHAPES, COLUMNS),
  reducers: {
    getNextPiece: () => getNextPiece(SHAPES, COLUMNS)
  },
  effects: {}
})
