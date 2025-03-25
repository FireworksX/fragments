import { LinkKey } from '@graph-state/core'
import { useGraph } from '@graph-state/react'
import { use } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { animated } from '@react-spring/web'
import { isValue } from '@fragments/utils'
import { linkTarget } from '@fragments/plugin-fragment'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'

export const useLayerAttributes = (layerKey: LinkKey) => {
  const { documentManager } = useBuilderDocument()
  const [layerGraph] = useGraph(documentManager, layerKey)
  const attributes = layerGraph?.attributes ?? {}
  let Tag = animated.div

  if (isValue(layerGraph?.href)) {
    Tag = animated.a

    if (layerGraph?.target == linkTarget._blank) {
      attributes.target = layerGraph?.target
    }
  }

  return {
    attributes,
    Tag
  }
}
