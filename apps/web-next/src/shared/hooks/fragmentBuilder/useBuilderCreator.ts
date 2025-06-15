import { use } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { definition } from '@fragmentsx/definition'
import { getRandomColor } from '@/shared/utils/random'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useFragmentLayers } from '@/shared/hooks/fragmentBuilder/useFragmentLayers'
import { appendChildren, cloneLayer, isPartOfPrimary, isRootLayer } from '@fragmentsx/render-core'
import { getLayer } from '@/shared/hooks/fragmentBuilder/useNormalizeLayer/getLayer'
import { LinkKey } from '@graph-state/core'
import { useFragmentManager } from '@fragmentsx/render-suite'
import { pick } from '@fragmentsx/utils'

export const useBuilderCreator = () => {
  const { builderManager } = use(BuilderContext)
  const [creator] = useGraph(builderManager, builderManager.$creator.key)
  const { documentManager } = useBuilderDocument()
  const { layers } = useFragmentLayers()
  const { queryFragmentManager } = useFragmentManager()

  const createFrame = (parent, externalProps = {}) => {
    if (![definition.nodes.Frame].includes(documentManager.entityOfKey(parent)?._type)) {
      return
    }

    const parentNode = documentManager.resolve(parent)
    const parentLayerMode = parentNode.layerMode

    return appendChildren(documentManager, documentManager.keyOfEntity(parent), {
      _type: definition.nodes.Frame,
      solidFill: getRandomColor(),
      fillType: definition.paintMode.Solid,
      position:
        parentLayerMode === definition.layerMode.flex
          ? definition.positionType.relative
          : definition.positionType.absolute,
      width: 100,
      height: 100,
      ...externalProps
    })
  }

  const createText = (parent, externalProps = {}) => {
    if (![definition.nodes.Frame].includes(documentManager.entityOfKey(parent)?._type)) {
      return
    }

    const parentNode = documentManager.resolve(parent)
    const parentLayerMode = parentNode.layerMode

    return appendChildren(documentManager, documentManager.keyOfEntity(parent), {
      _type: definition.nodes.Text,
      position:
        parentLayerMode === definition.layerMode.flex
          ? definition.positionType.relative
          : definition.positionType.absolute,
      widthType: definition.sizing.Hug,
      heightType: definition.sizing.Hug,
      ...externalProps
    })
  }

  const createBreakpoint = (options: { name: string; threshold: number }) => {
    const primaryLayer = layers.find(layerKey => isPartOfPrimary(documentManager, layerKey))
    const lastLayer = getLayer(documentManager, layers.at(-1))
    const nextBreakpointLayer = cloneLayer(documentManager, primaryLayer, {
      name: options.name,
      threshold: options.threshold, // @deprecated
      top: lastLayer.top,
      left: lastLayer.left + lastLayer.width + 50,
      width: options.threshold,
      isBreakpoint: true,
      isPrimary: false
    })

    return appendChildren(documentManager, documentManager.$fragment.root, nextBreakpointLayer)
  }

  const createInstance = async (parent: LinkKey, options: { name: string; fragment: string }) => {
    /**
     * Делаем запрос на получение фрагмента.
     * Из главного слоя достаём ширину и высоту.
     * Применяем их к Инстансу.
     */
    const fragmentManager = await queryFragmentManager(options.fragment)
    const rootLayerLink = fragmentManager
      ?.resolve(fragmentManager?.$fragment?.root)
      ?.children?.find(child => isRootLayer(fragmentManager, child))
    const rootLayerNode = fragmentManager?.resolve(rootLayerLink) ?? {}

    return appendChildren(documentManager, documentManager.keyOfEntity(parent), {
      _type: definition.nodes.Instance,
      name: options.name,
      fragment: options.fragment,
      ...pick(rootLayerNode, 'width', 'height', 'widthType', 'heightType')
    })
  }

  return {
    creator,
    manager: builderManager.$creator,
    createFrame,
    createBreakpoint,
    createText,
    createInstance
  }
}
