import React from 'react'
import { actions } from 'mirrorx'
import styled from 'styled-components'

const PlayerInput = ({ className }) => {
  const handleSubmit = e => {
    e.preventDefault()
    const player = e.target.player.value
    actions.player.enter(player)
  }

  return <form className={className} onSubmit={handleSubmit}>
    <label>Enter your display name:</label>
    <br />
    <input name='player' />
  </form>
}

const StyledPlayerInput = styled(PlayerInput)`
  text-align: center;

  input {
    font-size: 1rem;

    border-radius: 5px;
    border: solid 1px black;
  
    margin: 10px;
    padding: 5px;
  }
`

export default StyledPlayerInput
