import Mirror from 'mirrorx'

import { getNextLeftPiece } from '../helpers/piece'
import { SHAPES, COLUMNS } from '../constants'

Mirror.model({
  name: 'nextLeftPiece',
  initialState: getNextLeftPiece(SHAPES, COLUMNS),
  reducers: {
    getNextPiece: () => getNextLeftPiece(SHAPES, COLUMNS)
  },
  effects: {}
})
