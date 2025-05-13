import React, { CSSProperties, FC, memo, ReactNode, useCallback, useContext, useMemo, useRef } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { animated, Interpolation, SpringValue, to, useSpring } from '@react-spring/web'
import { Text } from '@/widgets/renderer/Text/Text'
import { nodes } from '@fragmentsx/plugin-fragment-spring'
import { LinkKey } from '@graph-state/core'
import { FragmentInstance } from '@/widgets/renderer/FragmentInstance/FragmentInstance'
import { useExtendStyle } from '@/widgets/renderer/hooks/useExtendStyle'
import { useGraph } from '@graph-state/react'
import { useLayerStyles } from '../hooks/useLayerStyles'
import { BaseRenderNode, defaultRender, defaultRenderNode } from '@/widgets/renderer/Fragment'
import { useLayerAttributes } from '@/widgets/renderer/hooks/useLayerAttributes'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'

interface LayerProps extends BaseRenderNode {}

const Frame: FC<LayerProps> = ({ layerKey, renderParents = [], render = defaultRender }) => {
  const { documentManager } = useBuilderDocument()
  const [layerGraph] = useGraph(documentManager, layerKey)
  const cssStyles = useLayerStyles(layerKey, renderParents)
  // const extendedStyle = useExtendStyle(cssStyles, style)
  const { attributes, Tag } = useLayerAttributes(layerKey)

  if (!layerGraph) {
    return null
  }

  if (layerGraph?._type === nodes.FragmentInstance) {
    return <FragmentInstance layerKey={layerKey} renderParents={renderParents} render={render} />
  }

  if (layerGraph?._type === nodes.Text) {
    return <Text layerKey={layerKey} renderParents={renderParents} render={render} />
  }

  return render(
    layerKey,
    <Tag {...attributes} style={cssStyles} data-key={layerKey}>
      {layerGraph?.children?.filter(Boolean).map(child => (
        <Frame key={child} layerKey={child} renderParents={[...renderParents, layerKey]} render={render} />
      ))}
    </Tag>
  )
}

export default memo(Frame)
