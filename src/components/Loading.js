import React from 'react'
import styled, { keyframes } from 'styled-components'
import { COLORS } from '../constants';

const animation = keyframes`
  0% {
    opacity: 1;
    /* transform: rotate(0deg); */
  }

  100% {
    opacity: 0;
    /* transform: rotate(10deg); */
  }
`

const Loading = ({ className }) =>
  <div className={className}>
    <div id='one'></div>
    <div id='two'></div>
    <div id='three'></div>
    <div id='four'></div>
  </div>

const StyledLoading = styled(Loading)`

  display: flex;

  div {
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