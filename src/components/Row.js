import React from 'react'
import styled from 'styled-components'

import Cell from './Cell'

const Row = ({ cells, className, rowIndex }) =>
  <div className={className}>
    {
      cells.map((color, colIndex) =>
        <Cell
          key={`row${rowIndex}-column${colIndex}`}
          color={color}
          rowIndex={rowIndex}
          colIndex={colIndex}
        />
      )
    }
  </div>

export default styled(Row)`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(10, 1fr);
  grid-gap: 1px;
`
