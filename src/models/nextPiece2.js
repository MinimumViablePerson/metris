import Mirror from 'mirrorx'

import { getNextPiece } from './piece2'
import { SHAPES, COLUMNS } from '../constants'

Mirror.model({
  name: 'nextPiece2',
  initialState: getNextPiece(SHAPES, COLUMNS),
  reducers: {
    getNextPiece: () => getNextPiece(SHAPES, COLUMNS)
  },
  effects: {}
})
