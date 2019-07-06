import React, { useEffect } from 'react'
import styled from 'styled-components'
import { actions, connect } from 'mirrorx'

import Loading from './Loading'

const Leaderboard = ({ className, leaderboard }) => {
  useEffect(() => {
    actions.leaderboard.fetch()
  }, [])

  const entries = leaderboard.map((entry, index) =>
    <tr key={entry.id}>
      <td>{index + 1}</td>
      <td>{entry.player_name}</td>
      <td>{entry.score}</td>
    </tr>
  )

  const table = <table>
    <thead>
      <tr>
        <th id='ranking-header'>Ranking</th>
        <th id='name-header'>Name</th>
        <th id='score-header'>Score</th>
      </tr>
    </thead>
    <tbody>
      { entries }
    </tbody>
  </table>

  const leaderboardIsEmpty = leaderboard.length === 0

  return <div className={className}>
    <h3>Leaderboard</h3>
    {
      leaderboardIsEmpty
        ? <Loading />
        : table
    }
  </div>
}


const StyledLeaderboard = styled(Leaderboard)`
  width: 100%;
  text-align: center;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  h3 {
    width: 100%;
    margin-bottom: 10px;
  }

  #ranking-header {
    min-width: 5vw;
  }

  #name-header, #score-header {
    min-width: 20vw;
  }

  td {
    border: solid #00000050 1px;
    border-radius: 3px;
  }
`

const mapStateToProps = ({ leaderboard }) => ({ leaderboard })

export default connect(mapStateToProps)(StyledLeaderboard)
