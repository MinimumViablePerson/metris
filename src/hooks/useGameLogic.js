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
    })
    return () => window.removeEventListener('keydown', listener)
  }, [])

  useEffect(() => {
    clearInterval(handle)
    setHandle(setInterval(actions.piece.descend, speed))
    return () => clearInterval(handle)
  }, [speed])
}

export default useGameLogic
