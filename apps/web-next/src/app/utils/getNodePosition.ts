import { iterateParentOfNode } from '../utils/iterateParentOfNode'
import isBrowser from '@/app/utils/isBrowser'

interface Options {
  node: Element
  stopNode?: Element | null
}

const fallback = { left: 0, top: 0, right: 0, bottom: 0, width: 0, height: 0 }

export const getNodePosition = (inputElement, rootElement) => {
  const root = rootElement ?? (isBrowser ? document.querySelector('#viewport') : null)
  let element = inputElement

  if (!element || !root) return fallback

  let left = 0
  let top = 0

  const { width, height } = {
    width: element?.offsetWidth ?? 0,
    height: element?.offsetHeight ?? 0
  }

  while (element && element !== root) {
    left += element.offsetLeft // Смещение относительно родителя по X
    top += element.offsetTop // Смещение относительно родителя по Y

    element = element.offsetParent // Переходим к следующему родителю

    const computedStyles = getComputedStyle(element)
    left += parseFloat(computedStyles.borderLeftWidth)
    top += parseFloat(computedStyles.borderTopWidth)
  }

  return { left, top, right: left + width, bottom: top + height, width, height }
}
