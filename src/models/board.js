import Mirror from 'mirrorx'

const rows = 20
const columns = 10
const initialState = [...Array(rows)].map(() => [...Array(columns)])

const colors = ['red', 'green', 'blue', 'yellow', 'orange']

const randomColor = () => colors[Math.floor(Math.random() * colors.length)]

Mirror.model({
  name: 'board',
  initialState,
  reducers: {
    fill (board, { rowIndex, colIndex }) {
      return board.map(
        (row, rowI) => rowI !== rowIndex ? row : row.map(
          (col, colI) => colI !== colIndex ? col : randomColor()
        )
      )
    },
    shift (board) {
      board = board.slice(0, -1)
      board.unshift([...Array(columns)])
      return board
    },
  },
  effects: {}
})
