import React from 'react'
import styled, { keyframes } from 'styled-components'
import { COLORS } from '../constants';

const animation = keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`

const Loading = ({ className }) =>
  <div className={`${className} loading`}>
    <div className='wrapper'>
      <div className='tile' id='one'></div>
      <div className='tile' id='two'></div>
      <div className='tile' id='three'></div>
      <div className='tile' id='four'></div>
    </div>
  </div>

const StyledLoading = styled(Loading)`
  
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .wrapper {
    display: flex;
  }

  .tile {
    width: 20px;
    height: 20px;
    margin: 2px;
    animation: 2s ${animation} infinite alternate ease-in;
  }

  #one {
    background: ${COLORS['salmon']};
  }

  #two {
    background: ${COLORS['blue']};
    animation-delay: 300ms;
  }

  #three {
    background: ${COLORS['yellow']};
    animation-delay: 600ms;
  }

  #four {
    background: ${COLORS['green']};
    animation-delay: 900ms;
  }
`

export default StyledLoading