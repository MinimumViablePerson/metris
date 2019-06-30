import { actions } from 'mirrorx'
import { useEffect } from 'react'

const useGameTicker = (ms, interval) => {
  useEffect(() => {
    const handle = setInterval(actions.tickSpeed.next, interval * 1000)
    return () => clearInterval(handle)
  }, [interval])

  useEffect(() => {
    const tick = () => {
      actions.rightPiece.descend()
      actions.leftPiece.descend()
    }

    const handle = setInterval(tick, ms)

    return () => clearInterval(handle)
  }, [ms])
}

export default useGameTicker
