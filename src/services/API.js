const url = 'https://metris-leaderboard.herokuapp.com/v1/graphql'

const post = (url, data) =>
	fetch(url, {
		method: 'POST',
		headers: {
      'Content-Type': 'application/json',
      'x-hasura-admin-secret': ''
    },
		body: JSON.stringify(data)
  }).then(resp => resp.json())
  .catch(console.log)

const getTopFiveScores = () =>
  post(url, { query: `
    {
      scores(order_by: {score: desc}, limit: 5) {
        id
        player_name
        score
        time
      }
    }
  `})

const createScore = (player, score) =>
  post(url, { query: `
    mutation {
      insert_scores(objects: {player_name: "${player}", score: ${score}}) {
        returning {
          id
          player_name
          score
          time
        }
      }
    }
  `})

export default { getTopFiveScores, createScore }
