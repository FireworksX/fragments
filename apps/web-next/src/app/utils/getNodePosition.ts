import { iterateParentOfNode } from '../utils/iterateParentOfNode'

interface Options {
  node: Element
  stopNode?: Element | null
}

export const getNodePosition = ({ node, stopNode }: Options) => {
  if (!node) {
    return {
      width: 0,
      height: 0,
      top: 0,
      left: 0
    }
  }

  const width = node.offsetWidth
  const height = node.offsetHeight
  let top = node.offsetTop
  let left = node.offsetLeft

  if (stopNode) {
    top += stopNode.offsetTop
    left += stopNode.offsetLeft
  }

  // iterateParentOfNode(node, parent => {
  //   console.log(left, parent)
  //
  //   if (stopNode) {
  //     if (stopNode.contains(parent)) {
  //       top += parent.offsetTop
  //       left += parent.offsetLeft
  //     }
  //   } else {
  //     top += parent.offsetTop
  //     left += parent.offsetLeft
  //   }
  // })

  return {
    width,
    height,
    top,
    left
  }
}
