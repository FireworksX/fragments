import { useCallback, useContext, useMemo } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { stateAlias } from '@/views/FragmentDetail/ui/FragmentDetail'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { definition } from '@fragmentsx/definition'

export const useBuilderActions = () => {
  const { documentManager } = useBuilderDocument()
  const { selection, selectionGraph } = useBuilderSelection()
  const type = selectionGraph?._type
  const isComponentType = type === definition.nodes.Component || type === definition.nodes.ComponentSet
  const isPrimary =
    (type === definition.nodes.Screen || type === definition.nodes.ComponentSet) && selectionGraph?.isPrimary

  const features = useMemo(() => {
    return {
      canInsert: type !== definition.nodes.Text && type !== definition.nodes.Component,
      canConvertToComponent: type !== definition.nodes.Screen && !isComponentType,
      canDuplicate: type !== definition.nodes.Screen,
      canRemove: !isPrimary,
      canHide: !isPrimary,
      canSetPrimary: type === definition.nodes.Screen && !isPrimary,
      canAddFrame: type !== definition.nodes.Screen && type !== definition.nodes.ComponentSet,
      canRemoveWrapper: type === definition.nodes.Frame
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

  const addBreakpoint = useCallback(() => {
    // if (selectionGraph && documentManager && features.canInsert) {
    //   const breakpoint = documentManager[stateAlias].createNode({ _type: definition.nodes.Breakpoint })
    //
    //   console.log(breakpoint)
    // }
  }, [features.canInsert, selectionGraph, documentManager])

  const addFrame = useCallback(() => {
    if (selectionGraph && documentManager && features.canInsert) {
      const frame = documentManager.$fragment.createNode({ _type: definition.nodes.Frame }, selection)
      return frame
    }
  }, [features.canInsert, selectionGraph, documentManager])

  const addText = useCallback(() => {
    if (selectionGraph && documentManager && features.canInsert) {
      const node = documentManager.$fragment.createNode({ _type: definition.nodes.Text }, selection)
    }
  }, [features.canInsert, selectionGraph, documentManager])

  const addImage = useCallback(() => {
    if (selectionGraph && documentManager && features.canInsert) {
      const node = documentManager.$fragment.createNode({ _type: definition.nodes.Image }, selection)
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
    addFrame,
    addBreakpoint,
    addImage
  }
}
