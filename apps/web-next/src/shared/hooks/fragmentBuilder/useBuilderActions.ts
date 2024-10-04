import { useCallback, useContext, useMemo } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { builderNodes } from '@fragments/fragments-plugin/performance'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'

export const useBuilderActions = () => {
  const { documentManager } = useContext(BuilderContext)
  const { selection, selectionGraph } = useBuilderSelection()
  const type = selectionGraph?._type
  const isComponentType = type === builderNodes.Component || type === builderNodes.ComponentSet
  const isPrimary = (type === builderNodes.Screen || type === builderNodes.ComponentSet) && selectionGraph?.isPrimary

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

  const wrapFrame = () => selectionGraph.wrapFrameNode()

  const toggleVisible = () => selectionGraph.toggleVisible?.()

  const remove = () => selectionGraph.remove()

  const setPrimary = () => selectionGraph.setPrimary()

  const duplicate = () => selectionGraph.duplicate()

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
    if (selectionGraph && documentManager && features.canInsert) {
      const frame = documentManager.createFrame()
      selectionGraph.appendChild(frame)
    }
  }, [features.canInsert, selectionGraph, documentManager])

  const addText = useCallback(() => {
    if (selectionGraph && documentManager && features.canInsert) {
      const frame = documentManager.createText()
      selectionGraph.appendChild(frame)
    }
  }, [features.canInsert, selectionGraph, documentManager])

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
