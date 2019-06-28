import { useState, useEffect } from 'react'
import { actions } from 'mirrorx'

const useGameLogic = () => {

  const [speed, setSpeed] = useState(1000)
  const [handle, setHandle] = useState(null)

  useEffect(() => {
    setInterval(() => setSpeed(speed * 0.9), 60000)

    const listener = window.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') actions.piece.left()
      if (e.key === 'ArrowRight') actions.piece.right()
      if (e.key === 'ArrowUp') actions.piece.rotate()
      if (e.key === 'ArrowDown') actions.piece.descend()

      if (e.key === 'a') actions.piece2.left()
      if (e.key === 'd') actions.piece2.right()
      if (e.key === 'w') actions.piece2.rotate()
      if (e.key === 's') actions.piece2.descend()
    })
    return () => window.removeEventListener('keydown', listener)
  }, [])

  useEffect(() => {
    clearInterval(handle)
    setHandle(setInterval(() => {
      actions.piece.descend()
      actions.piece2.descend()
    }, speed))
    return () => clearInterval(handle)
  }, [speed])
}

export default useGameLogic
