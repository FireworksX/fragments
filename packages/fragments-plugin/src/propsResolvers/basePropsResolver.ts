import { getKey, Resolver } from '../helpers'
import { BaseProps } from '@adstore/web/src/types/props'
import { keyOfEntity } from '@adstore/statex'
import { EntityKey } from '../types/props'

export const basePropsResolver: Resolver = (statex, entity): BaseProps => {
  const key = keyOfEntity(entity) ?? ''
  const getParents = (key: EntityKey): ReadonlyArray<BaseProps[]> | null => statex.resolveParents(key)

  /*
  Если удаляемый элемент является ребёнком основного Экрана, то
  он удаляется, иначе скрывается
   */
  // const remove = () => {
  //   const node = statex.resolve(key)
  //   const nodeTree = getParents(key)
  //
  //   if (nodeTree) {
  //     const treeScreen = nodeTree.find(({ _type }) => _type === builderNodes.Screen)
  //     if (treeScreen?.isPrimary || !treeScreen) {
  //       statex.invalidate(entityKey)
  //     } else {
  //       node.toggleVisible(false)
  //     }
  //   }
  // }

  // const getValue = (key: string) => {
  //   const entityValue = statex.resolve(key)
  //
  //   if (key in entityValue) {
  //     const value = entityValue[key]
  //     if (value === undefined && !!entityValue.overrideFrom) {
  //       return statex.resolve(entityValue.overrideFrom).getValue(key)
  //     }
  //   }
  //
  //   return entityValue[key]
  // }

  const duplicate = () => {
    const node = statex.resolve(key)
    const cloneNode = node.clone()
    const parentNode = node.getParent()

    if (parentNode) {
      parentNode.appendChild(cloneNode)
    }
  }

  // const wrapFrameNode = () => {
  //   const node = statex.resolve(entityKey)
  //
  //   if (canWrapFrame.includes(node._type)) {
  //     const parentNode = node.getParent()
  //     const nodeIndex = parentNode.findChildIndex(child => child._id === node._id)
  //
  //     if (nodeIndex !== -1) {
  //       const nextFrame = statex.createFrame()
  //       statex.resolve(statex.root).removeChild(nextFrame)
  //       statex.resolve(nextFrame).appendChild(node)
  //
  //       parentNode.removeChild(node)
  //       parentNode.insertChild(nodeIndex, keyOfEntity(nextFrame))
  //     }
  //   }
  // }

  const removeWrapNode = () => {
    const node = statex.resolve(entityKey)
    const parentNode = node.getParent()
    const nodeIndex = parentNode.findChildIndex(child => child._id === node._id)

    // const parentChildren = [...parent.children]
    // const layerIndex = parentChildren.findIndex(child => child === activeLayerField)
    // parentChildren.splice(layerIndex, 1, ...layerChildren)
    //
    // statex.mutate(
    //   {
    //     _type: parent._type,
    //     _id: parent._id,
    //     children: parentChildren
    //   },
    //   { replace: true }
    // )
  }

  const getParent = (inputKey: string) => {
    const parentKey = statex.resolve(inputKey)?.parentKey
    if (parentKey) {
      return statex.resolve(getKey(parentKey))
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
    toString: (): string => JSON.stringify(statex.resolve(entity)),
    rename: (name: string) => statex.mutate(key, { name }),
    remove: () => statex.invalidate(key),
    // getValue,
    duplicate
    // wrapFrameNode,
  }
}
