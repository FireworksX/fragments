import { LinkKey } from '@graph-state/core'
import { useCallback, useEffect, useMemo } from 'react'
import { to, useSpringValue } from '@react-spring/web'
import { useBuilderCanvas } from '@/shared/hooks/fragmentBuilder/useBuilderCanvas'
import { animatableValue } from '@/shared/utils/animatableValue'
import { useWaitForElement } from '@/shared/hooks/useWaitForElement'

function watchInlineStyleChange(element: HTMLElement, callback: () => void) {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
        callback()
        // const currentValue = element.style.getPropertyValue(property)
        // callback(currentValue)
      }
    })
  })

  observer.observe(element, { attributes: true, attributeFilter: ['style'], subtree: true })

  callback()

  return () => observer.disconnect()
}

export const useLayerGeometry = (layerKey: LinkKey) => {
  const width = useSpringValue(0)
  const height = useSpringValue(0)
  const top = useSpringValue(0)
  const left = useSpringValue(0)

  const { canvas } = useBuilderCanvas()

  const getRect = useCallback((node?: Element | null) => node?.getBoundingClientRect?.(), [])
  const layerNode = useWaitForElement(`[data-key='${layerKey}']`)
  const rootNode = useWaitForElement(`[data-highlight-root]`)

  const calcPosition = useCallback(
    (direction: 'top' | 'left') => {
      const rootRect = getRect(rootNode)
      const selectedRect = getRect(layerNode)
      return ((selectedRect?.[direction] ?? 0) - (rootRect?.[direction] ?? 0)) / animatableValue(canvas.scale)
    },
    [canvas.scale, getRect, layerNode, rootNode]
  )

  const calcSize = useCallback(
    (type: 'width' | 'height') => {
      return (getRect(layerNode)?.[type] ?? 0) / animatableValue(canvas.scale)
    },
    [canvas.scale, getRect, layerNode]
  )

  useEffect(() => {
    if (layerNode) {
      const runCalc = () => {
        width.set(calcSize('width'))
        height.set(calcSize('height'))
        top.set(calcPosition('top'))
        left.set(calcPosition('left'))
      }

      const dispose = watchInlineStyleChange(layerNode, runCalc)

      return () => dispose()
    }
  }, [calcPosition, calcSize, height, layerNode, left, top, width, layerKey])

  return {
    top,
    left,
    width,
    height
  }
}
