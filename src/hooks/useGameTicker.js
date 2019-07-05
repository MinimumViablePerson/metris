import { actions } from 'mirrorx'
import { useEffect } from 'react'

const useGameTicker = (ms, interval, playing) => {

  useEffect(() => {
    if (!playing) return
    const handle = setInterval(actions.tickSpeed.next, interval * 1000)
    return () => clearInterval(handle)
  }, [interval, playing])

  useEffect(() => {
    if (!playing) return    
    const tick = () => {
      actions.rightPiece.descend()
      actions.leftPiece.descend()
    }

    const handle = setInterval(tick, ms)

    return () => clearInterval(handle)
  }, [ms, playing])
}

export default useGameTicker
