import { LinkKey } from '@graph-state/core'
import { isBrowser } from '@fragmentsx/utils'
import { getTransformValues } from '@/shared/utils/getTransformValues'

export const getDomRect = (graphKey?: LinkKey) => {
  if (isBrowser) {
    const domElement = document.querySelector(`[data-key="${graphKey}"]`)
    if (domElement instanceof HTMLElement) {
      const parent = domElement.offsetParent as HTMLElement

      const { x: transformX, y: transformY } = getTransformValues(domElement)

      const left = domElement.offsetLeft - Math.abs(transformX)
      const top = domElement.offsetTop - Math.abs(transformY)
      const right = parent?.clientWidth - left - domElement.offsetWidth
      const bottom = parent?.clientHeight - top - domElement.offsetHeight

      return {
        left,
        top,
        right,
        bottom,
        width: domElement.offsetWidth,
        height: domElement.offsetHeight
      }
    }
  }

  return {
    left: null,
    top: null,
    right: null,
    bottom: null,
    width: null,
    height: null
  }
}
