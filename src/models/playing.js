import Mirror from 'mirrorx'

Mirror.model({
  name: 'playing',
  initialState: false,
  reducers: {
    play: () => true,
    stop: () => false
  }
})
