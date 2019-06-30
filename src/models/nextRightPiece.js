import Mirror from 'mirrorx'

import { getNextRightPiece } from '../helpers/piece'
import { SHAPES, COLUMNS } from '../constants'

Mirror.model({
  name: 'nextRightPiece',
  initialState: getNextRightPiece(SHAPES, COLUMNS),
  reducers: {
    getNextPiece: () => getNextRightPiece(SHAPES, COLUMNS)
  }
})
