import { useState, useEffect, useRef, useCallback } from 'react'

export function useBoundingClientRect(domNode = null, deps = []) {
  const [rect, setRect] = useState(null)
  const ref = useRef(null)
  const element = domNode || ref.current

  const updateRect = useCallback(() => {
    if (!element) return

    setRect(element.getBoundingClientRect())
  }, [element])

  useEffect(() => {
    if (!element) return () => null

    const observer = new ResizeObserver(updateRect)
    observer.observe(element)
    updateRect()

    const mutationObserver = new MutationObserver(updateRect)
    mutationObserver.observe(element, { attributes: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [domNode, element, updateRect])

  useEffect(() => {
    updateRect()
  }, deps)

  return [ref, rect]
}
