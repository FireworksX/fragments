import { iterateParentOfNode } from '../utils/iterateParentOfNode'
import isBrowser from '@/app/utils/isBrowser'

interface Options {
  node: Element
  stopNode?: Element | null
}

// export const getNodePosition = ({ node, stopNode }: Options) => {
//   if (!node) {
//     return {
//       width: 0,
//       height: 0,
//       top: 0,
//       left: 0
//     }
//   }
//
//   const width = node.offsetWidth
//   const height = node.offsetHeight
//   let top = node.offsetTop
//   let left = node.offsetLeft
//
//   if (stopNode) {
//     top += stopNode.offsetTop
//     left += stopNode.offsetLeft
//   }
//
//   // iterateParentOfNode(node, parent => {
//   //   console.log(left, parent)
//   //
//   //   if (stopNode) {
//   //     if (stopNode.contains(parent)) {
//   //       top += parent.offsetTop
//   //       left += parent.offsetLeft
//   //     }
//   //   } else {
//   //     top += parent.offsetTop
//   //     left += parent.offsetLeft
//   //   }
//   // })
//
//   return {
//     width,
//     height,
//     top,
//     left
//   }
// }
export const getNodePosition = (element, rootElement, f) => {
  const root = rootElement ?? (isBrowser ? document.querySelector('#viewport') : null)

  let left = 0
  let top = 0
  const { width, height } = { width: element?.offsetWidth ?? 0, height: element?.offsetHeight ?? 0 }
  if (!root) return {}

  while (element && element !== root) {
    left += element.offsetLeft // Смещение относительно родителя по X
    top += element.offsetTop // Смещение относительно родителя по Y

    element = element.offsetParent // Переходим к следующему родителю
  }

  return { left, top, right: left + width, bottom: top + height, width, height }
}
