import React from 'react'
import { actions, connect } from 'mirrorx'

import { Canvas } from './Canvas'

const P = {
  shape: [
    ['red', 'red', 'red'],
    ['red', undefined, 'red'],
    ['red', 'red', 'red'],
    ['red'],
    ['red']
  ],
  yOffset: 0,
  xOffset: 0
}

const L = {
  shape: [
    ['blue'],
    ['blue'],
    ['blue'],
    ['blue'],
    ['blue', 'blue', 'blue']
  ],
  yOffset: 5,
  xOffset: 2
}

const A = {
  shape: [
    ['orange', 'orange', 'orange'],
    ['orange', undefined, 'orange'],
    ['orange', 'orange', 'orange'],
    ['orange', undefined, 'orange'],
    ['orange', undefined, 'orange'],
  ],
  yOffset: 10,
  xOffset: 4
}

const Y = {
  shape: [
    ['yellow', undefined, 'yellow'],
    ['yellow', undefined, 'yellow'],
    [undefined, 'yellow', undefined],
    [undefined, 'yellow', undefined],
    [undefined, 'yellow', undefined],
  ],
  yOffset: 15,
  xOffset: 7
}

const PlayCanvas = props =>
  <div style={{ marginTop: '95px' }} onClick={actions.playing.play}>
    <Canvas {...props} />
  </div>

const mapStateToProps = ({ board }) => ({
  board,
  pieces: [P, L, A, Y]
})

export default connect(mapStateToProps)(PlayCanvas)
