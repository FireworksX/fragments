import { use } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { appendChildren } from '@fragments/renderer-editor'
import { getFieldValue, layerMode, nodes, paintMode, positionType } from '@fragments/plugin-fragment'
import { getRandomColor } from '@/shared/utils/random'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { animatableValue } from '@fragments/plugin-fragment-spring/src/shared/animatableValue'
import { SpringValue } from '@fragments/springs-factory'
import { useFragmentLayers } from '@/shared/hooks/fragmentBuilder/useFragmentLayers'
import { getLayer, isPartOfPrimary } from '@fragments/renderer-editor'
import { cloneLayer } from '@fragments/renderer-editor'
import { threadId } from 'node:worker_threads'

export const useBuilderCreator = () => {
  const { builderManager } = use(BuilderContext)
  const [creator] = useGraph(builderManager, builderManager.$creator.key)
  const { documentManager } = useBuilderDocument()
  const { layers } = useFragmentLayers()

  const createFrame = (parent, externalProps = {}) => {
    if (![nodes.Frame].includes(documentManager.entityOfKey(parent)?._type)) {
      return
    }

    const parentNode = documentManager.resolve(parent)
    const parentLayerMode = parentNode.layerMode

    appendChildren(documentManager, documentManager.keyOfEntity(parent), {
      _type: nodes.Frame,
      solidFill: getRandomColor(),
      fillType: paintMode.Solid,
      position: parentLayerMode === layerMode.flex ? positionType.relative : positionType.absolute,
      width: 100,
      height: 100,
      ...externalProps
    })
  }

  const createBreakpoint = (options: { name: string; threshold: number }) => {
    const primaryLayer = layers.find(layerKey => isPartOfPrimary(documentManager, layerKey))
    const lastLayer = getLayer(documentManager, layers.at(-1))
    const nextBreakpointLayer = cloneLayer(documentManager, primaryLayer, {
      name: options.name,
      threshold: options.threshold,
      top: lastLayer.top,
      left: lastLayer.left + lastLayer.width + 50,
      width: options.threshold,
      isBreakpoint: true,
      isPrimary: false
    })

    appendChildren(documentManager, documentManager.$fragment.root, nextBreakpointLayer)
  }

  return {
    creator,
    manager: builderManager.$creator,
    createFrame,
    createBreakpoint
  }
}
