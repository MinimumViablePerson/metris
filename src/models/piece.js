import Mirror from 'mirrorx'

const pieces = [
  {
    shape: [
      ['red'],
      ['red'],
      ['red'],
      ['red']
    ],
    xOffset: 0,
    yOffset: 0
  },
  {
    shape: [
      ['yellow','yellow'],
      ['yellow','yellow']
    ],
    xOffset: 0,
    yOffset: 0
  },
  {
    shape: [
      ['blue'],
      ['blue'],
      ['blue','blue']
    ],
    xOffset: 0,
    yOffset: 0
  },
  {
    shape: [
      ['', 'green'],
      ['', 'green'],
      ['green','green']
    ],
    xOffset: 0,
    yOffset: 0
  }
]

const initialState = pieces[2]

const rotateShape = shape => {
	const rotatedShape = []
	let currentIndex = 0
	
	while (true) {
		const row = shape.map(piece => piece[currentIndex]).reverse()
		
		if (row.every(cell => cell === undefined)) break

		rotatedShape.push(row)
 		currentIndex++
  }

	return rotatedShape
}

Mirror.model({
  name: 'piece',
  initialState,
  reducers: {
    moveDown (piece) {
      return {...piece, yOffset: piece.yOffset + 1}
    },
    moveRight (piece) {
      return {...piece, xOffset: piece.xOffset + 1}
    },
    moveLeft (piece) {
      return {...piece, xOffset: piece.xOffset - 1}
    },
    rotate (piece) {
      return {...piece, shape: rotateShape(piece.shape)}
    }
  },
  effects: {}
})
