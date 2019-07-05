import Mirror from 'mirrorx'

Mirror.model({
  name: 'score',
  initialState: 0,
  reducers: {
    clearedRows: (score, amount) => score + ((amount * 100) * amount),
    reset: () => 0
  }
})