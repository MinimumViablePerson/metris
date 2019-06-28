import React from 'react'
import styled from 'styled-components'

import { actions } from 'mirrorx'

const Gamepad = ({ className }) =>
  <div className={className}>
    <div>
      <div className='padding'></div>
      <button onClick={actions.piece.rotate}>↻</button>
    </div>
    <div>
      <button onClick={actions.piece.left}>⇦</button>
      <button onClick={actions.piece.right}>⇨</button>
      <button onClick={actions.piece.descend}>⇩</button>
    </div>
  </div>

const StyledGamepad = styled(Gamepad)`
  margin: 0 10px;

  button {
    font-size: 1.5rem;
    background: none;
    border: solid 1px #bb20bb60;
    border-radius: 5px;
    width: 48px;
    height: 48px;
    margin: 5px;

    display: flex;
    align-items: center;
    justify-content: center;

    user-select: none;
  }

  button:focus {
    outline: none;
  }

  .padding {
    width: 48px;
    height: 48px;
    margin: 5px;
    display: inline-block;
  }

  @media screen and (min-width: 580px) {
    display: none;
  }
`

export default StyledGamepad
