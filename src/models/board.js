import Mirror from 'mirrorx'

const rows = 20
const columns = 10
const initialState = [...Array(rows)].map(() => Array(columns).fill(''))

Mirror.model({
  name: 'board',
  initialState,
  reducers: {
    stick(board, piece) {
      const newBoard = board.map((row, rowIndex) => row.map((cell, cellIndex) => {
        const row = piece.shape[rowIndex - piece.yOffset] || []
        const newCell = row[cellIndex - piece.xOffset]
        return newCell || cell
      }))
      console.log({ newBoard })
      return newBoard
    }
  },
  effects: {}
})
