import { getKey, Resolver } from 'src/helpers'
import { EntityKey } from 'src/types/props'

export const baseProps: Resolver = (state, entity): BaseProps => {
  const key = state.keyOfEntity(entity) ?? ''
  const getParents = (key: EntityKey): ReadonlyArray<BaseProps[]> | null => state.resolveParents(key)

  /*
  Если удаляемый элемент является ребёнком основного Экрана, то
  он удаляется, иначе скрывается
   */
  // const remove = () => {
  //   const node = state.resolve(key)
  //   const nodeTree = getParents(key)
  //
  //   if (nodeTree) {
  //     const treeScreen = nodeTree.find(({ _type }) => _type === builderNodes.Screen)
  //     if (treeScreen?.isPrimary || !treeScreen) {
  //       state.invalidate(entityKey)
  //     } else {
  //       node.toggleVisible(false)
  //     }
  //   }
  // }

  // const getValue = (key: string) => {
  //   const entityValue = state.resolve(key)
  //
  //   if (key in entityValue) {
  //     const value = entityValue[key]
  //     if (value === undefined && !!entityValue.overrideFrom) {
  //       return state.resolve(entityValue.overrideFrom).getValue(key)
  //     }
  //   }
  //
  //   return entityValue[key]
  // }

  const duplicate = () => {
    const node = state.resolve(key)
    const cloneNode = node.clone()
    const parentNode = node.getParent()

    if (parentNode) {
      console.log(parentNode, cloneNode)
      parentNode.appendChild(cloneNode)
    }
  }

  // const wrapFrameNode = () => {
  //   const node = state.resolve(entityKey)
  //
  //   if (canWrapFrame.includes(node._type)) {
  //     const parentNode = node.getParent()
  //     const nodeIndex = parentNode.findChildIndex(child => child._id === node._id)
  //
  //     if (nodeIndex !== -1) {
  //       const nextFrame = state.createFrame()
  //       state.resolve(state.root).removeChild(nextFrame)
  //       state.resolve(nextFrame).appendChild(node)
  //
  //       parentNode.removeChild(node)
  //       parentNode.insertChild(nodeIndex, keyOfEntity(nextFrame))
  //     }
  //   }
  // }

  const removeWrapNode = () => {
    const node = state.resolve(entityKey)
    const parentNode = node.getParent()
    const nodeIndex = parentNode.findChildIndex(child => child._id === node._id)

    // const parentChildren = [...parent.children]
    // const layerIndex = parentChildren.findIndex(child => child === activeLayerField)
    // parentChildren.splice(layerIndex, 1, ...layerChildren)
    //
    // state.mutate(
    //   {
    //     _type: parent._type,
    //     _id: parent._id,
    //     children: parentChildren
    //   },
    //   { replace: true }
    // )
  }

  const getParent = (inputKey: string) => {
    const parentKey = state.resolve(inputKey)?.parentKey
    if (parentKey) {
      return state.resolve(getKey(parentKey))
    }

    return null
  }

  return {
    ...entity,
    name: entity.name ?? null,
    getParents: () => getParents(key),
    getParent: () => getParent(key),
    getAllParents(stack = []) {
      const parent = getParent(key)

      if (parent) {
        stack.push(parent)
        parent.getAllParents(stack)
      }

      return stack
    },
    toString: (): string => JSON.stringify(state.resolve(entity)),
    rename: (name: string) => state.mutate(key, { name }),
    remove: () => state.invalidate(key),
    // getValue,
    duplicate
    // wrapFrameNode,
  }
}
