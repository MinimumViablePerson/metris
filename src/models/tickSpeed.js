import Mirror from 'mirrorx'

const initialState = 1000

Mirror.model({
  name: 'tickSpeed',
  initialState,
  reducers: {
    next: speed => Math.floor(speed * 0.9),
    reset: () => initialState
  }
})
