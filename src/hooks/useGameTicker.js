import { actions } from 'mirrorx'
import { useEffect } from 'react'

const useGameTicker = (ms, interval, playing) => {
  useEffect(() => {
    const handle = setInterval(actions.tickSpeed.next, interval * 1000)
    return () => clearInterval(handle)
  }, [interval])

  useEffect(() => {
    const tick = () => {
      if (!playing) return
      actions.rightPiece.descend()
      actions.leftPiece.descend()
    }

    const handle = setInterval(tick, ms)

    return () => clearInterval(handle)
  }, [ms, playing])
}

export default useGameTicker
