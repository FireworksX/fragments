export const iterateParentOfNode = (node: Element, visitor: (node?: ParentNode) => void) => {
  let parent: any = node

  while (parent?.parentNode) {
    parent = parent.parentNode
    visitor(parent)
  }
}
