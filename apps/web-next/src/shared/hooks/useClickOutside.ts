import { RefObject, useEffect, useRef } from 'react'
import detectPassiveEvents from 'detect-passive-events'

const events = ['mousedown', 'touchstart'] as const

// react-use/src/useClickAway.ts with pause

const useClickOutside = ({
  ref,
  onClickOutside,
  pause
}: {
  ref: RefObject<HTMLElement | null> | RefObject<HTMLElement | null>[]
  onClickOutside: (e: Event) => void
  pause?: boolean
}) => {
  const savedCallback = useRef(onClickOutside)
  useEffect(() => {
    savedCallback.current = onClickOutside
  }, [onClickOutside])

  useEffect(() => {
    if (pause) return
    const handler = (event: Event) => {
      const refs = Array.isArray(ref) ? ref : [ref]

      const isClickedOutside = refs.every(ref => {
        const { current: el } = ref
        return !el || (el !== event.target && !el.contains(event.target as any))
      })

      if (isClickedOutside) savedCallback.current(event)
    }

    const listenerOptions = detectPassiveEvents?.supportsPassiveEvents ? { passive: true, capture: false } : false
    events.forEach(eventName => document.addEventListener(eventName, handler, listenerOptions))

    return () => {
      events.forEach(eventName => document.removeEventListener(eventName, handler, listenerOptions))
    }
  }, [pause, ref])
}

export default useClickOutside
