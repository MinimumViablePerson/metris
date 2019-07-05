import Mirror from 'mirrorx'

import API from '../services/API'
import { actions } from 'mirrorx/lib/mirror';

Mirror.model({
  name: 'leaderboard',
  initialState: [],
  reducers: {
    update: (_, leaderboard) => leaderboard
  },
  effects: {
    async fetch () {
      const { data } = await API.getTopFiveScores()
      actions.leaderboard.update(data.scores)
    }
  }
})
