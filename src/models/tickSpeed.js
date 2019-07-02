import Mirror from 'mirrorx'

Mirror.model({
  name: 'tickSpeed',
  initialState: 1000,
  reducers: {
    next: speed => Math.floor(speed * 0.9)
  }
})
