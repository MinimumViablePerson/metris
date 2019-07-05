import Mirror from 'mirrorx'

Mirror.model({
  name: 'player',
  initialState: null,
  reducers: {
    enter: (_, player) => player
  }
})
