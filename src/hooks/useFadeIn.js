import { useState, useEffect } from 'react'

const useFadeIn = time => {
  const [opacity, setOpacity] = useState(0)
  
  const style = { opacity, transition: `opacity ${time} ease-in` }

  useEffect(() => setOpacity(1), [])

  return style
}

export default useFadeIn
