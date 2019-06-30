import Mirror from 'mirrorx'

Mirror.model({
  name: 'tickSpeed',
  initialState: 1000,
  reducers: {
    next: speed => speed * 0.9
  }
})
