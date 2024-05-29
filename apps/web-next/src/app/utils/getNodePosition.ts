import { iterateParentOfNode } from '../utils/iterateParentOfNode'

interface Options {
  node: Element
  stopNode?: Element | null
}

export const getNodePosition = ({ node, stopNode }: Options) => {
  const width = node.offsetWidth
  const height = node.offsetHeight
  let top = node.offsetTop
  let left = node.offsetLeft

  iterateParentOfNode(node, parent => {
    if (stopNode) {
      if (stopNode.contains(parent)) {
        top += parent.offsetTop
        left += parent.offsetLeft
      }
    } else {
      top += parent.offsetTop
      left += parent.offsetLeft
    }
  })

  return {
    width,
    height,
    top,
    left
  }
}
