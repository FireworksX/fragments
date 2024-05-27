import { useCallback, useMemo } from 'react'
import { builderNodes } from '../../../data/promos/creators'
import { useStore } from '@nanostores/react'
import { $statex } from '../../../store/builderRouterStore'
import { useStatex } from '@adstore/statex-react'
import { useBuilderSelection } from '../../../hooks/useBuilderSelection'

export const useBuilderActions = () => {
  const statex = useStore($statex)
  const { selection } = useBuilderSelection()
  const node = useStatex(statex, selection)
  const type = node?._type
  const isComponentType = type === builderNodes.Component || type === builderNodes.ComponentSet
  const isPrimary = (type === builderNodes.Screen || type === builderNodes.ComponentSet) && node?.isPrimary

  const features = useMemo(() => {
    return {
      canInsert: type !== builderNodes.Text && type !== builderNodes.Component,
      canConvertToComponent: type !== builderNodes.Screen && !isComponentType,
      canDuplicate: type !== builderNodes.Screen,
      canRemove: !isPrimary,
      canHide: !isPrimary,
      canSetPrimary: type === builderNodes.Screen && !isPrimary,
      canAddFrame: type !== builderNodes.Screen && type !== builderNodes.ComponentSet,
      canRemoveWrapper: type === builderNodes.Frame
    }
  }, [isComponentType, isPrimary, type])

  // const wrapFrame = useCallback(() => {
  //   if (!features.canAddFrame) return
  //
  //   const parents = statex.resolveParents(activeLayerField)
  //   const wrapLayer = createFrameLayer({ children: [activeLayerField] })
  //
  //   parents.forEach(parent => {
  //     const children = [...parent.children]
  //     const layerIndex = children.findIndex(child => child === activeLayerField)
  //     children.splice(layerIndex, 1, wrapLayer)
  //
  //     statex.mutate(
  //       {
  //         _type: parent._type,
  //         _id: parent._id,
  //         children
  //       },
  //       { replace: true }
  //     )
  //   })
  // }, [activeLayerField, features.canAddFrame, statex])

  const wrapFrame = () => node.wrapFrameNode()

  const toggleVisible = () => node.toggleVisible?.()

  const remove = () => node.remove()

  const setPrimary = () => node.setPrimary()

  const duplicate = () => node.duplicate()

  const convertToComponent = () => {
    // const parents = statex.resolveParents(activeLayerField)
    // const layerCopy = createCopy(layerValue, statex)
    // const componentVariant = createComponentVariant({ children: [layerCopy], isPrimary: true })
    // const component = createComponent({ children: [componentVariant], variant: componentVariant._id })
    //
    // parents.forEach(parent => {
    //   const parentChildren = [...parent.children]
    //   const layerIndex = parentChildren.findIndex(child => child === activeLayerField)
    //   parentChildren.splice(layerIndex, 1, component)
    //
    //   statex.mutate(
    //     {
    //       ...parent,
    //       children: parentChildren
    //     },
    //     {
    //       replace: true
    //     }
    //   )
    // })
    //
    // statex.mutate(templateKey, prev => ({
    //   locals: {
    //     components: [...prev.locals.components, keyOfEntity(component)]
    //   }
    // }))
  }

  const addFrame = useCallback(() => {
    if (node && statex && features.canInsert) {
      const frame = statex.createFrame()
      node.appendChild(frame)
      statex.resolve(statex.root).removeChild(frame)
    }
  }, [features.canInsert, node, statex])

  const addText = useCallback(() => {
    if (node && statex && features.canInsert) {
      const frame = statex.createText()
      node.appendChild(frame)
      statex.resolve(statex.root).removeChild(frame)
    }
  }, [features.canInsert, node, statex])

  return {
    features,
    wrapFrame,
    toggleVisible,
    remove,
    setPrimary,
    convertToComponent,
    duplicate,
    addText,
    addFrame
  }
}
