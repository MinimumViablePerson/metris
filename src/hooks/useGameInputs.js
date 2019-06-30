import { useEffect } from 'react'
import { actions } from 'mirrorx'

const useGameInputs = () => {
  useEffect(() => {
    const listener = window.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') actions.rightPiece.left()
      if (e.key === 'ArrowRight') actions.rightPiece.right()
      if (e.key === 'ArrowUp') actions.rightPiece.rotate()
      if (e.key === 'ArrowDown') actions.rightPiece.descend()

      if (e.key === 'a') actions.leftPiece.left()
      if (e.key === 'd') actions.leftPiece.right()
      if (e.key === 'w') actions.leftPiece.rotate()
      if (e.key === 's') actions.leftPiece.descend()
    })

    return () => {
      window.removeEventListener('keydown', listener)
    }
  }, [])
}

export default useGameInputs
